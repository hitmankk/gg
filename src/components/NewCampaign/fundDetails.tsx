
import { IonButton, IonCol, IonIcon, IonInput, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, getFirestore, getDoc, collection, addDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../pages/firebaseConfig';
import './beneficiaryInfo.css';
import { Redirect } from 'react-router';
import ImageUploader from './ImageUploader';
import { walletOutline, cardOutline, image } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { IonImg } from '@ionic/react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';



function FundDetails() {
  
  const [userLoggedIn, setUserLoggedIn] = useState(false);
   const [TotalAmountReq, setTotalAmountReq] = useState('');
   const [TargetDate, setTargetDate] = useState('');
   const [TargetDateDetails, setTargetDateDetails] = useState('');
const[paymentMode, setpaymentMode]= useState('');
const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const storage = getStorage();
        setUserLoggedIn(true);
        // Fetch user data from Firestore and set the state
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
          const userData = userSnap.data();
         
        
        
          // ... set other fields as needed
        }
      } else {
        setUserLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleFormSubmit = async () => {
    const user = auth.currentUser;
  
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        const campaignsCollectionRef = collection(userRef, 'campaigns');
  
        // Query campaigns subcollection to get the latest campaign based on timestamp
        const querySnapshot = await getDocs(
          query(campaignsCollectionRef, orderBy('createdAt', 'desc'), limit(1))
        );
  
        if (!querySnapshot.empty) {
          const latestCampaignDoc = querySnapshot.docs[0];
          const campaignRef = doc(userRef, 'campaigns', latestCampaignDoc.id);
  
          const existingCampaignData = (await getDoc(campaignRef)).data();
          const updatedCampaignData = {
            ...existingCampaignData,
            TotalAmountReq: TotalAmountReq,
            TargetDate: TargetDate,
            TargetDateDetails,
        
            // ... other fields
          };
  
          await setDoc(campaignRef, updatedCampaignData);
  
          alert('Campaign information updated successfully');
          // Redirect to the next page or perform other actions here
        } else {
          alert('No campaigns found');
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        alert('Error updating campaign information: ' + errorMessage);
      }
    } else {
      // If the user is not logged in, show an error
      alert('User not logged in');
    }
    
  };

  return (
  <>
      <div className="container1">
        <div className="divider"></div>
        <div className="divider"></div>
      
        
      
       
        <h6>Total Amount Requested</h6>
        <IonInput
          type="number"
          placeholder="Enter Total Amount Requested"
          value={TotalAmountReq}
          onIonChange={(e) => setTotalAmountReq(e.detail.value || '')}
          ></IonInput>
        <h6>Target Date</h6>
        <IonInput
          type="date"
          placeholder="Enter Target Date"
          value={TargetDate}
          onIonChange={(e) => setTargetDate(e.detail.value || '')}
          ></IonInput>
          <h6>Target Donation Details</h6>
        <IonInput
          type="text"
          placeholder="Enter Target Donation Details"
          value={TargetDateDetails}
          onIonChange={(e) => setTargetDateDetails(e.detail.value || '')}
          ></IonInput>
          <h6>Payment Mode</h6>
          <IonRow>
                          <IonCol>
                            <IonSelect
                              placeholder="Payment Method"
                              value={paymentMode}
                              onIonChange={(e) =>
                                setpaymentMode(e.detail.value || '')
                              }
                              >
                              <IonSelectOption value="UPI">
                               <IonIcon ></IonIcon> UPI
                              </IonSelectOption>
                              <IonSelectOption value="Wallet">
                               <IonIcon icon={walletOutline}></IonIcon> Wallet
                              </IonSelectOption>
                              <IonSelectOption value="Card">
                               <IonIcon icon={cardOutline}>Credit/Debit/ATM card</IonIcon> 
                              </IonSelectOption>
                            </IonSelect>
                          </IonCol>
                        </IonRow>

        <IonButton expand="full" onClick={handleFormSubmit}>
       submit
        </IonButton>
      </div>
      </>
        );
}

export default FundDetails;
