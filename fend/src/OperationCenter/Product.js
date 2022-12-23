import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDataContext } from '../store/hooks';
import { productLineAPI, getAllProductLineAPI} from '../Api/Auth';
function Product() {

    const productLineHandle = useDataContext()
    async function handleProductLine() {
      let data = {
        "name": document.getElementById('name').value,
        "price": document.getElementById('price').value
      }
    const response = await productLineAPI(data)
    console.log(response.data)
    setShowProduct(false)
    handleAllProductLine()
    }

    const [showProduct, setShowProduct] = useState(false)
    const handleCloseProduct = () =>setShowProduct(false);
    const handleShowProduct= () =>setShowProduct(true);

    

    const getAllProductLineHandle = useDataContext()
    async function handleAllProductLine() {

      let tablehead = document.getElementById("head")
      tablehead.innerHTML = " "
      let row0 = document.createElement("tr")
      let row1 = document.createElement("th")
      let row2 = document.createElement("th")
      let row3 = document.createElement("th")
      let row4 = document.createElement("th")
      let row5 = document.createElement("th")
      row1.innerHTML = "STT";
      row2.innerHTML = "Tên dòng sản phẩm";
      row3.innerHTML = "Giá tiền";
      row4.innerHTML = "Số lượng sản phẩm";
      row5.innerHTML = "Chi tiết";
      row0.appendChild(row1)
      row0.appendChild(row2)
      row0.appendChild(row3)
      row0.appendChild(row4)
      row0.appendChild(row5)
      tablehead.appendChild(row0)
      const response2 = await getAllProductLineAPI()
      console.log(response2.data)
      let tablebody = document.getElementById("AllProductLine")
      tablebody.innerHTML = " "
      response2.data.items.map((item,index) => {
        let column = document.createElement("tr")
        let column1 = document.createElement("td")
        let column2 = document.createElement("td")
        let column3 = document.createElement("td")
        let column4 = document.createElement("td")
        let column5 = document.createElement("td")
        column1.innerHTML = index + 1 ;
        column2.innerHTML = item.name;
        column3.innerHTML = item.price;
        column4.innerHTML = item.quantityOfProduct;
        column.appendChild(column1)
        column.appendChild(column2)
        column.appendChild(column3)
        column.appendChild(column4)
        column.appendChild(column5)
        tablebody.appendChild(column)
      })

    }


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
        <Form.Label>Tên dòng sản phẩm</Form.Label>
        <Form.Control   
        required type = "text"
        placeholder='Tên dòng SP'
        id= 'name'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Giá tiền</Form.Label>
        <Form.Control   
        required type = "text"
        placeholder='Giá'
        id = 'price'
        />
        </Form.Group>

        </Form>
        </Modal.Body>


        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleProductLine}>
            Có
          </Button>
          <Button variant="secondary" onClick={handleCloseProduct}>
            Không
          </Button>
        </Modal.Footer>
      </Modal>

    <Button variant="outline-warning" onClick={handleAllProductLine}>Xem toàn bộ dòng sản phẩm</Button>

    <Table striped bordered hover size="sm" >
        <thead id = "head">

        </thead>
        <tbody id="AllProductLine">

        </tbody>
      
    </Table>

    </>

)
}

export default Product