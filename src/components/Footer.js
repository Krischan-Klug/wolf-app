import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 10vh;
`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <StyledFooter>
      <p>KK &copy; {year} All rights reserved</p>
    </StyledFooter>
  );
}
