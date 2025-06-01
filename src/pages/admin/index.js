import { useRouter } from "next/router";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 40vh;
`;
export default function Admin({ user }) {
  const router = useRouter();

  if (user.privileges.admin) {
    return (
      <main>
        <div>
          <h2>Admin Menu</h2>
          <StyledContainer>
            <button onClick={() => router.push("/admin/register")}>
              Register
            </button>
            <button onClick={() => router.push("/admin/privilegeEditor")}>
              Privilege Editor
            </button>
          </StyledContainer>
        </div>
      </main>
    );
  }

  return <p>Nicht autorisiert</p>;
}
