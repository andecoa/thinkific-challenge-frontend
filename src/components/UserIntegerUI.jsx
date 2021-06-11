import { useState, useEffect } from "react";

export default function UserIntegerUI({ accessToken }) {
  const [userInteger, setUserInteger] = useState();
  const [newInteger, setNewInteger] = useState(null);

  useEffect(() => {
    const getUserInteger = async () => {
      const res = await fetch("http://localhost:8001/v1/current", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      setUserInteger(data.value);
    };
    getUserInteger();
  }, [accessToken]);

  const increment = async () => {
    const res = await fetch("http://localhost:8001/v1/next", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    setUserInteger(data.value);
  };

  const resetInteger = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8001/v1/current", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newInteger: parseInt(newInteger, 10) }),
    });
    const data = await res.json();
    setUserInteger(data.value);
  };

  return (
    <div>
      <h2>Your integer value is:</h2>
      <strong>{userInteger}</strong>
      <button type="button" onClick={() => increment()}>
        Increment integer
      </button>
      <form onSubmit={(e) => resetInteger(e)}>
        <input
          type="text"
          placeholder="Place non-negative integer here"
          value={newInteger}
          onChange={(e) => setNewInteger(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
