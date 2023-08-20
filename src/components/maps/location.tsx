import React from 'react';
import GoogleMapReact from 'google-map-react';
import {
  IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonSpinner
} from '@ionic/react';
import './styles.css';
const AnyReactComponent = () => (
  <div style={{
    color: 'white', background: 'red', padding: '10px', display: 'inline-flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: '100%', transform: 'translate(-80%, -100%)'
  }}>
    <div className="pointer">
    </div>
  </div>
);
const HomeView = (props: any) => {
  const { center } = props
  return (
    <>
      <IonPage id='main'>
        <IonHeader>
          <IonToolbar color='dark'>
            <IonButtons slot='start'>
              <IonMenuButton ></IonMenuButton>
            </IonButtons>
            <IonTitle slot="start">Map Geolocation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="GEoMap">
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC9XT_k8rE38c6afdxXisdkn7nEOV2KoEs&callback=initMap&v=weekly' }}
              defaultCenter={center}
              defaultZoom={16}
            >
              <AnyReactComponent />
            </GoogleMapReact>
          </div>
        </IonContent>
      </IonPage>
    </>

  )
}
export default HomeView;
