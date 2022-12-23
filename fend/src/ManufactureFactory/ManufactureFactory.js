import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavDropdown } from 'react-bootstrap';
import Notify from './Notify';
import ProductStorage from './ProductStorage'; 
import Statistic from './Statistic';
import { useDataContext } from '../store/hooks';
import { LOGIN_FAILED } from '../store/Constant';
import { updateUserInfoAPI } from '../Api/Auth';
import { Form } from 'react-bootstrap';
function ManufactureFactory() {

  const {loginHandle} = useDataContext()
  let handleLogout = () => {
    localStorage.clear()
    loginHandle({type: LOGIN_FAILED})
  }

  const updateInfoHandle = useDataContext()
  async function handleUpdateInfo() {
    let data = {
        // "_id" : localStorage.getItem("userId"),
        "confirmPassword" : document.getElementById('password').value,
        "name" : document.getElementById('name').value,
        "phoneNumber" : document.getElementById('phoneNumber').value,
        "avatar" : document.getElementById('avatar').value,
        "password" : document.getElementById('newpassword').value
    }
    console.log(data)
    const response = await updateUserInfoAPI(data)
    console.log(response.data)
  }

    const [updateAccount, setUpdateAccount] = useState(false)
    const handleUpdateAccount = () => setUpdateAccount(true)
    const closeUpdateAccount = () => setUpdateAccount(false)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false)


    const [show2, setShow2] = useState(false)


    const [show3, setShow3] = useState(false)

    const showNotify = () =>{setShow2(true) ; setShow1(false)  ; setShow3(false)}
    const showStatistic = () =>{setShow3(true) ; setShow1(false) ; setShow2(false)  }
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
            <Nav.Link href="#notify" onClick={showNotify}>Hòm Thông báo</Nav.Link>
            <Nav.Link href="#product" onClick={showProductStorage}>Quản lý kho sản phẩm</Nav.Link>
            <Nav.Link href="#statistic" onClick={showStatistic}>Thống kê</Nav.Link>
          </Nav>
          <Nav>

          <Nav.Link onClick={handleUpdateAccount}>Sửa đổi thông tin tài khoản</Nav.Link>
            <Modal show= {updateAccount} onHide= {closeUpdateAccount}>
              <Modal.Header closeButton>
                  <Modal.Title>Cập nhật thông tin người dùng</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                 <Form.Group> 
                  <Form.Label>Mật khẩu hiện tại(*)</Form.Label>
                  <Form.Control   
                    required type = "password"
                    placeholder='Mật khẩu'
                    id='password'
                    />
                </Form.Group>

                <Form.Group> 
                  <Form.Label>Cập nhật mật khẩu</Form.Label>
                  <Form.Control   
                    required type = "password"
                    placeholder='Mật khẩu mới'
                    id = 'newpassword'
                  />
                </Form.Group>

                <Form.Group> 
                  <Form.Label>Cập nhật mã cơ quan (VD: cơ sở sản xuất: CSSX_01,....)(*)</Form.Label>
                  <Form.Control   
                    required type = "text"
                    placeholder=''
                    id='name'
                  />
                </Form.Group>

                <Form.Group> 
                  <Form.Label>Cập nhật địa chỉ cơ quan</Form.Label>
                  <Form.Control   
                    required type = "text"
                    placeholder='Địa chỉ'
                  />
                </Form.Group>

                <Form.Group> 
                  <Form.Label>Cập nhật số điện thoại liên hệ</Form.Label>
                  <Form.Control   
                    required type = "text"
                    placeholder='SĐT'
                    id= 'phoneNumber'
                  />
                </Form.Group>

                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>Ảnh đại diện</Form.Label>
                  <Form.Control type="file" id='avatar' />
                </Form.Group>

              </Form>
            </Modal.Body>
                
            <Modal.Footer>
                  <Button variant="secondary" onClick={handleUpdateInfo} >
                    Lưu thay đổi
                  </Button>
                  <Button variant="primary" onClick={closeUpdateAccount}>
                    Bỏ qua
                  </Button>
                </Modal.Footer>

            </Modal>

            <Nav.Link onClick={handleShow}>Đăng xuất</Nav.Link>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Đăng xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn thực sự muốn đăng xuất? </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleLogout}>
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
              {show2 && <Notify   />}
              {show3 && <Statistic  />} 
              </Container>
              </>
    )
}
export default ManufactureFactory