# 📝 n8n Attestation Manager

A web dashboard for **ESPRIT staff** to manage, view, and print student attestation requests.  
Built with **Angular** for the frontend, **Spring Boot** for the backend, and **SQL** for database management, integrated with **n8n automation workflows** and an **AI agent** for intelligent email handling and processing.

---

## ✅ Features

- **View all attestation requests** in a clean and organized list  
- **Print attestation documents** directly from the dashboard  
- **AI-Powered Email Handling**:  
  - AI agent receives student emails  
  - Verifies student information against the database  
  - Creates the attestation record automatically in the database  
- **Two Role-Based Panels**:  
  - **Admin Panel** – Full control of the application (user management, monitoring)  
  - **Staff Panel** – For staff to handle attestation requests efficiently  
- **Unique Reference Code for Each Attestation** to easily identify and speed up processing for both students and staff  
- **Easy-to-use interface** designed for university staff  
- **Automated workflows with n8n** for seamless email processing and database updates  

---

## ⚙️ Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/yourusername/n8n-attestation-manager.git](https://github.com/hamdounisabri1/n8n-attestation-manager.git)
   cd n8n-attestation-manager

2. **Install dependencies:**

**Frontend:**
  ```bash
    cd frontend
    npm install
   ```
**Backend:**
   ```bash
   ./mvnw clean install
   ```
3. **Configure your SQL database and update connection settings in application.properties**

4. **Run the servers**


 **Frontend:**
  ```bash
     npm start
   ```
**Backend:**
   ```bash
   ./mvnw spring-boot:run
   ```

---
## About

This project helps ESPRIT university staff efficiently manage student attestation requests through a modern web dashboard combined with AI-powered automation.
The integration of n8n workflows and an AI agent ensures fast, accurate email processing, database updates, and attestation generation—saving time for both staff and students.
---

