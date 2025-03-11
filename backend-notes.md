# .NET Backend Implementation Notes

## Technology Stack

- ASP.NET Core Web API
- Entity Framework Core for data access
- SQL Server or Azure SQL Database for storage
- Azure App Service for hosting

## Project Structure

```
LunchPortal.API/
├── Controllers/
│   ├── EventsController.cs
│   ├── RegistrationsController.cs
│   └── UsersController.cs
├── Models/
│   ├── LunchEvent.cs
│   ├── Registration.cs
│   └── User.cs
├── Data/
│   ├── ApplicationDbContext.cs
│   └── Repositories/
│       ├── EventRepository.cs
│       ├── RegistrationRepository.cs
│       └── UserRepository.cs
├── Services/
│   ├── EventService.cs
│   ├── RegistrationService.cs
│   └── UserService.cs
└── Program.cs
```

## API Endpoints

### Events

- `GET /api/events` - Get all lunch events
- `GET /api/events/{id}` - Get a specific event
- `POST /api/events` - Create a new event (admin only)
- `PUT /api/events/{id}` - Update an event (admin only)
- `DELETE /api/events/{id}` - Delete an event (admin only)

### Registrations

- `POST /api/registrations` - Register for an event
- `GET /api/registrations/{id}` - Get a specific registration
- `DELETE /api/registrations/{id}` - Cancel a registration

### Users

- `GET /api/users/{id}/registrations` - Get all registrations for a user

## Database Schema

### LunchEvents

```sql
CREATE TABLE LunchEvents (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Date DATETIME NOT NULL,
    Time NVARCHAR(20) NOT NULL,
    Location NVARCHAR(100) NOT NULL,
    Menu NVARCHAR(MAX),
    Description NVARCHAR(MAX),
    Capacity INT NOT NULL,
    CreatedAt DATETIME NOT NULL,
    UpdatedAt DATETIME NOT NULL
);
```

### Users

```sql
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Department NVARCHAR(100),
    IsAdmin BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME NOT NULL,
    UpdatedAt DATETIME NOT NULL
);
```

### Registrations

```sql
CREATE TABLE Registrations (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    EventId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    DietaryRestrictions NVARCHAR(MAX),
    RegisteredAt DATETIME NOT NULL,
    FOREIGN KEY (EventId) REFERENCES LunchEvents(Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);
```

## Authentication

Implement JWT-based authentication with the following features:

- User login/registration
- Role-based authorization (Admin vs Regular User)
- Token refresh mechanism

## Deployment

1. Create an Azure App Service
2. Set up CI/CD pipeline with GitHub Actions
3. Configure environment variables for database connection strings and other secrets
4. Set up Azure SQL Database
5. Deploy the API

## Integration with Frontend

1. Configure CORS to allow requests from the React frontend
2. Create environment variables in the React app for the API base URL
3. Implement API client in the React app to communicate with the .NET backend
