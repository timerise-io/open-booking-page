# Recoil to Zustand Migration Documentation

## Overview

This document describes the migration from Recoil to Zustand for state management in the open-booking-page application. The migration was undertaken to improve React 19 compatibility, reduce bundle size, and simplify state management logic.

## Migration Date

November 30, 2025

## Motivation

1. **React 19 Compatibility**: Recoil v0.7.7 has compatibility issues with React 19 internals, requiring a patch
2. **Bundle Size**: Zustand is significantly smaller (~3KB vs ~20KB)
3. **Simplicity**: Zustand provides a simpler API with less boilerplate
4. **Performance**: Zustand has better performance characteristics for our use case

## Architecture Changes

### Store Structure

The previous Recoil architecture with 18 atoms and 17 selectors has been consolidated into 5 logical Zustand stores:

#### 1. Booking Store (`src/state/stores/bookingStore.ts`)
**State:**
- `booking`: Current booking data
- `confirmation`: Confirmation modal state
- `selectedDateRange`: Date range selection
- `selectedSlot`: Single slot selection
- `selectedSlots`: Multiple slots selection
- `serviceSlots`: Available service slots
- `slots`: All slots
- `service`: Service details

**Computed/Derived:**
- `getSelectedSlotData()`: Returns the selected slot object
- `getServicePrice()`: Returns price and currency
- `getServiceSlotsMap()`: Returns slots organized by date/time

#### 2. UI Store (`src/state/stores/uiStore.ts`)
**State:**
- `hoursSystem`: 12h/24h time format
- `lang`: Current language
- `loaders`: Loading states by key
- `timeZone`: Current timezone
- `userPreference`: User theme preference

**Computed/Derived:**
- `getTimeZoneOffset()`: Returns UTC offset for current timezone

#### 3. Project Store (`src/state/stores/projectStore.ts`)
**State:**
- `project`: Project details
- `location`: Selected location

#### 4. Filter Store (`src/state/stores/filterStore.ts`)
**State:**
- `slotsFilters`: Filters for slot queries (dates, page size, locations)

#### 5. Upload Store (`src/state/stores/uploadStore.ts`)
**State:**
- `uploadAttachments`: Upload state by attachment ID

### Cross-Store Selectors

Complex selectors with cross-store dependencies are implemented as custom hooks in `src/state/hooks.ts`:

- `useTheme()`: Combines service theme and user preference
- `useProjectId()`: Extracts project ID from service
- `useSlotFilter()`: Complex filter logic combining multiple stores

## Migration Patterns

### Pattern 1: useRecoilValue → Zustand selector

**Before (Recoil):**
```typescript
import { useRecoilValue } from 'recoil';
import { serviceAtom } from 'state/atoms/service';

const service = useRecoilValue(serviceAtom);
```

**After (Zustand):**
```typescript
import { useBookingStore } from 'state/stores';

const service = useBookingStore((state) => state.service);
```

### Pattern 2: useSetRecoilState → Zustand setter

**Before (Recoil):**
```typescript
import { useSetRecoilState } from 'recoil';
import { serviceAtom } from 'state/atoms/service';

const setService = useSetRecoilState(serviceAtom);
```

**After (Zustand):**
```typescript
import { useBookingStore } from 'state/stores';

const setService = useBookingStore((state) => state.setService);
```

### Pattern 3: useRecoilState → Zustand combined

**Before (Recoil):**
```typescript
import { useRecoilState } from 'recoil';
import { selectedSlot } from 'state/atoms/selectedSlot';

const [slot, setSlot] = useRecoilState(selectedSlot);
```

**After (Zustand):**
```typescript
import { useBookingStore } from 'state/stores';

const slot = useBookingStore((state) => state.selectedSlot);
const setSlot = useBookingStore((state) => state.setSelectedSlot);
```

### Pattern 4: Selectors → Custom hooks or computed

**Before (Recoil):**
```typescript
import { useRecoilValue } from 'recoil';
import { themeSelector } from 'state/selectors/theme';

const theme = useRecoilValue(themeSelector);
```

**After (Zustand):**
```typescript
import { useTheme } from 'state/stores';

const theme = useTheme();
```

### Pattern 5: Loader atomFamily → Loader object

**Before (Recoil):**
```typescript
import { useRecoilValue } from 'recoil';
import { loaderAtom, LOADERS } from 'state/atoms/loader';

const isLoading = useRecoilValue(loaderAtom(LOADERS.SERVICE));
```

**After (Zustand):**
```typescript
import { useUiStore, LOADERS } from 'state/stores';

const isLoading = useUiStore((state) => state.loaders[LOADERS.SERVICE] ?? true);
```

