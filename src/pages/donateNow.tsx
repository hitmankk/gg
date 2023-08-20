
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
  IonMenu,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonMenuToggle,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import './Home.css'
import {  signOut} from "firebase/auth";
import { auth } from "./firebaseConfig";
 
import {  personCircle, search, cardOutline, walletOutline } from 'ionicons/icons';
import "./donateNow.css";
import Nav from "../components/nav/nav";





const donateNow: React.FC = () => {
    const [input] = useState<string>("");
    const history = useHistory();
    const [paymentMethod, setPaymentMethod] = useState("");
  
    useEffect(() => {
      console.log(input);
    }, [input]);
  
    function signout() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          history.push("/Dashboard");
        })
        .catch((error) => {
          // An error happened.
        });
    }
  
    return (
      <>
    
        <Nav/>
        {/* ... (menu code) */}
     

            <IonGrid>
              <IonRow>
                <IonCol className="ion-card">
                  <IonCard color={"light"}>
                    <IonCardHeader>
                      <div
                        style={{
                      
                          fontWeight: "bold",
                          fontSize: "50px",
                        }}
                        >
                        <h3>
                          <span className="ion-1x">
                            <strong className="text-black">
                              || Target Donation - Achived Donation
                            </strong>
                          </span>
                        </h3>
                        <IonCardTitle>
                          <p className="center">donation details</p>
                        </IonCardTitle>
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <IonCol>
                            <IonInput  placeholder="FullName" fill="outline" />
                          </IonCol>
                          <IonCol>
                            <IonInput placeholder="Comment" fill="outline"/>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <IonInput placeholder="Email"fill="outline" />
                          </IonCol>
                          <IonCol>
                            <IonInput placeholder="Enter Amount" fill="outline"/>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <IonInput placeholder="Phone Number" fill="outline"/>
                          </IonCol>
                          <IonCol>
                            <IonInput placeholder="Type of donation" fill="outline"/>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <IonSelect
                              placeholder="Payment Method"
                              value={paymentMethod}
                              onIonChange={(e) =>
                                setPaymentMethod(e.detail.value)
                              }
                              >
                              <IonSelectOption value="Option 1">
                               <IonIcon ></IonIcon> UPI
                              </IonSelectOption>
                              <IonSelectOption value="Option 2">
                               <IonIcon icon={walletOutline}></IonIcon> Wallet
                              </IonSelectOption>
                              <IonSelectOption value="Option 3">
                               <IonIcon icon={cardOutline}>Credit/Debit/ATM card</IonIcon> 
                              </IonSelectOption>
                            </IonSelect>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <IonButton size="default" expand="block">
                              Submit
                            </IonButton>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
         
            </IonGrid>
 
     
      </>
    );
  };
  
  export default donateNow;