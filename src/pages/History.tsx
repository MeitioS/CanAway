import React from 'react';
import {IonButton, IonHeader, IonIcon, IonMenuToggle, IonPage, IonRouterLink, IonTitle, IonToolbar} from '@ionic/react';
import { menuOutline, cart } from 'ionicons/icons';
import { useCart } from '../components/ContextCart';

const History: React.FC = () => {


    const {cartData} = useCart();

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

    </IonPage>
    );
};

export default History;
