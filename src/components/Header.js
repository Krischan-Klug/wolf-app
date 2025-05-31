import styled from "styled-components";

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

export default function Header() {
  return (
    <StyledHeader>
      <StyledHeaderIcons>Wolf</StyledHeaderIcons>
      <StyledHeaderIcons>///</StyledHeaderIcons>
    </StyledHeader>
  );
}
