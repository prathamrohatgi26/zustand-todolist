"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useTodoStore from "@/store/todoStore";
import { Todo } from "@/types/todo";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

export function AddTodoDialog() {
  const { toast } = useToast();
  const { addTodo, selectedDate } = useTodoStore();
  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState<Partial<Todo>>({
    title: "",
    description: "",
    importance: "low",
  });

  const handleAddTodo = () => {
    if (newTodo.title?.trim() !== "") {
      const formattedDate = selectedDate;
      console.log(formattedDate);
      addTodo({
        ...newTodo,
        createdAt: formattedDate,
        completed: false,
      } as Todo);
      setNewTodo({
        title: "",
        description: "",
        importance: "low",
      });
      setOpen(false);
      toast({
        title: "Success",
        description: "New task added successfully!",
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid title",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-3 rounded-full shadow-xl">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[95%]">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>Add a new todo to your list</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={newTodo.title || ""}
              onChange={(e) =>
                setNewTodo((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Add a new task"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <textarea
              id="description"
              value={newTodo.description || ""}
              onChange={(e) =>
                setNewTodo((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Add a description"
              className="col-span-3 w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="importance" className="text-right">
              Importance
            </Label>
            <select
              id="importance"
              value={newTodo.importance || "low"}
              onChange={(e) =>
                setNewTodo((prev) => ({
                  ...prev,
                  importance: e.target.value as "high" | "medium" | "low",
                }))
              }
              className="col-span-3 w-full px-3 py-2 border rounded-md"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddTodo}>
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
