import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonMenu, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AddMenu from './components/AddMenu';
import DeleteMenu from './components/DeleteMenu';
import EditMenu from './components/EditMenu';
// import Delete from './components/Delete';
// import Edit from './components/Edit';

setupIonicReact();

const App: React.FC = () => (

  <IonApp>
    <IonReactRouter>
      <IonMenu contentId="main">
        <Sidebar />
      </IonMenu>
      <IonRouterOutlet id="main">
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="/edit/:id" component={EditMenu} />
        <Route path="/delete/:id" component={DeleteMenu} />
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/addmenu">
          <AddMenu />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Redirect to="/login" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
