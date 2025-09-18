import { useState } from "react"
import api from "../utils/axiosInterceptor"


export function UseAuth<TResponse=any, TBody=any>(url:string){
    const [data,setData]=useState<TResponse|null>(null)
    const [error,setError]=useState<string|null>(null)
    const [loading,setLoading]=useState<boolean>(false)
    
    async function AuthExecution(body:TBody){
        setLoading(true)
        setError(null)
        try{
            const response= await api.post(url,body,{withCredentials:true})
            setData(response.data)
            return response.data
        }
        catch(error:any){
            setError(error?.response?.data?.message || "something went wrong")
        }
        finally{
            setLoading(false)
        }

    }
    return {data,error,loading,AuthExecution}   
}