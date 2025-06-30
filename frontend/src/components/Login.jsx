import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async() => {
    try {
      const res = await axios.post("http://localhost:8000/api/login",{
        email,
        password
      })
      console.log(res)

      if(res.data.token){
        setToken(res.data.token)
      }
      
      navigate("/")
    } catch (error) {
      console.log("Login Failed", error.message)
      alert("Login Failed" ,error.message)
    }

  }
  return (
    <div className="bg-gray-500 h-screen  flex justify-center items-center">
      <div className="bg-gray-700  p-8 flex flex-col rounded-lg w-full max-w-md items-center ">
        <h2 className="text-white text-2xl font-medium m-6">Login</h2>
        <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="w-full p-2 mb-2  rounded border border-gray-400  text-gray-100 "
        />
        <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          className="w-full p-2 m-3  rounded border border-gray-400  text-gray-100 "
        />
        <button onClick={handleLogin} className="bg-blue-500 m-3 w-full px-3 py-1 rounded-lg text-white font-bold hover:bg-blue-600 transition duration 3s ease">
          Login
        </button>
        <p className="text-gray-400  ">
          Dont have an account ? {" "} <Link className="underline text-blue-400" to={"/"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
