// Import profile picture
import fotoprofil from '../components/Pictures/CanAway.png';

// Import necessary Firebase modules and functions for Firestore and Storage
import { firebase } from '../firebase'
import { collection, updateDoc, deleteDoc, getDocs, DocumentData, getFirestore, doc, addDoc, getDoc, setDoc, query, where } from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage'

// Function to add a product to the 'products' collection in Firestore
export const addProductToFirebase = async (product: Product) => {
  try {
    const db = getFirestore(firebase);
    const productsCollection = collection(db, 'products');
    await addDoc(productsCollection, { ...product });
    console.log('Product added to Firebase:', product);
  } catch (error) {
    console.error('Error adding product to Firebase:', error);
    throw error;
  }
};

// Function to update a product in the 'products' collection in Firestore
export const updateProductInFirebase = async (productId: string, updatedFields: Partial<Product>) => {
  try {
    console.log('Updating product in Firebase. Product ID:', productId, 'Updated Fields:', updatedFields);

    const db = getFirestore(firebase);
    const docRef = doc(db, 'products', productId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const existingData = docSnap.data() as Product;
      const updatedData: Product = { ...existingData, ...updatedFields };

      await setDoc(docRef, updatedData);
      console.log('Product updated successfully:', updatedData);
    } else {
      console.warn('Document does not exist for ID:', productId);
      throw new Error('Document does not exist');
    }
  } catch (error) {
    console.error('Error updating product in Firebase:', error);
    throw error;
  }
};

// Function to delete a product from the 'products' collection in Firestore
export const deleteProductFromFirebase = async (productId: string) => {
  try {
    const db = getFirestore(firebase);
    const docRef = doc(db, 'products', productId);
    await deleteDoc(docRef);
    console.log('Product deleted from Firebase. Product ID:', productId);
  } catch (error) {
    console.error('Error deleting product from Firebase:', error);
    throw error;
  }
};

// Function to read products from the 'products' collection in Firestore
export const readProductsFromFirebase = async (): Promise<Product[]> => {
  try {
    const db = getFirestore(firebase);
    const collectionRef = collection(db, 'products');
    const querySnapshot = await getDocs(collectionRef);
    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      const product: Product = {
        id: doc.id,
        category: data.category,
        image: data.image,
        name: data.name,
        shopName: data.shopName,
      };
      products.push(product);
    });

    console.log('Products fetched from Firebase:', products);
    return products;
  } catch (error) {
    console.error('Error fetching products from Firebase:', error);
    throw error;
  }
};

// Define the Product interface
export interface Product {
  category: string
  id: string;
  image: any;
  name: string;
  shopName: string;
  // price: number;
}

// Define the Profile interface
export interface Profile {
  id: number;
  image: any;
  Name: string;
  NIM: string;
}

// Define the Wishlist interface
export interface Wishlist {
  id: number;
  image: any;
  name: string;
  // price: number;
}

// Initialize sample data for the Profile
export const ProfileData: Profile[] = [
  { id: 1, image: fotoprofil, Name: 'CanAway', NIM: '124214' }
];

// Initialize an empty array for Wishlist data
export const WishlistData: Wishlist[] = [];
