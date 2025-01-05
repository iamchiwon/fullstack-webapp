"use client";

import Database from "@/libs/database";
import { ToDoItem } from "@/shared/types/ToDoItem";
import { useEffect, useState } from "react";

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<ToDoItem[]>([]);

  const handleGreeting = async () => {
    const response = await fetch("/api/hello");
    const data = await response.json();
    setGreeting(data.message);
  };

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

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleGreeting}
      >
        Greeting
      </button>
      <div>{greeting}</div>
      <div className="pt-4">
        <div className="text-2xl font-bold">Todo List</div>
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
              <input type="checkbox" checked={todo.done} readOnly />
              {todo.content}
              <button className="text-red-500 ml-4 font-bold">DEL</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
