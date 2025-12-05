# GitHub Workflows - CI/CD Documentation

This document describes the Continuous Integration and Continuous Deployment (CI/CD) pipelines for the Timerise Open Booking Page.

## Overview

The project uses **GitHub Actions** for automated testing, building, and deployment to Firebase Hosting. There are two workflows:

| Workflow | File | Trigger | Environment | URL |
| --- | --- | --- | --- | --- |
| **Production** | `firebase-hosting-main.yml` | PR merged to `main` | Production | https://booking.timerise.io |
| **Sandbox** | `firebase-hosting-sandbox.yml` | Push to `sandbox` or manual | Sandbox | https://sandbox-booking.timerise.io |

The **sandbox workflow** supports **manual triggering** via `workflow_dispatch` for on-demand deployments. Production deployments are only triggered automatically when a pull request is merged into the `main` branch for safety and code review enforcement.

## Pipeline Architecture

Each workflow consists of **3 sequential jobs** with parallel quality checks:

```
┌─────────────────────────────────────────┐
│          QUALITY JOB (Parallel)         │
│  ┌──────┐  ┌──────┐  ┌───────────┐     │
│  │ Lint │  │ Test │  │ Type Check│     │
│  └──────┘  └──────┘  └───────────┘     │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│             BUILD JOB                   │
│  • Compile TypeScript                   │
│  • Build with Vite                      │
│  • Upload artifact                      │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│            DEPLOY JOB                   │
│  • Download artifact                    │
│  • Deploy to Firebase                   │
│  • Run health check                     │
│  • Generate summary                     │
└─────────────────────────────────────────┘
```

## Job Details

### 1. Quality Job (Parallel Matrix)

**Purpose:** Ensure code quality before building and deploying.

**Strategy:** Uses a matrix to run three checks in parallel:

- `lint` - ESLint + TypeScript type checking
- `test` - Jest test suite
- `types` - TypeScript type checking only

**Key Features:**

- `fail-fast: false` - All checks run even if one fails
- Caches node_modules and tool-specific artifacts (.eslintcache, .tsbuildinfo, .jest-cache)
- Uses retry logic (3 attempts, 30s wait) for `npm ci` to handle transient network issues

**Commands:**

```bash
npm run ci:lint   # ESLint with cache
npm run ci:test   # Jest with cache
npm run ci:types  # TypeScript compiler
```

### 2. Build Job

**Purpose:** Compile and bundle the application for deployment.

**Dependencies:** Requires `quality` job to pass.

**Environment Variables:**

| Variable | Production | Sandbox |
| --- | --- | --- |
| `GENERATE_SOURCEMAP` | `false` | `true` |
| `VITE_TIMERISE_API_DOMAIN` | `${{ secrets.PROD_VITE_TIMERISE_API_DOMAIN }}` | `${{ secrets.SANDBOX_VITE_TIMERISE_API_DOMAIN }}` |

**Steps:**

1. **Install dependencies** with retry logic
2. **Build** via `npm run build` (TypeScript compilation + Vite build)
3. **Verify build** - Checks that:
   - `build/` directory exists and is not empty
   - `build/index.html` exists
4. **Upload artifact** - Stores build for 7 days with unique name `build-${{ github.sha }}`

**Caching Strategy:**

- `node_modules` - Keyed by `package-lock.json`
- Vite artifacts (`node_modules/.vite`) - Keyed by `vite.config.ts` + `package-lock.json`

### 3. Deploy Job

**Purpose:** Deploy the built application to Firebase Hosting.

**Dependencies:** Requires `build` job to pass.

**Environment:**

- Production: `production` environment → https://booking.timerise.io
- Sandbox: `sandbox` environment → https://sandbox-booking.timerise.io

**Steps:**

1. **Download build artifact** from previous job
2. **Verify downloaded build** - Ensures artifact was downloaded correctly
3. **Create Service Account File** from GitHub secret
4. **Deploy to Firebase** with retry logic (3 attempts, 30s wait):
   ```bash
   firebase deploy --only hosting:service-app --project <project>
   ```
5. **Health check** with retry logic (5 attempts, 10s wait):
   - Production: `https://booking.timerise.io/service/Y1FFTLuSUtppw30QaRh8`
   - Sandbox: `https://sandbox-booking.timerise.io/service/E95rBw4j9Thhts2vzY1Y`
6. **Create deployment summary** with deployment details

**Firebase Projects:**

- Production: `timerise-prod` → `booking-timerise-prod` hosting site
- Sandbox: `timerise-sandbox` → `booking-timerise-sandbox` hosting site

## Required GitHub Secrets

