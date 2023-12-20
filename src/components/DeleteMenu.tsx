import React, { useEffect, useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { Product, readProductsFromFirebase, deleteProductFromFirebase } from '../components/DataProduct';

const DeleteMenu: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productsFromFirestore = await readProductsFromFirebase();
      const selectedProduct = productsFromFirestore.find((p) => p.id === id);
      setProduct(selectedProduct || null);
    };

    fetchProduct();
  }, [id]);

  const handleDeleteProduct = async () => {
    if (product) {
      await deleteProductFromFirebase(product.id);
      history.push('/home');
    }
  };

  const handleCancel = () => {
    history.push('/home');
  };

  if (!product) {
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
              <IonLabel>
                Are you sure you want to delete the product "{product?.name}"?
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={handleCancel}>Cancel</IonButton>
              <IonButton onClick={handleDeleteProduct}>Delete</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DeleteMenu;
