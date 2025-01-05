import { a } from "@aws-amplify/backend";
import { sayHello } from "./hello/resource";

export const functions = {
  sayHello: a
    .query()
    .arguments({ name: a.string() })
    .returns(a.string())
    .handler(a.handler.function(sayHello))
    .authorization((allow) => [allow.guest()]),
};
