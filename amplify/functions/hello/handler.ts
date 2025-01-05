import { Schema } from "../../data/resource";

export const handler: Schema["sayHello"]["functionHandler"] = async (event) => {
  const { name } = event.arguments;
  const response = {
    message: `Hello, ${name} from AWS!`,
  };
  return JSON.stringify(response);
};
