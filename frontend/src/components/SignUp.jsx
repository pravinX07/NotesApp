import { Link } from "react-router-dom";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import axios from "axios"

const SignUp = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()


  const handleSubmit = async() => {
    
   try {
     const res = await axios.post("http://localhost:8000/api/signup",{
         username,
         email,
         password
     })
     console.log("signup successfull",res)
     if(res.data.token){
       setToken(res.data.token)
     }
     navigate("/login")
   } catch (error) {
    console.log("Sign Up failed ", error.message)
    alert("Signup Falied", error.message)
   }
  }
  return (
    <div className="bg-gray-500 h-screen  flex justify-center items-center">
      <div className="bg-gray-700  p-8 flex flex-col rounded-lg w-full max-w-md items-center ">
        <h2 className="text-white text-2xl font-medium m-6">Sign Up</h2>

        <input
          value={username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="username"
          type="text"
          className="w-full p-2 m-2  rounded border border-gray-400  text-gray-100 "
        />
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Email"
          type="email"
          className="w-full p-2 m-2  rounded border border-gray-400  text-gray-100 "
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          className="w-full p-2 m-3  rounded border border-gray-400  text-gray-100 "
        />
        <button 
        onClick={handleSubmit}
        className="bg-blue-500 m-3 w-full px-3 py-1 rounded-lg text-white font-bold hover:bg-blue-600 transition duration 3s ease">
          Sign Up
        </button>
        <p className="text-gray-400 ">
          Already have an account ?{" "}
          <Link className="underline text-blue-400" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
