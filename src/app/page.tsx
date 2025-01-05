"use client";

import { useState } from "react";
import { ToDoList } from "./ToDoList";
import { FileList } from "./FileList";
import Functions from "../libs/functions";
export default function Home() {
  const [greeting, setGreeting] = useState("");

  const handleGreeting = async () => {
    const response = await fetch("/api/hello");
    const data = await response.json();
    setGreeting(data.message);
  };

  const handleGreeting2 = async () => {
    const response = await Functions.sayHello({ name: "Amplify" });
    const data = response.json();
    setGreeting(data.message);
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 items-center">
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleGreeting}
        >
          Greeting
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleGreeting2}
        >
          Greeting
        </button>
      </div>
      <div>{greeting}</div>
      <ToDoList />
      <FileList />
    </div>
  );
}
