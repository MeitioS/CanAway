import jusnaga from '../components/Pictures/jusnaga.jpg'
import mieayam from '../components/Pictures/mieayam.png'
import sushi from '../components/Pictures/sushi.jpg'
import nasihainam from '../components/Pictures/nasihainam.jpg'
import topokki from '../components/Pictures/topokki.jpg'
import burger from '../components/Pictures/burger.jpg'
import fotoprofil from '../components/Pictures/CanAway.png';

// DataProduct.tsx
import { firebase } from '../firebase'
import { collection, updateDoc,deleteDoc,getDocs,DocumentData,getFirestore,doc, addDoc, getDoc,} from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage'


export const addProductToFirebase = async (product: Product) => {
    try {
      const db = getFirestore(firebase);
      const productsCollection = collection(db, 'products');
      await addDoc(productsCollection, { ...product });
    } catch (error) {
      console.error('Error adding product to Firebase:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };
  
  export const updateProductInFirebase = async (productId: number, updatedProduct: Product) => {
    const db = getFirestore(firebase);
    const docRef = doc(db, 'products', productId.toString());
    await updateDoc(docRef, { ...updatedProduct });
  };
  
  export const deleteProductFromFirebase = async (productId: number) => {
    const db = getFirestore(firebase);
  
    try {
      // Get the document data to retrieve the file path
      const docRef = doc(db, 'products', productId.toString());
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
  
        // Delete the document from Firestore
        await deleteDoc(docRef);
  
        // Delete the associated file from Firebase Storage
        if (data && data.imagePath) {
          const storage = getStorage(firebase);
          const fileRef = ref(storage, data.imagePath);
  
          await deleteObject(fileRef);
        }
  
        console.log('Product deleted successfully!');
      } else {
        console.error('Document not found for deletion.');
      }
    } catch (error) {
      console.error('Error deleting product from Firebase:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };
  
  
  export const readProductsFromFirebase = async (): Promise<Product[]> => {
    const db = getFirestore(firebase);
    const collectionRef = collection(db, 'products');
    const querySnapshot = await getDocs(collectionRef);
    const products: Product[] = [];
  
    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      const product: Product = {
          id: +doc.id,
          image: data.image,
          name: data.name,
          shopName: data.shopName
      };
      products.push(product);
    });
  
    return products;
  };

export interface Product 
{
    id: number;
    image: any;
    name: string;
    shopName: String;
    // price: number;
}

export interface Profile 
{
    id: number;
    image: any;
    Name: string;
    NIM: string;

}

export interface Wishlist 
{
    id: number;
    image: any;
    name: string;
    // price: number;
}
  
export interface Cart
{
    id: number;
    image: any;
    name: string;
    // price: number;
    quantity: number;
}

export interface History
{
    id: number;
    image: any;
    name: string;
    // price: number;
    quantity: number;
}


export const ProductData: Product[] = 
[
    { id: 1, image: nasihainam , name: 'Nasi Hainam Ibu Pertiwi', shopName: 'test'},
    { id: 2, image: burger , name: 'Burger Enak & Murah' , shopName: 'test'},
    { id: 3, image: jusnaga , name: 'Aneka Juice dan Buah-buahan' , shopName: 'test'},
    { id: 4, image: sushi , name: 'Japanese Food & Dessert',  shopName: 'test'},
    { id: 5, image: topokki , name: 'Topokki & The Gengs' , shopName: 'test'},
    { id: 6, image: mieayam , name: 'Mie Ayam Pak Bima',  shopName: 'test'},

];

export const ProfileData: Profile[] =
[

    {id: 1, image: fotoprofil , Name: 'CanAway', NIM: '124214'}

]

export const WishlistData: Wishlist[] = [];


export const CartData: Cart[] = [];

export const HistoryData: History[] = [];

export const getProductById = async (productId: number): Promise<Product | null> => {
    try {
      const db = getFirestore(firebase);
      const docRef = doc(db, 'products', productId.toString());
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        const data = docSnapshot.data() as DocumentData;
        const product: Product = {
          id: +docSnapshot.id,
          image: data.image,
          name: data.name,
          shopName: data.shopName,
        };
  
        return product;
      } else {
        // Return null if the product with the given ID doesn't exist
        return null;
      }
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  };