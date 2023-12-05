// src/pages/Register.tsx

import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 

const Register: React.FC = () => 
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useIonRouter();

  const handleRegister = async () => 
  {
        try 
        {
        if (!email || !password)
            {
            console.error('Email and password are required.');
            return;
            }
        await createUserWithEmailAndPassword(auth, email, password);

        router.push('/login');
        } 
        catch (error: any) 
        {
          console.error('Registration failed Firebase:', error.message);
        }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6" offset-md="3">
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
                      <IonButton expand="full" onClick={handleRegister}>
                        Register
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
