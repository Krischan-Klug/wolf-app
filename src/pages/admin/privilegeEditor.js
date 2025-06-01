import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PrivilegeList = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function PrivilegeEditor() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch(`/api/users?search=${search}`);
    const data = await res.json();
    setUsers(data);
  };

  const togglePrivilege = async (key) => {
    const updated = {
      ...selected.privileges,
      [key]: !selected.privileges[key],
    };

    const res = await fetch(`/api/users/${selected._id}/privileges`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ privileges: updated }),
    });

    const data = await res.json();
    setSelected(data);
  };

  return (
    <Wrapper>
      <h2>Benutzerrechte bearbeiten</h2>
      <SearchRow>
        <Input
          type="text"
          placeholder="Benutzername"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={fetchUsers}>Suchen</Button>
      </SearchRow>

      <UserList>
        {users.map((user) => (
          <li key={user._id}>
            <Button onClick={() => setSelected(user)}>{user.username}</Button>
          </li>
        ))}
      </UserList>

      {selected && (
        <PrivilegeList>
          <h3>Privilegien für {selected.username}</h3>
          {Object.entries(selected.privileges).map(([key, val]) => (
            <CheckboxRow key={key}>
              <input
                type="checkbox"
                checked={val}
                onChange={() => togglePrivilege(key)}
              />
              {key}
            </CheckboxRow>
          ))}
        </PrivilegeList>
      )}
    </Wrapper>
  );
}
