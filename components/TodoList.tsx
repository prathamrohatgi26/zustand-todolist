"use client";
import React from "react";
import useTodoStore from "../store/todoStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";

const TodoList = () => {
  const { todos, toggleTodo, removeTodo, selectedDate } = useTodoStore();
  return (
    <div className="my-4 max-w-2xl mx-auto">
      <ul className="space-y-2 max-h-[45vh] hide-scrollbar pb-5 overflow-y-auto">
        {todos
          .filter((todo) => todo.createdAt === selectedDate)
          .map((todo, index) => (
            <li
              key={index}
              className={`flex items-center relative justify-between p-4 rounded-lg shadow-md hover:shadow-xl ${
                todo.completed
                  ? "bg-gray-100 opacity-75"
                  : todo.importance === "high"
                  ? "hover:bg-red-200"
                  : todo.importance === "medium"
                  ? "hover:bg-orange-200"
                  : "hover:bg-yellow-200"
              }`}
            >
              <span
                className={`absolute left-0 top-0 w-2 h-full ${
                  todo.importance === "high"
                    ? "bg-red-200"
                    : todo.importance === "medium"
                    ? "bg-orange-200"
                    : "bg-yellow-200"
                }`}
              />
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <div className="flex flex-col">
                  <p
                    className={`text-lg font-semibold text-gray-800 capitalize ${
                      todo.completed ? "line-through opacity-60" : ""
                    }`}
                  >
                    {todo.title}
                  </p>
                  <p
                    className={`text-sm text-gray-600 mt-1 ${
                      todo.completed ? "line-through opacity-60" : ""
                    }`}
                  >
                    {todo.description}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeTodo(todo.id)}
              >
                Remove
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
