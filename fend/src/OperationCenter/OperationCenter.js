import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Product from './Product';
import './OperationCenter.css'
import Mail from "./Mail";
import Account from './Account';
function OperationCenter() {
    const [show, setShow] = useState(false)
    const handleClose = () =>setShow(false);
    const handleShow = () =>setShow(true);

    const [show1, setShow1] = useState(false)


    const [show2, setShow2] = useState(false)


    const [show3, setShow3] = useState(false)

    const showEmail = () =>{setShow2(true) ; setShow1(false)  ; setShow3(false)}
    const showAccount = () =>{setShow3(true) ; setShow1(false) ; setShow2(false)  }
    const showProduct = () =>{setShow1(true) ; setShow2(false) ; setShow3(false)}
    const clearAll = () =>{setShow1(false) ; setShow2(false) ; setShow3(false)}
    return(
        <>
        <Navbar bg="warning" expand="lg" >

            <Container>

            <Navbar.Brand href="#home" onClick={clearAll}>
            <img
              src="Logo1.jpg"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Brand logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" >
            <Nav.Link href="#email" onClick={showEmail}>Hòm Thư</Nav.Link>
            <Nav.Link href="#product" onClick={showProduct}>Quản lý sản phẩm</Nav.Link>
            <Nav.Link href="#account" onClick={showAccount}>Quản lý tài khoản</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleShow}>Đăng xuất</Nav.Link>
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
      {show1 && <Product   />}
      {show2 && <Mail   />}
      {show3 && <Account   />}
      </Container>
      </>
    )
}
export default OperationCenter