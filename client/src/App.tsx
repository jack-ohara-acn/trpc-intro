import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { AppRouter } from "../../server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MyComponent } from "./MyComponent";
import { CreateNewThing } from "./CreateNewThing";

export const trpc = createTRPCReact<AppRouter>();

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://127.0.0.1:3000",
        }),
      ],
    })
  );

  return (
    <div className="App">
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>

          <MyComponent />

          <CreateNewThing />
        </QueryClientProvider>
      </trpc.Provider>
    </div>
  );
}

export default App;
