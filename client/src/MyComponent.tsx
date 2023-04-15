import { trpc } from "./App";

export function MyComponent() {
  const sayHelloQuery = trpc.sayHello.useQuery({ name: "Jack" });

  return sayHelloQuery.isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>{sayHelloQuery.data}</div>
  );
}
