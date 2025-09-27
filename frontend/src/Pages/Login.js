import "../App.css";
import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const { error, isLoading, login } = useLogin(setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-container w-screen h-screen flex justify-center items-center">
      <div className="w-80 h-80 bg-white shadow-xl rounded-lg">
        <h1
          className="text-center mt-5"
          style={{ fontFamily: "open-sans-bold" }}
        >
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex items-center flex-col"
        >
          <div className="relative w-64">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="username"
              name="username"
              placeholder=" "
              className="peer w-full border-b-2 border-b-gray-300 bg-transparent px-2 pt-5 pb-2 text-sm 
               focus:border-b-black focus:outline-none transition-all duration-300 ease-out"
            />
            <label
              htmlFor="username"
              className="absolute left-3 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Username
            </label>
          </div>
          <div className="relative w-64 mt-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              placeholder=" "
              className="peer w-full border-b-2 border-b-gray-300 bg-transparent px-2 pt-5 pb-2 text-sm 
               focus:border-b-black focus:outline-none transition-all duration-300 ease-out"
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="mt-8 px-7 py-3 rounded-full"
            style={{ backgroundColor: "#E4EFE7" }}
          >
            Log-in
          </button>
        </form>
      </div>
      {error ? <p>{error}</p> : null}
    </div>
  );
};
export default Login;
