import { useState } from "react";

// Die Privilegien-Struktur definieren – sollte mit dem Schema übereinstimmen
const AVAILABLE_PRIVILEGES = ["admin", "moderator", "guest"];

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [privileges, setPrivileges] = useState({
    admin: false,
    moderator: false,
    guest: true, // default z. B. für Selbstregistrierung
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
      // Optionale Rücksetzung:
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

  return (
    <form onSubmit={handleRegister}>
      <input
        placeholder="Admin Secret"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
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

      <button type="submit">Benutzer erstellen</button>
    </form>
  );
}
