import React, { useEffect, useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { menuOutline, pencil, trash } from 'ionicons/icons';
import { Product, readProductsFromFirebase } from '../components/DataProduct';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchUpdatedProducts = async () => {
      const updatedProductsFromFirestore = await readProductsFromFirebase();
      setProducts(updatedProductsFromFirestore);
      setFilteredProducts(updatedProductsFromFirestore);
    };

    fetchUpdatedProducts();
  }, []);

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    setFilteredProducts(
      products.filter((product) => product.name.toLowerCase().includes(searchTermLower))
    );
  };

  const handleEditProduct = (productId: string) => {
    history.push(`/edit/${productId}`);
  };

  const handleDeleteProduct = (productId: string) => {
    history.push(`/delete/${productId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuToggle slot="start">
            <IonButton>
              <IonIcon icon={menuOutline} className="menu-icon"></IonIcon>
            </IonButton>
          </IonMenuToggle>
          <IonTitle>CanAway</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6" offset-md="3">
              <IonInput
                placeholder="Cari Makanan/Minuman"
                value={searchTerm}
                onIonChange={(e) => setSearchTerm(e.detail.value!)}
                onIonBlur={handleSearch}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            {filteredProducts.map((product) => (
              <IonCol key={product.id} size="12" size-md="6" size-lg="4" size-xl="3">
                <div className="product-list">
                  <IonImg
                    src={product.image}
                    alt={product.name}
                    style={{ width: '50%', height: '50%', objectFit: 'cover' ,  display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>
                  <h2>{product.name}</h2>
                  <h2>{product.shopName}</h2>
                  
                  <IonButton
                    fill="clear"
                    slot="start"
                    className={`edit-button`}
                    onClick={() => handleEditProduct(product.id)}>
                    <IonIcon icon={pencil} className="cart-icon"></IonIcon>
                  </IonButton>

                  <IonButton
                    fill="clear"
                    slot="end"
                    className="delete-button"
                    onClick={() => handleDeleteProduct(product.id)}>
                    <IonIcon icon={trash} className="cart-icon"></IonIcon>
                  </IonButton>
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
