# Next.js Jenkins CI/CD Demo

This is a Next.js project configured with Jenkins CI/CD pipeline for automated build, test, and deployment using Docker.

## Features

- 🚀 Next.js 14 with TypeScript
- 🐳 Docker containerization
- 🔄 Jenkins CI/CD pipeline
- 🧪 Jest testing setup
- 📝 ESLint configuration
- 🔧 Automated deployment

## Getting Started

### Prerequisites

- Node.js 18+
- Docker
- Jenkins

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Build

Build the Docker image:
```bash
docker build -t nextjs-app .
```

Run the container:
```bash
docker run -p 3000:3000 nextjs-app
```

## Jenkins Pipeline

The Jenkins pipeline (`Jenkinsfile`) includes the following stages:

1. **Checkout** - Gets the latest code from the repository
2. **Install Dependencies** - Installs npm packages
3. **Lint** - Runs ESLint for code quality
4. **Test** - Runs Jest tests
5. **Build Application** - Builds the Next.js app
6. **Build Docker Image** - Creates Docker image
7. **Push to Registry** - Pushes image to Docker Hub (main branch only)
8. **Deploy** - Deploys the application (main branch only)

### Jenkins Setup

1. Access Jenkins at http://localhost:8080
2. Use the initial admin password: `e86af4aa3551453bafa9105b7aa8906c`
3. Install suggested plugins
4. Create a new Pipeline job
5. Configure it to use this repository
6. Set up Docker Hub credentials in Jenkins

## Environment Variables

Update the following in the Jenkinsfile:
- `DOCKER_HUB_USERNAME`: Your Docker Hub username
- `DOCKER_HUB_CREDENTIALS`: Jenkins credential ID for Docker Hub

## Testing

Run tests locally:
```bash
npm test
```

Run tests in CI mode:
```bash
npm run test:ci
```
