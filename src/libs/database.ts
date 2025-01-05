import type { Schema } from "@amplify/data/resource";
import outputs from "@root/amplify_outputs.json";
import { ToDoItem } from "@/shared/types/ToDoItem";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";

Amplify.configure(outputs);

const client = generateClient<Schema>();

const getTodoList = async () => {
  const resource = await client.models.Todo.list();

  const todoList = resource.data.map((item) => {
    return {
      id: item.id,
      content: item.content,
      done: item.done,
    } as ToDoItem;
  });

  return todoList;
};

const createTodo = async (content: string) => {
  await client.models.Todo.create({
    content,
    done: false,
  });
};

const Database = {
  getTodoList,
  createTodo,
};

export default Database;
