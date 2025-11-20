
# 🌐 End-to-End DevOps CI/CD Pipeline on AWS with Kubernetes, GitOps & Security  
*Automated code quality, containerization, security scanning, and GitOps deployment — monitored with Prometheus & Grafana.*

## 📖 Overview
This project demonstrates a fully automated CI/CD pipeline built on an AWS EC2 instance with Kubernetes integration.  
It streamlines code quality checks, containerization, vulnerability scanning, and deployment — all monitored with Prometheus and Grafana.

## ⚙️ Tools & Technologies
- **Jenkins**: CI/CD automation server (configured via Jenkins UI)
- **Docker**: Containerization platform
- **SonarQube**: Code quality analysis
- **Trivy**: Vulnerability scanning
- **Kubernetes**: Cluster orchestration (via kops and kubectl)
- **Helm**: Kubernetes package manager
- **ArgoCD**: GitOps-based continuous delivery
- **Prometheus & Grafana**: Monitoring and visualization

### Jenkins Plugins
- Pipeline Stage View  
- Eclipse Temurin Installer  
- SonarQube Scanner  
- Docker Pipeline  
- NodeJS  

## 🔄 Pipeline Workflow
The Jenkins pipeline is configured directly in the Jenkins UI and includes the following stages:
1. **Clean Workspace** – Reset environment for fresh build  
2. **Pull Code** – Fetch source code from GitHub  
3. **Code Quality Analysis** – Run SonarQube scanner  
4. **Build Stage** – Execute `npm install`  
5. **Docker Build** – Create Docker image from Dockerfile  
6. **Security Scan** – Scan image with Trivy  
7. **Push Image** – Upload to DockerHub  
8. **Deployment** – ArgoCD pulls Kubernetes manifests and deploys to cluster  
9. **Monitoring** – Prometheus collects metrics, Grafana visualizes logs  

## 📂 Project Structure
```
bus-booking_V1/
└── manifests/
    ├── deployment.yaml
    └── service.yaml
```

## 🤖 AI-Generated Source Code
The application code used in this project was generated using AI tools.  
This enabled rapid prototyping and seamless integration into the CI/CD pipeline.

## 🔐 Security Integration
Security is embedded into the pipeline:
- **Trivy** scans Docker images for vulnerabilities before deployment  
- Ensures only secure containers are pushed to DockerHub  
- Promotes DevSecOps by integrating security checks into CI/CD lifecycle  

## 📊 Architecture Diagram
<img width="1600" height="900" alt="Untitled Diagram drawio" src="https://github.com/user-attachments/assets/4cfffe01-db14-4881-8dca-72dba4e6fda4" />

## 🚀 Deployment Flow
- Jenkins triggers pipeline on code commit  
- Docker image is built and scanned, then pushed to DockerHub  
- ArgoCD syncs Kubernetes manifests and deploys the application  
- Prometheus scrapes metrics from the cluster  
- Grafana visualizes logs and performance dashboards  

## 📈 Monitoring Stack
- **Prometheus**: Collects metrics from Kubernetes nodes and pods  
- **Grafana**: Displays dashboards for application health and performance  

## 🤝 Contributing
Feel free to fork this repo, raise issues, or submit pull requests to improve the pipeline or add new features.

## 📜 License
This project is licensed under the MIT License.
