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
npm run test:components     # Run component tests only
npm run test:components:watch # Watch component tests
npm run test:ui-components  # Run UI component tests
npm run test:stores         # Run store tests only
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

1. **Start development server:**

   ```bash
   npm run dev
   ```

2. **Run tests during development:**

   ```bash
   npm run test:watch
   ```

3. **Before committing, run quality checks:**

   ```bash
   npm run test:all
   ```

4. **Run all tests including E2E:**

   ```bash
   npm run test:all-with-e2e
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## Testing Strategy

### Unit Testing

- **Framework:** Vitest with JSDOM environment
- **Coverage:** V8 coverage reports
- **Components:** Vue Test Utils for component testing
- **Stores:** Pinia store testing

### End-to-End Testing

- **Framework:** Playwright
- **Browsers:** Chromium, Firefox, WebKit support
- **Features:** Visual testing, network interception, debugging tools

### Testing Commands Overview

- Use `npm run test:components` for focused component testing
- Use `npm run test:stores` for store logic testing
- Use `npm run test:e2e` for full application flow testing
- Use `npm run test:all` for unit tests with automatic code formatting and linting fixes
- Use `npm run test:all-with-e2e` for complete test suite including E2E tests

## Project Structure

```
src/
├── components/     # Vue components
│   └── __tests__/  # Component tests
├── views/         # Page components
├── router/        # Vue Router configuration
├── stores/        # Pinia stores
└── assets/        # Static assets
tests/
├── e2e/           # End-to-end tests
```

## Code Quality Standards

- **ESLint:** Zero warnings policy enforced
- **Prettier:** Consistent code formatting
- **TypeScript:** Strict type checking
- **Testing:** Comprehensive unit and E2E test coverage
- **Automated Fixes:** `test:all` automatically fixes formatting and linting issues
- All quality checks must pass before deployment
