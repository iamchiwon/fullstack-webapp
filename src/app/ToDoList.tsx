"use client";

import { useEffect, useState } from "react";
import { ToDoItem } from "../shared/types/ToDoItem";
import Database from "@/libs/database";
import { ReloadButton } from "@/components/ReloadBuitton";

export const ToDoList = () => {
  const [todoList, setTodoList] = useState<ToDoItem[]>([]);
  const [todo, setTodo] = useState("");

  const handleAddTodo = async () => {
    await Database.createTodo(todo);
    setTodo("");
    fetchTodoList();
  };

  const fetchTodoList = async () => {
    const todos = await Database.getTodoList();
    setTodoList(todos);
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const handleDeleteTodo = async (id: string) => {
    await Database.deleteTodo(id);
    fetchTodoList();
  };

  const handleToggleTodo = async (id: string) => {
    await Database.toggleTodo(id);
    fetchTodoList();
  };

  return (
    <div className="pt-4">
      <div className="flex items-center gap-4 mb-1">
        <div className="text-2xl font-bold">Todo List</div>
        <ReloadButton
          onClick={() => {
            setTodoList([]);
            fetchTodoList();
          }}
        />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add new todo"
          className="border-gray-100 border-2 rounded-md p-2"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <div className="mt-4">
        {todoList.map((todo) => (
          <div className="flex gap-2 items-center" key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggleTodo(todo.id)}
            />
            {todo.content}
            <button
              className="text-red-500 ml-4 font-bold"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              DEL
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
