import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Time to get started!
      </h1>
      <Link href="/meals">Meal Page</Link>
      <Link href="/meals/share">Meal Share Page</Link>
      <Link href="/community">Community Page</Link>
    </main>
  );
}
