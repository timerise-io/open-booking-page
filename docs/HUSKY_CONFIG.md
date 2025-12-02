# Husky Configuration

This project uses [Husky](https://typicode.github.io/husky/) to manage Git hooks.

## Pre-commit Hook

The `pre-commit` hook is configured to run **linting** before every commit to ensure code quality and prevent errors from being committed.

**File:** `.husky/pre-commit`

```bash
npm run lint
```

### Why only linting?

Previously, the pre-commit hook also ran `prettier` and `test`. These were removed to:
1.  **Speed up commits:** Running tests can be slow and interrupt the development flow.
2.  **Delegate to CI:** Comprehensive testing and formatting checks are better handled by the Continuous Integration (CI) pipeline.
3.  **Reduce friction:** Linting is fast and catches the most critical syntax and type errors immediately.

## Directory Structure

The `.husky` directory structure has been simplified:

-   `.husky/pre-commit`: The active hook script.
-   `.husky/_/`: Contains Husky internal files (`h`, `husky.sh`, `.gitignore`). Unused default hooks have been removed to keep the repository clean.
