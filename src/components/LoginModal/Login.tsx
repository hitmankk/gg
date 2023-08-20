import { IonInput } from '@ionic/react';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const LoginModal = () => {
  return (
    
  
    <div className="modal fade" id="LoginModal"  aria-labelledby="LoginModalLabel" aria-hidden="true"  style={{zIndex:'-1'}}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          
          <h5 className="modal-title" id="LoginModalLabel">Login</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form className="form-signin">

            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" 
              />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" />
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me"/> Remember me
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">© 2021-2022</p>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

        </div>
      </div>
    </div>
  </div>
  )
}

export default LoginModal;
