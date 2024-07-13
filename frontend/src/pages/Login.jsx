import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helper";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      })

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    }
    catch (error) {
      
      console.log(error.response.data)
      setError(error.response.data)
    }
  };
  return (
    <div>
      <Navbar  />

      <div className="flex justify-center items-center mt-20 p-5">
        <div className="bg-sky-700 px-7 py-7 border border-blue-950 rounded-md w-96">
          <form onSubmit={handleLogin}>
            <h2 className="mb-2 font-medium text-white text-xl">Login</h2>
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
            <button className="btn-primary">Login</button>
            <p className="mt-2 text-sm text-white">
              Donot have an account?
              <Link
                to="/signup"
                className="ml-2 text-blue-100 underline underline-offset-2"
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
