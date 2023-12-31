import {IonList, IonItem, IonLabel, IonIcon, IonHeader, IonTitle, IonRouterLink } from "@ionic/react";
import { home, cartOutline, archive, person, pizza } from 'ionicons/icons';
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
                
                <IonRouterLink routerLink="/profile">
                <IonItem className="sidebar-item">
                    <IonIcon icon={person} slot="start" />
                    <IonLabel>Profile</IonLabel>
                </IonItem>
                
                </IonRouterLink>
                
                <IonRouterLink routerLink="/addmenu">
                <IonItem className="sidebar-item">
                    <IonIcon icon={pizza} slot="start" />
                    <IonLabel>Add Menu</IonLabel>
                </IonItem>
                
                </IonRouterLink>

                <DarkThemeToggle/>
                
            </IonList>
    );
  };
  
  export default Sidebar;