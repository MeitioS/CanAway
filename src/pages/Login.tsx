import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import {personCircle} from 'ionicons/icons';
import React from 'react';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CanAway</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CanAway</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Login;
