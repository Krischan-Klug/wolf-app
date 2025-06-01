import "../styles/globals.css";
import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";

import Footer from "@/components/Footer";
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
    return <div>Authentifizierung...</div>;
  }

  if (user) {
    return (
      <>
        <Header user={user} />
        <Component {...pageProps} user={user} />
        <Footer />
      </>
    );
  } else {
    return <LoginForm onLoginSuccess={(user) => setUser(user)} />;
  }
}
