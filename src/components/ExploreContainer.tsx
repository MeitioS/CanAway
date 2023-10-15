import './ExploreContainer.css';
import { IonButton, IonCard, IonCardContent, IonContent, IonImg, IonPage } from '@ionic/react';

export const LOGIN = [
  { id: 'a1', subject: '' },
]

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <IonPage>
    <IonContent className="ion-padding">

    {LOGIN.map(home => (
      <IonCard key={home.id}>
          <IonCardContent className="ion-text-center">
          
              <a href="https://www.youtube.com/watch?v=a3Z7zEc7AXQ" className="ion-button">
                <img src="src/img/CanAway.png" alt="Gambar CanAway"/>
              </a>
              <p></p>

              {/* <h2>{home.subject}</h2>

              <h2>Ready to create an app?</h2>

              <p>
              <a href="https://www.youtube.com/watch?v=a3Z7zEc7AXQ" className="ion-button">
                Start with Ionic UI Components
              </a>
              </p> */}

              <IonButton routerLink={`/login`}>
                  Login
              </IonButton>

          </IonCardContent>
      </IonCard>
    ))};

    </IonContent>
    </IonPage>
  );
};

export default ExploreContainer;
