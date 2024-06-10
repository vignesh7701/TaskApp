import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Name is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
      if (response.data) {
        setError(response.data);  
       }


      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-20 p-5">
        <div className="w-96 border border-blue-950 bg-sky-700 rounded-md py-7 px-10  ">
          <form onSubmit={handleSignup}>
            <h2 className="text-white text-xl font-medium mb-2 ">Sign Up</h2>
            <input
              type="text"
              className="field"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-cyan-300 text-sm">{error}</p>}
            <button type="submit" className="btn-primary">
              Sign Up
            </button>
            <p className="text-white text-sm mt-2">
              Have an account
              <Link
                to="/login"
                className="text-blue-100 underline underline-offset-2 ml-2"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
