import { TodoEntry } from "../types";

export function createTodoEntry(newEntry: { id: number; value: string }) {
  const entries = fetchTodoEntries();
  entries.push(newEntry);
  localStorage.setItem("todoEntries", JSON.stringify(entries));
}
export function removeTodoEntry(entryId: number) {
  const entries = fetchTodoEntries();
  const entryToRemoveIndex = entries.findIndex(({ id }) => id === entryId);
  if (entryToRemoveIndex !== -1) {
    entries.splice(entryToRemoveIndex, 1);
  }
  localStorage.setItem("todoEntries", JSON.stringify(entries));
}
export function updateTodoEntry({
  entryId,
  newValue,
}: {
  entryId: number;
  newValue: string;
}) {
  const entries = fetchTodoEntries();
  const entryToUpdateIndex = entries.findIndex(({ id }) => id === entryId);
  entries[entryToUpdateIndex].value = newValue;
  localStorage.setItem("todoEntries", JSON.stringify(entries));
}
export function getTodoEntryList() {
  const entries = fetchTodoEntries();
  return entries;
}

function fetchTodoEntries() {
  const entries: TodoEntry[] = JSON.parse(
    localStorage.getItem("todoEntries") || "[]"
  );

  return entries;
}
