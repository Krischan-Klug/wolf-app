import styled from "styled-components";
import Menu from "./Menu";
import { useRouter } from "next/router";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
`;

const StyledHeaderIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export default function Header({ user }) {
  const router = useRouter();
  return (
    <StyledHeader>
      <StyledHeaderIcons onClick={() => router.push("/")}>
        Wolf
      </StyledHeaderIcons>
      <StyledHeaderIcons>
        <Menu user={user} />
      </StyledHeaderIcons>
    </StyledHeader>
  );
}
