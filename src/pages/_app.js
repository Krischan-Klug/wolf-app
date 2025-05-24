import { useEffect, useState } from "react";
import "../styles/globals.css";
import Login from "@/components/Login";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    }
    fetchSession();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (!user) {
    return <Login />;
  }

  if (user) {
    return <Component {...pageProps} />;
  }
}
