import { useEffect, useState } from "react";
import "../styles/globals.css";
import LoginForm from "@/components/LoginForm";

import Footer from "@/components/Footer";

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
    return <div>Authentifizierung...</div>;
  }

  if (user) {
    return (
      <>
        <Component {...pageProps} user={user} />
        <Footer />
      </>
    );
  } else {
    return <LoginForm onLoginSuccess={(user) => setUser(user)} />;
  }
}
