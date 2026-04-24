# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Revert the 1.2.10–1.2.11 reintroduction of `sourceTimeZone` on time-format helpers. Empirical inspection of a live API response (`dateTimeFrom: "...T08:00:00.000Z"` alongside `dateTimeISOFrom: "...T10:00:00+02:00"` for a Warsaw-tz service) confirmed that the Timerise `DateTime` scalar *is* real UTC, matching the schema description. The 1.2.10 "wall-time-labeled-Z" interpretation was wrong and produced a -2h display shift on the booking page. Restore the single `formatInTimeZone(new Date(date), targetTimeZone)` pipeline from 095c42f. Cache bust (v1 → v2) and the `cache-and-network` slot policy from 1.2.9 are unchanged.

## [1.2.11] - 2026-04-24

### Fixed

- Booking page crashed on initial render after 1.2.10 with `Cannot read properties of undefined (reading 'project')`. A code-simplifier pass in 1.2.10 hoisted `service.project.localTimeZone` to the top of `BookService` and `RescheduleService`, which crashed when `service` was undefined on first render (before Apollo fetched the service). Restore the pre-hoist inline pattern that only evaluates `service.project.localTimeZone` inside ternary branches already guarded by `selectedSlot` / `bookingValue` / `selectedDateRangeValue`.

## [1.2.10] - 2026-04-24

### Fixed

- Correctly interpret the Timerise API `DateTime` scalar as wall-clock time in `service.project.localTimeZone` with a literal `Z` suffix (the GraphQL schema description claims UTC but the backend returns wall-time). Restore the `stripTimezoneFromISO → fromZonedTime(sourceTimeZone) → formatInTimeZone(targetTimeZone)` pipeline that was mistakenly removed in 1.2.9. Fixes the persistent ~2h shift between the admin panel and the booking page that reappeared after the 1.2.9 release.

### Changed

- Reintroduce the `sourceTimeZone` parameter on `convertSourceDateTimeToTargetDateTime` / `...WithHoursSystem` helpers. `getDatesValue` now reads `sourceTimeZone` from `service.project.localTimeZone` internally, so most call sites (`EventSlot`, `EventMultiSlot`, `BookingCardTitle`, `DeleteBooking`) require no prop changes. Direct helper callers (`BookService`, `RescheduleService`, `TimeSlot`) pass `service.project.localTimeZone` explicitly.

## [1.2.9] - 2026-04-24

### Fixed

- Sort event slots chronologically in LIST and MULTILIST display types (previously rendered in API-returned order)
- Fix ~2h timezone shift in booking widget caused by double-applied target offset in `convertSourceDateTimeToTargetDateTime` (visible when display timezone ≠ browser timezone)
- Bust persisted Apollo localStorage cache (`CACHE_VERSION` v1 → v2) so existing users do not keep displaying pre-fix timezone-shifted slot times served from a stale 24h-TTL cache

### Changed

- Drop dead `sourceTimeZone` parameter from time-format helpers and all call sites (API returns real UTC; only target timezone is needed)
- Simplify display-type dispatch in `getDatesValue`, chip-label logic in `BookService`, and `handleSubmit` in `RescheduleService`
- Soften `nextFetchPolicy` for `GET_SERVICE_SLOTS` to `cache-and-network` so slot data re-validates against the backend on every re-query instead of silently serving stale cached entries

## [1.2.8] - 2026-02-27

### Changed

- Self-host all static assets (logos, icons, placeholders) in `/public` instead of loading from `cdn.timerise.io`
- Remove Google Analytics/GTM tracking script from `index.html`

## [1.2.7] - 2026-02-26

### Fixed

- Add `Accept-Language` headers and fix language references in API hooks
- Fix UTC slot time parsing in `timeFormat` helpers
- Standardize API DateTime handling for consistent timezone behavior

### Changed

- Simplify event slot components and fix circular import issues
- Replace `any` with proper error types in `errorHelpers`
- Remove `googleTagId` from service model (Google Analytics integration removed)
- Update copyright year to 2026 across all locales
- Synced README.md tech stack versions with installed package versions (React 19.2.4, Vite 7.3.1, Apollo Client 4.1.4, Zustand 5.0.11, styled-components 6.3.9, React Router 7.13.0, i18next 25.8.10)

### Removed

- Removed `react-ga4` dependency (Google Analytics no longer tracked)

### Documentation

- Sync documentation with codebase state
- Migrate Claude commands to skills
- Update Claude Code Review and PR Assistant GitHub workflows

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
