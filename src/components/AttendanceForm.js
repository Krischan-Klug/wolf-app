import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 20vh;
`;

export default function AttendanceForm() {
  const [status, setStatus] = useState("anwesend");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/attendance/check-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, reason }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            name="status"
            value="anwesend"
            checked={status === "anwesend"}
            onChange={() => setStatus("anwesend")}
          />
          Anwesend
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="abwesend"
            checked={status === "abwesend"}
            onChange={() => setStatus("abwesend")}
          />
          Abwesend
        </label>

        {status === "abwesend" && (
          <div>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Grund fürs fotzen"
              required
            />
          </div>
        )}

        <button type="submit">Eintragen</button>

        {message && <p>{message}</p>}
      </StyledForm>
    </>
  );
}
