import AttendanceForm from "@/components/AttendanceForm";
import LogoutButton from "@/components/LogoutButton";
import { useRouter } from "next/router";

import styled from "styled-components";

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 90vh;
`;

const StyledMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

export default function Home() {
  const router = useRouter();
  return (
    <StyledContentWrapper>
      <h1>HOME</h1>
      <AttendanceForm />
      <StyledMenu>
        <button onClick={() => router.push("/register")}>REGISTER</button>
        <LogoutButton />
      </StyledMenu>
    </StyledContentWrapper>
  );
}
