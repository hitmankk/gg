import React, { useState, useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonImg } from '@ionic/react';
import { doc, db, auth } from '../../pages/firebaseConfig';
import { onAuthStateChanged } from '@firebase/auth';
import { getDoc } from 'firebase/firestore';
import './preview.css';
interface CampaignPreviewProps {
  userId: string;
  campaignId: string;
  previewUpdateCounter: number;
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ userId, campaignId, previewUpdateCounter }) => {
  const [healthIssue, setHealthIssue] = useState('');
  const [description, setDescription] = useState('');
  const [campaignImageName, setCampaignImageName] = useState('');
  const [images, setImages] = useState<string | null>(null);
  


  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        // Fetch campaign data and update the state variables here
       
        const campaignRef = doc(db, 'users', userId, 'campaigns', campaignId);
        const campaignDoc = await getDoc(campaignRef);
        if (campaignDoc.exists()) {
          const campaignData = campaignDoc.data();
          setHealthIssue(campaignData?.healthIssue || '');
          setDescription(campaignData?.description || '');
          setCampaignImageName(campaignData?.imageName || '');
setImages(campaignData?.images || '');
          // Set the image URL based on the image name pattern
          
        }
      }
    };

    fetchData();
  }, [userId, campaignId, previewUpdateCounter]);

  return (
    <div className="cont">
      
    <IonCard color="light" >
      {images && (
        <IonImg className='cover' src={images} alt="Campaign Preview" />
        )}
      <IonCardHeader>
        <IonCardTitle>{healthIssue}</IonCardTitle>
        <IonCardSubtitle>{description}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
        </div>
  );
};

export default CampaignPreview;
