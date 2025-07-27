# Insider Case Study - Horse Racing Game

A Vue 3 horse racing simulation game built with Vite, TypeScript, and Tailwind CSS.

## Game Features

- **Real-time Horse Racing Simulation** - Watch horses race in real-time
- **Race Controls** - Start, pause, and reset races
- **Multiple Race Rounds** - Progress through different race distances
- **Interactive Betting System** - Place bets on your favorite horses
- **Live Position Tracking** - See horse positions update in real-time

## Race Status Types

- **waiting** - Race is ready to start
- **running** - Race is currently in progress (horses are moving)
- **paused** - Race is temporarily paused
- **finished** - Race has completed

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Docker Support

This project includes Docker support for containerized deployment with multi-stage builds and optimized production configuration.

### Docker Features

- **Multi-stage build** - Separate build and production stages for optimized image size
- **Nginx serving** - Production-ready web server configuration
- **Alpine Linux** - Lightweight base images for security and performance
- **Gzip compression** - Optimized asset delivery
- **SPA routing** - Configured for Vue Router client-side routing

### Quick Start with Docker

```bash
# Using Docker directly
docker build -t horse-racing-game .
docker run -p 8080:80 horse-racing-game

# Using Docker Compose (recommended)
docker-compose up --build
```

The application will be available at `http://localhost:8080`

### Docker Commands

#### Using Docker Directly

```bash
# Build the Docker image
docker build -t horse-racing-game .

# Run the container
docker run -p 8080:80 horse-racing-game

# Run in detached mode
docker run -d -p 8080:80 --name horse-racing horse-racing-game

# Stop the container
docker stop horse-racing

# Remove the container
docker rm horse-racing

# Remove the image
docker rmi horse-racing-game
```

#### Using Docker Compose

```bash
# Start production container
docker-compose up

# Start production container in background
docker-compose up -d

# Start development container with hot reload
docker-compose --profile dev up

# Build and start
docker-compose up --build

# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs -f
```

### Development with Docker

```bash
# Start development server with hot reload
docker-compose --profile dev up

# Or build development image directly
docker build -f Dockerfile.dev -t horse-racing-dev .
docker run -p 5173:5173 -v $(pwd):/app horse-racing-dev
```

Development server will be available at `http://localhost:5173`

### Using Makefile (Optional)

For convenience, you can use the provided Makefile:

```bash
# View all available commands
make help

# Build and run production
make build
make run

# Start development
make dev

# Stop containers
make stop

# Clean up
make clean

# View logs
make logs

# Run tests in container
make test
```

### Production Deployment

```bash
# Build optimized production image
docker build -t horse-racing-game:latest .

# Run with custom port
docker run -p 3000:80 horse-racing-game:latest

# Run with environment variables (if needed)
docker run -p 8080:80 -e NODE_ENV=production horse-racing-game:latest
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

```bash
npm install
```

## Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run preview      # Preview production build
```

### Testing

```bash
npm run test         # Run tests in watch mode
npm run test:ui      # Run tests with UI interface
npm run test:run     # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage        # Run tests with coverage report
npm run test:ci             # Run tests for CI with verbose output and coverage
npm run test:all           # Run all tests, auto-fix code issues, and type-check
```

### End-to-End Testing

```bash
npm run test:e2e            # Run E2E tests
npm run test:e2e:ui         # Run E2E tests with UI
npm run test:e2e:headed     # Run E2E tests in headed mode
npm run test:e2e:debug      # Debug E2E tests
npm run test:e2e:report     # Show E2E test report
npm run test:e2e:install    # Install Playwright browsers
npm run test:e2e:codegen    # Generate E2E test code
npm run test:all-with-e2e   # Run all tests including E2E and quality checks
```

### Build

```bash
npm run build        # Build for production
```

### Code Quality

```bash
npm run lint         # Run ESLint with zero warnings policy
npm run lint:fix     # Auto-fix ESLint issues
npm run lint:report  # Generate HTML lint report
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
npm run code-quality # Run all quality checks (lint + format + type-check)
npm run fix-all      # Auto-fix all code quality issues (lint + format)
```

## Development Workflow

### Local Development

1. **Start development server:**

   ```bash
   npm run dev
   ```

2. **Run tests during development:**

   ```bash
   npm run test:watch
   ```

### Docker Development

1. **Start with Docker Compose:**

   ```bash
   docker-compose --profile dev up
   ```

2. **Or start development server manually:**

   ```bash
   docker build -f Dockerfile.dev -t horse-racing-dev .
   docker run -p 5173:5173 -v $(pwd):/app horse-racing-dev
   ```

### Quality Assurance

3. **Before committing, run quality checks:**

   ```bash
   npm run test:all
   ```

4. **Run all tests including E2E:**

   ```bash
   npm run test:all-with-e2e
   ```

### Production Build

5. **Build for production:**

   ```bash
   npm run build
   ```

6. **Docker deployment:**
   ```bash
   docker-compose up --build
   # or
   docker build -t horse-racing-game .
   docker run -p 8080:80 horse-racing-game
   ```

## Testing Strategy

### Unit Testing

- **Framework:** Vitest with JSDOM environment
- **Coverage:** V8 coverage reports
- **Components:** Vue Test Utils for component testing

### End-to-End Testing

- **Framework:** Playwright
- **Browsers:** Chromium, Firefox, WebKit support
- **Features:** Visual testing, network interception, debugging tools

### Testing Commands Overview

- Use `npm run test:e2e` for full application flow testing
- Use `npm run test:all` for unit tests with automatic code formatting and linting fixes
- Use `npm run test:all-with-e2e` for complete test suite including E2E tests

## Project Structure

```
src/
├── components/     # Vue components
│   ├── game/      # Game-specific components
│   ├── ui/        # Reusable UI components
│   └── __tests__/ # Component tests
├── views/         # Page components
├── router/        # Vue Router configuration
├── stores/        # Pinia stores
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── styles/        # Global styles
└── assets/        # Static assets
tests/
├── e2e/           # End-to-end tests
Dockerfile         # Production Docker configuration
Dockerfile.dev     # Development Docker configuration
docker-compose.yml # Docker Compose configuration
Makefile          # Docker convenience commands
nginx.conf         # Nginx production server config
.dockerignore      # Docker ignore patterns
```

## Code Quality Standards

- **ESLint:** Zero warnings policy enforced
- **Prettier:** Consistent code formatting
- **TypeScript:** Strict type checking
- **Testing:** Comprehensive unit and E2E test coverage
- **Automated Fixes:** `test:all` automatically fixes formatting and linting issues
- All quality checks must pass before deployment
