const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample bus data
const busData = {
  buses: [
    {
      id: 1,
      name: 'Express Bus 1',
      from: 'New York',
      to: 'Boston',
      departure: '08:00 AM',
      arrival: '12:00 PM',
      price: 45,
      seats: 40,
      available: 35
    },
    {
      id: 2,
      name: 'Luxury Coach',
      from: 'New York',
      to: 'Washington DC',
      departure: '09:30 AM',
      arrival: '02:30 PM',
      price: 65,
      seats: 50,
      available: 42
    },
    {
      id: 3,
      name: 'City Shuttle',
      from: 'Boston',
      to: 'New York',
      departure: '10:15 AM',
      arrival: '02:15 PM',
      price: 40,
      seats: 30,
      available: 25
    }
  ]
};

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/buses', (req, res) => {
  const { from, to } = req.query;
  
  let filteredBuses = busData.buses;
  
  if (from) {
    filteredBuses = filteredBuses.filter(bus => 
      bus.from.toLowerCase().includes(from.toLowerCase())
    );
  }
  
  if (to) {
    filteredBuses = filteredBuses.filter(bus => 
      bus.to.toLowerCase().includes(to.toLowerCase())
    );
  }
  
  res.json({ buses: filteredBuses });
});

app.post('/api/book', (req, res) => {
  const { busId, passengerName, seats } = req.body;
  
  // Input validation
  if (!busId || !passengerName || !seats) {
    return res.status(400).json({ 
      error: 'Missing required fields: busId, passengerName, seats' 
    });
  }
  
  const bus = busData.buses.find(b => b.id === parseInt(busId, 10));
  
  if (!bus) {
    return res.status(404).json({ error: 'Bus not found' });
  }
  
  if (seats > bus.available) {
    return res.status(400).json({ 
      error: `Only ${bus.available} seats available` 
    });
  }
  
  // Simulate booking
  bus.available -= parseInt(seats, 10);
  
  const booking = {
    id: Date.now(),
    busId: parseInt(busId, 10),
    passengerName,
    seats: parseInt(seats, 10),
    totalPrice: bus.price * parseInt(seats, 10),
    bookingDate: new Date().toISOString()
  };
  
  res.json({ 
    success: true, 
    booking,
    message: `Successfully booked ${seats} seat(s) on ${bus.name}` 
  });
});

// Serve booking page
app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'booking.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Bus booking server running on port ${PORT}`);
  });
}

module.exports = app;
