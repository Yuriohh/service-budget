import { Budget } from "../types/budget";

export function searchByTitle(budgets: Budget[], target: string): Budget[] {
  budgets.sort((a, b) => a.title.localeCompare(b.title));

  let low = 0;
  let high = budgets.length - 1;

  const prefix = target.toLowerCase();
  let index = -1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let guess = budgets[mid].title.toLowerCase();

    if (guess.startsWith(prefix)) {
      index = mid;
      break;
    }

    if (guess > prefix) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  if (index === -1) {
    return [];
  }

  let left = index;
  let right = index;

  while (
    left > 0 &&
    budgets[left - 1].title.toLocaleLowerCase().startsWith(prefix)
  ) {
    left--;
  }

  while (
    right < budgets.length - 1 &&
    budgets[right + 1].title.toLocaleLowerCase().startsWith(prefix)
  ) {
    right++;
  }

  return budgets.slice(left, right + 1);
}
