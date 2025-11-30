---
description: 'Sync documentation files with actual codebase state'
allowed-tools: ['Bash', 'Read', 'Edit', 'Grep', 'Glob']
---

# Update Documentation Command

This command synchronizes documentation files (README.md, CLAUDE.md) with the actual codebase state, ensuring documentation accurately reflects implemented features, dependencies, and project structure.

## Project Context

This is a **React Admin Panel** for the Timerise booking system:
- Frontend SPA built with React 18 + Vite
- Apollo Client for GraphQL API consumption
- Firebase client SDK for authentication
- Recoil for state management
- styled-components for styling

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
   - Verify configuration files (vite.config.ts, tsconfig.json, eslint.config.mjs)
   - Check environment variables from `.env.sample`

2. **Update README.md** with accurate project information:
   - **Prerequisites**: Verify Node.js and npm version requirements
   - **Tech Stack**: Update all dependency versions from package.json
   - **Project Structure**: Verify feature module list is complete and accurate
   - **Available Scripts**: Ensure npm scripts match package.json
   - **Environment Variables**: Verify list matches .env.sample

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

# Count helper files
ls src/helpers/*.ts 2>/dev/null | wc -l

# Check constants
ls src/constants/
```

### Feature Detection

Check for implemented features:

- **GraphQL Client**: Check `src/features/api/` for Apollo setup
- **Authentication**: Check `src/features/auth/` for Firebase auth
- **State Management**: Check for Recoil atoms/selectors in feature modules
- **Search**: Check `algoliasearch` in package.json, `src/features/algolia/`
- **i18n**: Check `i18next` in package.json, `src/i18n.ts`
- **Theming**: Check `src/features/theme/`, `src/styles/`
- **Forms**: Check `formik` and `yup` in package.json

## README.md Update Sections

### Prerequisites

Update these with actual requirements from package.json engines:

- Node.js version (from `engines.node`)
- npm version (from `engines.npm`)
- Firebase project requirement

### Tech Stack

Update these with actual versions from package.json:

- **React** - version from dependencies
- **Vite** - version from devDependencies
- **Apollo Client** - version from dependencies
- **Firebase** - version from dependencies
- **Recoil** - version from dependencies
- **styled-components** - version from dependencies
- **Formik/Yup** - versions from dependencies
- **React Router** - version from dependencies

### Available Scripts

Verify all npm scripts match package.json:

| Command | Description |
|---------|-------------|
| `npm start` | Start Vite dev server |
| `npm run build` | Production build |
| `npm test` | Run tests with Vitest |
| `npm run lint` | ESLint + type checking |
| `npm run prettier` | Check formatting |

### Project Structure

Update the structure tree with actual directories:

```
src/
├── features/           # Feature-based modules
│   ├── api/            # Apollo client setup
│   ├── auth/           # Firebase authentication
│   ├── bookings/       # Booking management
│   ├── services/       # Service configuration
│   ├── locations/      # Location management
│   ├── spaces/         # Space management
│   ├── assets/         # Asset management
│   ├── team/           # Team member management
│   ├── project/        # Project settings
│   ├── billing/        # Billing features
│   ├── theme/          # Theme provider
│   └── [others]/       # Additional feature modules
├── components/         # Shared UI components
├── pages/              # Route page components
├── constants/          # App constants
├── helpers/            # Utility functions and hooks
├── styles/             # Theme definitions
└── firebase-config/    # Firebase initialization
```

### Environment Variables

Verify the table matches `.env.sample`:

| Variable | Description |
|----------|-------------|
| `VITE_TIMERISE_API` | GraphQL API endpoint |
| `VITE_FIREBASE_*` | Firebase configuration |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe public key |
| `VITE_SHOW_BILLING` | Feature flag |
| `VITE_SHOW_CONNECTION` | Feature flag |

## CLAUDE.md Update Sections

### Build & Development Commands

Verify all scripts match package.json:

```bash
npm start              # Start dev server
npm run build          # Production build
npm test               # Run tests
npm run lint           # ESLint + type checking
npm run prettier       # Check formatting
npm run prettier:fix   # Fix formatting
```

### Architecture Section

Update with actual implementation details:

- **Core Stack**: React, TypeScript, Vite versions
- **State Management**: Recoil pattern
- **API**: Apollo Client setup
- **Authentication**: Firebase Auth providers
- **Styling**: styled-components theme system

### Directory Structure

Verify the structure matches actual directories:

```
src/
├── features/          # Feature-based modules
├── components/        # Shared UI components
├── pages/             # Route page components
├── constants/         # App constants
├── helpers/           # Utility functions
├── styles/            # Theme definitions
└── firebase-config/   # Firebase initialization
```

### Key Patterns

Verify patterns match actual code:

- **Feature Module Structure**: api/, components/, hooks/, state/, model/
- **API Hooks**: useTimeriseQuery, useTimeriseMutation
- **State**: authUserAtom, currentUserAtom
- **Theming**: appTheme.ts, styled-components theme prop

## Common Documentation Discrepancies to Fix

### 1. Feature Module List

**Issue**: Documentation shows outdated module list
**Check**: `ls src/features/`
**Fix**: Update feature module list in both files

### 2. Dependency Versions

**Issue**: Documentation shows outdated versions
**Check**: `cat package.json`
**Fix**: Sync all version numbers with package.json

### 3. npm Scripts

**Issue**: Documentation lists scripts that don't exist or misses new ones
**Check**: `cat package.json | grep -A 20 '"scripts"'`
**Fix**: Update commands section with actual scripts

### 4. Environment Variables

**Issue**: Documentation doesn't match .env.sample
**Check**: `cat .env.sample`
**Fix**: Update environment variables table

### 5. File Path References

**Issue**: Documentation references incorrect file paths
**Check**: Verify actual file locations
**Fix**: Update file path references throughout documentation

## Analysis Process

### Step 1: Gather Data

Run commands and read files to collect:

- Package version and metadata (package.json)
- Feature module list (ls src/features/)
- Component count (ls src/components/)
- Page count (ls src/pages/)
- Dependency versions
- npm scripts
- Environment variables (.env.sample)

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

# 6. Check environment variables
cat .env.sample

# 7. Read current documentation
# (Read README.md, CLAUDE.md)

# 8. Update documentation files
# (Edit each file with corrections)

# 9. Commit changes
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
- Check environment variables match .env.sample
