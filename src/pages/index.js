import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <p>Willkommen</p>
      <p>Lorem ipsum</p>
    </main>
  );
}
