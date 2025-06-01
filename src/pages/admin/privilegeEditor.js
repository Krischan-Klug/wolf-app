import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 10vh 2rem;
  padding-bottom: 0vh;
  max-width: 700px;
  margin: 0 auto;
`;

const UserCard = styled.div`
  border: 1px solid #444;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #111;
  color: #eee;
`;

const PrivilegeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const SearchWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #666;
  background: #222;
  color: #fff;
`;

const SearchButton = styled.button`
  border-radius: 8px;
  background: #444;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background: #666;
  }
`;

const SecretInput = styled.input`
  width: 100%;
  padding: 0.6rem;
  margin: 1rem 0;
  border-radius: 8px;
  border: 1px solid #999;
  background: #1c1c1c;
  color: #eee;
`;

const StatusText = styled.p`
  margin-top: 0.5rem;
  color: ${({ success }) => (success ? "#0f0" : "#f44")};
`;

export default function PrivilegeManager() {
  const [users, setUsers] = useState([]);
  const [secret, setSecret] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchUsers = async () => {
    const query = search.trim();
    const res = await fetch(`/api/users?search=${query}`);
    const data = await res.json();
    setUsers(data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handlePrivilegeChange = (userIndex, key) => {
    const updatedUsers = [...users];
    updatedUsers[userIndex].privileges[key] =
      !updatedUsers[userIndex].privileges[key];
    setUsers(updatedUsers);
  };

  const savePrivileges = async (userId, privileges) => {
    setStatus("");
    const res = await fetch(`/api/users/${userId}/privileges`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ privileges, secret }),
    });

    const result = await res.json();
    if (res.ok) {
      setStatus(`✅ ${result.message}`);
    } else {
      setStatus(`❌ ${result.error || "Fehler"}`);
    }
  };

  return (
    <Wrapper>
      <h2>🛠 Benutzerrechte verwalten</h2>

      <SecretInput
        type="password"
        placeholder="Admin Secret"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />

      <form onSubmit={handleSearch}>
        <SearchWrapper>
          <SearchInput
            placeholder="Benutzer suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchButton type="submit">Suchen</SearchButton>
        </SearchWrapper>
      </form>

      {users.map((user, i) => (
        <UserCard key={user._id}>
          <h3>{user.username}</h3>
          <PrivilegeGrid>
            {Object.keys(user.privileges).map((key) => (
              <CheckboxLabel key={key}>
                <input
                  type="checkbox"
                  checked={user.privileges[key]}
                  onChange={() => handlePrivilegeChange(i, key)}
                />
                {key}
              </CheckboxLabel>
            ))}
          </PrivilegeGrid>
          <button onClick={() => savePrivileges(user._id, user.privileges)}>
            Speichern
          </button>
        </UserCard>
      ))}

      {status && (
        <StatusText success={status.startsWith("✅")}>{status}</StatusText>
      )}
    </Wrapper>
  );
}
