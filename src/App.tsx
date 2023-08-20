import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { IonApp, IonFooter, IonHeader, IonIcon, IonLabel, IonRouterOutlet, IonSpinner, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home/Home";
import Login from "./pages/profile/Login";
import Register from "./pages/profile/Register";
import { SharedStateProvider } from './components/SharedStateContext';


/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
// import { getCurrentUser } from "./firebaseConfig";
// import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import firebase from "firebase/compat";
import { auth } from "./pages/firebaseConfig";
import { namedQuery } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Dashboard from "./pages/profile/Dashboard";
import { wallet , personCircle, homeOutline, home, search, medical} from "ionicons/icons";
import donateNow from "./pages/donateNow";
import Nav from "./components/nav/nav";
import CreateCampaign from "./pages/CreateCampaign/CreateCampaign";


  
setupIonicReact();

const App: React.FC = () => {
 


  return (
    <SharedStateProvider>

    <IonApp>
      <BrowserRouter>
     
      
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>

            <Route path='/Home/Home' component={Home} exact={true} />
            <Route path='/profile/dashboard' component={Dashboard} exact />
            <Route path='/donateNow' component={donateNow} exact />
            <Route path='/profile/Login' component={Login} exact />
            <Route path='/profile/Register' component={Register} exact />
            <Route path='/CreateCampaign/CreateCampaign' component={CreateCampaign} exact />
           
           
            
            <Redirect exact from="/" to="/Home/Home" />
          </IonRouterOutlet>
  

            <IonTabBar slot='bottom'>
             <IonTabButton href="../Home/Home" tab="Home">
             
              <IonIcon icon={home}></IonIcon>
              <IonLabel>Home</IonLabel>
             </IonTabButton>
             <IonTabButton href="../donateNow" tab="donateNow">
              <IonIcon icon={wallet}></IonIcon>
             
              <IonLabel>Donate Now!</IonLabel>
       
             </IonTabButton>
             <IonTabButton href="../CreateCampaign/CreateCampaign" tab="CreateCampaign">
             
              <IonIcon icon={medical}></IonIcon>
              <IonLabel>Create Campaign</IonLabel>
             </IonTabButton>
            </IonTabBar>
       
       

        </IonTabs>

      </IonReactRouter>
      </BrowserRouter>
    </IonApp>
    </SharedStateProvider>
  )
};


export default App;
