import React, { useEffect, useState } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonHeader,
IonIcon, IonMenuToggle, IonPage, IonTitle, IonToolbar, IonRouterLink} from '@ionic/react';
import { menuOutline, cart, camera } from 'ionicons/icons';
import { ProfileData } from '../components/DataProduct';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


const Profile: React.FC = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyBJvKHmAanX_JpCiz0iSkH64KXvlPCEkMw",
        authDomain: "mobilecrossplatform-53741.firebaseapp.com",
        projectId: "mobilecrossplatform-53741",
        storageBucket: "mobilecrossplatform-53741.appspot.com",
        messagingSenderId: "1033704215927",
        appId: "1:1033704215927:web:59b809bd2d1d512fddbd72",
        measurementId: "G-6D4FKD1PWN"
      };
      
    firebase.initializeApp(firebaseConfig);
      
    const storage = firebase.storage();

    const cardSize = '300px';
    const [profilePicture, setProfilePicture] = useState(ProfileData[0].image);
    const [takenPhoto, setTakenPhoto] = useState<{path: string; preview: string}>();

    const takePhotoHandler = async () => {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 80,
          width: 500,
        });
      
        console.log(photo);
      
        if (!photo || !photo.path || !photo.webPath) {
          return;
        }
      
        setTakenPhoto({ path: photo.path, preview: photo.webPath });
      
        const storageRef = storage.ref();
        const imageName = "profile_photo_${new Date().getTime()}";
        const imageRef = storageRef.child("Photos/${imageName}");
      
        if(photo.base64String)
        {
        await imageRef.putString(photo.base64String, "base64");
            
        const downloadURL = await imageRef.getDownloadURL();
        setProfilePicture(downloadURL);
        console.log("Photo file uploaded to Firebase Storage:", downloadURL);
        }
      };
      

    useEffect(() => 
    {
        if (takenPhoto?.preview) 
        {
          setProfilePicture(takenPhoto.preview);
        }
    }, [takenPhoto]);
    
  
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonMenuToggle slot="start">
                <IonButton>
                  <IonIcon icon={menuOutline} className="menu-icon"></IonIcon>
                </IonButton>
              </IonMenuToggle>
              <IonTitle>E-Shop</IonTitle>
              <IonMenuToggle slot="end">
                <IonRouterLink routerLink="/cart">
                  <IonButton className="sidebar-item">
                    <IonIcon icon={cart} className="cart-icon"></IonIcon>
                  </IonButton>
                </IonRouterLink>
              </IonMenuToggle>
            </IonToolbar>
          </IonHeader>
    
          <IonContent>
            <IonRouterLink routerLink="/home">
              <IonButton fill="outline" size="small" color="primary" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                Back
              </IonButton>
            </IonRouterLink>
            <IonGrid style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IonRow>
                <IonCol size="12" size-md="6">
                  <IonCard style={{ width: cardSize, height: cardSize, margin: '0 auto' }}>
                    <IonCardHeader>
                      <IonCardTitle className="ion-text-center">Profile</IonCardTitle>
                    </IonCardHeader>
    
                    <IonCardContent className="ion-text-center">
                      <IonButton onClick={takePhotoHandler}>
                        <img src={profilePicture} alt="Profile" style={{ width: '150px', height: 'auto' }} />
                        <IonIcon icon={camera} />
                      </IonButton>
                      <h2>{ProfileData[0].Name}</h2>
                      <p>{ProfileData[0].NIM}</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      );
    };                                          

export default Profile;

