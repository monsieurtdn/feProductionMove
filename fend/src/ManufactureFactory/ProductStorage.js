import Button from 'react-bootstrap/Button';
import { Component, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Select from 'react-select';
import {getAllProductLineAPI, createProducerStorageAPI, getAllProducerStorageAPI,
        createProductAPI, getAllProductAPI, getProductDetailAPI} from '../Api/Auth';
import HandleAllProduct from './handleAllProduct';
function ProductStorage () {

    const [showProductDetail, setshowProductDetail] = useState(false);
    const handleShowProductDetail = () => setshowProductDetail(true);
    const handleCloseProductDetail = () => setshowProductDetail(false);

    const [product,setProduct] = useState({});


    async function getProductDetail(id) {
        const response = await getProductDetailAPI(id)
        setProduct(response.data)
    }

    async function getAllProduct() {


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
    row2.innerHTML = "Tên SP";
    row3.innerHTML = "Thuộc kho";
    row4.innerHTML = "Dòng sản phẩm";
    row5.innerHTML = "Giá tiền";
    row6.innerHTML = "Chi tiết";
    row0.appendChild(row1)
    row0.appendChild(row2)
    row0.appendChild(row3)
    row0.appendChild(row4)
    row0.appendChild(row5)
    row0.appendChild(row6)
    tablehead.appendChild(row0)
    const response2 = await getAllProductAPI() 

    console.log(response2.data)
    let tablebody = document.getElementById("allProduct")
    tablebody.innerHTML = " "
     response2.data.items.map(async (item,index) => {
      let btn = document.createElement("button");
      btn.innerText = "Chi tiết"
      btn.addEventListener("click", (e) => {
        getProductDetail(item._id);

        handleShowProductDetail();

      })
      let column = document.createElement("tr")
      let column1 = document.createElement("td")
      let column2 = document.createElement("td")
      let column3 = document.createElement("td")
      let column4 = document.createElement("td")
      let column5 = document.createElement("td")
      let column6 = document.createElement("td")
      column1.innerHTML = index + 1 ;
      column2.innerHTML = item.name;
      column3.innerHTML = item.storage.name;
      column4.innerHTML = item.productLine.name;
      column5.innerHTML = item.productLine.price;
      column6.appendChild(btn)
      column.appendChild(column1)
      column.appendChild(column2)
      column.appendChild(column3)
      column.appendChild(column4)
      column.appendChild(column5)
      column.appendChild(column6)
      tablebody.appendChild(column)
    })
    }



    async function handleCreateProduct() {
      let data = {
        "productLineId" : idPl,
        "storageId" : idStr,
        "name" : document.getElementById("name").value,
        "description" : document.getElementById("description").value,
        "weight" : document.getElementById("weight").value,
        "displaySize" : document.getElementById("dSize").value,
        "bodySize" : document.getElementById("bSize").value,
        "color" : document.getElementById("color").value,
        "bodyBuild" : document.getElementById("bodyBuild").value,
        "batteryVolume" : document.getElementById("bVolume").value
      }
      console.log(data)
      const response = await createProductAPI(data)
      console.log(response.data)
    }

    async function handleCreateStorage() {
      let data = {

        "name" : document.getElementById("name").value,
        "address" : document.getElementById("address").value
      }
      const response = await createProducerStorageAPI(data)
      console.log(response.data)
    }

    const [productLines,handle] = useState([]);
    const [storages, handleStr] = useState([]);
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
    const [idPl,setIdPl] = useState('')
    const handleChangePlId = (e) => {
      setIdPl(e.value)
    }

    async function getAllStorage() {
      const response2 = await getAllProducerStorageAPI();
       let res = [];
      response2.data.items.map((item,index) => {
        let mid = {
          label : item.name,
          value : item._id,
        } 
          res.push(mid)
      })
      console.log(response2.data)
      console.log(res);
      handleStr(res);
      }
      const [idStr,setIdStr] = useState('')
      const handleChangeStrId = (e) => {
        setIdStr(e.value)
      }

    const [showCreateStorage, setShowCreateStorage] = useState(false)
    const handleShowCreateStorage = () => setShowCreateStorage(true);
    const handleCloseCreateStorage = () => setShowCreateStorage(false);


    const [showProductImport, setShowProductImport] = useState(false)
    const handleCloseProductImport = () =>setShowProductImport(false);
    const handleShowProductImport = () =>{getAllProductLine();getAllStorage();setShowProductImport(true)}

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

    <Button variant="outline-warning" onClick={handleShowCreateStorage}>+ Tạo kho sản phẩm mới</Button>
        <Modal show = {showCreateStorage} onHide = {handleCloseCreateStorage}>
        <Modal.Header closeButton>
          <Modal.Title>Khởi tạo kho sản phẩm</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
          <Form.Group> 
            <Form.Label>Tên kho</Form.Label>
            <Form.Control   
            type = "text"
            placeholder='Tên kho'
            id='name'
            />
          </Form.Group>

          <Form.Group> 
            <Form.Label>Địa chỉ kho</Form.Label>
            <Form.Control   
            type = "text"
            placeholder='Địa chỉ'
            id='address'
            />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleCreateStorage}>
            Xác nhận
          </Button>
          <Button variant="secondary" onClick={handleCloseCreateStorage}>
            Huỷ bỏ
          </Button>
        </Modal.Footer>
        </Modal>
    
    <Button variant="outline-warning" onClick={getAllProduct} >Quản lý sản phẩm</Button>



    <Button variant="outline-warning" onClick={handleShowProductImport}>+ Nhập lô sản phẩm mới</Button>
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
            id = 'PLine'
            onChange={handleChangePlId}
        />
        </div>

        <div>
          <label> Sản phẩm được lưu trữ tại kho: </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={''}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            options={storages}
            placeholder='Tên kho'
            id='Storage'
            onChange={handleChangeStrId}
        />
        </div>

        <Form  onSubmit={handleSubmit}>

        <Form.Group> 
        <Form.Label>Tên sản phẩm</Form.Label>
        <Form.Control   
        type = "text"
        placeholder='Tên sản phẩm'
        id = 'name'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Mô tả</Form.Label>
        <Form.Control   
        as = "textarea"
        placeholder='Mô tả'
        id = 'description'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Khối lượng (gram)</Form.Label>
        <Form.Control   
        type = "number"
        id = 'weight'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Độ lớn màn hình (inch)</Form.Label>
        <Form.Control   
        type = "number"
        id = 'dSize'
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Kích thước</Form.Label>
        <Form.Control   
        type = "string"
        id = 'bSize'
        />
        </Form.Group>

        <Form.Group>
        <Form.Label>Màu sắc</Form.Label>
        <Form.Select  aria-label="Default select example" id='color'>
          <option value="black">Đen</option>
          <option value="gray">Xám</option>
          <option value="red">Đỏ</option>
          <option value="white">Trắng</option>
        </Form.Select>
        </Form.Group>

        <Form.Group> 
        <Form.Label>Body Build</Form.Label>
        <Form.Control   
        type = "text"
        id = "bodyBuild"
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Thời lượng pin (mAh)</Form.Label>
        <Form.Control   
        type = "number"
        id = "bVolume"
        />
        </Form.Group>

        <Form.Group> 
        <Form.Label>Số lượng nhập vào</Form.Label>
        <Form.Control   
        type = "text"
        placeholder='Số lượng sản phẩm nhập vào'
        />
        </Form.Group>

        </Form> 
        </Modal.Body>


        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleCreateProduct}>
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



    <Modal show= {showProductDetail} onHide = {handleCloseProductDetail}>

      <Modal.Header>
      <Modal.Title>Thông tin sản phẩm</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <div style={{padding: 1}}>
        <h5 style={{display: "inline"}}>Dòng sản phẩm: </h5> <h6 style={{display: "inline"}}> {product.productLine.name}</h6>
      </div><br />
      <div style={{padding: 1}}>
        <h5 style={{display: "inline"}}>Vị trí: </h5> <h6 style={{display: "inline"}}>Kho {product.productLine.name}</h6>
      </div><br />
      <div style={{padding: 1}}>
        <h5 style={{display: "inline"}}>Tên sản phẩm </h5> <h6 style={{display: "inline"}}>{product.name}</h6>
      </div><br />
      <div style={{padding: 1}}>
        <h5 style={{display: "inline"}}>Mô tả: </h5> <h6 style={{display: "inline"}}>{product.description}</h6>
      </div><br />
      <div style={{padding: 1}}>
        <h5 style={{display: "inline"}}>Màu sắc: </h5> <h6 style={{display: "inline"}}>{product.color}</h6> 
      </div> <br />
      <div style={{padding: 1}}>
        <h5 style={{display: "inline"}}>Kích thước: </h5> <h6 style={{display: "inline"}}>{product.displaySize} inch, {product.bodySize}</h6>
      </div> <br />
      <div style={{padding: 1}}>
        <h5 style={{display: "inline"}}>Cân nặng: </h5> <h6 style={{display: "inline"}}>{product.weight} gram</h6>
      </div> <br />
      <div style={{padding: 1}}>
        <h5 style={{display: "inline"}}>Đơn giá: </h5> <h6 style={{display: "inline"}}>{product.productLine.price} VNĐ</h6>
      </div> <br />
      <div style={{padding: 1}}>
        <h5 style={{display: "inline"}}>Tình trạng: </h5> <h6 style={{display: "inline"}}>{product.status}</h6>
      </div> <br />
      </Modal.Body>

      <Modal.Footer>
          <Button variant="secondary" type="submit" >
            Xoá sản phẩm
          </Button>
          <Button variant="primary" onClick={handleCloseProductDetail}>
            Đóng
          </Button>
      </Modal.Footer>

    </Modal>

    <Table striped bordered hover size="sm">
        <thead id = "head">

        </thead>
        <tbody id = "allProduct">

        </tbody>
    </Table>

    </>

)
}

export default ProductStorage