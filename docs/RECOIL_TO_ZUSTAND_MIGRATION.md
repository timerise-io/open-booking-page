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

## Rollback Plan

If issues arise:
1. Revert to previous commit
2. The Recoil patch ensures React 19 compatibility as fallback
3. All Recoil code remains in git history

## Next Steps

1. Complete component migration (50+ files)
2. Update `App.tsx` to remove `RecoilRoot`
3. Run full test suite
4. Manual QA of critical flows
5. Remove Recoil dependencies
6. Remove `patches/` directory
7. Update this documentation with final migration results

## References

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Migration Implementation Plan](../brain/implementation_plan.md)
- [Recoil Documentation](https://recoiljs.org/) (for reference)
