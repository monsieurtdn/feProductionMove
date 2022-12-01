import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
function Account () {
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
        <Button variant="outline-warning" onClick={handleShowAccount}>+ Tạo tài khoản mới</Button>
        <Modal show={showAccount} onHide={handleCloseAccount}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký tài khoản</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group> 
        <Form.Label>Địa chỉ Email</Form.Label>
        <Form.Control   
        required type = "email"
        placeholder='E-mail'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control   
        required type = "password"
        placeholder='Mật khẩu'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Gõ lại mật khẩu</Form.Label>
        <Form.Control   
        required type = "password"
        placeholder='Mật khẩu'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Người dùng thuộc loại cơ quan nào?</Form.Label>
        <Form.Select aria-label="Default select example"   required>
            <option>Chọn loại cơ quan bạn muốn lập tài khoản</option>
            <option value="1">Cơ sở sản xuất</option>
            <option value="2">Trung tâm bảo hành</option>
            <option value="3">Đại lý phân phối</option>
    </Form.Select>
        </Form.Group>

        <Form.Group> 
        <Form.Label>Mã cơ quan (VD: cơ sở sản xuất: CSSX_01,....)</Form.Label>
        <Form.Control   
        required type = "text"
        placeholder=''
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
        />
        </Form.Group>

        </Form>
        </Modal.Body>


        <Modal.Footer>
          <Button variant="primary" type="submit" >
            Có
          </Button>
          <Button variant="secondary" onClick={handleCloseAccount}>
            Không
          </Button>
        </Modal.Footer>
    </Modal>

    <Table striped bordered hover size="sm">
    <thead>
            <tr>
                <th>STT</th>
                <th>Loại tài khoản</th>
                <th>Mã cơ quan</th>
                <th>Địa chỉ email</th>
                <th>Chi tiết</th>
            </tr>
        </thead>
    </Table>
        </>
    )
}
export default Account
