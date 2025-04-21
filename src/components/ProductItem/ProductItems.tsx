import { ServerTypes } from "../servertypes/serverTypes"


type TProps= ServerTypes

function ProductItems({image,price,title}:TProps) {
  return (
    <div className="max-w-72 border mb-11 shadow-2xl transition-transform hover:scale-110 rounded-md">
        <img className="w-72 h-72" src={image}/>
        <div className="p-2">
        <h1 className="font-bold text-sm text-center">{title}</h1>
        <p className="text-center p-4 font-extrabold text-xl">{price}$</p>
        
        </div>
    </div>
  )
}

export default ProductItems