# Quick Start Guide

Get your personal LMS Frontend up and running in minutes!

## For Users Who Want to Clone This to a Private Repository

### Step 1: Create Your Private Repository
1. Go to GitHub and create a new **private** repository
2. Name it (e.g., `my-lms-frontend`)
3. **Do NOT** initialize with README, .gitignore, or license

### Step 2: Clone and Setup
```bash
# Clone this repository
git clone https://github.com/Team-Electric-LMS/LMS-frontend.git my-lms-frontend
cd my-lms-frontend

# Remove old remote and add your new repository
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/my-lms-frontend.git

# Install dependencies
npm install
```

### Step 3: Personalize the Project

**Update package.json:**
```json
{
  "name": "my-lms-frontend",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR-USERNAME/my-lms-frontend.git"
  }
}
```

**Update LICENSE:**
- Replace `[Your Name]` with your actual name

**Update README.md:**
- Replace `<your-repository-url>` with your actual repository URL
- Update contact information

### Step 4: Push to Your Repository
```bash
git push -u origin main
```

### Step 5: Start Developing!
```bash
# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your LMS!

## For Users Who Just Want to Run It Locally

### Quick Setup
```bash
# Clone the repository
git clone https://github.com/Team-Electric-LMS/LMS-frontend.git
cd LMS-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

That's it! Open `http://localhost:5173` in your browser.

## Common Next Steps

### Configure Backend API
Create a `.env` file:
```bash
cp .env.example .env
```

Edit `.env` and set your API URL:
```env
VITE_API_URL=http://your-backend-api-url
```

### Build for Production
```bash
npm run build
```

### Deploy (Quick Options)

**Vercel (Easiest):**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Need More Help?

- **Detailed Setup**: See [SETUP.md](./SETUP.md)
- **Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Full Documentation**: See [README.md](./README.md)

## Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors?**
```bash
rm -rf node_modules/.vite dist
npm install
npm run build
```

---

🎉 **You're all set!** Start building your LMS!
