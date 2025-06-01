import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export default function UpdatePrivilegesPage({ user }) {
  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState("");

  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/updateUserPrivileges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus(`✅ ${data.message}`);
    } else {
      setStatus(`❌ Fehler: ${data.error || "Unbekannter Fehler"}`);
    }
  }

  if (user?.privileges?.dev) {
    return (
      <main>
        <StyledForm onSubmit={handleUpdate}>
          <h2>Benutzer-Prüfung & -Aktualisierung</h2>
          <input
            placeholder="Admin Secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <br />
          <button type="submit">Alle User-Priviligien aktualisieren</button>
          {status && <p>{status}</p>}
        </StyledForm>
      </main>
    );
  }

  return <p>❌ Nicht autorisiert</p>;
}
