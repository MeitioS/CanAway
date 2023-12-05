import React from 'react';
import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, cart, checkmark, menuOutline, remove } from 'ionicons/icons';
import { useCart } from '../components/ContextCart';
import '../pages/Cart.css';
import { HistoryData } from '../components/DataProduct';
import { History } from '../components/DataProduct';

const Cart: React.FC = () => {

  const {cartData, clearCart, decreaseQuantity, increaseQuantity} = useCart();
  
  const checkout = () => 
  {
    const historyItems: History[] = cartData.map((item) => ({
      id: item.id,
      image: item.image,
      name: item.name,
      // price: item.price,
      quantity: item.quantity,
    }));

    for (const item of historyItems) 
    {
      HistoryData.push(item);
    }

    clearCart();
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
            <IonButton slot="end">
              <IonIcon icon={cart} className="cart-icon"></IonIcon>
            </IonButton>
        </IonToolbar>
      </IonHeader>

    <IonContent>

      <IonGrid>

        {cartData.map((product) => (
          <IonCard key={product.id} className="cart-item-card">
            <IonRow>
              <IonCol size="3" className="cart-item-image-col">
                <img src={product.image} alt={product.name} className="cart-item-image"/>
              </IonCol>
              <IonCol size="3.5">
                <h1 className="cart-item-name">{product.name}</h1>
                {/* <h2 className="cart-item-price">Rp.{product.price}</h2> */}
              </IonCol>
              <IonCol size="5" className="ion-text-end quantity-container">
                <IonButton
                  onClick={() => decreaseQuantity(product.id)} size="default" color="danger" className="decrease-button">
                  <IonIcon icon={remove} slot="icon-only" />
                </IonButton>
                <h2 className="quantity-container-h2">{product.quantity}</h2>
                <IonButton onClick={() => increaseQuantity(product.id)} size="default" color="success" className="increase-button">
                  <IonIcon icon={add} slot="icon-only" />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCard>
        ))}

      </IonGrid>

      <div className="centered-content">
      <IonCard className="checkout-card" style={{ width: '200px', height: '200px', textAlign: 'center' }}>
        <IonLabel>Total Price: Rp.</IonLabel>
        <IonButton onClick={checkout} size="small" color="success">
          <IonIcon icon={checkmark} slot="start" />
          Checkout
        </IonButton>
      </IonCard>
      </div>


    </IonContent>

    </IonPage>
  );
};

export default Cart;
