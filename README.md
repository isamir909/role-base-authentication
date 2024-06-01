# Multi Tenant Role Based Access Control (RBAC) Authentication API

## Table of Contents
1. [Project Planning and Methodology](#project-planning-and-methodology)
    1. [Agile Methodology](#agile-methodology)
    2. [Planning Links](#planning-links)
2. [Features](#features)
3. [Techstack & Libraries Used](#techstack--libraries-used)
4. [Data Structure](#data-structure)
5. [Data Flow](#data-flow)
6. [Video Structure](#video-structure)
7. [Helpful Files](#helpful-files)
8. [Tips](#tips)
9. [Commands to Run the Project](#commands-to-run-the-project)

## Project Planning and Methodology

### Agile Methodology
This project was planned and executed using Agile methodology. Below are the key aspects of my Agile approach:
- **Sprint Planning:** Define the scope and goals for each sprint.

### Planning Links
For detailed planning documents, you can refer to the following links:
- [Sprint Backlog](#) - List of tasks and features planned for each sprint.
- [Product Backlog](#) - Comprehensive list of all desired features and improvements.
- [Roadmap](#) - High-level timeline and milestones for the project.

## Features
* Create an application
* Register a user for an application
* Login
* Create a role
* Assign a role to a user
* Check user permissions with a guard

## Techstack & Libraries Used
* [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
* [Express.js](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [TypeScript](https://www.typescriptlang.org/)

## Data Structure
<img src="./img/diagram.png" alt="Data Structure Diagram" />

## Data Flow
<img src="./img/data-flow.png" alt="Data Flow Diagram" />

## Video Structure
1. Setup the initial application
2. Create a database with Neon
3. Create database schemas
4. Run migrations
5. Register an application
6. Register a user
7. Login
8. Create a role
9. Assign a role to a user
10. Check user permissions with a guard

## Helpful Files
* **CMD** - Commands used
* **api.json** - Thunder Client collection

## Tips
* Infer the applicationId from the JWT where possible.
* Include the applicationId in queries.

## Commands to Run the Project

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo-url.git
    cd your-repo-directory
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add your environment variables. For example:
    ```env
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    ```

4. **Run database migrations:**
    ```bash
    npm run migrate
    ```

5. **Start the development server:**
    ```bash
    npm run dev
    ```

6. **Run the project in production mode:**
    ```bash
    npm start
    ```

Make sure to replace placeholders like `your-repo-url`, `your-repo-directory`, `your_database_url`, and `your_jwt_secret` with actual values specific to your project setup.