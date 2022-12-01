import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function ManufactureFactory() {
    const [show, setShow] = useState(false)
    const handleClose = () =>setShow(false);
    const handleShow = () =>setShow(true);
    return(
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
            <Nav.Link href="#product">Quản lý kho sản phẩm</Nav.Link>
            <NavDropdown title="Tạo bảng Thống kê" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Thống kê sản phẩm bán ra</NavDropdown.Item>
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
    )
}
export default ManufactureFactory