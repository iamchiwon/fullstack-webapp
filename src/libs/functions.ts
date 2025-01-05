import { Schema } from "@amplify/data/resource";
import outputs from "@root/amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";

Amplify.configure(outputs);

const client = generateClient<Schema>();

const sayHello = async ({ name }: { name: string }) => {
  const response = await client.queries.sayHello({ name });
  if (!response.data || typeof response.data !== "string") {
    throw new Error("Invalid response");
  }
  return {
    text: () => response.data,
    json: () => JSON.parse(response.data ?? "{}"),
  };
};

const Functions = {
  sayHello,
};

export default Functions;
