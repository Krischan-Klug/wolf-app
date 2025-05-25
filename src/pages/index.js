import AttendanceForm from "@/components/AttendanceForm";
import LogoutButton from "@/components/LogoutButton";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>

      <AttendanceForm />
      <LogoutButton />
    </div>
  );
}
