export type Todo = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
  importance: "high" | "medium" | "low";
};
