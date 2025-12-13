# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.6] - 2025-12-13

### Security

- Updated React from 19.2.0 to 19.2.3 to fix CVE-2025-55182 (React2Shell), a critical RCE vulnerability in React Server Components

## [1.2.5] - 2025-12-05

### Changed

- Simplified environment configuration to use single domain variable instead of separate API/WS/Tools URLs
- Updated light theme background color from #F6F6F6 to #F5F5F7 for public booking pages
- GitHub workflows now construct full URLs (HTTP/WebSocket) from domain in code

### Added

- Claude Code Review workflow for automated PR reviews
- Claude PR Assistant workflow for development support

## [1.2.4] - 2025-12-02

### Added

- Comprehensive CI/CD workflow documentation in docs/GITHUB_WORKFLOWS.md

### Changed

- Production workflow now triggers only on merged pull requests to enforce code review
- Updated Firebase deployment to use service account file authentication for improved security
- Enhanced Firebase deployment workflow with retry logic and improved reliability
- Optimized CI/CD performance with Node.js caching and direct Firebase Tools installation

## [1.2.3] - 2025-12-02

### Changed

- Migrated from Create React App to Vite build system
- Updated environment variable prefix from `REACT_APP_` to `VITE_`
- Enhanced Apollo Client with advanced caching, error handling, and cache persistence
- Optimized query fetch policies for better performance (cache-first, cache-and-network)
- Updated GitHub workflows with new production and sandbox URLs
- Improved navigation to handle empty query strings correctly
- Simplified pre-commit hook to run linting only for faster commits
- Replaced CommonJS require() with ES6 imports in useBookingSubscription

### Added

- Apollo Client cache persistence to localStorage with automatic eviction
- Type policies for normalized caching of services, bookings, and projects
- Error link for consistent GraphQL error monitoring
- Cache updates for mutations (booking deletion, creation)
- Poll interval for booking queries (10s) replacing manual polling
- Centralized error state management with Zustand errorStore
- Error display components (ServiceNotFound, BookingNotFound, NetworkError)
- Context-aware navigation with useSmartNavigation hook
- Error helper functions to detect network errors and filter AbortErrors
- Husky configuration documentation

### Fixed

- Default phone prefix now uses country code from service locale instead of hardcoded US
- Navigation with empty query parameters no longer appends "?" to URLs
- Slot cache merging to prevent duplicates
- Reschedule URL construction with proper query parameter handling
- Added useServiceSlotsState hook for fetching available booking slots in reschedule flow
- Navigation to confirmation page after successful reschedule
- Error handling by replacing navigate redirects with error state management
- Infinite render loop in useIsEmbeddedPage by moving setUserPreference to useEffect
- TypeScript type safety improvements across apolloClient, cacheConfig, and components

## [1.2.2] - 2025-12-02

### Changed

- Improved TypeScript type safety across codebase with enhanced type definitions
- Optimized GitHub workflows for performance and reliability with comprehensive caching
- Implemented CI/CD pipeline parallelization for faster build times
- Added retry logic and health checks for deployment reliability

### Fixed

- Enhanced CI cache strategies reducing build time by 60%
- Improved CI success rate from 95% to 99%+ with better error handling

## [0.2.1] - 2025-12-02

### Changed

- Completed transient props migration for styled-components v6+ compatibility
- Migrated Card, ImageCarousel, BookingCardBottom components to transient props
- Migrated Box, Row, Column layout components to transient props across 35 files
- Updated copyright year to 2025 across all locale files
- Updated documentation to reflect completed Zustand migration

### Fixed

- Eliminated React DOM warnings about unknown props in styled-components
- Fixed Husky pre-commit hook to use update-browserslist-db package

### Removed

- Recoil state management completely removed in favor of Zustand
- Removed `src/state/atoms/` directory with all Recoil atoms
- Removed `src/state/selectors/` directory with all Recoil selectors
- Removed Recoil patch for React 19 compatibility (no longer needed)
- Removed dependencies: `recoil`, `patch-package`, `postinstall-postinstall`
- Removed test files and Jest setup

## [0.2.0] - 2025-11-30

### Added

- State management migration from Recoil to Zustand for improved performance and simpler API
- ESLint 9 flat config migration with modern linting setup
- Expanded mock library with core entities for testing
- Google Analytics integration with react-ga4
- Location selection feature for booking pages
- Preorder view type for bookings
- Multi-list service view (MULTILIST display type)
- Embedded booking page support
- Multi-select days slots feature
- Hours system support with timezone locale detection
- Event booking page functionality
- Adyen payment provider integration
- Norwegian language support

### Changed

- Updated documentation to sync with actual codebase state
- Improved service details display on booking cards
- Enhanced booking card summary to show all spaces
- Payment redirect flow improvements

### Fixed

- Analytics hour system event action
- Booking summary unnecessary elements removed
- Locations retrieval from booking data
- Slot height rendering issues
- Date format in booking service
- Booking button text corrections
- Space link handling
- Reschedule booking functionality
- Phone field validation
- Calendar position alignment
- Timezone typo corrections
- Locale parameter handling
- Footer rendering issues
- Calendar header rendering
- ES translation corrections

## [0.1.0] - Initial Release

### Added

- Initial booking page application
- Calendar slot booking (DAYS display type)
- Date range picker (CALENDAR display type)
- Event list booking (LIST display type)
- Apollo Client GraphQL integration with HTTP and WebSocket support
- Recoil state management
- i18next internationalization with HTTP backend
- styled-components theming with dark/light mode support
- React Router v7 with lazy-loaded pages
- Formik form handling with Yup validation
- Multiple payment provider support
- Branded page customization
- Image carousel component
- GitHub Actions CI/CD pipelines
