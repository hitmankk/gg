import { IonButton, IonIcon, IonItem, IonList, IonSelect, IonSelectOption, NavContext } from '@ionic/react';
import './nav.css';
import { NavLink } from 'react-router-dom';



import React, { useEffect, useState } from 'react';
import { card } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../pages/firebaseConfig';
import Authentication from '../Authentication/authentication';

interface ContainerProps { }

const Nav: React.FC<ContainerProps> = ()  => {
    
    const [isActive, setIsActive] = useState(false);
    const history = useHistory();
  
    const handleClick = () => {
        setIsActive(!isActive);
        
    }
    function signout() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          history.push('/Home/Home');
        })
        .catch((error) => {
          // An error happened.
        });
    }
  
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("Hello", user.email);
        } else {
          console.log("you are logged out");
        }
      });
    }, []);
     function active(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsActive(!isActive);
        } else {
          setIsActive(isActive);
        }})
     }
    

    
    return (
        
        <>   
          
           <section>

   

    <header>
      

        
        <ul className="navigation">
            <li><a href="#">search</a></li>
            <li><a href="#" style={{fontSize: '20px'}}>How It Works</a></li>
            <li className="nav-item" ><a href="../Home/Home" ><img  className="img-logo" src="img/G_G.svg" alt=""/></a></li>
            <li><a href="#" style={{fontSize: '20px'}}>Trust & Tranceparency</a></li>
            <li className="nav-item">
           
             
              <div className="dropdown">
  <button className="dropbtn">Profile</button>
  <div className="dropdown-content">
   
  
   <Authentication/>
  </div>
  
</div>
</li>
</ul>
</header>
</section>




           </>
            
    );

};
export default Nav;
