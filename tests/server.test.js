const request = require('supertest');
const app = require('../src/server');

describe('Bus Booking API', () => {
  describe('GET /api/buses', () => {
    it('should return all buses', async () => {
      const response = await request(app).get('/api/buses');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('buses');
      expect(Array.isArray(response.body.buses)).toBe(true);
    });

    it('should filter buses by from city', async () => {
      const response = await request(app)
        .get('/api/buses')
        .query({ from: 'New York' });
      
      expect(response.status).toBe(200);
      expect(response.body.buses.every(bus => 
        bus.from.toLowerCase().includes('new york')
      )).toBe(true);
    });
  });

  describe('POST /api/book', () => {
    it('should successfully book seats', async () => {
      const bookingData = {
        busId: 1,
        passengerName: 'John Doe',
        seats: 2
      };

      const response = await request(app)
        .post('/api/book')
        .send(bookingData);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('booking');
    });

    it('should return error for missing fields', async () => {
      const response = await request(app)
        .post('/api/book')
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return error for invalid bus', async () => {
      const response = await request(app)
        .post('/api/book')
        .send({
          busId: 999,
          passengerName: 'John Doe',
          seats: 1
        });
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /', () => {
    it('should serve the home page', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.type).toBe('text/html');
    });
  });
});
