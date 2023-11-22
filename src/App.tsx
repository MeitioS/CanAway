import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonMenu, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ProductData} from './components/DataProduct';
import { ContextProduct } from './components/ContextProduct';
import { CartProvider } from './components/ContextCart';
import { WishlistProvider } from './components/ContextWishlist';

import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Login from './pages/Login';
import History from './pages/History';
import Profile from './pages/Profile';

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

setupIonicReact();

const App: React.FC = () => (

  <WishlistProvider>
  <CartProvider>
  <ContextProduct.Provider value={ProductData}>
    <IonApp>
            <IonReactRouter>
              <IonMenu contentId="main">
                <Sidebar />
              </IonMenu>
              <IonRouterOutlet id="main">
                <Route exact path="/home">
                    <Home/>
                </Route>
                <Route exact path="/wishlist">
                  <Wishlist/>
                </Route>
                <Route exact path="/cart">
                  <Cart/>
                </Route>
                <Route exact path="/history">
                  <History/>
                </Route>
                <Route exact path="/login">
                  <Login/>
                </Route>
                <Route exact path="/profile">
                  <Profile />
                </Route>
                <Redirect to="/login"/>
              </IonRouterOutlet>
            </IonReactRouter>
    </IonApp>
  </ContextProduct.Provider>
  </CartProvider>
  </WishlistProvider>
);

export default App;
