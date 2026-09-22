# API Documentation

## Auth
- **POST `/api/auth/login`**: Authenticates user and returns JWT access token + sets HTTP-only refresh cookie.
- **POST `/api/auth/refresh`**: Exchanges a valid HTTP-only refresh cookie for a new access token.
- **POST `/api/auth/logout`**: Clears the refresh cookie.
- **GET `/api/auth/me`**: Returns the current authenticated admin user profile.

## Projects
- **GET `/api/projects`**: Returns list of all portfolio projects (Public).
- **GET `/api/projects/{slug}`**: Returns details of a specific project (Public).
- **POST `/api/projects`**: Creates a new project (Protected).
- **PATCH `/api/projects/{id}`**: Updates an existing project (Protected).
- **DELETE `/api/projects/{id}`**: Soft-deletes a project (Protected).

## Contact
- **POST `/api/contact`**: Submits a new contact inquiry (Public, Rate Limited).
- **GET `/api/contact`**: Lists all inquiries (Protected).
- **PATCH `/api/contact/{id}/status`**: Updates the status of an inquiry (Protected).

## Analytics
- **POST `/api/analytics/visit`**: Registers a unique page visit (Public).
- **GET `/api/analytics/visitors/count`**: Returns the total visit count (Protected).

## Site Settings
- **GET `/api/site-settings/`**: Retrieves global site settings (Public).
- **PATCH `/api/site-settings/`**: Updates global site settings (Protected).
