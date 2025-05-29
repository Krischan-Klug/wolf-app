import { useState } from "react";
import styled from "styled-components";
import { getTokenFromRequest } from "@/lib/auth";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 90vh;
`;

const AVAILABLE_PRIVILEGES = ["admin", "moderator", "guest"];

export default function RegisterPage({ user }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [privileges, setPrivileges] = useState({
    admin: false,
    moderator: false,
    guest: true,
  });

  function togglePrivilege(role) {
    setPrivileges((prev) => ({
      ...prev,
      [role]: !prev[role],
    }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, secret, privileges }),
    });

    if (res.ok) {
      alert("Benutzer erstellt");
      setUsername("");
      setPassword("");
      setSecret("");
      setPrivileges({
        admin: false,
        moderator: false,
        guest: true,
      });
    } else {
      alert("Fehlgeschlagen");
    }
  }

  if (user.privileges.admin) {
    return (
      <StyledContentWrapper>
        <StyledForm onSubmit={handleRegister}>
          <input
            placeholder="Benutzername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            placeholder="Passwort"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <fieldset>
            <legend>Privilegien</legend>
            {AVAILABLE_PRIVILEGES.map((role) => (
              <label key={role} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={privileges[role] || false}
                  onChange={() => togglePrivilege(role)}
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </fieldset>
          <br />
          <input
            placeholder="Admin Secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <br />
          <button type="submit">Benutzer erstellen</button>
        </StyledForm>
      </StyledContentWrapper>
    );
  }
  return (
    <>
      <p>Nicht autorisiert</p>
    </>
  );
}
