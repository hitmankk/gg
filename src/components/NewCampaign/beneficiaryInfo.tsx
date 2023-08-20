import React, { useState, useEffect } from 'react';
import { IonButton, IonInput, IonItem, IonList, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, getFirestore, getDoc, collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../pages/firebaseConfig';
import './beneficiaryInfo.css';
import { Timestamp } from 'firebase/firestore';
import { useHistory } from 'react-router';


function BeneficiaryInfo() {const history =useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [beneficiaryRelationship, setBeneficiaryRelationship] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [patientName, setpatientnName] = useState('');
  const [patientAge, setpatientnAge] = useState('');
  const [patientCity, setpatientnCity] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
   
  const [gender, setgender] = useState('');
  const [patientGender, setpatientGender] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserLoggedIn(true);
  
        console.log('User UID:', user.uid); // Log the user's UID
  
        // Fetch user data from Firestore and set the state
        const userRef = doc(db, 'users', user.uid);
        console.log('User Document Reference:', userRef); // Log the document reference
  
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setEmail(userData.email);
          setName(userData.name);
          setPhoneNum(userData.phoneNum);
          setAddress(userData.address);
          setgender(userData.gender);
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
      // Create a campaign data object
      const campaignData = {
        email: email,
        name: name,
        phoneNum: phoneNum,
        address: address,
        gender: gender,
        campaignName: campaignName,
        beneficiary: beneficiary,
        beneficiaryRelationship: beneficiaryRelationship,
        patientName: patientName,
        patientAge: patientAge,
        patientCity: patientCity,
        patientGender: patientGender,
        createdAt: Timestamp.fromDate(new Date()), // Add a timestamp
      };
  
      try {
        // Create a new campaign document under the user's collection
        const campaignsRef = collection(db, 'users', user.uid, 'campaigns');
        await addDoc(campaignsRef, campaignData);
  
        // Set a cookie with the SameSite attribute
        document.cookie = `myCookie=cookieValue; max-age=3600; secure; samesite=none`;
  
        alert('Campaign document added successfully');
      } catch (error) {
        alert('Error adding campaign document:');
      }
    }
  };
  

  return (
  <>
      <div className="container1">
        <div className="divider"></div>
        <div className="divider"></div>
        <h6>Email : {auth.currentUser?.email}</h6>

         <IonInput
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value || '')}
          ></IonInput>
        
        <h6>Name : {auth.currentUser?.displayName}</h6>
        <IonInput
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onIonChange={(e) => setEmail(e.detail.value || '')}
          ></IonInput>
       
        <h6>Address: </h6>
        <IonInput
          type="text"
          placeholder="Enter Address"
          value={address}
          onIonChange={(e) => setAddress(e.detail.value || '')}
          ></IonInput>
       
        <h6>Gender </h6>
        <IonInput
          type="text"
          placeholder="Enter Gender"
          value={gender}
          onIonChange={(e) => setgender(e.detail.value || '')}
          ></IonInput>
        <h6>Contact details</h6>
        <IonInput
          type="tel"
          placeholder="Enter your PhoneNumber"
          value={phoneNum}
          onIonChange={(e) => setPhoneNum(e.detail.value || '')}
          ></IonInput>
          <h6>Beneficiary</h6>
          <IonList style={{backgroundColor: 'white' ,}}>
      <IonItem style={{backgroundColor: 'white' ,}}>
        <IonSelect aria-label="Beneficiary" interface="popover" value={beneficiary} onIonChange={(e) =>setBeneficiary(e.detail.value || '')} placeholder="Select Beneficiary">
          <IonSelectOption value="self" >Self</IonSelectOption>
          
          <IonSelectOption value="other">Other</IonSelectOption>
        </IonSelect>
      </IonItem>
    </IonList>
        <h6>Beneficiary Relationship</h6>
        <IonInput
          type="text"
          placeholder="Enter Beneficiary relation"
          value={beneficiaryRelationship}
          onIonChange={(e) => setBeneficiaryRelationship(e.detail.value || '')}
          ></IonInput>
        <h6>Campaign Name</h6>
        <IonInput
          type="text"
          placeholder="Enter campaign Title"
          value={campaignName}
          onIonChange={(e) => setCampaignName(e.detail.value || '')}
          ></IonInput>
          <h6>Patient Name</h6>
        <IonInput
          type="text"
          placeholder="Enter Patient Name"
          value={patientName}
          onIonChange={(e) =>setpatientnName(e.detail.value || '')}
          ></IonInput>
          <h6>Enter Patient Age</h6>
        <IonInput
          type="number"
          placeholder="Enter Patient Age"
          value={patientAge}
          onIonChange={(e) =>setpatientnAge(e.detail.value || '')}
          ></IonInput>
          <h6>Patient City</h6>
        <IonInput
          type="text"
          placeholder="Enter Patient's City"
          value={patientCity}
          onIonChange={(e) =>setpatientnCity(e.detail.value || '')}
          ></IonInput>
          <h6>Patient Gender</h6>
          <IonList style={{backgroundColor: 'white' ,}}>
      <IonItem style={{backgroundColor: 'white' ,}}>
        <IonSelect aria-label="Patient Gender" interface="popover" value={patientGender} onIonChange={(e) =>setpatientGender(e.detail.value || '')} placeholder="Select Gender">
          <IonSelectOption value="Male">Male</IonSelectOption>
          <IonSelectOption value="Female">Female</IonSelectOption>
          <IonSelectOption value="Other">Other</IonSelectOption>
        </IonSelect>
      </IonItem>
    </IonList>
       
          

        <IonButton expand="full" onClick={handleFormSubmit}>
       submit
        </IonButton>
      </div>
      </>
        );
}

export default BeneficiaryInfo;
