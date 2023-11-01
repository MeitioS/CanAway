import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProductData, Cart, CartData} from './DataProduct';

const ContextCart = createContext<{ 
  cartData: Cart[]; 
  cartAdd: (id: number) => void; 
  clearCart: () => void; 
  decreaseQuantity: (id: number) => void; 
  increaseQuantity: (id: number) => void;
  totalPrice: () => number;
} | undefined>(undefined);

export const useCart = () => 
{

  const context = useContext(ContextCart);
  if (!context) 
    {
      throw Error();
    }
  return context;

};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => 
{

  const [cartData, setCartData] = useState<Cart[]>([]);

  const cartAdd = (id: number) => 
  {
    const productToAdd = ProductData.find((product) => product.id === id);

    if (productToAdd) 
    {
      if (!cartData.some((item) => item.id === productToAdd.id)) 
      {
        const updatedCart = [...cartData, { ...productToAdd, quantity: 1}];
        setCartData(updatedCart);
        CartData.push({ ...productToAdd, quantity:1 });
      }
    } 
    
  };


  const totalPrice = () => 
  {
    let total = 0;
    for (const item of cartData) 
    {
      total += item.quantity * item.price;
    }
    return total;
  };
  

  const clearCart = () => 
  {
    setCartData([]); 
  };



  const decreaseQuantity = (id: number) => {
    const updatedCart: Cart[] = (cartData as Cart[])
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity - 1;
          if (newQuantity > 0) {
            const updatedItem = { ...item, quantity: newQuantity };
            return updatedItem;
          }
          return null;
        }
        return item;
      })
      .filter((item) => item !== null) as Cart[];
  
    setCartData(updatedCart);
  };

  const increaseQuantity = (id: number) => {
    const updatedCart = cartData.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartData(updatedCart);
  };

  return (
    <ContextCart.Provider value={{ cartData, cartAdd, clearCart, decreaseQuantity, increaseQuantity, totalPrice}}>
      {children}
    </ContextCart.Provider>
  );

};
