# Expo News Background App

This project is a simple news application built with **TDD** (Test Driven Development), **DDD** (Domain Driven Design), and **BDD** (Behavior Driven Development) principles, leveraging the new background-task library introduced in **Expo SDK 53**.

## Features

- **Automatic News Updates with Background Task:** Uses Expo's new background-task API to fetch and update news in the background.
- **Domain Driven Design (DDD):** Clean and maintainable architecture with domain, infrastructure, tasks, and UI layers.
- **Test Driven Development (TDD) & Behavior Driven Development (BDD):** Comprehensive unit and behavior tests for all critical functions using Jest and Testing Library.
- **Modern Navigation with Expo Router:** File-based routing for easy screen management.
- **Local Data Storage with AsyncStorage:** News is stored on the device for offline access.

## Folder Structure

```
src/
  domain/          # Domain models and business logic (e.g., News, NewsService)
  infrastructure/  # API and external service integrations (e.g., NewsAPI)
  tasks/           # Background task definitions and management
  utils/           # Utility functions (e.g., storage)
  ui/              # UI components and tests
app/               # Screens and router
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up required environment variables (e.g., `NEWS_API_KEY` in a `.env` file).

3. Start the app:
   ```bash
   npx expo start
   ```

## Background Task Usage

- **Definition and Registration:** The background task is defined and registered in `src/tasks/BackgroundNewsTask.ts`.
- **How It Works:** The task periodically fetches news from the API and saves it to local storage.
- **Register/Unregister Functions:**
  ```ts
  await registerNewsBackgroundTask();
  await unregisterNewsBackgroundTask();
  ```

## Testing

- **To run tests:**
  ```bash
  npm test
  ```
- **Coverage:** Unit and behavior tests are provided for domain services, background tasks, storage utilities, and UI components.
- **BDD Approach:** Tests are written in a behavior-driven style using `describe/it` blocks.

## DDD Principles

- **Domain Layer:** Business logic and news models are separated in `src/domain/news/News.ts` and `NewsService.ts`.
- **Infrastructure Layer:** API calls and external services are isolated under `src/infrastructure`.
- **Tasks Layer:** Background tasks are managed in a dedicated layer.

## Contributing & Development

- Writing tests first (TDD) and keeping business logic in the domain layer (DDD) is encouraged.
- Please add relevant unit tests when introducing new features.

## License

MIT
