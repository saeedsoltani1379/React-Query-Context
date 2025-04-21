import { useState } from "react"
import { UseShopingCartContext } from "../../components/context/context";

function Login() {
  const {handleLogin} = UseShopingCartContext()
  const [user, setuser] = useState({
    usename:"",
    password:""
  })
  const handlechange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;
    setuser({
      ...user,
      [name]:value
    })
  }
  return (
    <div className="max-w-1/2 mx-auto flex flex-col space-y-6 shadow-2xl mt-40">
      <input onChange={handlechange} className="border p-3 text-center rounded-md" type="text"  placeholder="username" name="username" value={user.usename}/>
      <input onChange={handlechange} className="border p-3 text-center rounded-md" type="text"  placeholder="password" name="password" value={user.password}/>
      <button onClick={() => handleLogin(user.usename,user.password)} className="py-2 bg-green-600  hover:bg-amber-500 hover:scale-105 delay-100 text-white rounded-md">login</button>
    </div>
  )
}

export default Login