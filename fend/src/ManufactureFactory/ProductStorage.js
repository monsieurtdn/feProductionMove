import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Select from 'react-select';
import {getAllProductLineAPI} from '../Api/Auth';
function ProductStorage() {
    const [productLines,handle] = useState([]);

    async function getAllProductLine() {
    const response2 = await getAllProductLineAPI();
     let res = [];
    response2.data.items.map((item,index) => {
      let mid = {
        label : item.name,
        value : item._id,
      } 
        res.push(mid)
    })
    console.log(res);
    handle(res);
    }


    const [showProductImport, setShowProductImport] = useState(false)
    const handleCloseProductImport = () =>setShowProductImport(false);
    const handleShowProductImport = () =>{getAllProductLine();setShowProductImport(true)}

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
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isRtl, setIsRtl] = useState(false);
return (

    <>
    <Button variant="outline-warning" onClick={handleShowProductImport}>Nhập lô sản phẩm mới</Button>
        <Modal show={showProductImport} onHide={handleCloseProductImport}>
        <Modal.Header closeButton>
        <Modal.Title>Nhập sản phẩm mới vào kho</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        
        <div>
          <label>Tên dòng sản phẩm </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={''}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            options={productLines}
            placeholder='Tên dòng sản phẩm'
        />
        </div>

        <Form  onSubmit={handleSubmit}>
        {/* <Form.Group> 
        <Form.Label>Tên dòng sản phẩm</Form.Label>
        <div>
        <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={''}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={[]}
        />
        </div>
        </Form.Group> */}

        <Form.Group> 
        <Form.Label>Số lượng nhập vào</Form.Label>
        <Form.Control   
        type = "text"
        placeholder='Số lượng sản phẩm nhập vào'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Ngày sản xuất</Form.Label>
        <Form.Control   
        required type = "date"
        />
        </Form.Group>

        </Form> 
        </Modal.Body>


        <Modal.Footer>
          <Button variant="primary" type="submit" >
            Có
          </Button>
          <Button variant="secondary" onClick={handleCloseProductImport}>
            Không
          </Button>
        </Modal.Footer>
    </Modal>

    <Button variant="outline-warning" onClick={handleShowProductExport}>Xuất sản phẩm tới đại lý</Button>
        <Modal show={showProductExport} onHide={handleCloseProductExport}>
        <Modal.Header closeButton>
          <Modal.Title>Xuất sản phẩm tới đại lý</Modal.Title>
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
        type = "text"
        placeholder='Tên dòng SP'
        aria-label="Disabled input example"
        disabled
        readOnly
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Số lượng trong kho</Form.Label>
        <Form.Control   
        type = "text"
        placeholder='Số lượng'
        aria-label="Disabled input example"
        disabled
        readOnly
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Số lượng lấy ra</Form.Label>
        <Form.Control   
        type = "text"
        placeholder='Số lượng'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Mã đại lý nhận hàng </Form.Label>
        <Form.Control   
        type = "text"
        placeholder='Mã đại lý'
        />
        </Form.Group>

        </Form>
        </Modal.Body>


        <Modal.Footer>
          <Button variant="primary" type="submit" >
            Có
          </Button>
          <Button variant="secondary" onClick={handleCloseProductExport}>
            Không
          </Button>
        </Modal.Footer>
    </Modal>

    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã dòng sản phẩm</th>
                <th>Tên dòng sản phẩm</th>
                <th>Tình trạng</th>
                <th>Chi tiết</th>
            </tr>
        </thead>
    </Table>

    </>

)
}

export default ProductStorage