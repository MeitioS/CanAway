import React, { useEffect, useState } from 'react';
import { IonButton, IonInput, IonLabel, IonPage, IonContent, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import { Product, updateProductInFirebase, readProductsFromFirebase } from '../components/DataProduct';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebase } from '../firebase';
import { useHistory } from 'react-router';

interface EditMenuProps {
  match: {
    params: {
      id: string;
    };
  };
}

const EditMenu: React.FC<EditMenuProps> = ({ match }) => {
  const productId = match.params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [updatedProductName, setUpdatedProductName] = useState<string>('');
  const [updatedProductImage, setUpdatedProductImage] = useState<File | null>(null);
  const [updatedShopName, setUpdatedShopName] = useState<string>('');
  const [updatedCategoryName, setUpdatedCategoryName] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await readProductsFromFirebase();
        const selectedProduct = products.find((p) => p.id === productId);
        if (selectedProduct) {
          setProduct(selectedProduct);
          setUpdatedProductName(selectedProduct.name);
          setUpdatedShopName(selectedProduct.shopName as string);
          setUpdatedCategoryName(selectedProduct.category);
        } else {
          console.warn('Product not found for ID:', productId);
          // Handle not found scenario, redirect or display an error message
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Handle error, redirect or display an error message
      }
    };

    fetchProduct();
  }, [productId]);

  const handleEditMenu = async () => {
    if (!updatedProductName.trim() || !updatedShopName.trim() || !updatedCategoryName.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      let imageUrl = product?.image; // Use the existing image URL if no new image is selected

      // Check if a new image is selected
      if (updatedProductImage) {
        // Upload the new image to Firebase Storage
        const storage = getStorage(firebase);
        const storageRef = ref(storage, `productImages/${updatedProductImage.name}`);
        await uploadBytes(storageRef, updatedProductImage);

        // Get the download URL of the uploaded image
        imageUrl = await getDownloadURL(storageRef);
      }

      // Ensure that productId is not undefined
      if (productId) {
        // Update the product with the new information
        await updateProductInFirebase(productId, {
          name: updatedProductName,
          image: imageUrl,
          shopName: updatedShopName,
          category: updatedCategoryName,
        });

        console.log('Product updated successfully!');
        alert('Product updated successfully!');
        history.push('/home'); // Redirect to the home page or any other desired page
      } else {
        console.warn('productId is undefined.');
        alert('Error updating product. Please try again. productId is undefined.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again. Check the console for more details.');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUpdatedProductImage(file);
    }
  };

  if (!product) {
    // Render loading or error state, or redirect to a different page
    return <div>Loading...</div>;
  }

  // Render the main content of the component
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          {/* Input fields for updating product information */}
          <IonRow className="ion-margin-bottom">
            <IonCol size="12">
              <IonLabel position="floating">Product Name</IonLabel>
              <IonInput
                type="text"
                value={updatedProductName}
                onIonChange={(e) => setUpdatedProductName(e.detail.value!)}
              />
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-bottom">
            <IonCol size="12">
              <IonLabel position="floating">Shop Name</IonLabel>
              <IonInput
                type="text"
                value={updatedShopName}
                onIonChange={(e) => setUpdatedShopName(e.detail.value!)}
              />
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-bottom">
            <IonCol size="12">
              <IonLabel position="floating">Category</IonLabel>
              {/* Dropdown for selecting product category */}
              <IonSelect
                value={updatedCategoryName}
                placeholder="Select category"
                onIonChange={(e) => setUpdatedCategoryName(e.detail.value)}
              >
                <IonSelectOption value="Food">Food</IonSelectOption>
                <IonSelectOption value="Beverage">Beverage</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-bottom">
            <IonCol size="12">
              {/* Input field for uploading a new product image */}
              <IonLabel position="floating">Product Image</IonLabel>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              {/* Button for saving the changes */}
              <IonButton expand="full" onClick={handleEditMenu}>
                Save Changes
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditMenu;
