import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, secret, isAdmin }),
    });

    if (res.ok) alert("Benutzer erstellt");
    else alert("Fehlgeschlagen");
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
      <label>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        Adminrechte
      </label>
      <button type="submit">Benutzer erstellen</button>
    </form>
  );
}
