import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
function Product() {

    const [showProduct, setShowProduct] = useState(false)
    const handleCloseProduct = () =>setShowProduct(false);
    const handleShowProduct= () =>setShowProduct(true);

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
    const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
    }
return (

    <>
    <Button variant="outline-warning" onClick={handleShowProduct}>+ Tạo dòng sản phẩm mới</Button>
        <Modal show={showProduct} onHide={handleCloseProduct}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo dòng sản phẩm mới</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form  onSubmit={handleSubmit}>
        <Form.Group> 
        <Form.Label>Mã sản phẩm</Form.Label>
        <Form.Control   
        required type = "text"
        placeholder='Mã SP'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Tên dòng sản phẩm</Form.Label>
        <Form.Control   
        required type = "text"
        placeholder='Tên dòng SP'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Mô tả chi tiết</Form.Label>
        <Form.Control   
        required as = "textarea"
        placeholder='Mô tả chi tiết'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Ngày sản xuất</Form.Label>
        <Form.Control   
        required type = "date"
        />
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Ảnh minh hoạ</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>

        </Form>
        </Modal.Body>


        <Modal.Footer>
          <Button variant="primary" type="submit" >
            Có
          </Button>
          <Button variant="secondary" onClick={handleCloseProduct}>
            Không
          </Button>
        </Modal.Footer>
    </Modal>

    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>Số</th>
                <th>Mã dòng sản phẩm</th>
                <th>Tên dòng sản phẩm</th>
                <th>Chi tiết</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Samsung_01</td>
                <td>Smartphone Samsung Galaxy 1</td>
                <td><a href=''>Chỉnh sửa</a></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Samsung_02</td>
                <td>Smartphone Samsung Galaxy 2</td>
                <td><a href=''>Chỉnh sửa</a></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Samsung_03</td>
                <td>Smartphone Samsung Galaxy 3</td>
                <td><a href=''>Chỉnh sửa</a></td>
            </tr>
            <tr>
                <td>4</td>
                <td>Samsung_04</td>
                <td>Smartphone Samsung Galaxy 4</td>
                <td><a href=''>Chỉnh sửa</a></td>
            </tr>
            </tbody>
    </Table>

    </>

)
}

export default Product