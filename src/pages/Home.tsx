import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuToggle, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { menuOutline, starOutline, add, star, cart, pencil, trash } from 'ionicons/icons';
import { Product, readProductsFromFirebase } from '../components/DataProduct';
import { useWishlist } from '../components/ContextWishlist';
import { useCart } from '../components/ContextCart';
import { useHistory } from 'react-router-dom';
import './Home.css';
import React from 'react';

const Home: React.FC = () => {
  const { wishlistData, WishlistButton } = useWishlist();
  const { cartData, cartAdd } = useCart();
  const [products, setProducts] = React.useState<Product[]>([]);
  const history = useHistory();

  React.useEffect(() => 
  {
    // Fetch products from Firestore when the component mounts
    const fetchProducts = async () => 
    {
      const productsFromFirestore = await readProductsFromFirebase();
      setProducts(productsFromFirestore);
    };

    fetchProducts();
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

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
          <IonMenuToggle slot="end">
            <IonRouterLink routerLink="/cart">
              <IonButton className="sidebar-item">
                <IonIcon icon={cart} className="cart-icon"></IonIcon>
                {cartData.length > 0 && (
                  <div className="notification-circle">{cartData.length}</div>
                )}
              </IonButton>
            </IonRouterLink>
          </IonMenuToggle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            {products.slice(0, 6).map((product) => (
              <IonCol key={product.id}>
                <div className="product-list">
                  <img src={product.image} alt={product.name} />
                  <h2>{product.name}</h2>
                  <h2>{product.shopName}</h2>

                  <IonButton fill="clear" slot="start" className={`edit-button`} onClick={() => history.push(`/edit/${product.id}`)}>
                    <IonIcon icon={pencil} className="cart-icon"></IonIcon>
                  </IonButton>

                  <IonButton
                    fill="clear"
                    slot="end"
                    className="delete-button" // Update the class name to "delete-button"
                    onClick={() => history.push(`/delete/${product.id}`)}>
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
