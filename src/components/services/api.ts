import axios from "axios";


const client = axios.create({
    baseURL:"http://localhost:8000"
})


export async function dataCategory(){
    const {data} = await client("/categories")
    return data
}

export async function dataProducts(){
    const {data} = await client("/products")
    return data
}
export async function dataProductsById(id:number){
    const {data} = await client(`/products/${id}`)
    return data
}

export async function login (username:string,password:string){
    const {data} = await client({
        method:"POST",
        url:"/login",
        data:{
            username,
            password,
        }
    })
    return data
}