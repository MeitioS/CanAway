import React, { useCallback, useEffect, useState } from 'react';
import {IonContent,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonGrid,IonRow,IonCol,IonButton,IonHeader,IonIcon,IonMenuToggle,IonPage,IonTitle,IonToolbar,IonRouterLink} from '@ionic/react';
import { menuOutline, cart, camera } from 'ionicons/icons';
import { ProfileData } from '../components/DataProduct';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import 'firebase/compat/storage';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { getFirestore, addDoc, collection, getDocs, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, StorageReference } from 'firebase/storage';

const initializeFirebase = (): FirebaseApp => 
{
  const firebaseConfig = {
    apiKey: "AIzaSyDWzHajqdApvnv2hPFOLZhX02G7IwdICb0",
    authDomain: "canaway-9b984.firebaseapp.com",
    projectId: "canaway-9b984",
    storageBucket: "canaway-9b984.appspot.com",
    messagingSenderId: "693774003869",
    appId: "1:693774003869:web:58905f6ec03c761d99ae74",
    measurementId: "G-H15GEX39Z4"
  };

  return initializeApp(firebaseConfig);
};

// Profile component
  const Profile: React.FC = () => {
  const cardSize = '300px';
  const [profilePicture] = useState(ProfileData[0].image);
  const [takenPhoto, setTakenPhoto] = useState<Photo | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [app] = useState<FirebaseApp>(initializeFirebase());
  const [db] = useState(getFirestore(app));
  const [storage] = useState(getStorage(app));
  const collectionPath = 'photos';

  const addData = async (url: string) => {
    try {
      const docRef = await addDoc(collection(db, collectionPath), {
        // You can add any additional data if needed
        photoUrl: url,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      setError('Error adding document: ' + (e as Error).message);
    }
  };

  // Custom hook for photo-related logic
  const usePhoto = () => {
    const uploadPhotoToStorage = useCallback(
      async (base64String: string) => {
        try {
          console.log('Before uploading to Storage');
          const storageRef: StorageReference = ref(storage, `Photos/profile_photo_${new Date().getTime()}`);
  
          await uploadBytes(storageRef, Buffer.from(base64String, 'base64'));
  
          const url: string = await getDownloadURL(storageRef);
          console.log('Storage URL', url);
  
          // Update takenPhoto state with the photo details
          setTakenPhoto({
            webPath: url,
            format: 'jpeg', // Add format and other necessary properties...
            saved: false,
          });
  
          // Now, you can add the URL to Firestore
          addData(url);
        } catch (uploadError) {
          setError('Error uploading photo to Firebase: ' + (uploadError as Error).message);
        }
      },
      [addData]
    );

    const takePhotoHandler = useCallback(async () => {
      try {
        setLoading(true);
        defineCustomElements(window);
        console.log('Before Taking Photo');
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 80,
          width: 500,
        });
  
        console.log('After Taking Photo', photo);
  
        if (!photo || !photo.path || !photo.webPath || !photo.base64String) {
          console.log('Invalid Photo');
          return;
        }
  
        // Proceed with uploading the photo to Firebase Storage
        await uploadPhotoToStorage(photo.base64String);
      } catch (error) {
        setError('Error taking photo: ' + (error as Error).message);
      } finally {
        setLoading(false);
      }
    }, [uploadPhotoToStorage]);
  
    return {
      takePhotoHandler,
    };
  };

  const { takePhotoHandler } = usePhoto();

  useEffect(() => {
    async function getData() {
      try {
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'photos'));
        console.log('querySnapshot', querySnapshot);
        // Handle the retrieved photo data as needed
        // You may want to update the state or display the images
      } catch (error) {
        setError('Error fetching data: ' + (error as Error).message);
      }
    }

    getData();
  }, [db]);

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
                    {/* Display the taken photo or the default profile picture */}
                    <img
                      src={takenPhoto?.webPath ? (blobToDataURL(takenPhoto.webPath)) : profilePicture}
                      alt="Profile"
                      style={{ width: '150px', height: 'auto' }}
                    />
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

// Helper function to convert blob URL to data URL
const blobToDataURL = (blobURL: string): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    fetch(blobURL).then((response) => response.blob()).then((blob) => reader.readAsDataURL(blob));
  });
};
