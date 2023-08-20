import React, { useState, ChangeEvent } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonImg,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../pages/firebaseConfig';
import { doc, updateDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

interface ImageUploaderProps {
  userId: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ userId }) => {
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const storage = getStorage();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(event.target.files || []).slice(0, 5); // Limit to 5 images
    setImages(selectedImages);
  };

  const uploadImage = async (image: File) => {
    const storageRef = ref(storage, `users/${userId}/images/${image.name}`);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL || ''; // Return an empty string if downloadURL is undefined
  };

  const handleImageUpload = async () => {
    const uploadedURLs: string[] = [];
    for (const image of images) {
      const downloadURL = await uploadImage(image);
      if (downloadURL) {
        uploadedURLs.push(downloadURL);
      }
    }
    setUploadedImages(uploadedURLs);

    // Update the latest campaign's data with the new image URLs
    const userRef = doc(db, 'users', userId);
    const campaignsCollectionRef = collection(userRef, 'campaigns');
    const querySnapshot = await getDocs(
      query(campaignsCollectionRef, orderBy('createdAt', 'desc'), limit(1))
    );

    if (!querySnapshot.empty) {
      const latestCampaignDoc = querySnapshot.docs[0];
      const latestCampaignRef = doc(campaignsCollectionRef, latestCampaignDoc.id);
      
      // Update the document with the new image URLs
      await updateDoc(latestCampaignRef, {
        images: uploadedURLs,
      });
    }
  };

  return (
 
    <IonGrid>
      <IonRow>
        <IonCol>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        </IonCol>
        <IonCol>
          <IonButton onClick={handleImageUpload}>Upload Images</IonButton>
        </IonCol>
      </IonRow>

      <IonRow>
        {uploadedImages.map((url, index) => (
          <IonCol key={index}>
            <IonCard>
              <IonImg src={url} />
              <IonCardContent>
                <p>Image {index + 1}</p>
              </IonCardContent>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default ImageUploader;

