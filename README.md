# LMS Frontend - Personal Fork

A Learning Management System (LMS) frontend application built with React, TypeScript, and Vite. This is a personal fork and improvement of a collaborative school project.

## 📚 About

This project was originally developed as a collaborative school project by Team Electric. This personal fork represents continued development and improvements to create a robust, feature-rich learning management system.

### Original Project
- **Original Repository**: [Team-Electric-LMS/LMS-frontend](https://github.com/Team-Electric-LMS/LMS-frontend)
- **Team**: Team Electric
- **Purpose**: School collaborative project

## 🚀 Features

- **Student Dashboard**: Track courses, modules, and activities
- **Teacher Dashboard**: Manage courses and student progress
- **Admin Panel**: User management, course administration, and archiving
- **Activity Management**: Create and manage learning activities
- **Authentication**: Secure login with JWT tokens
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: CSS (custom)
- **Authentication**: JWT (json web tokens)

## �� Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher (comes with Node.js)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd LMS-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (if needed)
   Create a `.env` file in the root directory with necessary configurations:
   ```env
   # Add your environment variables here
   # VITE_API_URL=http://localhost:3000
   ```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
This will start the development server at `http://localhost:5173` (default Vite port)

### Build for Production
```bash
npm run build
```
This compiles TypeScript and builds the production-ready application in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally before deployment.

### Linting
```bash
npm run lint
```
Run ESLint to check for code quality issues.

## 📁 Project Structure

```
LMS-frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── css/             # Global styles
│   ├── features/        # Feature-based modules
│   │   ├── admin/       # Admin panel components
│   │   ├── auth/        # Authentication
│   │   ├── dashboard/   # Dashboard views
│   │   ├── activities/  # Activity management
│   │   └── shared/      # Shared components
│   ├── router/          # Routing configuration
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── eslint.config.js     # ESLint configuration
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Make sure to configure your backend API endpoint for authentication services.

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests for improvements
- Share ideas for new features

## 📝 Development Notes

### Known Issues
- Some TypeScript compilation warnings exist (legacy code from original project)
- Backend API integration may need configuration based on your environment

### Future Improvements
- [ ] Fix TypeScript compilation warnings
- [ ] Add comprehensive test coverage
- [ ] Implement additional features
- [ ] Enhance UI/UX design
- [ ] Add documentation for all components

## 📜 License

This project is available under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Original Team Electric members for the collaborative foundation
- The React and Vite communities for excellent documentation
- All contributors to the dependencies used in this project

## 📧 Contact

For questions or feedback about this personal fork, please open an issue in this repository.

---

**Note**: This is a personal fork intended for learning and portfolio purposes. The original collaborative project can be found at [Team-Electric-LMS/LMS-frontend](https://github.com/Team-Electric-LMS/LMS-frontend).
