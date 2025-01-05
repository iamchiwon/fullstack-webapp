import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "ExampleBucket",
  access: (allow) => ({
    "images/*": [
      allow.guest.to(["read", "write", "delete"]),
      allow.authenticated.to(["read", "write", "delete"]),
    ],
  }),
});
