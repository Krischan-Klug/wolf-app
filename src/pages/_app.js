import "../styles/globals.css";
import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
      setAuthenticated(true);
    }
    fetchSession();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (!authenticated) {
    return (
      <main>
        <p>Authentifizierung...</p>;
      </main>
    );
  }

  if (user) {
    return (
      <>
        <Header user={user} />
        <Component {...pageProps} user={user} />
      </>
    );
  } else {
    return <LoginForm onLoginSuccess={(user) => setUser(user)} />;
  }
}
