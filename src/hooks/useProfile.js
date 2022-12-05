import { useEffect, useState } from "react";

export function useProfile(id) {
  const start = {
    email: "tv@gmail.com",
    nickname: "username",
    avatar: "avatar",
  };

  const [datos, setData] = useState(start);

  const [resync, reFetch] = useState(true);

  useEffect(() => {
    fetch("https://ecommerce-frontend-30b.vercel.app/users/profile/" + id, { method: "GET" })
      .then((answer) => answer.json())
      .then((answerjs) => setData(answerjs));
  }, [id, resync]);

  return { datos, reFetch, resync };
}
