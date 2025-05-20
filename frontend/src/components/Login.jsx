const Login = () => {
 return (
    <div className="flex flex-col items-center bg-gray-50 w-[300px] h-[300px]">
      <div className="">
        <h2>Sign In</h2>
      </div>
      <div className="m-3 justify-center items-center">
        <label className="items-center m-4" id="name">Name:</label>
        <input type="text" id="name" placeholder="Enter your name" required/>
      </div>
        <label id="email">Email:</label>
        <input className="items-center m-4" type="email" placeholder="example@gmail.com" required/>
      <div className="m-4 p-2 ">
        <button className=" bg-blue-500 px-2 py-1 rounded-lg text-white hover:bg-blue-600 cursor-pointer" type="submit">Sign In</button>
      </div>
    </div>
 )
}

export default Login