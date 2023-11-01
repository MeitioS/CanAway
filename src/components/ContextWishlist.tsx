import React, { ReactNode, createContext, useContext, useState } from 'react';
import { ProductData, Wishlist, WishlistData} from './DataProduct';

const ContextWishlist = createContext<{wishlistData: Wishlist[]; WishlistButton: (id: number) => void} | undefined>(undefined);

export const useWishlist = () => 
{
  const context = useContext(ContextWishlist);
  if (!context) 
    {
      throw Error();
    }
  return context;
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => 
{
    
  const [wishlistData, setWishlistData] = useState<Wishlist[]>([]);
  
  const WishlistButton = (id: number) => 
  {
    const productToAdd = ProductData.find((product) => product.id === id);

    if (productToAdd) 
    {
      if (wishlistData.some((item) => item.id === productToAdd.id)) 
      {

        const updatedWishlist = wishlistData.filter((item) => item.id !== productToAdd.id);
        setWishlistData(updatedWishlist); 
        const indexToRemove = WishlistData.findIndex((item) => item.id === productToAdd.id);

        if (indexToRemove !== -1) 
        {
          WishlistData.splice(indexToRemove, 1);
        }

      } 
      else 
        {
          const updatedWishlist = [...wishlistData, { ...productToAdd }];
          setWishlistData(updatedWishlist);
          WishlistData.push({ ...productToAdd });
        }
    } 
  };

  return (
    <ContextWishlist.Provider value={{ wishlistData, WishlistButton }}>
      {children}
    </ContextWishlist.Provider>
  );
};
