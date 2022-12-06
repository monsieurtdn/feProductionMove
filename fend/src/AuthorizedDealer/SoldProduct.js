import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function SoldProduct() {

    const data = [
      { id: "Samsung galaxy 1",
        date: "18/11/2022",
        status: "Đã bán",
        

      }





    ]

    const [showProductImport, setShowProductImport] = useState(false)
    const handleCloseProductImport = () =>setShowProductImport(false);
    const handleShowProductImport = () =>setShowProductImport(true);

    const [showProductExport, setShowProductExport] = useState(false)
    const handleCloseProductExport = () =>setShowProductExport(false);
    const handleShowProductExport = () =>setShowProductExport(true);

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
    <Form>
      <Row>
        <Col>
        <Form.Select aria-label="Default select example">
          <option>Sắp xếp theo Dòng sản phẩm</option>
          <option value="1">Từ A-Z</option>
          <option value="2">Từ Z-A</option>
        </Form.Select>
        </Col>

        <Col>
        <Form.Select aria-label="Default select example">
          <option>Sắp xếp theo ngày sản xuất</option>
          <option value="1">Từ mới đến cũ</option>
          <option value="2">Từ cũ đến mới</option>
        </Form.Select>
        </Col>
      </Row>
    </Form>

    <Form>
      <Row>
        <Col>
        <Form.Select aria-label="Default select example">
          <option>Lọc sản phẩm theo trạng thái</option>
          <option value="1">Còn bảo hành</option>
          <option value="2">Hết bảo hành</option>
        </Form.Select>
        </Col>

        <Col>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder="Lọc sản phẩm theo nơi sản xuất" />
        </Form.Group>
        </Col>

        <Col>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder="Lọc sản phẩm ngày sản xuất" />
        </Form.Group>
        </Col>

      </Row>
    </Form>
   
    </>

)
}

export default SoldProduct