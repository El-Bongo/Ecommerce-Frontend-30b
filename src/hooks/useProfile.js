import { useEffect, useState } from "react";

export function useProfile(id) {
  const start = {};

  const [data, setData] = useState(start);

  useEffect(() => {
    fetch("http://localhost:3001/users/profile/" + id, { method: "GET" })
      .then((answer) => answer.json())
      .then((answerjs) => setData(answerjs));
  }, [id]);

  return data;
}
