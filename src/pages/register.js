import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, secret }),
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
      <button type="submit">Benutzer erstellen</button>
    </form>
  );
}
