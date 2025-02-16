# React Developer Technical Exercise

## Overview

This project is a React-based application built to demonstrate key technical competencies, including authentication, API integration, data enrichment, and dynamic routing.

## Technologies Used

- **React** (React & React DOM)
- **React Router** (for navigation)
- **Mantine UI** (for UI components)
- **React Query** (for API data fetching and caching)
- **Zustand** (for state management)

## Features Implemented

### 1. Authentication Mechanism

- Users can log in using the default credentials.
- Auth state is persisted across sessions using client-side storage.
- Public and private page access is managed accordingly.

#### Default Login Credentials

- **Username**: Ben
- **Password**: Script@123

### 2. Resource List Page

- Fetches and displays a list of resources from a public API.
- Implements sorting, filtering, and searching capabilities.
- Data is displayed in a tabular format using Mantine components.

### 3. Resource Detail Page

- Displays detailed information for a selected resource.
- Utilizes multiple Mantine components for a visually structured UI.

### 4. Data Enrichment

- The detail page fetches additional related data to enrich the resource information.
- Uses multiple API calls to enhance user experience.

### 5. Deep Linking

- Routes/pages accept path or query parameters.
- Enables streamlined access to specific resources.

## Setup Instructions

### Installation

1. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application

To start the development server:

```sh
npm run dev
```

## License

This project is open-source. Feel free to modify and enhance it.

## Contact

For any queries or issues, feel free to reach out.

---

Happy coding! 🚀
