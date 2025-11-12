# Contributing to LMS Frontend

Thank you for your interest in contributing to this LMS Frontend project! This document provides guidelines for contributing to this personal fork.

## Getting Started

1. Fork the repository to your own GitHub account
2. Clone your fork locally
3. Create a new branch for your changes
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Setup

### Prerequisites
- Node.js v18.x or higher
- npm v9.x or higher

### Installation
```bash
# Clone your fork
git clone https://github.com/your-username/LMS-frontend.git
cd LMS-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Code Style

This project uses:
- **ESLint** for code linting
- **TypeScript** for type safety
- **React** best practices and hooks

### Running Linter
```bash
npm run lint
```

Please ensure your code passes linting before submitting a PR.

## Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code patterns
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run build  # Ensure it builds successfully
   npm run lint   # Ensure code passes linting
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Explain why the change is needed

## Pull Request Guidelines

- **Title**: Use a clear, descriptive title
- **Description**: Explain what changes you made and why
- **Testing**: Describe how you tested your changes
- **Screenshots**: Include screenshots for UI changes
- **Breaking Changes**: Clearly mark any breaking changes

## Types of Contributions

### Bug Fixes
- Describe the bug and how to reproduce it
- Explain your fix
- Include test cases if applicable

### New Features
- Discuss the feature in an issue first
- Ensure it aligns with project goals
- Include documentation updates

### Documentation
- Fix typos and errors
- Improve clarity
- Add missing information
- Update outdated content

### Code Refactoring
- Explain the benefits of the refactoring
- Ensure no functionality is broken
- Include performance improvements if applicable

## Code of Conduct

### Be Respectful
- Be kind and courteous to others
- Accept constructive criticism gracefully
- Focus on what's best for the project

### Be Collaborative
- Help others when you can
- Share knowledge and resources
- Work together to solve problems

## Questions?

If you have questions about contributing:
- Open an issue with the "question" label
- Be specific about what you need help with
- Provide context and examples

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## Attribution

This is a personal fork of a collaborative school project. The original project was developed by Team Electric and can be found at [Team-Electric-LMS/LMS-frontend](https://github.com/Team-Electric-LMS/LMS-frontend).

---

Thank you for contributing to this project! 🎉
