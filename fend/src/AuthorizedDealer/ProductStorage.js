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
    row2.innerHTML = "T??n SP";
    row3.innerHTML = "Thu???c kho";
    row4.innerHTML = "D??ng s???n ph???m";
    row5.innerHTML = "Gi?? ti???n";
    row6.innerHTML = "Chi ti???t";
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
      btn.innerText = "Chi ti???t"
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

<Button variant="outline-warning" onClick={handleShowCreateStorage}>+ T???o kho s???n ph???m m???i</Button>
<Button variant="outline-warning" onClick={getAllProduct} >Qu???n l?? s???n ph???m</Button>
<Button variant="outline-warning"  onClick={handleShowProductCheckOut}>B??n c??c s???n ph???m ???????c ch???n </Button>


<Modal show={showProductCheckout} onHide={handleCloseProductCheckOut}>

        <Modal.Header closeButton>
        <Modal.Title>B??n c??c s???n ph???m ???????c ch???n</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form>
          <Form.Group> 
            <Form.Label>T??n kh??ch h??ng</Form.Label>
            <Form.Control   
            type = "text"
            placeholder='H??? v?? t??n'
            id='customerName'
            />
          </Form.Group>

          <Form.Group> 
            <Form.Label>?????a ch??? email kh??ch h??ng</Form.Label>
            <Form.Control   
            type = "text"
            placeholder='?????a ch??? email'
            id='customerEmail'
            />
            </Form.Group>

            <Form.Group> 
            <Form.Label>S??? ??i???n tho???i kh??ch h??ng</Form.Label>
            <Form.Control   
            type = "text"
            placeholder='S??T'
            id='customerNumber'
            />
            </Form.Group>

          </Form>
        </Modal.Body>


        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleCheckOut}>
            C??
          </Button>
          <Button variant="secondary" onClick={handleCloseProductCheckOut}>
            Kh??ng
          </Button>
        </Modal.Footer>
    </Modal>



        <Modal show = {showCreateStorage} onHide = {handleCloseCreateStorage}>
        <Modal.Header closeButton>
          <Modal.Title>Kh???i t???o kho s???n ph???m</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
          <Form.Group> 
            <Form.Label>T??n kho</Form.Label>
            <Form.Control   
            type = "text"
            placeholder='T??n kho'
            id='name'
            />
          </Form.Group>

          <Form.Group> 
            <Form.Label>?????a ch??? kho</Form.Label>
            <Form.Control   
            type = "text"
            placeholder='?????a ch???'
            id='address'
            />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleCreateStorage}>
            X??c nh???n
          </Button>
          <Button variant="secondary" onClick={handleCloseCreateStorage}>
            Hu??? b???
          </Button>
        </Modal.Footer>
        </Modal>

    <Form>
      <Row>
        <Col>
        <Form.Select aria-label="Default select example">
          <option>S???p x???p theo D??ng s???n ph???m</option>
          <option value="1">T??? A-Z</option>
          <option value="2">T??? Z-A</option>
        </Form.Select>
        </Col>

        <Col>
        <Form.Select aria-label="Default select example">
          <option>S???p x???p theo ng??y s???n xu???t</option>
          <option value="1">T??? m???i ?????n c??</option>
          <option value="2">T??? c?? ?????n m???i</option>
        </Form.Select>
        </Col>
      </Row>
    </Form>

    <Form>
      <Row>
        <Col>
        <Form.Select aria-label="Default select example">
          <option>L???c s???n ph???m theo tr???ng th??i</option>
          <option value="1">T???t</option>
          <option value="2">C???n b???o h??nh</option>
          <option value="3">Tr??? v??? c?? s??? s???n xu???t</option>
          <option value="4">B???o h??nh xong</option>
        </Form.Select>
        </Col>

        <Col>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder="L???c s???n ph???m theo n??i s???n xu???t" />
        </Form.Group>
        </Col>

        <Col>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder="L???c s???n ph???m ng??y s???n xu???t" />
        </Form.Group>
        </Col>

      </Row>
    </Form>
   
    
    <Modal show= {showProductDetail} onHide = {handleCloseProductDetail}>
        <Modal.Header>
        <Modal.Title>Th??ng tin s???n ph???m</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
        <div style={{padding: 1}}>
           <h5 style={{display: "inline"}}>D??ng s???n ph???m: </h5> <h6 style={{display: "inline"}}>{sessionStorage.getItem("pLineName")}</h6> 
        </div><br />
        <div style={{padding: 1}}>
           <h5 style={{display: "inline"}}>V??? tr??: </h5> <h6 style={{display: "inline"}}>{sessionStorage.getItem("storageName")}</h6> 
        </div><br />
        <div style={{padding: 1}}>
          <h5 style={{display: "inline"}}>T??n s???n ph???m </h5> <h6 style={{display: "inline"}}>{product.name}</h6>
        </div><br />
        <div style={{padding: 1}}>
          <h5 style={{display: "inline"}}>M?? t???: </h5> <h6 style={{display: "inline"}}>{product.description}</h6>
        </div><br />
        <div style={{padding: 1}}>
          <h5 style={{display: "inline"}}>M??u s???c: </h5> <h6 style={{display: "inline"}}>{product.color}</h6> 
        </div> <br />
        <div style={{padding: 1}}>
          <h5 style={{display: "inline"}}>K??ch th?????c: </h5> <h6 style={{display: "inline"}}>{product.displaySize} inch, {product.bodySize}</h6>
        </div> <br />
        <div style={{padding: 1}}>
          <h5 style={{display: "inline"}}>C??n n???ng: </h5> <h6 style={{display: "inline"}}>{product.weight} gram</h6>
        </div> <br />
        <div style={{padding: 1}}>
           <h5 style={{display: "inline"}}>????n gi??: </h5> <h6 style={{display: "inline"}}>{sessionStorage.getItem("price")}</h6> 
        </div> <br />
        <div style={{padding: 1}}>
          <h5 style={{display: "inline"}}>T??nh tr???ng: </h5> <h6 style={{display: "inline"}}>{product.status}</h6>
        </div> <br />
        </Modal.Body>
  
        <Modal.Footer>
 
            <Button variant="primary" onClick={handleCloseProductDetail}>
              ????ng
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