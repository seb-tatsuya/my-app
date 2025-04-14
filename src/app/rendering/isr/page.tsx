import Image from "next/image";
export const revalidate = 10; //ISR 10秒ごとに再生成

export default async function SSGPage() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random", {
    next: { revalidate: 10 },
  });
  const resJson = await res.json();
  const image = resJson.message;

  const timestamp = new Date().toISOString();

  return (
    <div>
      ISR 10秒毎にリロード: {timestamp}
      <Image src={image} width={400} alt="" />
    </div>
  );
}
