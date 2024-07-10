import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const signup = async ({ email, name, password, confirmPassword }) => {
    setLoading(true);
    try {
      const res = await fetch("/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        toast.success("Signed up successfully");
      } else {
        toast.error(data.message || "Failed to signup");
      }
    } catch (error) {
      console.error(error);
      toast.error("Signup unsuccessful");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
