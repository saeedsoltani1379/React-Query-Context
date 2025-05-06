import { Link } from "react-router-dom"

function WellCome() {
  return (
    <div className="flex flex-col text-center space-y-6">
        <h1 className="text-2xl font-bold ">wellcome to shop</h1>
        <div>
        <button className="bg-black text-white rounded-lg px-6 py-4 text-lg">
            <Link to={"/products"}>products</Link>
        </button>
        </div>
    </div>
  )
}

export default WellCome