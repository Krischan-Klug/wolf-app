import { useState } from "react";

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
    <form onSubmit={handleLogin}>
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
    </form>
  );
}
