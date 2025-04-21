import Navbar from "../Navbar/Navbar"

function Layout({children}:{children:React.ReactNode}) {
  return (
    <div>
       <Navbar/>
    <div className="mx-auto container">
        {children}
    </div>
    </div>
  )
}

export default Layout