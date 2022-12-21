
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import AuThorizedDealer from './AuthorizedDealer/AuthorizedDealer';
import Auth from './LogIn/Auth';
import WarrantyCenter from './WarrantyCenter/WarrantyCenter';
import Login from './LogIn/Login'
import RequiredAuth from './LogIn/RequiredAuth';
import ManufactureFactory from './ManufactureFactory/ManufactureFactory';
import OperationCenter from './OperationCenter/OperationCenter';
import { LOGIN_FAILED } from './store/Constant';
import DataContext from './store/Context';
import { useDataContext } from './store/hooks';
import Notify from './WarrantyCenter/Notify';
function App() {
  const { login, loginHandle } = useDataContext()
  console.log(login)
  useEffect(() => {console.log(login)}, [])
  return (
    <Routes>
      <Route path='/Login' element={<Auth />}>
        <Route path='/Login' element={<Login />} />
      </Route>
      <Route path='/' element={<RequiredAuth />}>
        <Route path='/home' element={<OperationCenter />} />
        {/* <Route path='/WarrantyCenter' element={<WarrantyCenter />} />
        <Route path='/ManufactureFactory' element={<ManufactureFactory />} />
        <Route path='/AuThorizedDealer' element={<AuThorizedDealer />} /> */}
      </Route>
    </Routes>
    // <Login    /> 


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
