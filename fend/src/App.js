
import React from 'react';
import './App.css';

import Login from './LogIn/Login'
import OperationCenter from './OperationCenter/OperationCenter';
function App() {
    return(
      
    <OperationCenter     /> 


)
  // const [validated, setValidated] = useState(false);

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };
  // return (
    
  //   <>
  //   <div className='d-flex justify-content-center sm'>
  //   <img src='Logo.jpg' alt='Logo' ></img>
  //   </div> 
  //   <div className="Auth-form-container">
    
  //   <form className="Auth-form">
  //     <div className="Auth-form-content">
  //       <h3 className="Auth-form-title">Sign In</h3>
  //       <div className="form-group mt-3">
  //         <label>Email address</label>
  //         <input
  //           type="email"
  //           className="form-control mt-1"
  //           placeholder="Enter email"
  //         />
  //       </div>
  //       <div className="form-group mt-3">
  //         <label>Password</label>
  //         <input
  //           type="password"
  //           className="form-control mt-1 "
  //           placeholder="Enter password"
  //         />
  //       </div>
  //       <div className="d-grid gap-2 mt-3">
  //         <button type="submit" className="btn btn-primary">
  //           Submit
  //         </button>
  //       </div>
  //       <div className='d-flex justify-content-center'>
  //       <p className="forgot-password text-right mt-2 ">
  //         Forgot <a href="#">password?</a>
  //       </p>
  //       </div>
  //     </div>
  //   </form>
  // </div>
  // </>
  // );
}

export default App;
