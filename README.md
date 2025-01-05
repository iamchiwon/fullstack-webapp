# Fullstack WebApp Example

Next.js App on Amplify

- Next.js
  - [x] frontend
  - [x] backend API
- With Amplify:
  - [x] Use database
  - [x] Use storage
  - [x] Use function
  - [ ] Use authentication
  - [ ] Resources belong to user

## Steps

### 1. create next.js app

```bash
$ npx create-next-app@latest
```

### 2. add amplify

```bash
$ npm create amplify@latest
```

(Deployed on Amplify)

### 3. Use backend API in Next.js

`/src/app/api/hello/route.ts`

```ts
export async function GET() {
  return NextResponse.json({ message: "Hello from Next.js!" });
}
```

`src/app/page.tsx`

```ts
const response = await fetch("/api/hello");
const data = await response.json();
setGreeting(data.message);
```

### 4. Use Database

#### Local test

```bash
$ npx ampx sandbox
```

`/src/libs/database.ts`

```ts
import outputs from "@root/amplify_outputs.json";

Amplify.configure(outputs);
const client = generateClient<Schema>();
```

```ts
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
```

### 5. Use Storage

`/src/libs/storage.ts`

```ts
import { uploadData } from "aws-amplify/storage";

const uploadFile = async (file: File) => {
  await uploadData({
    path: `images/${file.name}`,
    data: file,
  });
};
```

### 6. Use Functions

`/amplify/data/resource.ts`

```ts
sayHello: a
    .query()
    .arguments({ name: a.string() })
    .returns(a.string())
    .handler(a.handler.function(sayHello))
    .authorization((allow) => [allow.guest()]),
```

`/amplify/functions/hello.handler.ts`

```ts
export const handler: Schema["sayHello"]["functionHandler"] = async (event) => {
  const { name } = event.arguments;
  const response = {
    message: `Hello, ${name} from AWS!`,
  };
  return JSON.stringify(response);
};
```

`/src/libs/functions.ts`

```ts
const response = await client.queries.sayHello({ name });
```
