import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavDropdown } from 'react-bootstrap';
import ProductStorage from './ProductStorage';
import SoldProduct from './SoldProduct';
import Statistic from './Statistic';
import Notify from './Notify';
import axios from 'axios';
function AuThorizedDealer() {
      const [show, setShow] = useState(false)
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
  
      const [show1, setShow1] = useState(false)
  
  
      const [show2, setShow2] = useState(false)
  
  
      const [show3, setShow3] = useState(false)

      const [show4, setShow4] = useState(false)
  
      const showNotify = () =>{setShow2(true); setShow1(false); setShow3(false); setShow4(false)}
      const showStatistic = () =>{setShow3(true) ; setShow1(false) ; setShow2(false); setShow4(false)}
      const showProductStorage = () =>{setShow1(true) ; setShow2(false) ; setShow3(false); setShow4(false)}
      const showSoldProduct = () =>{setShow1(false) ; setShow2(false) ; setShow3(false); setShow4(true)}
      const clearAll = () =>{setShow1(false) ; setShow2(false) ; setShow3(false); setShow4(false)}
      // const test = async() =>{
        
      //     let tokent;
          
      //     let request= {
      //       "email": "admin@productmove.com",
      //       "password": "12345aA@"
      //     }

      //     try{
      //     let res = await axios.post('http://127.0.0.1:3000/api/v1/auth/login',request)

      //     console.log(res.data.data['accessToken'])
      //     tokent = `Bearer ${res.data.data['accessToken']}`;
          
      //   }catch {
        
      //   }

      //   console.log(tokent)
      //   try{
      //     console.log(tokent)
      //     axios.defaults.headers.common['Authorization'] = tokent;
      //     let t = await axios.get('http://127.0.0.1:3000/api/v1/user/639f6f9efc779eea171da061')
      //     console.log(t.data)
      //   }catch(e){
      //     console.log(e)
      //   }
        
      // }
      return(
        <>
          <Navbar bg="warning" expand="lg">
              <Container>
              <Navbar.Brand href="#home" onClick={clearAll}>
              <img
                src="Logo1.jpg"
                width="70"
                height="70"
                className="d-inline-block align-top"
                alt="Brand logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#notify" onClick={showNotify}>Hòm Thông báo</Nav.Link>
              <Nav.Link href="#product" onClick={showProductStorage}>Quản lý kho sản phẩm</Nav.Link>
              <Nav.Link href="#sold" onClick={showSoldProduct}>Quản lý sản phẩm đã bán</Nav.Link>
              <Nav.Link href="#statistic" onClick={showStatistic}>Thống kê</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={test}>Đăng xuất</Nav.Link>
              <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                  <Modal.Title>Đăng xuất</Modal.Title>
                  </Modal.Header>
          <Modal.Body>Bạn thực sự muốn đăng xuất? </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" >
              Có
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Không
            </Button>
          </Modal.Footer>
        </Modal>
            </Nav>
          </Navbar.Collapse>
              </Container>
          </Navbar>
                <Container id='information'>
                {/*  
                
                
                 */}
                {show1 && <ProductStorage   />}
                {show2 && <Notify   />}
                {show3 && <Statistic  />} 
                {show4 && <SoldProduct  />}
                </Container>
                </>
    )
}
export default AuThorizedDealer