# URI Campus Facilities Management Prototype - URIFY

Welcome to the URI Campus Facilities Management Prototype repository!

This prototype website is designed to facilitate the management of campus facilities at URI (Integrated Regional University of Great Uruguay and Missions). Users can submit service requests for issues in specific buildings and locations across the campus. The system also includes user profiles for personalized interaction.

## Getting Started

To get started with this project locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- Node.js (version 12.x or higher)
- npm (Node Package Manager)
- Visual Studio Code Community (or any preferred code editor)
- PostgreSQL
- .NET SDK (Software Development Kit)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://https://github.com/RafGonzatto/Urify.git
2. Navigate into the front-end project directory:

   ```bash
   cd Urify\urify.client
3. Install the node dependencies:

   ```bash
   npm install
4. Restore NuGet packages:
- In Visual Studio, right-click on the solution or the project that contains your dependencies.
- Select "Restore NuGet Packages" to download and install all the necessary packages specified in your project file (*.csproj).
5. Navigate into the back-end project directory:

   ```bash
   cd Urify\Urify.Server
6. Navigate to the Urify\Urify.Server\appsettings.json file and change the connection string to your PostgreSQL connection:
- Change the connection string to your's postgres connection

    ```bash
    "ConnectionStrings": {
  "ApplicationDbContextConnection": "Host=localhost:PORT;Database=urify;Username=USERNAME;Password=PASSWORD"
  }
7. In the Package Manager Console (PMC), execute the following commands to apply migrations and update the database:

   ```bash
   Update-Database
### Running the Project

Build and run in Visual Studio Community, this will start the backend server and the frontend client.

### Usage

- Access the application in your browser at http://localhost:5173.
- Acess the backend swagger documentation at https://localhost:7249/swagger/index.html