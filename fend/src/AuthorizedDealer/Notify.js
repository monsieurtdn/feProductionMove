import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function Notify () {

    const [showNotify, setShowNotify] = useState(false)
    const handleCloseNotify = () =>setShowNotify(false);
    const handleShowNotify = () =>setShowNotify(true);

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
        <Button variant="outline-warning" onClick={handleShowNotify}>+ Tạo thông báo mới</Button>
        <Modal show={showNotify} onHide={handleCloseNotify}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo dòng sản phẩm mới</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form  onSubmit={handleSubmit}>
        <Form.Group> 
        <Form.Label>Người nhận</Form.Label>
        <Form.Control   
        required type = "email"
        placeholder='Người nhận'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Tiêu đề</Form.Label>
        <Form.Control   
        required type = "text"
        placeholder='Tiêu đề'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Nội dung</Form.Label>
        <Form.Control   
        required as = "textarea"
        placeholder='Nội dung'
        />
        </Form.Group>


        </Form>
        </Modal.Body>


        <Modal.Footer>
          <Button variant="primary" type="submit" >
            Có
          </Button>
          <Button variant="secondary" onClick={handleCloseNotify}>
            Không
          </Button>
        </Modal.Footer>
    </Modal>
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>Loại thông báo</th>
                <th>Người gửi</th>
                <th>Người nhận</th>
                <th>Tiêu đề</th>
                <th>Nội dung</th>
            </tr>
        </thead>
    </Table>
        </>
    )
}

export default Notify