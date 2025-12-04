---
description: 'Bump version following semantic versioning principles'
allowed-tools: ['Bash', 'Read', 'Edit', 'MultiEdit']
argument-hint: '[major|minor|patch] (optional - if not provided, will analyze git history)'
---

# Bump Version Command

This command implements semantic versioning for the project.

## Usage

- `/bumpv` - Analyze git history and determine appropriate bump
- `/bumpv patch` - Force a patch version bump
- `/bumpv minor` - Force a minor version bump
- `/bumpv major` - Force a major version bump

## Process

**IMPORTANT**: When the user says "bump v", this means:

1. **Analyze git commit history** to determine appropriate version bump level:
   - Run `git log --oneline --since="[last-version-date]"` or `git log --oneline [last-version-tag]..HEAD`
   - Review commit types and messages for breaking changes, new features, or bug fixes
   - Apply Semantic Versioning decision criteria (see below) to determine MAJOR, MINOR, or PATCH
   - Consider the cumulative impact of all changes since the last version

2. **Update app version** in package.json

3. **Update CHANGELOG.md** - Add new version entry following Keep a Changelog format:
   - Create CHANGELOG.md if it doesn't exist with proper structure
   - Add new version at the top with release date
   - Categorize changes into: Added, Changed, Fixed, Deprecated, Removed, Security
   - Include summary of changes from git commit history
   - Follow semantic versioning links format

4. **Update CLAUDE.md Recent Update section** - **ONLY IF** changes contain important information for LLM model context:
   - New version number and date
   - Key architectural or technical changes that affect how LLM should work with the codebase
   - Skip this step for minor updates or version bumps without architectural significance

5. **Review commit titles** to accurately summarize all changes in documentation

6. After updating the version and documentation, commit all changes.

## Semantic Versioning Decision Criteria

Follow [Semantic Versioning](https://semver.org/) principles for all version bumps:

- **MAJOR version** (X.0.0): Breaking changes that make existing functionality incompatible
- **MINOR version** (0.X.0): New features that are backward compatible
- **PATCH version** (0.0.X): Bug fixes and improvements that are backward compatible

### When analyzing git history to determine version bump level:

**MAJOR (Breaking Changes):**

- Commits with `BREAKING CHANGE:` in footer
- API route changes that modify request/response structure
- Database schema changes requiring migrations
- Removed or renamed public APIs, components, or functions
- Changed authentication or security model

**MINOR (New Features):**

- `feat:` commits adding new functionality
- New API endpoints
- New UI components or pages
- New configuration options
- Enhanced existing features without breaking changes

**PATCH (Bug Fixes & Improvements):**

- `fix:` commits resolving bugs
- `refactor:` commits improving code without changing functionality
- `perf:` commits improving performance
- `style:` commits with formatting or styling changes
- `docs:` commits updating documentation
- `test:` commits adding or fixing tests
- `chore:` commits for maintenance tasks

### Decision Process

1. **Scan all commits** since the last version tag
2. **Identify highest impact change** using the hierarchy: MAJOR > MINOR > PATCH
3. **Consider cumulative effect** - multiple minor features may warrant a minor bump even with patches
4. **Check for breaking changes** in commit footers or descriptions
5. **When in doubt**, prefer the more conservative (lower) version bump

## Examples of Version Bump Analysis

**PATCH Example (0.1.5 → 0.1.6):**

```bash
git log --oneline v0.1.5..HEAD
fix(auth): resolve login redirect issue
fix(dashboard): correct chart rendering bug
docs: update installation instructions
chore: update dependencies
```

_Result: PATCH bump - only bug fixes and maintenance_

**MINOR Example (0.1.6 → 0.2.0):**

```bash
git log --oneline v0.1.6..HEAD
feat(reports): add CSV export functionality
feat(dashboard): implement energy balance charts
fix(auth): resolve session timeout issue
refactor(api): optimize database queries
```

_Result: MINOR bump - new features with backward compatibility_

**MAJOR Example (0.2.0 → 1.0.0):**

```bash
git log --oneline v0.2.0..HEAD
feat(api): redesign authentication system

BREAKING CHANGE: API endpoints now require JWT tokens instead of session cookies
feat(dashboard): add real-time monitoring
fix(reports): correct calculation errors
```

_Result: MAJOR bump - breaking changes to authentication system_

## CHANGELOG.md Structure

### Creating a New CHANGELOG.md

If CHANGELOG.md doesn't exist, create it with this structure:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [Version] - Date

### Added

- New features and functionality

### Changed

- Changes to existing functionality

### Fixed

- Bug fixes

### Deprecated

- Features marked for removal

### Removed

- Features removed in this version

### Security

- Security fixes and improvements
```

### Adding New Version Entry

When updating CHANGELOG.md, add the new version at the top:

```markdown
## [0.2.0] - 2025-01-20

### Added

- Interactive AI chatbot powered by Gemini Flash 2.0
- Dynamic background changes controlled by chat interactions
- YouTube video embedding capabilities

### Changed

- Improved responsive design for mobile devices
- Enhanced dark theme consistency

### Fixed

- Authentication redirect issue resolved
- Chart rendering bug in dashboard corrected
```

### Change Categories Guidelines

**Added** - for new features
**Changed** - for changes in existing functionality
**Deprecated** - for soon-to-be removed features
**Removed** - for now removed features
**Fixed** - for any bug fixes
**Security** - in case of vulnerabilities

## Clean Commit Policy

Do NOT add any automatic information such as:

- Co-authored-by tags
- Generated with [tool name] messages
- Any automated signatures or metadata

Keep commit messages clean and focused only on describing all uncommitted changes made.
