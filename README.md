# Electric LMS

Electric LMS is a role-based Learning Management System built as a two-repo project: a React single-page application ([`LMS-frontend`](https://github.com/Team-Electric-LMS/LMS-frontend)) backed by an ASP.NET Core Web API ([`LMS-Backend`](https://github.com/Team-Electric-LMS/LMS-Backend)). It lets a school or training provider organize **courses** into **modules** and **activities**, attach **documents** to any of those levels, and gives students and teachers different views and permissions over that content.

## What it does

- **Courses, modules, and activities.** A course is made up of modules, and each module is made up of activities (assignments, lessons, deadlines, etc.), each with a type, title, description, and start/end dates.
- **Document management.** Files can be uploaded and linked to a course, a module, or an activity, so course material lives alongside the content it belongs to.
- **Role-based access.** Users are either **teachers** or **students**. Teachers get an admin area to create and edit courses, modules, and activities and to manage enrollment; students see a read-only dashboard and course view scoped to what they're enrolled in.
- **Authentication.** Users log in with a username/password; the API issues a JWT access token plus a refresh token, and the frontend decodes the token's claims (user id, username, role) to drive routing and permissions.
- **Dashboards.** After login, students and teachers land on different dashboard views (`StudentDashboardSection` / `TeacherDashboardSection`) built from the same shell.

## How it works

### Architecture

```
LMS-frontend (React SPA)  <---- REST/JSON + JWT ---->  LMS-Backend (ASP.NET Core Web API)
                                                              |
                                                        Entity Framework Core
                                                              |
                                                          SQL Server
```

**Frontend (`LMS-frontend`)**
- A Vite + React + TypeScript SPA, organized by feature (`auth`, `admin`, `dashboard`, `activities`, `shared`, etc.) rather than by file type.
- `react-router` (data router / loaders) drives navigation. A `requireAuthLoader` guards the whole app shell, and a `RequireRole` wrapper further restricts routes like `/admin` to teachers.
- `AuthProvider` (React Context) owns login/logout state. On login it calls the API, stores the returned JWT/refresh tokens in `localStorage` (via `usehooks-ts`'s `useLocalStorage`), and decodes the access token with `jwt-decode` to pull out the user's id, role, and username from its claims.
- Feature modules talk to the API through small `fetch`-based API clients (e.g. `activityApi.ts`, course/admin `api` folders) that attach the JWT as a Bearer token and normalize API responses into frontend-friendly DTOs.
- CSS Modules are used for component-scoped styling.

**Backend (`LMS-Backend`)**
- An ASP.NET Core 9 Web API following a layered/"clean architecture" structure, split across separate class libraries:
  - `Domain.Models` – EF Core entities (`Course`, `Module`, `Activity`, `Document`, `ApplicationUser`, etc.) and their relationships.
  - `Domain.Contracts` – repository interfaces.
  - `LMS.Infractructure` – EF Core `DbContext`, migrations, and repository implementations (SQL Server).
  - `Service.Contracts` / `LMS.Services` – business logic services (auth, courses, modules, activities, students, users, documents), coordinated through a `ServiceManager` facade.
  - `LMS.Shared` – DTOs and query parameters shared between layers.
  - `LMS.Presentation` – MVC controllers (`AuthController`, `CoursesController`, `ModulesController`, `ActivityController`, `DocumentController`, `StudentController`, `TeachersController`, `UserController`, `TokenController`, etc.) that expose the REST endpoints.
  - `LMS.API` – the composition root: `Program.cs` wires up configuration, DI, and the HTTP pipeline.
- **Data model.** A `Course` has many `Modules`, `Documents`, and enrolled `Students`/`Teachers`; a `Module` belongs to a `Course` and has many `Activities` and `Documents`; an `Activity` belongs to a `Module` and has an `ActivityType`; `Document`s can optionally attach to a course, module, or activity and record who uploaded them.
- **Auth.** ASP.NET Core Identity (`ApplicationUser : IdentityUser`) manages user accounts; JWT bearer authentication validates issuer, audience, lifetime, and signing key on every request, and a refresh-token flow (`TokenController`, `RefreshToken`/`RefreshTokenExpireTime` on the user) lets the frontend silently renew access tokens.
- **Mapping & docs.** AutoMapper maps between entities and DTOs; Swagger/Swashbuckle exposes interactive API docs in development.
- **Seeding.** A hosted service (`DataSeedHostingService`) seeds demo/development data on startup, with fake data generated via Bogus.
- **Persistence.** Entity Framework Core against SQL Server, with a full migration history in `LMS.Infractructure/Migrations`.

### Typical request flow

1. The React app posts credentials to `POST /auth/login`.
2. The API validates the user via ASP.NET Identity and returns a signed JWT access token plus a refresh token.
3. The frontend stores both tokens, decodes the access token to learn the user's id/role/username, and uses that role to decide what routes and UI to render.
4. Subsequent requests (e.g. fetching a module's activities, creating a course) are sent with an `Authorization: Bearer <token>` header; the API validates the token and, where relevant, checks the caller's role before executing the request.
5. When the access token nears expiry, the frontend calls `POST /token/refresh` with the stored tokens to get a new pair without forcing a re-login.

## Technologies

**Frontend**
- React 19 + TypeScript
- Vite 7 (dev server/build tool)
- React Router 7 (data routers, loaders)
- `jwt-decode` for reading JWT claims client-side
- `usehooks-ts` (`useLocalStorage`) for persisting auth tokens
- CSS Modules
- ESLint + `typescript-eslint`

**Backend**
- ASP.NET Core 9 Web API (C#)
- Entity Framework Core 9 + SQL Server
- ASP.NET Core Identity for user management
- JWT Bearer authentication (`Microsoft.AspNetCore.Authentication.JwtBearer`)
- AutoMapper for entity ↔ DTO mapping
- Swashbuckle/Swagger for API documentation
- Bogus for generating seed/test data
- Layered ("clean architecture") solution: Domain, Infrastructure, Services, Presentation, API projects

## Getting started

### Backend
```bash
cd LMS-Backend
# Update the ConnectionStrings:ApplicationDbContext and JwtSettings in appsettings.json / user-secrets as needed
dotnet ef database update --project LMS.Infractructure --startup-project LMS.API
dotnet run --project LMS.API
```
The API serves Swagger UI at `/swagger` in development.

### Frontend
```bash
cd LMS-frontend
npm install
npm run dev
```
Configure the frontend's API base URL (see `src/features/shared/constants`) to point at the running backend.

## Repository structure at a glance

```
LMS-frontend/
  src/
    features/
      auth/          # login, JWT handling, auth context
      admin/          # teacher-only course/module/activity management
      dashboard/      # role-specific dashboards
      activities/      # activity fetching/formatting
      shared/         # shared components, hooks, constants, utilities
    router/          # route definitions & guards

LMS-Backend/
  Domain.Models/        # EF Core entities
  Domain.Contracts/      # repository interfaces
  LMS.Infractructure/    # DbContext, migrations, repositories
  Service.Contracts/     # service interfaces
  LMS.Services/          # business logic
  LMS.Shared/            # DTOs & query parameters
  LMS.Presentation/      # API controllers
  LMS.API/              # startup/composition root
```
