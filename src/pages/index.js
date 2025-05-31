import AttendanceForm from "@/components/AttendanceForm";
import LogoutButton from "@/components/LogoutButton";
import { useRouter } from "next/router";
import AdminMenu from "@/components/AdminMenu";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

export default function Home({ user }) {
  const router = useRouter();
  return (
    <main>
      <h1>HOME</h1>
      <AttendanceForm />
      <StyledMenu>
        <LogoutButton />
      </StyledMenu>
      {user.privileges.admin && <AdminMenu />}
    </main>
  );
}
