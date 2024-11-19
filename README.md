## Description

The Event-Planner-Platform is a web application designed for managing events. It enables users to create, view, update, and delete events seamlessly. The platform is built with a modern tech stack, focusing on modularity, scalability, and user-friendly interfaces.

The project is divided into two main components:
	1.	Frontend: A React-based user interface for interacting with the platform.
	2.	Backend: A Nest.js API providing the business logic and data management for events.


## Key Features

###	Event Management:
	•	Users can perform CRUD (Create, Read, Update, Delete) operations on events.
	•	Each event includes details like:
	•	Title
	•	Date
	•	Location
	•	Description
	•	Optional user email.

### Dynamic Form Validation:
	•	Forms provide real-time feedback for missing or invalid fields.
	•	Ensures users enter valid data (e.g., valid dates, non-empty fields).

### In-Memory Storage:
	•	Events are stored temporarily during the session (no database integration).
	•	The backend is stateless, storing events in memory for simplicity.

### Seamless API Integration:
	•	A well-defined API allows the frontend to communicate effectively with the backend.
	•	Uses RESTful conventions for clean and predictable endpoints.

## Tech Stack

### Frontend

	•	React.js: A modern JavaScript library for building user interfaces.
	•	CSS: For styling and ensuring a responsive design.
	•	Axios: For making API requests to the backend.
	•	React Hooks: For managing application state.

### Backend

	•	Nest.js: A progressive Node.js framework for building efficient, scalable server-side applications.
	•	TypeScript: Ensures type safety and maintainable code.
	•	Express.js: Underlying HTTP server for handling requests.
	•	class-validator: For input validation in the backend.

## Project Structure

### Frontend
``` bash
src/
├── components/       # Reusable React components
│   ├── EventForm.tsx     # Component for creating/updating events
│   ├── EventList.tsx     # Component for displaying events
│   ├── EventDetails.tsx  # Component for viewing event details
├── services/         # API interaction logic
│   └── eventService.ts   # Functions for fetching and modifying events
├── tests/            # Unit tests for components
│   ├── EventForm.test.tsx
│   ├── EventList.test.tsx
├── types/            # TypeScript type definitions
│   └── Event.ts          # Event object type
├── App.js            # Main application component
└── index.js          # Application entry point
```

### Backend
``` bash
src/
├── user/                   # User module
│   ├── dto/                # Data Transfer Objects
│   │   ├── create-user.dto.ts
│   │   ├── update-user.dto.ts
│   ├── entities/           # User model
│   │   └── user.entity.ts
│   ├── user.controller.ts  # User API endpoints
│   ├── user.module.ts      # User module definition
│   ├── user.service.ts     # User business logic
├── event/                  # Event module
│   ├── dto/                # Data Transfer Objects
│   │   ├── create-event.dto.ts
│   │   ├── update-event.dto.ts
│   ├── entities/           # Event model
│   │   └── event.entity.ts
│   ├── event.controller.ts # Event API endpoints
│   ├── event.controller.spec.ts # Event API endpoints test
│   ├── event.module.ts     # Event module definition
│   ├── event.service.ts    # Event business logic
│   ├── event.service.spec.ts    # Event business logic test
├── app.module.ts           # Root module
```

##  Workflow

### Creating an Event:
	•	The user fills out the event form (title, date, location, description, optional email).
	•	The frontend validates the form and sends a POST request to the backend.
	•	The backend processes the request, validates the input, and stores the event in memory.

### Viewing Events:
	•	The frontend fetches all events from the backend using a GET request.
	•	Events are displayed in a user-friendly list format.

### Updating an Event:
	•	The user selects an event to edit, updates the fields, and submits the form.
	•	The frontend sends a PUT request to the backend to update the event.

### Deleting an Event:
	•	The user selects an event to delete.
	•	The frontend sends a DELETE request to the backend.


## Use Cases

	•	Personal Event Management:
	•	A single user can create and manage their events within a session.
	•	Temporary Data Storage:
	•	Ideal for demonstrations or prototypes without the need for persistent storage.

## Future Enhancements

	1.	Database Integration:
	    •	Use PostgreSQL or MongoDB for persistent storage.
	2.	User Authentication:
	    •	Enable multiple users with login functionality.
	3.	Enhanced Validation:
	    •	Add more robust validation for fields like unique titles or date constraints.
	4.	UI Enhancements:
	    •	Add visual improvements with Material-UI or Tailwind CSS.
	5.	Documentation:
	    •	Add Swagger for backend API documentation.


## Setup Instructions
Clone the Repository
``` bash
git clone https://github.com/aldebiyat/Event-Planner-Platform.git
```

### Backend

1. Access Repository
``` bash
cd Event-Planner-Platform/backend
```
2. Install Dependencies
``` bash
npm install
```
3. Configure Environment Variables by creating a .env file
``` bash
REACT_APP_URL=http://localhost:3000
```
4. Start the Development Server
``` bash
npm run start:dev
```
5. Run tests
``` bash
npm run test
```
The API will be available at http://localhost:4000.


### Frontend

#### 1. Access Repository
``` bash
cd Event-Planner-Platform/frontend
```
2. Install Dependencies
``` bash
npm install
```
3. Configure Environment Variables by creating a .env file
``` bash
REACT_APP_API_URL=http://localhost:4000
```
4. Start the Development Server
``` bash
npm start
```
5. Run tests
``` bash
	npm test
```

Visit http://localhost:3000 to access the application.