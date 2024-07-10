import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await fetch("/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        toast.success("Login successful");
      } else {
        toast.error(data.message || "Failed to login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login unsuccessful");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
