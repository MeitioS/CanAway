import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuToggle, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import {menuOutline,starOutline, add, star, cart} from 'ionicons/icons'
import {ProductData} from '../components/DataProduct';
import { useWishlist } from '../components/ContextWishlist';
import { useCart } from '../components/ContextCart';
import './Home.css';

const Home: React.FC = () => {

  const { wishlistData, WishlistButton } = useWishlist();
  const {cartData, cartAdd} = useCart();

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
                  <div className="notification-circle">
                    {cartData.length}
                  </div>
                )}
              </IonButton>
          </IonRouterLink>
          </IonMenuToggle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

      <IonGrid>

          <IonRow>
            {ProductData.slice(0, 6).map((product) => (
              <IonCol key={product.id}>
                <div className="product-list">
                  <img src={product.image}></img>
                  <h2>{product.name}</h2>
                  {/* <p>Rp.{product.price}</p> */}


                  <IonButton fill="clear" slot="start" className={`wish-button ${wishlistData.some((item) => item.id === product.id) ? 'selected' : ''}`} 
                  onClick={() => WishlistButton(product.id)}>
                    <IonIcon icon={wishlistData.some((item) => item.id === product.id) ? star : starOutline} className="cart-icon"></IonIcon>
                  </IonButton>


                  <IonButton fill="clear" slot="end" className="add-button" onClick={() => cartAdd(product.id)}>
                    <IonIcon icon={add} className="cart-icon"></IonIcon>
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


