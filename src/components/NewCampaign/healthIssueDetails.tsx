import React, { useState, useEffect } from 'react';
import { IonButton, IonInput, IonItem, IonList } from '@ionic/react';
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, getFirestore, getDoc, collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../pages/firebaseConfig';
import ImageUploader from './ImageUploader';
import CampaignPreview from '../NewCampaign/preview'; // Import the CampaignPreview component

function HealthIssueDetails() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [healthIssue, setHealthIssue] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [campaignId, setCampaignId] = useState('');

  const [previewUpdateCounter, setPreviewUpdateCounter] = useState(0); // Add a state for preview update

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserLoggedIn(true);
        setUserId(user.uid);
        
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

  const handleFormSubmit = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        const campaignRef = doc(db, 'users', userId, 'campaigns', campaignId);

        const existingCampaignData = (await getDoc(campaignRef)).data();
        const updatedCampaignData = {
          ...existingCampaignData,
          healthIssue: healthIssue,
          description: description,
          // ... other fields
        };

        await setDoc(campaignRef, updatedCampaignData);

        alert('Campaign information updated successfully');

        // Trigger the preview update by incrementing the counter
        setPreviewUpdateCounter(previewUpdateCounter + 1);
      } catch (error) {
        const errorMessage = (error as Error).message;
        alert('Error updating campaign information: ' + errorMessage);
      }
    } else {
      alert('User not logged in');
    }
  };

  return (
    <>
      <div className="container1">
        {/* ... your existing input fields ... */}
        
        <div className="divider"></div>
      

      <h6>HealthIssue</h6>
      <IonInput
        type="text"
        placeholder="Enter HealthIssue"
        value={healthIssue}
        onIonChange={(e) => setHealthIssue(e.detail.value || '')}
      ></IonInput>
      <h6>Description</h6>
      <IonInput
        type="text"
        placeholder="Enter Description"
        value={description}
        onIonChange={(e) => setDescription(e.detail.value || '')}
      ></IonInput>
        {/* ImageUploader component */}
        <ImageUploader userId={userId}  />

        <IonButton expand="full" onClick={handleFormSubmit}>
          submit
        </IonButton>


<h1>Preview</h1>
        {/* Render the CampaignPreview */}
        {userLoggedIn && (
          <CampaignPreview userId={userId} campaignId={campaignId}  previewUpdateCounter={previewUpdateCounter} />
        )}
      </div>
    </>
  );
}

export default HealthIssueDetails;
