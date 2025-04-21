import { Navigate, Outlet } from "react-router-dom"
import { UseShopingCartContext } from "../context/context"

function PrivateRoute() {
  const {isLogin} = UseShopingCartContext()
  return (
    <>
    {
      isLogin ? <Outlet /> : <Navigate to={"/login"}/>
    }
    </>
  )
}

export default PrivateRoute