// src/pages/Login.tsx
import {IonButton,IonCard,IonCardContent,IonCol,IonContent,IonHeader,IonInput,
IonItem,IonLabel,IonPage,IonRow,IonTitle,IonToolbar,} from '@ionic/react';
import React, { useState } from 'react';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebase';
import { useIonRouter } from '@ionic/react'


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useIonRouter();

  const handleLogin = async () => {
    try 
    {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect ke homepage jika sudah login
      router.push('/home');
    } 
    catch (error: any) 
    {
      console.error('Login failed:', error.message);
      //gabisa login
    }
  };

  const navigateToRegister = () => 
  {
    router.push('/register');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CanAway</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>

            <IonRow>
              <IonCol>
                <IonButton expand="full" onClick={handleLogin}>
                  Login
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton expand="full" onClick={navigateToRegister}>
                  Register
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;