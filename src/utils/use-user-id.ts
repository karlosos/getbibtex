import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export const useUserId = () => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      setUserId(savedUserId);
    } else {
      const newUserId = nanoid();
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
    }
  }, [])

  return userId;
}