import { useRouter } from "next/router";
export default function Dev() {
  const router = useRouter();
  return (
    <main>
      <p>Dev</p>
      <button onClick={() => router.push("/dev/updatePrivileges")}>
        Update Privileges
      </button>
    </main>
  );
}
