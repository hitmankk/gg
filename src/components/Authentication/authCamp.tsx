import React, { useState, useEffect } from 'react';
import { IonButton } from '@ionic/react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db, doc } from '../../pages/firebaseConfig';
import BeneficiaryInfo from '../NewCampaign/beneficiaryInfo';
import HealthIssueDetails from '../NewCampaign/healthIssueDetails';
import FundDetails from '../NewCampaign/fundDetails';
import './authCamp.css';
import CampaignPreview from '../NewCampaign/preview';
import { collection, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
interface AuthCampProps {
  onLogin: () => void;
  activeComponent: string | null;
  handleItemClick: (componentName: string) => void;
}

const AuthCamp: React.FC<AuthCampProps> = ({ onLogin, activeComponent, handleItemClick }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [healthIssue, setHealthIssue] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [campaignId, setCampaignId] = useState('');

  const [previewUpdateCounter, setPreviewUpdateCounter] = useState(0);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserLoggedIn(true);
        setUserId(user.uid);
        setUserLoggedIn(true);
        setUserId(user.uid);
        setAuthenticatedUser(user);
        
        // Fetch user data from Firestore and set the state
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          // ... set other fields as needed
        }
        
        // Query campaigns subcollection to get the latest campaign based on timestamp
        const campaignsCollectionRef = collection(userRef, 'campaigns');
        const querySnapshot = await getDocs(
          query(campaignsCollectionRef, orderBy('createdAt', 'desc'), limit(1))
        );

        if (!querySnapshot.empty) {
          const latestCampaignDoc = querySnapshot.docs[0];
          setCampaignId(latestCampaignDoc.id);
        }
      } else {
        setUserLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const handleUserLogin = () => {
    // Your login logic here
    // Call onLogin() when the user logs in successfully
    onLogin();

    // Handle the selected component after login
    if (activeComponent) {
      handleItemClick(activeComponent);
    }
  };

  return (
    <>
      {authenticatedUser === null ? (
        <div className="createCampaign">
          <IonButton expand="block" href='/profile/login'>
            Login
          </IonButton>
        </div>
      ) : (
        <>
        <div className="centre">

        <h1>Beneficiary Info</h1>
   <BeneficiaryInfo />
      
          <h1>Health Issue Details</h1>
          <HealthIssueDetails />
          <h1>Fund Details</h1>
          <FundDetails/>
          <h1>Preview</h1>
          <CampaignPreview userId={userId} campaignId={campaignId}  previewUpdateCounter={previewUpdateCounter} />
          {/* <CampaignPreview userId={userId} campaignId={campaignId}/> */}
        </div>
          {/* Components to show after login */}
        </>
      )}
    </>
  );
};

export default AuthCamp;
