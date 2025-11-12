# Setup Guide for LMS Frontend

This guide will help you set up the LMS Frontend project on your local machine and prepare it for deployment.

## Table of Contents
- [Initial Setup](#initial-setup)
- [Cloning to a New Repository](#cloning-to-a-new-repository)
- [Environment Configuration](#environment-configuration)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Initial Setup

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js**: v18.x or higher ([Download](https://nodejs.org/))
- **npm**: v9.x or higher (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))

### Verify Installation
```bash
node --version  # Should be v18.x or higher
npm --version   # Should be v9.x or higher
git --version   # Any recent version
```

## Cloning to a New Repository

If you want to create your own private repository from this project:

### Step 1: Create a New Repository on GitHub
1. Go to [GitHub](https://github.com)
2. Click the "+" icon and select "New repository"
3. Name your repository (e.g., "my-lms-frontend")
4. Choose "Private" for a private repository
5. Do NOT initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 2: Clone This Repository
```bash
# Clone the original repository (or your fork)
git clone https://github.com/Team-Electric-LMS/LMS-frontend.git my-lms-frontend
cd my-lms-frontend
```

### Step 3: Update Remote URL
```bash
# Remove the old remote
git remote remove origin

# Add your new repository as the remote
git remote add origin https://github.com/your-username/my-lms-frontend.git

# Verify the remote
git remote -v
```

### Step 4: Update Package.json
Edit `package.json` and update the following fields:
- `name`: Change to your project name
- `author`: Add your name and email
- `repository.url`: Update to your repository URL

### Step 5: Update LICENSE
Edit the `LICENSE` file and replace `[Your Name]` with your actual name.

### Step 6: Update README.md
Update the README.md to reflect your repository URL and personal information.

### Step 7: Push to Your New Repository
```bash
# Push to your new repository
git push -u origin main
```

## Environment Configuration

### Create Environment File
Create a `.env` file in the root directory (it's already in `.gitignore`):

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Optional: Other environment variables
# VITE_SOME_KEY=value
```

### Important Notes
- Never commit `.env` files with sensitive data
- Use `.env.example` to document required variables (without values)
- Different environments (dev, staging, prod) should have different `.env` files

### Create .env.example (Template)
```env
# API Configuration
VITE_API_URL=

# Add other required variables here
```

## Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Development Features
- **Hot Module Replacement (HMR)**: Changes appear instantly
- **TypeScript**: Type checking in real-time
- **ESLint**: Code quality checks

### Common Development Commands
```bash
# Run linter
npm run lint

# Build the project
npm run build

# Preview production build
npm run preview
```

## Building for Production

### Build the Application
```bash
npm run build
```

This will:
1. Run TypeScript compiler (`tsc -b`)
2. Build the Vite project
3. Output to the `dist/` folder

### Test Production Build Locally
```bash
npm run preview
```

This serves the production build locally for testing.

## Deployment

### Deploy to Vercel (Recommended for Vite/React)

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy from CLI**
   ```bash
   vercel
   ```

3. **Or connect via GitHub**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration
   - Deploy automatically

### Deploy to Netlify

1. **Install Netlify CLI** (optional)
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy from CLI**
   ```bash
   netlify deploy --prod
   ```

3. **Or use the web interface**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`

### Deploy to GitHub Pages

1. **Install gh-pages package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/repository-name/',
     // ... other config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

## Troubleshooting

### Common Issues

#### Port Already in Use
If port 5173 is already in use:
```bash
# Kill the process using the port (Linux/Mac)
lsof -ti:5173 | xargs kill -9

# Or specify a different port
npm run dev -- --port 3000
```

#### Node Version Issues
```bash
# Check your Node version
node --version

# Use nvm to switch versions (if installed)
nvm use 18
```

#### TypeScript Errors
```bash
# Clear TypeScript build cache
rm -rf tsconfig.*.tsbuildinfo

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Build Failures
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Clear dist folder
rm -rf dist

# Rebuild
npm run build
```

### Getting Help
- Check the [Issues](https://github.com/your-username/your-repo/issues) page
- Review the [CONTRIBUTING.md](./CONTRIBUTING.md) file
- Open a new issue with detailed information about your problem

## Next Steps

After setup:
1. Configure your backend API endpoints
2. Customize the application for your needs
3. Add your own features and improvements
4. Set up CI/CD pipelines (optional)
5. Configure monitoring and analytics (optional)

---

Happy coding! 🚀
