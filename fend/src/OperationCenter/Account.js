import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDataContext } from '../store/hooks';
import {registerAPI, getAllAccountAPI, deleteUserAPI} from '../Api/Auth';
function Account () {
 const [allAcc, setAllAcc] = useState([]) 
  const [acc, setAcc] = useState(null)

  async function handleDeleteAccount(e) {
    
    const response = await deleteUserAPI(sessionStorage.getItem("id"))

  }

  

  localStorage.setItem("role", "")

  async function handleAllAccount() {

    let tablehead = document.getElementById("head")
    tablehead.innerHTML = " "
    let row0 = document.createElement("tr")
    let row1 = document.createElement("th")
    let row2 = document.createElement("th")
    let row3 = document.createElement("th")
    let row4 = document.createElement("th")
    let row5 = document.createElement("th")
    let row6 = document.createElement("th")
    row1.innerHTML = "STT";
    row2.innerHTML = "Email";
    row3.innerHTML = "Cơ sở";
    row6.innerHTML = "SĐT";
    row4.innerHTML = "Mã cơ quan";
    row5.innerHTML = "Chi tiết";
    row0.appendChild(row1)
    row0.appendChild(row2)
    row0.appendChild(row3)
    row0.appendChild(row6)
    row0.appendChild(row4)
    row0.appendChild(row5)
    tablehead.appendChild(row0)
    const response2 = await getAllAccountAPI()

    let tablebody = document.getElementById("allAccount")
    setAllAcc(response2.data.items)
    tablebody.innerHTML = " "
    response2.data.items.map((item,index) => {

      let btn = document.createElement("button");
      btn.innerText = "Xoá tài khoản"
      btn.addEventListener("click", (e) => {
        sessionStorage.setItem("id",item._id)

        handleShowDelAcc(index)

      })

      let column = document.createElement("tr")
      let column1 = document.createElement("td")
      let column2 = document.createElement("td")
      let column3 = document.createElement("td")
      let column4 = document.createElement("td")
      let column5 = document.createElement("td")
      let column6 = document.createElement("td")
      column1.innerHTML = index + 1 ;
      column2.innerHTML = item.email;
      column3.innerHTML = item.role;
      column6.innerHTML = item.phoneNumber;
      column4.innerHTML = item.name;
      column5.appendChild(btn)
      column.appendChild(column1)
      column.appendChild(column2)
      column.appendChild(column3)
      column.appendChild(column6)
      column.appendChild(column4)
      column.appendChild(column5)
      tablebody.appendChild(column)
    })

  }

    const {registerHandle} = useDataContext()
    async function handleRegister() {
      let data = {
        
        "email" : document.getElementById('email').value,
        "password" : document.getElementById('password').value,
        "role" : document.getElementById('role').value,
        "name" : document.getElementById('name').value,
        "phoneNumber" : document.getElementById('phoneNumber').value,
        "avatar" : document.getElementById('avatar').value,
      }
      const response = await registerAPI(data)

      handleCloseAccount()
      handleAllAccount()
    }


    const [deleteAccount, setDeleteAccount] = useState(false)
    const  handleShowDelAcc = (id) => {
      setAcc(id)
      setDeleteAccount(true)
    }
    const  handleCloseDelAcc = () => setDeleteAccount(false)

    const [showAccount, setShowAccount] = useState(false)
    const handleCloseAccount = () =>setShowAccount(false);
    const handleShowAccount = () =>setShowAccount(true);

    

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
    const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };
    return(
        <>

        <Modal show = {deleteAccount} onHide = {handleCloseDelAcc}>

        <Modal.Header closeButton>
          <Modal.Title>Xoá tài khoản</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Bạn muốn xoá tài khoản này?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type="submit" id={acc?._id} onClick={handleDeleteAccount}>
            Có
          </Button>
          <Button variant="secondary" onClick={handleCloseDelAcc}>
            Không
          </Button>
        </Modal.Footer>
        </Modal>

        <Button variant="outline-warning" onClick={handleShowAccount}>+ Tạo tài khoản mới</Button>
        <Modal show={showAccount} onHide={handleCloseAccount}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký tài khoản</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group> 
        <Form.Label>Địa chỉ Email(*)</Form.Label>
        <Form.Control   
        required type = "email"
        placeholder='E-mail'
        id='email'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Mật khẩu(*)</Form.Label>
        <Form.Control   
        required type = "password"
        placeholder='Mật khẩu'
        id='password'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Gõ lại mật khẩu(*)</Form.Label>
        <Form.Control   
        required type = "password"
        placeholder='Mật khẩu'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Người dùng thuộc loại cơ quan nào?(*)</Form.Label>
        <Form.Select aria-label="Default select example"   required id ='role'>
            <option>Chọn loại cơ quan bạn muốn lập tài khoản</option>
            <option value="admin">Trung tâm điều hành</option>
            <option value="producer">Cơ sở sản xuất</option>
            <option value="warranty_center">Trung tâm bảo hành</option>
            <option value="agency">Đại lý phân phối</option>
    </Form.Select>
        </Form.Group>

        <Form.Group> 
        <Form.Label>Mã cơ quan (VD: cơ sở sản xuất: CSSX_01,....)(*)</Form.Label>
        <Form.Control   
        required type = "text"
        placeholder=''
        id='name'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Địa chỉ cơ quan</Form.Label>
        <Form.Control   
        required type = "text"
        placeholder='Địa chỉ'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Số điện thoại liên hệ</Form.Label>
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
          <Button variant="primary" type="submit" onClick={handleRegister}>
            Có
          </Button>
          <Button variant="secondary" onClick={handleCloseAccount}>
            Không
          </Button>
        </Modal.Footer>
    </Modal>
    <Button variant="outline-warning" onClick={handleAllAccount}>Xem danh sách tài khoản</Button>

    <Table striped bordered hover size="sm">
    <thead id = "head">

    </thead>
    <tbody id = "allAccount">

    </tbody>
    </Table>
        </>
    )
}
export default Account
