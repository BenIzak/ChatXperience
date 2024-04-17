---

# ChatXperience

ChatXperience offers a seamless avenue for real-time interactions, crafted with the prowess of modern web technologies. This platform is designed to provide an immersive real-time chat experience, facilitated by a robust backend and a dynamic frontend.

## 🛠️ Technology Stack
- **React with TypeScript and Vite:** Powers the interactive user interface, ensuring rapid development and efficient bundling.
- **Go with Gorilla WebSocket:** Manages the server-side logic and WebSocket connections, enabling real-time communication.
- **Symfony:** Supports additional backend logic, ensuring a robust infrastructure.
- **Docker:** Ensures consistent environments and facilitates deployment with containerization.
- **Mercure:** Utilized for managing real-time updates efficiently.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure your development environment includes the following tools installed:

- **Node.js**: Required for managing the project's JavaScript dependencies. [Download Node.js](https://nodejs.org/)
- **Docker**: Used for creating, deploying, and running applications using containers. Ensure Docker Desktop is installed if you are using Windows or macOS. [Get Docker](https://docs.docker.com/get-docker/)
- **Go**: Necessary for backend development using Gorilla WebSocket. [Install Go](https://golang.org/dl/)

These tools are essential to set up, develop, and run the application locally. Make sure each tool is properly installed and configured on your system to avoid any issues during the setup or development process.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BenIzak/ChatXperience.git
   cd ChatXperience
   ```

2. **Build and run Docker containers:**
   ```bash
   cd project/backend/
   docker-compose up --build -d
   ```

3. **Access the application:**
   ```bash
   cd ../client/
   npm install
   npm run dev
   ```
   - Navigate to `http://localhost:5173` in your web browser to view the application.


## 🙌 Contributing

Please note that this is a private project. Contributions, issues, and feature requests are not currently accepted.

## 📃 License

ChatXperience is privately developed and maintained. The use of this project is subject to the permissions granted explicitly by the owner.

---
