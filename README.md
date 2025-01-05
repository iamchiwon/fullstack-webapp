# Fullstack WebApp Example

Next.js App on Amplify

- Use Next.js frontend/backend API
- With Amplify:
  - Use database
  - Use storage
  - Use function
  - Use authentication

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
