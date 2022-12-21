import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function WarrantyCenter() {
    const [show, setShow] = useState(false)``
    const handleClose = () =>setShow(false);
    const handleShow = () =>setShow(true);
    return(
      <>
        <Navbar bg="warning" expand="lg">
            <Container>
            <Navbar.Brand href="#home">
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
            <Nav.Link href="#email">Hòm Thư</Nav.Link>
            <Nav.Link href="#product">Quản lý sản phẩm</Nav.Link>
            <Nav.Link href="#statistic">Tạo bảng thống kê</Nav.Link>
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
    </>
    )
}
export default WarrantyCenter