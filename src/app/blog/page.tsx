//ダミーデータ
const articles = [
  {
    id: 1,
    title: "タイトル1",
  },
  {
    id: 2,
    title: "タイトル2",
  },
  {
    id: 3,
    title: "タイトル2",
  },
];

//3秒待機
async function fetchArticles() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  //   throw new Error("エラーが発生");
  return articles;
}

export default async function blogPage() {
  const aticles = await fetchArticles();

  return (
    <div>
      <ul>
        {aticles.map((article) => (
          <li key={article.id}>title:{article.title}</li>
        ))}
      </ul>
    </div>
  );
}
