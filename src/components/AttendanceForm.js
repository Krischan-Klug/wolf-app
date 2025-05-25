// components/AttendanceForm.js
import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
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
        <label className="ml-4">
          <input
            type="radio"
            name="status"
            value="abwesend"
            checked={status === "abwesend"}
            onChange={() => setStatus("abwesend")}
          />
          Abwesend
        </label>
      </div>

      {status === "abwesend" && (
        <div>
          <label>Grund der Abwesenheit:</label>
          <textarea
            className="w-full border p-2"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Eintragen
      </button>

      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}
