# Project Estimate Management (Frontend)

## Description
This is the frontend for the Project Estimate Management tool, designed to help companies manage their projects, resources, and collaboration efficiently. It provides a modern, responsive interface built with React and Next.js to deliver a smooth user experience. The application leverages powerful form handling, state management, and dynamic components for handling various aspects of project management.

## Features
- **Responsive UI**: Built using Material UI (MUI) components for a modern and intuitive interface.
- **Project Management**: Users can create, update, and monitor projects, resources, and deadlines.
- **Role-based Access Control**: Supports different user roles such as Admin, Project Manager, and Employee to manage access.
- **Real-time Collaboration**: Users can comment and interact with projects in real-time.
- **Authentication**: Integrated with NextAuth.js to provide secure authentication and session management.
- **Data Grid Management**: View and manage large sets of data using MUI's DataGrid component.
- **Form Handling**: Efficiently manage forms using React Hook Form and validation through Zod.

## Installation

### Prerequisites
- Node.js (v14.x or higher)
- A backend server for API interaction (see backend project)

### Installation Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/project-estimate-management-frontend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd project-estimate-management-frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Configure environment variables:
    - Create a `.env` file in the root directory and add necessary environment variables like API URL and authentication keys.

5. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

### Running the Application
1. After starting the server, open your browser and navigate to `http://localhost:8081`.
2. Log in using the credentials provided by the backend or create a new account if available.
3. Access the dashboard to manage projects, users, and resources efficiently.

### User Authentication
- Users authenticate via NextAuth, with role-based access ensuring only authorized users can view and edit specific data.

### Project Management
- Projects can be created, updated, and assigned resources directly from the dashboard.
- Progress tracking and task assignments are available with real-time updates.

## API Documentation

The frontend communicates with the backend via RESTful API calls. Please refer to the backend documentation for details about API endpoints and expected data formats.

## Contributing
We welcome contributions to the frontend project. To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and ensure the code follows project guidelines.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push your branch to GitHub (`git push origin feature/your-feature-name`).
6. Create a pull request for review.

## Connect to BE github
Due to some problem, I had to separate the front-end file which you can found in this link (https://github.com/rogdrigues/project_estimate)