import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();
  return (
    <main>
      <p>Admin</p>
      <button onClick={() => router.push("/register")}>Register</button>
      <button onClick={() => router.push("/admin/privilegeEditor")}>
        Privilege Editor
      </button>
    </main>
  );
}
