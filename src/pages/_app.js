import { useEffect, useState } from "react";
import "../styles/globals.css";
import LoginForm from "@/components/LoginForm";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
      setLoading(false);
    }
    fetchSession();
  }, []);

  if (loading) {
    return <div>Lade...</div>;
  }

  if (user) {
    return <Component {...pageProps} />;
  } else {
    return <LoginForm onLoginSuccess={(user) => setUser(user)} />;
  }
}
