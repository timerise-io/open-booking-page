---
description: 'Review changes and create a git commit with proper validation'
allowed-tools: ['Bash', 'Read', 'Grep', 'Glob']
---

# Commit Command

This command implements the complete commit workflow for the project.

## Process

**IMPORTANT**: When the user says "commit", this means:

1. **Check what has changed** using git commands:
   - `git status` - see modified, added, or deleted files
   - `git diff` - review exact changes in modified files
   - `git diff --cached` - review staged changes
   - `git diff --name-only` - get quick list of changed files

2. **Verify CHANGELOG.md status** (important for project documentation):
   - Check if CHANGELOG.md exists in the project root
   - Review if changes are significant enough to warrant a changelog entry
   - For new features, bug fixes, or breaking changes, remind to update CHANGELOG.md
   - If version changes are needed, suggest using `/bumpv` command instead

3. **Run build check** (`npm run build`) to ensure no build errors
4. **Add all files** to the repository (`git add .`)
5. **Commit all unsaved changes** in the repository (`git commit`)

**ALWAYS review the changes before committing** to ensure you understand what is being committed and can write an accurate commit message describing all modifications.

## Commit Message Guidelines

**Format**: `<type>(<scope>): <description>` - 50 chars max, imperative mood
**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Good Examples**:

- `feat(dashboard): add energy balance charts`
- `fix(auth): resolve login redirect loop`
- `refactor(api): optimize database queries`

**Avoid**: "Fixed stuff", "WIP", "Various changes"

## CHANGELOG.md Integration

### When to Update CHANGELOG.md

Consider updating CHANGELOG.md **before committing** if changes include:

- **New features** (`feat:` commits) - Add to "Added" section
- **Bug fixes** (`fix:` commits) - Add to "Fixed" section
- **Breaking changes** - Add to appropriate section with BREAKING CHANGE note
- **Security fixes** - Add to "Security" section
- **Deprecated features** - Add to "Deprecated" section
- **Removed features** - Add to "Removed" section

### Version Bumping vs Regular Commits

- **Regular commits**: Update CHANGELOG.md manually if needed
- **Version releases**: Use `/bumpv` command which handles both version bump and CHANGELOG.md update automatically
- **Multiple related changes**: Consider grouping commits and using `/bumpv` for the release

### CHANGELOG.md Format Reminder

Follow Keep a Changelog format:

```markdown
## [Unreleased]

### Added

- New chatbot integration with Gemini Flash 2.0

### Fixed

- Login redirect loop issue resolved
```

## Clean Commit Policy

Do NOT add any automatic information such as:

- Co-authored-by tags
- Generated with [tool name] messages
- Any automated signatures or metadata

Keep commit messages clean and focused only on describing all uncommitted changes made.
