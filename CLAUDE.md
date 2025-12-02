# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Timerise open-source booking page - a React application for booking services that can be embedded on websites. It connects to the Timerise API (GraphQL) and supports multiple booking types (calendar slots, date ranges, events, multi-date events).

## Commands

```bash
npm ci              # Install dependencies
npm start           # Run dev server (localhost:3000, connects to sandbox API)
npm run build       # Build for production (requires .env file)
npm run lint        # ESLint + TypeScript type checking
npm run check-types # TypeScript type checking only
npm run prettier    # Check formatting
npm run prettier:fix # Fix formatting
npm test            # Run Jest tests
```

**Testing a single file:** `npm test -- path/to/file.test.ts`

**Test service URL:** http://localhost:3000/service/E95rBw4j9Thhts2vzY1Y (sandbox environment)

## Architecture

### State Management
Uses **Zustand** for global state. Stores are in `src/state/stores/`. Key stores: `bookingStore`, `projectStore`, `uiStore`, `filterStore`, `uploadStore`.

### API Layer
- **Apollo Client** with GraphQL for all API communication
- Supports both HTTP and WebSocket connections (for subscriptions)
- API versioning (V1/V2) handled via operation context
- Config: `src/api/apolloClient.ts`

### Feature Module Structure
Each feature follows this pattern:
```
src/features/{feature}/
├── api/
│   ├── mutations/   # GraphQL mutations + TypeScript models
│   └── queries/     # GraphQL queries + TypeScript models
├── components/      # React components
└── hooks/           # Custom hooks (data fetching, business logic)
```

### Service Types (Display Types)
The `ServiceFactory` (`src/features/service/components/Service/ServiceFactory/`) renders different booking UIs based on `displayType`:
- `DAYS` → `ServiceDateTime` (calendar with time slots)
- `CALENDAR` → `ServiceDateRange` (date range picker)
- `LIST` → `ServiceDateEvent` (event list)
- `MULTILIST` → `ServiceMultiDateEvent` (multi-select events)

### Routing
React Router v7 with lazy-loaded pages. Routes defined in `src/pages/PageSwitcher.tsx`. Supports embedded mode (different URL prefixes).

### Styling
- **styled-components** for component styling
- Global styles in `src/styles/GlobalStyles.ts`
- Theme support (dark/light) via `ThemeWrapper`

### i18n
Uses **i18next** with HTTP backend for translations. Language detection from URL params and service configuration.

## Environment Variables

Prefix with `REACT_APP_` (Vite config maps this prefix):
- `REACT_APP_TIMERISE_API` - GraphQL API endpoint
- `REACT_APP_TIMERISE_WS` - WebSocket endpoint for subscriptions
- `REACT_APP_TIMERISE_TOOLS_API` - Tools API endpoint
- `GENERATE_SOURCEMAP` - Build config for source maps

## Key Models

- `Service` (`src/models/service.ts`) - Main service configuration including form fields, view config, payment providers
- `Booking` (`src/models/booking.ts`) - Booking state and status
- `FormField` (`src/models/formFields.ts`) - Dynamic form field definitions

## Pre-commit Hooks

Husky runs on commit: prettier check, tests, and lint. All must pass.
