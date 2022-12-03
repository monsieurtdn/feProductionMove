import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavDropdown } from 'react-bootstrap';
import Mail from './Mail';
import ProductStorage from './ProductStorage';
function ManufactureFactory() {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false)


    const [show2, setShow2] = useState(false)


    const [show3, setShow3] = useState(false)

    const showEmail = () =>{setShow2(true) ; setShow1(false)  ; setShow3(false)}
    const showAccount = () =>{setShow3(true) ; setShow1(false) ; setShow2(false)  }
    const showProductStorage = () =>{setShow1(true) ; setShow2(false) ; setShow3(false)}
    const clearAll = () =>{setShow1(false) ; setShow2(false) ; setShow3(false)}
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
            <Nav.Link href="#email" onClick={showEmail}>Hòm Thư</Nav.Link>
            <Nav.Link href="#product" onClick={showProductStorage}>Quản lý kho sản phẩm</Nav.Link>
            <NavDropdown title="Tạo bảng Thống kê" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" >Thống kê sản phẩm bán ra</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Thống kê trạng thái sản phẩm </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Thống kê sản phẩm lỗi </NavDropdown.Item>
            </NavDropdown>
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
              {show1 && <ProductStorage   />} 
              {show2 && <Mail   />}
              {/* {show3 && <Account   />} */}
              </Container>
              </>
    )
}
export default ManufactureFactory