Configure these secrets in **Settings → Secrets and variables → Actions**:

| Secret Name                                 | Description                                  | Required For        |
| ------------------------------------------- | -------------------------------------------- | ------------------- |
| `PROD_VITE_TIMERISE_API_DOMAIN`             | Production API domain                        | Production workflow |
| `FIREBASE_SERVICE_ACCOUNT_TIMERISE_PROD`    | Firebase service account JSON for production | Production workflow |
| `SANDBOX_VITE_TIMERISE_API_DOMAIN`          | Sandbox API domain                           | Sandbox workflow    |
| `FIREBASE_SERVICE_ACCOUNT_TIMERISE_SANDBOX` | Firebase service account JSON for sandbox    | Sandbox workflow    |

### How to Update Secrets

1. Go to repository **Settings → Secrets and variables → Actions**
2. Click **New repository secret** or edit existing secret
3. For Firebase service accounts, paste the entire JSON content from the service account key file

## Performance Optimizations

### Caching Strategy

The workflows use multiple layers of caching to reduce build times:

1. **npm cache** - GitHub Actions built-in npm cache
2. **node_modules cache** - Explicit cache for installed dependencies
3. **Tool-specific caches:**
   - `.eslintcache` - ESLint cache for faster linting
   - `.tsbuildinfo` - TypeScript incremental compilation cache
   - `.jest-cache` - Jest test cache
   - `node_modules/.vite` - Vite build cache

### Retry Logic

Network operations use `nick-fields/retry@v3` for reliability:

- **Dependency installation:** 3 attempts, 30s wait, 10min timeout
- **Firebase deployment:** 3 attempts, 30s wait, 10min timeout
- **Health checks:** 5 attempts, 10s wait, 30s timeout

### Parallel Execution

Quality checks run in parallel using a matrix strategy, reducing total CI time by ~60%.

## Manual Deployment

### Sandbox Environment

The sandbox workflow supports manual triggering for testing purposes:

1. Go to **Actions** tab in GitHub
2. Select **Deploy to sandbox environment**
3. Click **Run workflow**
4. Select the `sandbox` branch
5. Click **Run workflow** button

### Production Environment

Production deployments are **only triggered automatically** when a pull request is merged to the `main` branch. This enforces code review and prevents accidental production deployments. To deploy to production:

1. Create a pull request targeting the `main` branch
2. Get the PR reviewed and approved
3. Merge the pull request
4. The workflow will automatically trigger and deploy

## Troubleshooting

### Build Fails with "Build directory is empty"

**Cause:** Vite build failed but didn't exit with error code.

**Solution:**

- Check TypeScript compilation errors: `npm run check-types`
- Check for missing environment variables
- Review build logs for Vite errors

### Firebase Deployment Fails

**Cause:** Authentication issues or Firebase project misconfiguration.

**Solution:**

1. Verify the service account secret is correctly formatted JSON
2. Check that the service account has necessary permissions:
   - Firebase Hosting Admin
   - Cloud Functions Developer (if using functions)
3. Verify Firebase project name in `.firebaserc` matches the deployment command
4. Check Firebase quota limits

### Health Check Fails After Deployment

**Cause:** Deployment succeeded but the application isn't responding correctly.

**Solution:**

1. Check the health check URL is correct for your environment
2. Verify the test service ID exists in your environment
3. Check Firebase Hosting logs for runtime errors
4. Manually visit the URL to see error messages

### Cache Issues - "Stale dependencies"

**Cause:** Cached dependencies don't match `package-lock.json`.

**Solution:**

1. Clear GitHub Actions cache:
   - Go to **Actions → Caches**
   - Delete relevant caches
2. Re-run the workflow

## Workflow Configuration Files

- `.github/workflows/firebase-hosting-main.yml` - Production deployment workflow
- `.github/workflows/firebase-hosting-sandbox.yml` - Sandbox deployment workflow
- `.firebaserc` - Firebase project configuration and aliases
- `firebase.json` - Firebase hosting configuration
- `package.json` - Build scripts and CI commands

## Related Documentation

- [Husky Pre-commit Hooks](./HUSKY_CONFIG.md) - Local git hooks that run before commits
- [CLAUDE.md](../CLAUDE.md) - Project overview and commands
- [README.md](../README.md) - Getting started guide

## Deployment Timeline

Typical deployment duration (with cache hits):

- **Quality checks:** ~2-3 minutes (parallel)
- **Build:** ~2-3 minutes
- **Deploy:** ~1-2 minutes
- **Total:** ~5-8 minutes

First run or cache miss may take 10-15 minutes.
