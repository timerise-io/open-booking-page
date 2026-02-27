[![GitHub](https://img.shields.io/github/license/timerise-io/open-booking-page)](https://github.com/timerise-io/open-booking-page/blob/main/LICENSE.md) [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/gugo.svg)](https://status.timerise.io)

[![Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=349830&theme=light)](https://www.producthunt.com/posts/timerise)

# Timerise open source booking page

We are pleased to provide our booking page in open-source. We hope it will be useful in your use case. It can be embedded on websites and applications, under buttons, and in popups - on desktop and mobile. Happy booking!

## Make it yours

Adjust the appearance and content of the booking pages to your brand and services.

![image](/section-make-it-yours.png)

## Tech Stack

- **React** 19.2.4
- **TypeScript** 5.9.3
- **Vite** 7.3.1
- **Apollo Client** 4.1.4 (GraphQL)
- **Zustand** 5.0.11 (state management)
- **styled-components** 6.3.9
- **React Router** 7.13.0
- **i18next** 25.8.10 (internationalization)
- **Formik** 2.4.9 + **Yup** 1.7.1 (forms)

## Prerequisites

- Node.js >= 22.0.0

## Installation

Run the following script in the root directory:

```bash
npm ci
```

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

Developer mode is by default connected to the sandbox environment. If you want to connect to a different environment during development, edit the `.env` file in the root folder.

To open the service page on localhost use: [http://localhost:3000/service/{service-id}](http://localhost:3000/service/{replace-with-service-id})

Test service on sandbox: [http://localhost:3000/service/E95rBw4j9Thhts2vzY1Y](http://localhost:3000/service/E95rBw4j9Thhts2vzY1Y)

Create your own services on the sandbox environment via [user interface](https://sandbox.timerise.io/) or [API](https://studio.apollographql.com/public/TIMERISE-API/explorer?variant=sandbox).

### `npm run build`

Builds the app for production to the `build` folder. Runs TypeScript compilation and Vite build.

Requires `.env` file in root directory.

### `npm run preview`

Locally preview the production build.

### `npm test`

Runs Jest tests.

### `npm run lint`

Runs ESLint and TypeScript type checking.

### `npm run check-types`

Runs TypeScript type checking only.

### `npm run prettier`

Checks code formatting with Prettier.

### `npm run prettier:fix`

Fixes code formatting with Prettier.

## Code Quality

This project uses several tools to ensure code quality:

- **Husky**: Runs pre-commit hooks to ensure that linting and type checking pass before committing.
- **Prettier**: Enforces consistent code formatting.
- **ESLint**: Catches errors and enforces coding standards.

## Environment Variables

| Variable                   | Description                  |
| -------------------------- | ---------------------------- |
| `VITE_TIMERISE_API_DOMAIN` | GraphQL API endpoint         |
| `GENERATE_SOURCEMAP`       | Build config for source maps |

## Project Structure

```
src/
├── features/           # Feature-based modules
│   ├── analytics/      # Google Analytics integration
│   ├── booking/        # Booking management and confirmation
│   ├── confirmation/   # Confirmation modals
│   ├── i18n/           # Internationalization
│   ├── project/        # Project configuration
│   ├── service/        # Service browsing and booking UI
│   └── theme/          # Theme provider (dark/light)
├── components/         # Shared UI components
├── pages/              # Route page components
├── state/              # State management
│   └── stores/         # Zustand stores
├── api/                # Apollo client setup
├── models/             # TypeScript interfaces
├── helpers/            # Utility functions and hooks
├── styles/             # Global styles and theme
└── enums/              # Constants and enums
```

### Feature Module Structure

Each feature follows this pattern:

```
feature/
├── api/
│   ├── mutations/      # GraphQL mutations
│   └── queries/        # GraphQL queries
├── components/         # Feature-specific components
└── hooks/              # Custom hooks
```

# See how Timerise works

[![Vimeo](/video-placeholder.png)](https://vimeo.com/703918323)
