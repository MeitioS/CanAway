import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonCard, IonCol, IonGrid, IonIcon, IonContent, IonButton, IonHeader, IonMenuToggle, IonPage, IonTitle, IonToolbar, IonRouterLink } from '@ionic/react';
import { cart, menuOutline, trash } from 'ionicons/icons';
import { useWishlist } from '../components/ContextWishlist';
import '../pages/Wishlist.css';
import { useCart } from '../components/ContextCart';

const Wishlist: React.FC = () => {

  const { wishlistData, WishlistButton } = useWishlist();
  const { cartAdd, cartData } = useCart();
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
        {wishlistData.map((product) => (
          <IonCard key={product.id} className="wishlist-card">
            <IonItemSliding>
              <IonItemOptions side="start">
                <IonItemOption color="danger" onClick={() => WishlistButton(product.id)} className="wishlist-remove-button">
                  <IonIcon icon={trash} />
                </IonItemOption>
              </IonItemOptions>
              <IonItem>
                <IonCol size="3" className="wishlist-item-image-col">
                  <img src={product.image} alt={product.name} className="wishlist-item-image" />
                </IonCol>
                <IonCol size="9" className="wishlist-item-details">
                  <h2>{product.name}</h2>
                  {/* <p>Rp.{product.price}</p> */}
                </IonCol>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="success" onClick={() => cartAdd(product.id)} className="wishlist-add-to-cart-button">
                  <IonIcon icon={cart} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </IonCard>
        ))}
      </IonGrid>
    </IonContent>


  </IonPage>
  );

};

export default Wishlist;

