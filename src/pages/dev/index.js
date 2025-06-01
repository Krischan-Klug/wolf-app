import { useRouter } from "next/router";
export default function Dev({ user }) {
  const router = useRouter();
  if (user?.privileges?.dev) {
    return (
      <main>
        <p>Dev</p>
        <button onClick={() => router.push("/dev/updatePrivileges")}>
          Update Privileges
        </button>
      </main>
    );
  }

  return <p>Nicht autorisiert</p>;
}
