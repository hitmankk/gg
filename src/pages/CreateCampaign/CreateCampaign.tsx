import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { Link } from 'react-router-dom'; // Import the Link component for navigation

import AuthCamp from '../../components/Authentication/authCamp';
import BeneficiaryInfo from '../../components/NewCampaign/beneficiaryInfo';
import HealthIssueDetails from '../../components/NewCampaign/healthIssueDetails';
import FundDetails from '../../components/NewCampaign/fundDetails';
import './CreateCampaign.css';
import Nav from '../../components/nav/nav';
import CampaignPreview from '../../components/NewCampaign/preview';
import { doc, getDoc, collection, getDocs, query, orderBy, limit } from '@firebase/firestore';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';

const CreateCampaign = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  
  const [showBeneficiaryInfo, setShowBeneficiaryInfo] = useState(true);
  const [showHealthIssueDetails, setShowHealthIssueDetails] = useState(false);
  const [showFundDetails, setShowFundDetails] = useState(false);
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


  const handleLogin = () => {
    // Your login logic here, set loggedIn to true on successful login
    setLoggedIn(true);
    setPreviewUpdateCounter(previewUpdateCounter + 1);
  };

  const handleItemClick = (componentName: string) => {
    switch (componentName) {
      case 'BeneficiaryInfo':
        setShowBeneficiaryInfo(true);
        setShowHealthIssueDetails(false);
        setShowFundDetails(false);
        break;
      case 'HealthIssueDetails':
        setShowBeneficiaryInfo(false);
        setShowHealthIssueDetails(true);
        setShowFundDetails(false);
        break;
      case 'FundDetails':
        setShowBeneficiaryInfo(false);
        setShowHealthIssueDetails(false);
        setShowFundDetails(true);
        break;
      // Add more cases for other components
      default:
        break;
    }
  };

  console.log('showBeneficiaryInfo:', showBeneficiaryInfo);
  console.log('showHealthIssueDetails:', showHealthIssueDetails);
  console.log('showFundDetails:', showFundDetails);

  return (
    <>
      <IonPage>
        <IonContent fullscreen={true} color={'light'}>
        <Nav/>
          {/* Your other components, Nav, and container go here */}
          <div className="container">
            <h1 className='heading'>Create a Campaign</h1>
            <div className="sideBar">
              <ul className='Sitem'>
                {/* Use the Link component to navigate to different routes */}
                <li className='item'>
                  <Link to="#" onClick={() => handleItemClick('BeneficiaryInfo')}>Benficiary Info</Link>
                </li>
                <li className='item'>
                  <Link to="#" onClick={() => handleItemClick('HealthIssueDetails')}>Health Issue Details</Link>
                </li>
                <li className='item'>
                  <Link to="#" onClick={() => handleItemClick('FundDetails')}>Fund Details</Link>
                </li>
                <li className='item'>
                  <Link to="#" onClick={() => handleItemClick('TreatmentDetails')}>Treatment Details</Link>
                </li>
                <li className='item'>
                  <Link to="#" onClick={() => handleItemClick('Preview')}>Preview</Link>
                </li>
              </ul>
              
            </div>
          </div>

          

          {/* Render the AuthCamp component for login */}
          {!loggedIn ? (
             <AuthCamp
             onLogin={handleLogin}
             activeComponent={activeComponent}
             handleItemClick={handleItemClick}
           />
          ) : (
            <>
              {showBeneficiaryInfo && <BeneficiaryInfo />}
              {showHealthIssueDetails && <HealthIssueDetails />}
              {showFundDetails && <FundDetails />}
              {showFundDetails &&    <CampaignPreview userId={userId} campaignId={campaignId}  previewUpdateCounter={previewUpdateCounter} />}
              {/* Add more component renderings based on show flags */}
            </>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default CreateCampaign;
