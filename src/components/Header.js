import styled from "styled-components";
import Menu from "./Menu";
import { useRouter } from "next/router";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
  background-color: var(--color-bg);

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
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
