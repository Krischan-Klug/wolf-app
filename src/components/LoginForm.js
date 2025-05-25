import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 10vh;
`;

const StyledMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh;
`;

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const sessionRes = await fetch("/api/auth/me");
      if (sessionRes.ok) {
        const data = await sessionRes.json();
        onLoginSuccess(data.user); // <-- Benutzer an App weitergeben
      }
    } else {
      alert("Login fehlgeschlagen");
    }
  }

  return (
    <StyledMainWrapper>
      <StyledForm onSubmit={handleLogin}>
        <input
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Passwort"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </StyledForm>
    </StyledMainWrapper>
  );
}
