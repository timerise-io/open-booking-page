---
description: "Sync documentation files with actual codebase state"
allowed-tools: ["Bash", "Read", "Edit", "Grep", "Glob"]
---

# Update Documentation Command

This command synchronizes documentation files (README.md, CLAUDE.md) with the actual codebase state, ensuring documentation accurately reflects implemented features, dependencies, and project structure.

## Project Context

This is the **Timerise Open Booking Page** - a public-facing booking widget:

- Frontend SPA built with React 19 + Vite
- Apollo Client for GraphQL API consumption
- Zustand for state management (primary), Recoil (legacy)
- styled-components for styling
- i18next for internationalization
- Embeddable on websites and applications

## Usage

- `/updatedocs` - Analyze codebase and sync all documentation files

## Process

**IMPORTANT**: When the user says "update docs" or runs `/updatedocs`, this means:

1. **Analyze the current codebase state** to gather accurate information:
   - Read `package.json` for dependencies, versions, and scripts
   - Count feature modules in `src/features/`
   - Count React components in `src/components/`
   - Count page components in `src/pages/`
   - Count TypeScript/TSX files
   - Verify configuration files (vite.config.ts, tsconfig.json)
   - Check environment variables from `.env`

2. **Update README.md** with accurate project information:
   - **Prerequisites**: Verify Node.js version requirements
   - **Tech Stack**: Update all dependency versions from package.json
   - **Project Structure**: Verify feature module list is complete and accurate
   - **Available Scripts**: Ensure npm scripts match package.json
   - **Environment Variables**: Verify list matches .env

3. **Update CLAUDE.md** (AI assistant instructions):
   - **Commands section**: Verify scripts match package.json
   - **Architecture section**: Sync with actual implementation
   - **Directory Structure**: Verify feature modules and components
   - **Key Patterns**: Ensure patterns match actual code

4. After updating all documentation, commit changes with clean message.

## Codebase Analysis Checklist

### Dependencies Analysis

Run these commands to gather accurate information:

```bash
# Get project metadata
cat package.json | grep '"name"\|"version"'

# Get all dependencies with versions
cat package.json | grep -A 50 '"dependencies"'
cat package.json | grep -A 30 '"devDependencies"'

# Get npm scripts
cat package.json | grep -A 20 '"scripts"'

# Get engine requirements
cat package.json | grep -A 3 '"engines"'
```

### Folder Structure Analysis

Use Glob and Bash to count files:

```bash
# Count feature modules
ls -d src/features/*/ 2>/dev/null | wc -l

# List all feature modules
ls src/features/

# Count shared components
ls src/components/ | wc -l

# Count page components
ls src/pages/*.tsx | wc -l

# Count total TypeScript files
find src -name "*.ts" ! -name "*.d.ts" | wc -l

# Count total TSX files
find src -name "*.tsx" | wc -l

# Check state management
ls src/state/
ls src/state/stores/ 2>/dev/null
ls src/state/atoms/ 2>/dev/null
```

### Feature Detection

Check for implemented features:

- **GraphQL Client**: Check `src/api/apolloClient.ts` for Apollo setup
- **State Management**: Check `src/state/stores/` (Zustand), `src/state/atoms/` (Recoil legacy)
- **Analytics**: Check `src/features/analytics/` for Google Analytics (react-ga4)
- **i18n**: Check `i18next` in package.json, `src/features/i18n/`
- **Theming**: Check `src/features/theme/`, `src/styles/`
- **Forms**: Check `formik` and `yup` in package.json

## README.md Update Sections

### Prerequisites

Update these with actual requirements from package.json engines:

- Node.js version (from `engines.node`)

### Tech Stack

Update these with actual versions from package.json:

- **React** - version from dependencies
- **Vite** - version from devDependencies
- **Apollo Client** - version from dependencies
- **Zustand** - version from dependencies
- **styled-components** - version from dependencies
- **Formik/Yup** - versions from dependencies
- **React Router** - version from dependencies
- **i18next** - version from dependencies

### Available Scripts

Verify all npm scripts match package.json:

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `npm start`            | Start Vite dev server              |
| `npm run build`        | TypeScript + Vite production build |
| `npm test`             | Run Jest tests                     |
| `npm run lint`         | ESLint + type checking             |
| `npm run check-types`  | TypeScript type checking only      |
| `npm run prettier`     | Check formatting                   |
| `npm run prettier:fix` | Fix formatting                     |

### Project Structure

Update the structure tree with actual directories:

```
src/
├── features/           # Feature-based modules
│   ├── booking/        # Booking management and confirmation
│   ├── service/        # Service browsing and booking UI
│   ├── project/        # Project configuration
│   ├── confirmation/   # Confirmation modals
│   ├── theme/          # Theme provider (dark/light)
│   ├── analytics/      # Google Analytics integration
│   └── i18n/           # Internationalization
├── components/         # Shared UI components
├── pages/              # Route page components
├── state/              # State management
│   ├── stores/         # Zustand stores (primary)
│   ├── atoms/          # Recoil atoms (legacy)
│   └── selectors/      # Recoil selectors (legacy)
├── api/                # Apollo client setup
├── models/             # TypeScript interfaces
├── helpers/            # Utility functions and hooks
├── styles/             # Theme definitions
└── enums/              # Version constants
```

