import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { Modal, Pagination } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Col from 'react-bootstrap/Col';
import { createAgencyStorageAPI, getProductDetailAPI, getAllProductAPI, handleCheckOutAPI} from '../Api/Auth';
function ProductStorage() {
  sessionStorage.setItem("user", `?userId=${sessionStorage.getItem("userId")}&status=in_agency`)
  sessionStorage.setItem("page", "")

  async function handleCheckOut() {
      
    let data = {
      "customerName": document.getElementById("customerName").value,
      "customerEmail": document.getElementById("customerEmail").value,
      "customerPhone": document.getElementById("customerNumber").value,
      "productIds": JSON.parse(sessionStorage.getItem("checkout"))
    }

    const response = await handleCheckOutAPI(data)

    handleCloseProductCheckOut()
    getAllProduct()
  }



  let pages = Math.ceil(sessionStorage.getItem("allItems")/10);


  let choose = 1;

  function loop() {
    let pageArr = []

  for( let i = 1; i <= pages; i++) {
    pageArr.push(
      <Pagination.Item key={i} active = {i == choose} onClick={getPage}>
        {i}
      </Pagination.Item>
    )
  }
  setpgArr(pageArr)
}


  async function handleCreateStorage() {
    let data = {

      "name" : document.getElementById("name").value,
      "address" : document.getElementById("address").value
    }
    const response = await createAgencyStorageAPI(data)

    handleCloseCreateStorage()
  }
  const [storages, handleStr] = useState([]);



  const [showCreateStorage, setShowCreateStorage] = useState(false)
  const handleShowCreateStorage = () => setShowCreateStorage(true);
  const handleCloseCreateStorage = () => setShowCreateStorage(false);

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isRtl, setIsRtl] = useState(false);

  
  const [showProductDetail, setshowProductDetail] = useState(false);
  const handleShowProductDetail = () => {setshowProductDetail(true);}
  const handleCloseProductDetail = () => setshowProductDetail(false);

  const [product,setProduct] = useState({});

  let midproduct = {}

  function transfer() {
    setProduct(midproduct)
  }

  async function handleGetProductDetail(id) {
    const response = await getProductDetailAPI(id);
    midproduct = response.data
    transfer()

  }


  function getProductDetail(id) {
    handleGetProductDetail(id)

 }

  async function getAllProduct() {

    sessionStorage.setItem("checkout", JSON.stringify([]))
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
    let tablebody = document.getElementById("allProduct")
    tablebody.innerHTML = " "
     response2.data.items.map(async (item,index) => {
      let btn = document.createElement("button");
      btn.innerText = "Chi tiết"
      btn.addEventListener("click", (e) => {
         getProductDetail(item._id)
         if(product != NaN)
          sessionStorage.setItem(`product${index}`, JSON.stringify(item) )
         
          const p = JSON.parse(sessionStorage.getItem(`product${index}`))
          sessionStorage.setItem("pLineName",p.productLine.name)
          sessionStorage.setItem("storageName",p.storage.name)
          sessionStorage.setItem("price",p.productLine.price)

          handleShowProductDetail();
      })

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("click", (e) => {
        let arr = JSON.parse(sessionStorage.getItem("checkout"))
        if(checkbox.checked) {
            arr.push(item._id)
        } else{
         arr = arr.filter((id) => {
            return id != item._id
         })
        }
        sessionStorage.setItem("checkout", JSON.stringify(arr))
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
      column1.appendChild(checkbox)
      column6.appendChild(btn)
      column.appendChild(column1)
      column.appendChild(column2)
      column.appendChild(column3)
      column.appendChild(column4)
      column.appendChild(column5)
      column.appendChild(column6)
      tablebody.appendChild(column)
    })
    loop()
    handleShowPage()
    }

    useEffect( () => {
      async function getItems() {
      const response = await getAllProductAPI()
      if(response.success) {
        sessionStorage.setItem("allItems" ,response.data.totalItems)
        sessionStorage.setItem("page", `&page=1`)
      }
    }
    getItems()
    },[])
    const [pgArr, setpgArr] = useState([]);
       function getPage(e) {
          sessionStorage.setItem("page", `&page=${e.target.innerText}`)
          if(e.target.innerText.length > 4 ) return;
          choose = e.target.innerText
          getAllProduct()
        }

        const [showPage, setShowPage] = useState(false)
        const handleShowPage = () => setShowPage(true);
    

        const [showProductCheckout, setShowProductCheckout] = useState(false)
        const handleCloseProductCheckOut = () => setShowProductCheckout(false);
        const handleShowProductCheckOut = () => setShowProductCheckout(true);


  return (

    


    <>

<Button variant="outline-warning" onClick={handleShowCreateStorage}>+ Tạo kho sản phẩm mới</Button>
<Button variant="outline-warning" onClick={getAllProduct} >Quản lý sản phẩm</Button>
<Button variant="outline-warning"  onClick={handleShowProductCheckOut}>Bán các sản phẩm được chọn </Button>


<Modal show={showProductCheckout} onHide={handleCloseProductCheckOut}>

        <Modal.Header closeButton>
        <Modal.Title>Bán các sản phẩm được chọn</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form>
          <Form.Group> 
            <Form.Label>Tên khách hàng</Form.Label>
            <Form.Control   
            type = "text"
            placeholder='Họ và tên'
            id='customerName'
            />
          </Form.Group>

          <Form.Group> 
            <Form.Label>Địa chỉ email khách hàng</Form.Label>
            <Form.Control   
            type = "text"
            placeholder='Địa chỉ email'
            id='customerEmail'
            />
            </Form.Group>

            <Form.Group> 
            <Form.Label>Số điện thoại khách hàng</Form.Label>
            <Form.Control   
            type = "text"
            placeholder='SĐT'
            id='customerNumber'
            />
            </Form.Group>

          </Form>
        </Modal.Body>


        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleCheckOut}>
            Có
          </Button>
          <Button variant="secondary" onClick={handleCloseProductCheckOut}>
            Không
          </Button>
        </Modal.Footer>
    </Modal>



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
          <option value="1">Tốt</option>
          <option value="2">Cần bảo hành</option>
          <option value="3">Trả về cơ sở sản xuất</option>
          <option value="4">Bảo hành xong</option>
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
   
    
    <Modal show= {showProductDetail} onHide = {handleCloseProductDetail}>
        <Modal.Header>
        <Modal.Title>Thông tin sản phẩm</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
        <div style={{padding: 1}}>
           <h5 style={{display: "inline"}}>Dòng sản phẩm: </h5> <h6 style={{display: "inline"}}>{sessionStorage.getItem("pLineName")}</h6> 
        </div><br />
        <div style={{padding: 1}}>
           <h5 style={{display: "inline"}}>Vị trí: </h5> <h6 style={{display: "inline"}}>{sessionStorage.getItem("storageName")}</h6> 
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
           <h5 style={{display: "inline"}}>Đơn giá: </h5> <h6 style={{display: "inline"}}>{sessionStorage.getItem("price")}</h6> 
        </div> <br />
        <div style={{padding: 1}}>
          <h5 style={{display: "inline"}}>Tình trạng: </h5> <h6 style={{display: "inline"}}>{product.status}</h6>
        </div> <br />
        </Modal.Body>
  
        <Modal.Footer>
 
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

    <div>
      { showPage &&
    <Pagination >{pgArr}</Pagination>
      }
    <br />
    
    </div>

    </>

)
}

export default ProductStorage