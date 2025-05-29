import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledAdminMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 300px;
  height: 200px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  z-index: 1000;
`;

const StyledMenuWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export default function AdminMenu() {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const router = useRouter();

  const toggleAdminMenu = () => {
    setShowAdminMenu(!showAdminMenu);
  };

  return (
    <>
      <button onClick={toggleAdminMenu}>Admin Menu</button>

      {showAdminMenu && (
        <StyledMenuWrapper onClick={toggleAdminMenu}>
          {
            <StyledAdminMenu>
              <button onClick={() => router.push("/register")}>REGISTER</button>
            </StyledAdminMenu>
          }
        </StyledMenuWrapper>
      )}
    </>
  );
}
