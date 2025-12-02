# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
