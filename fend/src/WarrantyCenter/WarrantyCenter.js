import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDataContext } from '../store/hooks';
import { LOGIN_FAILED } from '../store/Constant';
import { updateUserInfoAPI } from '../Api/Auth';
import { Form } from 'react-bootstrap';
import Import from './Import';
import ProductStorage from './ProductStorage';
import Statistic from './Statistic';

function WarrantyCenter() {

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


    const [show1, setShow1] = useState(false)


    const [show2, setShow2] = useState(false)


    const [show3, setShow3] = useState(false)

    const showImport = () =>{setShow2(true) ; setShow1(false)  ; setShow3(false)}
    const showStatistic = () =>{setShow3(true) ; setShow1(false) ; setShow2(false)  }
    const showProductStorage = () =>{setShow1(true) ; setShow2(false) ; setShow3(false)}
    const clearAll = () =>{setShow1(false) ; setShow2(false) ; setShow3(false)}

    const [show, setShow] = useState(false);
    const handleClose = () =>setShow(false);
    const handleShow = () =>setShow(true);

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
            <Nav.Link href="#import" onClick={showImport}>Qu???n l?? v???n chuy???n</Nav.Link>
            <Nav.Link href="#product" onClick={showProductStorage}>Qu???n l?? s???n ph???m</Nav.Link>
            <Nav.Link href="#statistic" onClick={showStatistic}>T???o b???ng th???ng k??</Nav.Link>
          </Nav>
          <Nav>

<Nav.Link onClick={handleUpdateAccount}>S???a ?????i th??ng tin t??i kho???n</Nav.Link>
  <Modal show= {updateAccount} onHide= {closeUpdateAccount}>
    <Modal.Header closeButton>
        <Modal.Title>C???p nh???t th??ng tin ng?????i d??ng</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
       <Form.Group> 
        <Form.Label>M???t kh???u hi???n t???i(*)</Form.Label>
        <Form.Control   
          required type = "password"
          placeholder='M???t kh???u'
          id='password'
          />
      </Form.Group>

      <Form.Group> 
        <Form.Label>C???p nh???t m???t kh???u</Form.Label>
        <Form.Control   
          required type = "password"
          placeholder='M???t kh???u m???i'
          id = 'newpassword'
        />
      </Form.Group>

      <Form.Group> 
        <Form.Label>C???p nh???t m?? c?? quan (VD: c?? s??? s???n xu???t: CSSX_01,....)(*)</Form.Label>
        <Form.Control   
          required type = "text"
          placeholder=''
          id='name'
        />
      </Form.Group>

      <Form.Group> 
        <Form.Label>C???p nh???t ?????a ch??? c?? quan</Form.Label>
        <Form.Control   
          required type = "text"
          placeholder='?????a ch???'
        />
      </Form.Group>

      <Form.Group> 
        <Form.Label>C???p nh???t s??? ??i???n tho???i li??n h???</Form.Label>
        <Form.Control   
          required type = "text"
          placeholder='S??T'
          id= 'phoneNumber'
        />
      </Form.Group>

      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>???nh ?????i di???n</Form.Label>
        <Form.Control type="file" id='avatar' />
      </Form.Group>

    </Form>
  </Modal.Body>
      
  <Modal.Footer>
        <Button variant="secondary" onClick={handleUpdateInfo} >
          L??u thay ?????i
        </Button>
        <Button variant="primary" onClick={closeUpdateAccount}>
          B??? qua
        </Button>
      </Modal.Footer>

  </Modal>

  <Nav.Link onClick={handleShow}>????ng xu???t</Nav.Link>
  <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>????ng xu???t</Modal.Title>
      </Modal.Header>
      <Modal.Body>B???n th???c s??? mu???n ????ng xu???t? </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleLogout}>
          C??
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Kh??ng
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
                 {show2&& <Import />}
                {show3 && <Statistic  />} 
                </Container>
    </>
    )
}
export default WarrantyCenter