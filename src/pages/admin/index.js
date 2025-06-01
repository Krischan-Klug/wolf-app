import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();
  return (
    <main>
      <p>Admin</p>
      <button onClick={() => router.push("/register")}>Register</button>
    </main>
  );
}
