import { createContext, useContext, useState } from "react";
import {ClienteRequest, ClienteTotal, SearchRequest, getClienteRequest,updateClienteRequest} from "../api/Cliente";

const ClienteContext = createContext();

export const useCliente = () => {
    const context = useContext(ClienteContext);
    if(!context){
        throw new Error("useTaks must be used within a TaskProvider")
    }
    return context;
}

export function ClienteProvider({children}){
    const [cliente,setCliente] = useState([])
    const [clienteTotal, setClienteTotal] = useState([])

    const registerCliente = async(cliente)=>{
        try{
            const res = await ClienteRequest(cliente)
            console.log(res)
        }catch(error){
            console.log(error)
        }
    }

    const SearchCliente = async(cliente)=>{
        try {
            const res = await SearchRequest({query:cliente});
            setCliente(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getCliente = async()=>{
        try {
            const res = await ClienteTotal();
            setClienteTotal(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getClienteUno = async(id)=>{
       try {
        const res = await getClienteRequest(id)
        return res.data;
       } catch (error) {
        console.error(error)
       }
    }
    const updateCliente = async (id,cliente)=>{
        try {
            await updateClienteRequest(id,cliente)
        } catch (error) {
            console.error(error)
        }
    }
    const clearCliente = () => {
        setCliente([]);
    }
    return(
        <ClienteContext.Provider 
            value={{
            cliente,
            registerCliente,
            SearchCliente,
            getCliente,
            clienteTotal,
            getClienteUno,
            updateCliente,
            clearCliente,
        }}
        >
            {children}
        </ClienteContext.Provider>
    )
}