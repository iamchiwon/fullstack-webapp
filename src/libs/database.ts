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

const deleteTodo = async (id: string) => {
  await client.models.Todo.delete({ id });
};

const toggleTodo = async (id: string) => {
  const todo = await client.models.Todo.get({ id });
  const isDone = todo.data?.done ?? true;
  await client.models.Todo.update({ id, done: !isDone });
};

const Database = {
  getTodoList,
  createTodo,
  deleteTodo,
  toggleTodo,
};

export default Database;
