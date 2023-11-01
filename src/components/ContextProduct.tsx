import { createContext, useContext} from "react";
import { ProductData } from "./DataProduct";


export const ContextProduct = createContext(ProductData);

const useProductContext = () => 
{
    return useContext(ContextProduct);   
};

export {useProductContext};