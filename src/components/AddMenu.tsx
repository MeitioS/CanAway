import React, { useEffect, useState } from 'react';
import { IonButton, IonInput, IonLabel, IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import { addProductToFirebase, Product, readProductsFromFirebase } from '../components/DataProduct';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebase } from '../firebase';

const AddMenu: React.FC = () => 
{
    const [newProductName, setNewProductName] = useState<string>('');
    const [newProductImage, setNewProductImage] = useState<File | null>(null);
    const [newShopName, setNewShopName] = useState<string>('');
    const [nextProductId, setNextProductId] = useState<number>(-1);

    useEffect(() => {
        // Fetch products to determine the next available ID
        const fetchProducts = async () => {
        const products = await readProductsFromFirebase();
        const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), -1);
        setNextProductId(maxId + 1);
        };

        fetchProducts();
    }, []);



  const handleAddMenu = async () => 
  {
    if (!newProductName.trim() || !newProductImage || !newShopName.trim()) 
    {
      alert('Please fill out all fields.');
      return;
    }

    try {
      // Upload image to Firebase Storage
      const storage = getStorage(firebase);
      const storageRef = ref(storage, `productImages/${newProductImage.name}`);
      await uploadBytes(storageRef, newProductImage);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Create a new product with the image URL and shopName
      const newProduct: Product = {
        id: nextProductId,
        image: imageUrl,
        name: newProductName,
        shopName: newShopName,
      };

      // Add the product to Firestore
      await addProductToFirebase(newProduct);

      // Increment the next available ID for the next menu
      setNextProductId((prevId) => prevId + 1);

      // You can add additional logic here, such as clearing the form or navigating to another page
      alert('Product added successfully!');
      setNewProductName('');
      setNewProductImage(null);
      setNewShopName(''); // Clear shopName
    } catch (error) {
      console.error('Error adding product to Firebase:', error);
      alert('Error adding product. Please try again. Check the console for more details.');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewProductImage(file);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-margin-bottom">
            <IonCol size="12">
              <IonLabel position="floating">Product Name</IonLabel>
              <IonInput
                type="text"
                value={newProductName}
                onIonChange={(e) => setNewProductName(e.detail.value!)}
              />
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-bottom">
            <IonCol size="12">
              <IonLabel position="floating">Shop Name</IonLabel>
              <IonInput
                type="text"
                value={newShopName}
                onIonChange={(e) => setNewShopName(e.detail.value!)}
              />
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-bottom">
            <IonCol size="12">
              <IonLabel position="floating">Product Image</IonLabel>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonButton expand="full" onClick={handleAddMenu}>
                Add Menu
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddMenu;
