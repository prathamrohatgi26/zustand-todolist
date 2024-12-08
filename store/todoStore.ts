import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Todo } from "../types/todo";

const useTodoStore = create(
  persist<{
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
  }>(
    (set) => ({
      todos: [],
      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, { ...todo, id: crypto.randomUUID() }],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      selectedDate: new Date().toLocaleDateString("en-GB"),
      setSelectedDate: (date) => set({ selectedDate: date }),
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => localStorage),
      //@ts-ignore
      partialize: (state) => ({ todos: state.todos }),
    }
  )
);

export default useTodoStore;
