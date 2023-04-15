import { useState } from "react";
import { trpc } from "./App";

export function CreateNewThing() {
  const [newThingName, setNewThingName] = useState("");

  const createNewThingMutation = trpc.things.add.useMutation();

  return (
    <form>
      <input
        type="text"
        value={newThingName}
        onChange={(event) => setNewThingName(event.target.value)}
        placeholder="New thing name"
      />

      <button
        type="button"
        onClick={() => createNewThingMutation.mutate({ name: newThingName })}
      >
        Add new thing
      </button>

      {createNewThingMutation.data && (
        <pre>{JSON.stringify(createNewThingMutation.data, null, 2)}</pre>
      )}
    </form>
  );
}