## Files Modified

### New Files Created
- `src/state/stores/bookingStore.ts`
- `src/state/stores/uiStore.ts`
- `src/state/stores/projectStore.ts`
- `src/state/stores/filterStore.ts`
- `src/state/stores/uploadStore.ts`
- `src/state/stores/index.ts`
- `src/state/hooks.ts`

### Files to be Updated (50+ files)
All components and hooks using Recoil hooks need migration. Key areas:
- `src/features/booking/`
- `src/features/service/`
- `src/features/confirmation/`
- `src/components/`
- `src/helpers/hooks/`

### Files to be Removed (after migration complete)
- `src/state/atoms/` (entire directory)
- `src/state/selectors/` (entire directory)
- `patches/recoil+0.7.7.patch`

## Dependencies

### Added
- `zustand@^5.0.2`

### To be Removed (after migration complete)
- `recoil@0.7.7`
- `patch-package@8.0.1`
- `postinstall-postinstall@2.1.0`

## App.tsx Changes

### Remove RecoilRoot
**Before:**
```typescript
import { RecoilRoot } from 'recoil';

<RecoilRoot>
  <App />
</RecoilRoot>
```

**After:**
```typescript
// No provider needed - Zustand stores are standalone
<App />
```

## Testing Considerations

After migration, test the following critical flows:
1. **Booking Flow**: Service selection → Slot selection → Form submission → Confirmation
2. **Timezone Switching**: Verify slots update correctly
3. **Theme Switching**: Light/dark mode transitions
4. **Language Switching**: i18n integration
5. **Reschedule Flow**: Booking modification
6. **Multi-date Events**: Complex slot selection
7. **Upload Attachments**: File upload state management

## Performance Benefits

- **Bundle Size**: Reduced by ~17KB (recoil removed)
- **Runtime**: Zustand has minimal overhead
- **React 19**: Native compatibility without patches

## Migration Status (Updated: December 2, 2025)

### ✅ Completed

**Phase 1: Store Setup** - Complete
- All 5 Zustand stores created and configured
- `LOADERS` constant moved to `uiStore.ts`
- Cross-store hooks implemented in `src/state/hooks.ts`

**Phase 2: Component Migration** - Complete (50+ files migrated)
- ✅ `src/features/booking/` - All components (11 files)
- ✅ `src/features/service/hooks/` - All hooks (4 files)
- ✅ `src/features/service/components/` - All service components (15+ files)
- ✅ `src/components/` - Events, Forms, and other components (10+ files)
- ✅ `src/features/confirmation/` - All confirmation components (3 files)
- ✅ `src/features/project/hooks/` - Project hooks (1 file)
- ✅ `src/features/i18n/` - i18n hooks (1 file)
- ✅ `src/helpers/hooks/` - Core hooks (3 files)

**Custom Hooks Created:**
- `useBookingCardViewConfig()` - replaces `bookingCardViewConfig` selector
- `useSlotsViewConfiguration()` - replaces `slotsViewConfiguration` selector
- `useDateLocale()` - replaces `dateLocaleSelector`
- `useTheme()` - cross-store theme selector
- `useProjectId()` - cross-store project ID selector
- `useSlotFilter()` - complex filter logic combining multiple stores
- `useSlotsDayPattern()` - slots day pattern grouping
- `usePageDates()` - calendar pagination dates
- `useDefaultPhonePrefix()` - default phone prefix based on service
- `useTimeSlot()` - get specific time slot by ID
- `useTimeSlotByDate()` - get specific time slot by date range

**Store Enhancements:**
- Updated `uploadStore.ts` with `setUploadAttachment()` method
- Updated `uiStore.ts` with `setLoader()` method for dynamic loader management
- Updated `projectStore.ts` with `setProject()` and `setLocation()` methods

### ⏳ Remaining

**Phase 3: Cleanup**
- Remove `src/state/atoms/` directory
- Remove `src/state/selectors/` directory
- Remove dependencies: `recoil`, `patch-package`, `postinstall-postinstall`
- Remove `patches/recoil+0.7.7.patch`
- Update `package.json` scripts (remove postinstall)

### ✓ Verification

- **TypeScript Compilation**: ✅ Passing (`npm run check-types`)
- **No Recoil Imports**: ✅ Confirmed (grep search shows 0 results)
- **Migrated Files**: 50+ files successfully migrated

## References

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Migration Walkthrough](../brain/walkthrough.md)
- [Recoil Documentation](https://recoiljs.org/) (for reference)
