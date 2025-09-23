import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = (setUser) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const appUrl = process.env.REACT_APP_APPURL;

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      setUser(json);

      setIsLoading(false);
      navigate("/");
    }
  };

  return { error, isLoading, login };
};
