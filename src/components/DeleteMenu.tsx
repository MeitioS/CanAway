import React, { useEffect, useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { Product, readProductsFromFirebase, deleteProductFromFirebase } from '../components/DataProduct';

const DeleteMenu: React.FC = () => {

  // Extract product ID from route parameters using useParams
  const { id } = useParams<{ id: string }>();
  const productId = id;
  
  // Initialize history for navigation
  const history = useHistory();
  
  // State to hold the product information
  const [product, setProduct] = useState<Product | null>(null);

  // Fetch the selected product from Firestore when the component mounts
  useEffect(() => 
  {
    const fetchProduct = async () => 
    {
      // Read products from Firestore
      const productsFromFirestore = await readProductsFromFirebase();
      
      // Find the selected product by matching the product ID
      const selectedProduct = productsFromFirestore.find((p) => p.id === productId);
      
      // Set the product in the state or null if not found
      setProduct(selectedProduct || null);
    };

    fetchProduct();
  }, [productId]);

  // Handle the deletion of the product
  const handleDeleteProduct = async () => 
  {
    if (product) 
    {
      // Delete the product from Firestore
      await deleteProductFromFirebase(product.id);
      
      // Redirect to the home page after deletion
      history.push('/home');
    }
  };

  // Handle the cancellation of the deletion
  const handleCancel = () => 
  {
    // Redirect to the home page without deleting the product
    history.push('/home');
  };

  // Render a message if the product is not found
  if (!product) 
  {
    return (
      <IonPage>
        <IonContent>
          <IonTitle>Product Not Found</IonTitle>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>Delete Product</IonTitle>
      </IonToolbar>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel>Are you sure you want to delete the product "{product.name}"?</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={handleDeleteProduct}>Delete</IonButton>
              <IonButton onClick={handleCancel}>Cancel</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DeleteMenu;
