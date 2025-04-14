"use client";
import { useState } from "react";

export default function ClientComponent() {
  const [count, setCount] = useState(0);

  console.log("Cliant");
  return (
    <div>
      client
      <button onClick={() => setCount(count + 1)}>count:{count}</button>
    </div>
  );
}
