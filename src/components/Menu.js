import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";

// Animations
const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-100%);
  }
`;

// Styled Components
const BurgerButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  padding: 0;
  cursor: pointer;
  z-index: 900;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  gap: 2rem;
  z-index: 1000;

  animation: ${({ isClosing }) => (isClosing ? slideUp : slideDown)} 0.3s
    forwards;
`;

const StyledMenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default function Menu({ user }) {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      <BurgerButton onClick={() => setOpen(true)} aria-label="Open menu">
        ☰
      </BurgerButton>

      {open && (
        <Overlay isClosing={isClosing}>
          <BurgerButton
            onClick={closeMenu}
            aria-label="Close menu"
            style={{ alignSelf: "flex-end", marginRight: "1rem" }}
          >
            ✕
          </BurgerButton>

          <StyledMenuButton
            onClick={() => {
              closeMenu();
              router.push("/");
            }}
          >
            Home
          </StyledMenuButton>
          <StyledMenuButton
            onClick={() => {
              closeMenu();
              router.push("/attendance");
            }}
          >
            Anwesenheit
          </StyledMenuButton>
          <StyledMenuButton
            onClick={() => {
              closeMenu();
              router.push("/dashboard");
            }}
          >
            Dashboard
          </StyledMenuButton>
          <StyledMenuButton onClick={() => handleLogout()}>
            Logout
          </StyledMenuButton>
          {user.privileges.admin && (
            <StyledMenuButton
              onClick={() => {
                closeMenu();
                router.push("/admin");
              }}
              style={{ color: "red" }}
            >
              Admin
            </StyledMenuButton>
          )}

          {user.privileges.dev && (
            <StyledMenuButton
              onClick={() => {
                closeMenu();
                router.push("/dev");
              }}
              style={{ color: "red" }}
            >
              Dev
            </StyledMenuButton>
          )}
        </Overlay>
      )}
    </>
  );
}
