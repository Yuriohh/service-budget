# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server
npx expo start

# Platform-specific
npx expo start --android
npx expo start --ios

# Lint
yarn lint

# Prepare native build
yarn build:prepare

# Tests
yarn test               # run all tests
yarn test:watch         # watch mode
yarn test:coverage      # with coverage report
```

## Tests

Stack: **Jest** (v29) + **jest-expo** preset + **@testing-library/react-native**.

Test files live in `__tests__/` folders alongside the source they test:

```
src/
  storage/
    budget/
      __tests__/
        budgetCreate.test.ts
        budgetUpdate.test.ts
        budgetRemove.test.ts
  components/
    ComponentName/
      __tests__/
        index.test.tsx
```

Naming convention: `<subject>.test.ts` for logic, `<subject>.test.tsx` for components.

Mocks:
- `src/services/__mocks__/api.ts` — mocks the axios API client for all storage tests.
- `__mocks__/expo-secure-store.ts` — mocks secure storage.

## Architecture

### Navigation

React Navigation native stack with three screens defined in `App.tsx`:
- `Home` — budget list with search and filter
- `BudgetForm` — create or edit a budget (receives optional `budgetId` param)
- `BudgetDetails` — view, copy, edit, or delete a budget (receives `budgetId`)

Navigation types are centralized in `src/@types/navigation.d.ts` as `RootStackParamList`.

### Data Layer

All persistence goes through `src/storage/budget/`, which wraps `@react-native-async-storage/async-storage` with typed CRUD functions (`budgetCreate`, `budgetGetAll`, `budgetGetById`, `budgetUpdate`, `budgetRemove`). The single storage key is defined in `src/storage/storageConfig.ts`.

Screens reload data using `useFocusEffect` so lists refresh when navigating back.

### State Management

No global state library. All state is component-local via `useState`. Filtering, searching, and sorting are derived in-component from the raw storage data.

### Styling

NativeWind (Tailwind CSS for React Native). Custom colors are in `src/themes/colors.ts` and registered in `tailwind.config.js`. Custom font sizes are also in `tailwind.config.js`. Use the `cn()` utility (`src/utils/cn.ts`) for conditional class merging — it combines `clsx` and `tailwind-merge`.

Font: Lato (loaded via `@expo-google-fonts/lato` in `App.tsx` before rendering).

### Core Types

All domain types live in `src/types/budget.ts`:
- `BudgetStatus`: `draft | sent | approved | rejected`
- `BudgetItem`: line item with quantity and price
- `Budget`: full budget document with client, items, discount, status, and timestamps
- `SortOption`: sort option shape used in the filter modal

### Component Patterns

Components live in `src/components/`, one per folder (`ComponentName/index.tsx`). Some accept a `variant` prop (e.g., `Button` has `solid | outline | dashed`). Bottom sheet modals use `@gorhom/bottom-sheet` and are provided by `BottomSheetModalProvider` in `App.tsx`.

### Path Aliases

`@/*` resolves to the project root (configured in `tsconfig.json`). Use this for all non-relative imports.
