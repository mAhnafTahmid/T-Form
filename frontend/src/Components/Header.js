import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const handleLogout = async () => {
    try {
      const res = await fetch("/user/logout", {
        method: "DELETE",
      });
      await res.json();
      if (res.success) {
        localStorage.removeItem("user");
        toast.success("Logout successful");
        console.log("Logout successful");
        navigate("/login");
      } else {
        console.log("Logout unsuccessful");
        toast.error("Logout unsuccessful");
      }
    } catch (error) {
      console.log("Unable to logout");
      toast.error("Unable to logout");
    }
  };
  return (
    <div className="navbar bg-base-100 fixed z-50">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">
          T-From
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/signup">Signup</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
