"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CliantComponent() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  console.log("Cliant");
  return (
    <div>
      client
      <button onClick={() => setCount(count + 1)}>count:{count}</button>
      <Link href="/about">About</Link>　{/*プリフェッチ機能あり*/}
      <button onClick={() => router.push("/about")}>About</button>　
      {/*プリフェッチ機能なし*/}
    </div>
  );
}
