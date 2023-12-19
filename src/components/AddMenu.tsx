// Import necessary React and Ionic components, Firebase modules, and other dependencies
import React, { useEffect, useState } from 'react';
import { IonButton, IonInput, IonLabel, IonPage, IonContent, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import { addProductToFirebase, Product, readProductsFromFirebase } from '../components/DataProduct';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebase } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

// Define the functional component AddMenu
const AddMenu: React.FC = () => {
  // Define state variables using the useState hook
  const [newProductName, setNewProductName] = useState<string>('');
  const [newProductImage, setNewProductImage] = useState<File | null>(null);
  const [newShopName, setNewShopName] = useState<string>('');
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [nextProductId, setNextProductId] = useState<string>(''); // Use string type for UUID
  const history = useHistory(); // Import useHistory hook for programmatic navigation

  // useEffect hook to fetch products and determine the next available ID on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch products from Firebase
      const products = await readProductsFromFirebase();

      // Determine the next available ID for the new product
      const maxId = products.reduce((max, product) => {
        const productId = parseInt(product.id, 10); // Parse the UUID as an integer
        return productId > max ? productId : max;
      }, -1);

      // Generate a UUID for the next product
      const nextId = uuidv4();
      setNextProductId(nextId);
      console.log('Fetched products. Next available ID:', nextId);
    };

    // Call the fetchProducts function
    fetchProducts();
  }, []);

  // Function to handle the addition of a new menu item
  const handleAddMenu = async () => {
    // Validate input fields
    if (!newProductName.trim() || !newProductImage || !newShopName.trim() || !newCategoryName.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      // Upload the image to Firebase Storage
      const storage = getStorage(firebase);
      const storageRef = ref(storage, `productImages/${newProductImage.name}`);
      await uploadBytes(storageRef, newProductImage);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Create a new product object with the image URL, shopName, and category
      const newProduct: Product = {
        id: nextProductId,
        image: imageUrl,
        name: newProductName,
        shopName: newShopName,
        category: newCategoryName,
      };

      // Add the product to Firestore
      await addProductToFirebase(newProduct);

      // Log success message and reset state variables
      console.log('Product added successfully!');
      setNewProductName('');
      setNewProductImage(null);
      setNewShopName('');
      setNewCategoryName('');

      // Redirect to EditMenu with the nextProductId as a parameter
      history.push(`/edit-menu/${nextProductId}`);
    } catch (error) {
      console.error('Error adding product to Firebase:', error);
      alert('Error adding product. Please try again. Check the console for more details.');
    }
  };

  // Function to handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewProductImage(file);
    }
  };

  // JSX structure defining the UI of the AddMenu component
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          {/* Input field for Product Name */}
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
          {/* Input field for Shop Name */}
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
          {/* Dropdown for selecting Category */}
          <IonRow className="ion-margin-bottom">
            <IonCol size="12">
              <IonLabel position="floating">Category</IonLabel>
              <IonSelect
                value={newCategoryName}
                placeholder="Select category"
                onIonChange={(e) => setNewCategoryName(e.detail.value)}
              >
                <IonSelectOption value="Food">Food</IonSelectOption>
                <IonSelectOption value="Beverage">Beverage</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          {/* Input field for uploading Product Image */}
          <IonRow className="ion-margin-bottom">
            <IonCol size="12">
              <IonLabel position="floating">Product Image</IonLabel>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </IonCol>
          </IonRow>
          {/* Button to trigger the handleAddMenu function */}
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

// Export the AddMenu component as the default export
export default AddMenu;