### Environment Variables

Verify the table matches `.env`:

| Variable                   | Description                  |
| -------------------------- | ---------------------------- |
| `VITE_TIMERISE_API_DOMAIN` | Timerise API domain          |
| `GENERATE_SOURCEMAP`       | Build config for source maps |

## CLAUDE.md Update Sections

### Build & Development Commands

Verify all scripts match package.json:

```bash
npm start              # Start dev server (localhost:3000)
npm run build          # TypeScript + Vite production build
npm test               # Run Jest tests
npm run lint           # ESLint + type checking
npm run check-types    # TypeScript only
npm run prettier       # Check formatting
npm run prettier:fix   # Fix formatting
```

### Architecture Section

Update with actual implementation details:

- **Core Stack**: React 19, TypeScript, Vite
- **State Management**: Zustand (primary), Recoil (legacy)
- **API**: Apollo Client with GraphQL, HTTP/WS split links
- **Styling**: styled-components with theme system
- **i18n**: i18next with HTTP backend

### Directory Structure

Verify the structure matches actual directories:

```
src/
├── features/          # Feature-based modules (7 modules)
├── components/        # Shared UI components
├── pages/             # Route page components
├── state/             # Zustand stores + Recoil legacy
├── api/               # Apollo client setup
├── models/            # TypeScript interfaces
├── helpers/           # Utility functions
├── styles/            # Theme definitions
└── enums/             # Constants
```

### Key Patterns

Verify patterns match actual code:

- **Service Factory Pattern**: Different UI for DAYS, CALENDAR, LIST, MULTILIST, PREORDER
- **Zustand Stores**: bookingStore, uiStore, projectStore, filterStore, uploadStore
- **API Versioning**: V1/V2 via operation context
- **Lazy Loading**: React.lazy() for page components
- **Token-based Bookings**: URL tokens for confirmation flows

## Common Documentation Discrepancies to Fix

### 1. Feature Module List

**Issue**: Documentation shows outdated module list **Check**: `ls src/features/` **Fix**: Update feature module list in both files

### 2. Dependency Versions

**Issue**: Documentation shows outdated versions **Check**: `cat package.json` **Fix**: Sync all version numbers with package.json

### 3. npm Scripts

**Issue**: Documentation lists scripts that don't exist or misses new ones **Check**: `cat package.json | grep -A 20 '"scripts"'` **Fix**: Update commands section with actual scripts

### 4. Environment Variables

**Issue**: Documentation doesn't match .env **Check**: `cat .env` **Fix**: Update environment variables table

### 5. State Management

**Issue**: Documentation doesn't reflect Zustand migration **Check**: `ls src/state/stores/` and `ls src/state/atoms/` **Fix**: Document Zustand as primary, Recoil as legacy

## Analysis Process

### Step 1: Gather Data

Run commands and read files to collect:

- Package version and metadata (package.json)
- Feature module list (ls src/features/)
- Component count (ls src/components/)
- Page count (ls src/pages/)
- State stores (ls src/state/stores/)
- Dependency versions
- npm scripts
- Environment variables (.env)

### Step 2: Compare with Documentation

For each documentation file, identify:

- Outdated version numbers
- Incorrect file/directory lists
- Wrong file paths
- Missing features (implemented but not documented)
- Outdated features (documented but not implemented)
- Inconsistent descriptions

### Step 3: Update Files

Make precise edits to:

- README.md (Tech Stack, Scripts, Structure, Environment Variables)
- CLAUDE.md (Commands, Architecture, Directory Structure, Patterns)

### Step 4: Verify Consistency

Check that both documentation files have:

- Consistent feature module lists
- Consistent directory structure
- Matching npm scripts
- Matching environment variables

## Clean Commit Policy

Do NOT add any automatic information such as:

- Co-authored-by tags
- Generated with [tool name] messages
- Any automated signatures or metadata

Keep commit messages clean and focused:

```
docs: sync documentation with actual codebase state
```

Or more specific:

```
docs: update dependency versions and npm scripts
```

## Example Workflow

```bash
# 1. Analyze package.json
cat package.json

# 2. List feature modules
ls src/features/

# 3. Count components
ls src/components/ | wc -l

# 4. Count pages
ls src/pages/*.tsx | wc -l

# 5. Count TypeScript files
find src -name "*.tsx" | wc -l
find src -name "*.ts" ! -name "*.d.ts" | wc -l

# 6. Check state management
ls src/state/stores/
ls src/state/atoms/

# 7. Check environment variables
cat .env

# 8. Read current documentation
# (Read README.md, CLAUDE.md)

# 9. Update documentation files
# (Edit each file with corrections)

# 10. Commit changes
git add README.md CLAUDE.md
git commit -m "docs: sync documentation with actual codebase state"
```

## Notes

- Always verify by actually scanning the codebase
- Don't assume features exist - check for files
- Update both documentation files consistently
- Keep documentation concise but accurate
- When in doubt, check the actual code, not assumptions
- Pay special attention to npm scripts across all files
- Verify feature module list is complete
- Document Zustand as primary state management, Recoil as legacy
- This is a public booking page, not an admin panel
