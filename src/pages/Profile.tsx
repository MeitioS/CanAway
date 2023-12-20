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
  const Profile: React.FC = () => 
  {
  const cardSize = '300px';
  const [profilePicture] = useState(ProfileData[0].image);
  const [takenPhoto, setTakenPhoto] = useState<Photo | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [app] = useState<FirebaseApp>(initializeFirebase());
  const [db] = useState(getFirestore(app));
  const [storage] = useState(getStorage(app));
  const collectionPath = 'photos';

  const addData = async (url: string) => 
  {
    try {
      const docRef = await addDoc(collection(db, collectionPath),
       {
        photoUrl: url,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      setError('Error adding document: ' + (e as Error).message);
    }
  };

  // Custom hook for photo-related logic
  const usePhoto = () => 
  {
    const uploadPhotoToStorage = useCallback(
      async (base64String: string) => 
      {
        try 
        {
          console.log('Before uploading to Storage');
  
          // Convert base64 string to Blob
          const blob = dataURItoBlob(base64String);
          
          // Create a unique filename
          const filename = `profile_photo_${new Date().getTime()}.jpg`;
  
          // Get storage reference
          const storageRef: StorageReference = ref(storage, `Photos/${filename}`);
  
          console.log('Uploading blob to storage');
          await uploadBytes(storageRef, blob);
  
          console.log('Upload complete. Getting download URL');
          const url: string = await getDownloadURL(storageRef);
          console.log('Storage URL', url);
  
          // Update takenPhoto state with the photo details
          setTakenPhoto({
            webPath: url,
            format: 'jpeg',
            saved: false,
          });
  
          // Now, you can add the URL to Firestore
          addData(url);
        } catch (uploadError) 
        {
          console.error('Error uploading photo to Firebase:', uploadError);
          setError('Error uploading photo to Firebase: ' + (uploadError as Error).message);
        }
      },
      [addData]
    );
  
    // Helper function to convert data URI to Blob
    const dataURItoBlob = (dataURI: string): Blob => 
    {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    };
  
    const takePhotoHandler = useCallback(async () => 
    {
      try 
      {
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
  
        if (!photo || !photo.webPath) {
          console.log('Invalid Photo');
          return;
        }
  
        // Convert photo to base64
        const photoBase64 = await readFileAsync(photo.webPath);
  
        // Proceed with uploading the photo to Firebase Storage
        await uploadPhotoToStorage(photoBase64);
      } 
      catch (error) 
      {
        setError('Error taking photo: ' + (error as Error).message);
      } 
      finally 
      {
        setLoading(false);
      }
    }, [uploadPhotoToStorage]);
  
    // Helper function to read file as base64
    const readFileAsync = (path: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        try {
          fetch(path)
            .then(response => response.blob())
            .then(blob => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = (e) => reject(e);
              reader.readAsDataURL(blob);
            })
            .catch(error => reject(error));
        } catch (error) {
          reject(error);
        }
      });
    };
  
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
      } 
      catch (error) 
      {
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
                        src={takenPhoto ? takenPhoto.webPath : profilePicture}
                        alt="Profile"
                        style={{ width: '150px', height: 'auto' }}
                        crossOrigin="anonymous"
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

