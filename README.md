# WolfApp

WolfApp ist eine speziell entwickelte Webanwendung für eine geschlossene Nutzergruppe, die besonderen Wert auf Sicherheit und einfache Bedienbarkeit legt. Sie bietet ein schlankes und robustes Login-System, das auf JWT-Authentifizierung basiert und komplett ohne NextAuth auskommt. Die App ermöglicht es den Benutzern, ihre Anwesenheit an bestimmten Tagen gezielt und kontrolliert zu bestätigen – ideal für Organisationen oder Gruppen, die eine verlässliche Anwesenheitsübersicht benötigen.

Durch die Beschränkung der Registrierung auf eine geheime Admin-Seite wird sichergestellt, dass nur autorisierte Personen Zugang erhalten können. Alle Benutzerdaten und Anwesenheitsinformationen werden sicher in einer MongoDB-Datenbank gespeichert, während die Anwendung mit Next.js moderne Webstandards nutzt, um Performance und Benutzerfreundlichkeit zu gewährleisten.

WolfApp legt großen Wert auf Datenschutz und Sicherheit: Passwörter werden sicher gehasht, Sessions mit JWT-Tokens in HTTP-Only-Cookies geschützt und sensible Aktionen sind durch Secrets abgesichert. Damit ist die App sowohl für kleine Teams als auch für größere Nutzergruppen eine zuverlässige und leicht erweiterbare Lösung.

---

## Technologien

- **Next.js (Pages Router)** – React-basiertes Framework für Server-Side Rendering und API-Routen
- **MongoDB Atlas** – Cloud-Datenbank für Benutzer- und Anwesenheitsdaten
- **JWT (JSON Web Tokens)** – Sichere Authentifizierung und Session-Handling ohne NextAuth
- **bcrypt** – Passwort-Hashing zur sicheren Speicherung von Benutzerpasswörtern
- **Node.js** – Server-Umgebung für API-Routen und Backend-Logik

---

## Features

- Sicheres Login-System mit JWT und Cookie-Authentifizierung
- Geschützte Admin-Registrierung für neue Benutzer
- Anwesenheitsbestätigung nur an definierten Tagen und Zeiten
- Modularer Codeaufbau für einfache Erweiterung
- Fokus auf Datenschutz und Sicherheit

---

## Anwendungsfälle

WolfApp eignet sich hervorragend für private Gruppen und kleine Runden, die sich regelmäßig treffen möchten – beispielsweise Freundeskreise, die sich zum Essen, Spieleabend oder einfach zum Austausch verabreden. Auch kleine Vereine oder Teams können damit unkompliziert ihre Anwesenheit erfassen und so einen guten Überblick behalten. Durch die geschützte Registrierung und den Fokus auf Sicherheit ist die App ideal für vertrauliche und geschlossene Gemeinschaften.

---

## Kontakt

Bei Fragen, Feedback oder Problemen melde dich gern.

---

## Lizenz

MIT License
