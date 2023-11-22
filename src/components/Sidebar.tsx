import {IonList, IonItem, IonLabel, IonIcon, IonHeader, IonTitle, IonRouterLink } from "@ionic/react";
import { home, cartOutline, archive, person } from 'ionicons/icons';
import DarkThemeToggle from "./DarkThemeToggle";


const Sidebar: React.FC = () => {
    
    return (
            <IonList>
                
                <IonHeader>
                    <IonTitle>
                        CanAway
                    </IonTitle>
                    <br></br>
                </IonHeader>

                <IonRouterLink routerLink="/home">
                <IonItem className="sidebar-item">
                    <IonIcon icon={home} slot="start" />
                    <IonLabel>Home</IonLabel>
                </IonItem>
                </IonRouterLink>

                <IonRouterLink routerLink="/wishlist">
                <IonItem className="sidebar-item">
                    <IonIcon icon={cartOutline} slot="start" />
                    <IonLabel>Wishlist</IonLabel>
                </IonItem>
                </IonRouterLink>

                <IonRouterLink routerLink="/history">
                <IonItem className="sidebar-item">
                    <IonIcon icon={archive} slot="start" />
                    <IonLabel>History</IonLabel>
                </IonItem>
                </IonRouterLink>

                <IonRouterLink routerLink="/profile">
                <IonItem className="sidebar-item">
                    <IonIcon icon={person} slot="start" />
                    <IonLabel>Profile</IonLabel>
                </IonItem>
                
                </IonRouterLink>

                <DarkThemeToggle/>
                
            </IonList>
    );
  };
  
  export default Sidebar;