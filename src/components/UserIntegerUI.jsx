import { useState, useEffect } from "react";

export default function UserIntegerUI({ accessToken }) {
  const [userInteger, setUserInteger] = useState();
  const [newInteger, setNewInteger] = useState(null);

  useEffect(() => {
    const getUserInteger = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_RESOURCE_SERVER}/current`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await res.json();
      setUserInteger(data.value);
    };
    getUserInteger();
  }, [accessToken]);

  const increment = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_RESOURCE_SERVER}/next`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    setUserInteger(data.value);
  };

  const resetInteger = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESOURCE_SERVER}/current`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newInteger: parseInt(newInteger, 10) }),
      }
    );
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
