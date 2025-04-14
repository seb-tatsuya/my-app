import ClientComponent from "@/components/ClientComponent";
import Link from "next/link";

export default function ServerComponent() {
  console.log("Server");
  return (
    <div>
      Server
      <ClientComponent />
      <Link href="/about">About</Link>{" "}
      {/*ServerComponenntotが表示されたときにAbout画面もプリフェッチされる*/}
    </div>
  );
}
