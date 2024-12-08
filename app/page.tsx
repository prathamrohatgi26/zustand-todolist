import React from "react";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
import { AddTodoDialog } from "@/components/dialog/AddTodoDIalog";

const App = () => {
  return (
    <div className="sm:mx-auto max-w-md sm:my-8">
      <Header />
      <div className="mx-2 sm:mx-0">
        <TodoList />
      </div>
      <div className="w-full grid place-items-center">
        <AddTodoDialog />
      </div>
    </div>
  );
};

export default App;
