import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { Modal, Pagination } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import { getProductDetailAPI, getAllProductAPI, getSoldProductAPI, receiveErrorProductAPI, getStorageDetailAPI,
          returnWarrantiedProductAPI, returnNewProductAPI} from '../Api/Auth';

function SoldProduct() {

    async function returnToCustomer() {
      let data ={
      "productId": sessionStorage.getItem("itemId")
    }
    const response = await  returnWarrantiedProductAPI(data) 
    handleCloseProductDetail()
  }
    const [inputArray, setInputArray] = useState([1])
    function createTextbox() {
      setInputArray([...inputArray, 1])
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
    let row7 = document.createElement("th")
    row1.innerHTML = "STT";
    row2.innerHTML = "Tên SP";
    row3.innerHTML = "Tên Người mua";
    row4.innerHTML = "Thời điểm mua hàng";
    row5.innerHTML = "Tình trạng sản phẩm";
    row6.innerHTML = "Giá tiền";
    row7.innerHTML = "Chi tiết";
    row0.appendChild(row1)
    row0.appendChild(row2)
    row0.appendChild(row3)
    row0.appendChild(row4)
    row0.appendChild(row5)
    row0.appendChild(row6)
    row0.appendChild(row7)
    tablehead.appendChild(row0)
    
    const response2 = await getSoldProductAPI() 

    let tablebody = document.getElementById("allProduct")
    tablebody.innerHTML = " "
     response2.data.items.map(async (item,index) => {
      sessionStorage.setItem("itemId", item._id)
      
      let btn = document.createElement("button");
      btn.innerText = "Chi tiết"
      btn.addEventListener("click", (e) => {
        sessionStorage.setItem("itemPl", item.productLine._id)
         getProductDetail(item._id)
         if(product != NaN)
          sessionStorage.setItem(`product${index}`, JSON.stringify(item) )
          sessionStorage.setItem("itemId",item._id)
          const p = JSON.parse(sessionStorage.getItem(`product${index}`))
          sessionStorage.setItem("pLineName",p.productLine.name)
          sessionStorage.setItem("price",p.productLine.price)

          handleShowProductDetail();
      })


      let column = document.createElement("tr")
      let column1 = document.createElement("td")
      let column2 = document.createElement("td")
      let column3 = document.createElement("td")
      let column4 = document.createElement("td")
      let column5 = document.createElement("td")
      let column6 = document.createElement("td")
      let column7 = document.createElement("td")
      column1.innerHTML = index + 1 ;
      column2.innerHTML = item.name;
      column3.innerHTML = item.order.customerName;
      column4.innerHTML = item.soldDate;
      column5.innerHTML = item.status;
      column6.innerHTML = item.productLine.price;
      column7.appendChild(btn)
      column.appendChild(column1)
      column.appendChild(column2)
      column.appendChild(column3)
      column.appendChild(column4)
      column.appendChild(column5)
      column.appendChild(column6)
      column.appendChild(column7)
      tablebody.appendChild(column)
    })
    loop()
    handleShowPage()
    }

    useEffect( () => {
      async function getItems() {
      const response = await getSoldProductAPI()
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
    

        const [errorProduct, getErrorProduct] = useState(false);
        const handleShowErrorProduct = () => {getErrorProduct(true);getAllAgencyStorage()}
        const handleCloseErrorProduct = () => {getErrorProduct(false);setInputArray([1])}

        const [aStorages, handleAStorages] = useState([]);
        async function getAllAgencyStorage() {
          sessionStorage.setItem("user", `?userId=${sessionStorage.getItem("userId")}`)
          const response2 = await getStorageDetailAPI();
           let res = [];
          response2.data.items.map((item,index) => {
            let mid = {
              label : item.name,
              value : item._id,
            } 
              res.push(mid)
          })

          handleAStorages(res);
          }
          const [idStrA,setIdStrA] = useState('')
          const handleChangeAStrId = (e) => {
            setIdStrA(e.value)
          }
  
          const [isClearable, setIsClearable] = useState(true);
          const [isSearchable, setIsSearchable] = useState(true);
          const [isRtl, setIsRtl] = useState(false);

          let errorArray = [];
          function changeErrorDetail() {

            for(let i=0; i < inputArray.length; i++) {
              errorArray.push(
                document.getElementById(`error${i}`).value
              )
            }


          }

          async function receiveErrorProduct() {

            let data = {
              "productId": sessionStorage.getItem("itemId"),
              "errors": errorArray ,
              "agencyStorageId" : idStrA
            }
            const response = await receiveErrorProductAPI(data);

          }

          function summitProduct() {
            changeErrorDetail()
            receiveErrorProduct()
            handleCloseErrorProduct()
          }

          const [returnNew, setReturnNew] = useState(false);
          const handleShowReturnNew = () => {setReturnNew(true);getAllAvailable()}
          const handleCloseReturnNew = () => setReturnNew(false);

          const [availables, handleAvailables] = useState([]);
        async function getAllAvailable() {
          sessionStorage.setItem("user", `?userId=${sessionStorage.getItem("userId")}&productLineId=${sessionStorage.getItem("itemPl")}`)
          const response2 = await getAllProductAPI();
           let res = [];
          response2.data.items.map((item,index) => {
            let mid = {
              label : item.name,
              value : item._id,
            } 
              res.push(mid)
          })
          handleAvailables(res);
          }
          const [idSp,setIdSp] = useState('')
          const handleChangeSpId = (e) => {
            setIdSp(e.value)
          }

          async function returnNewProduct() {
            let data ={
              "oldProductId" : sessionStorage.getItem("itemId"),
              "newProductId" : idSp
            }

            const response = await returnNewProductAPI(data);

          }

    return (

    <>

    <Modal show={returnNew} onHide={handleCloseReturnNew}>
    <Modal.Header>
       <Modal.Title> Gửi sản phẩm lỗi về đại lý </Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <div>
          <label> Lựa chọn sản phẩm hoàn trả: </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={''}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            options={availables}
            placeholder='Tên kho'
            onChange={handleChangeSpId}
        />
        </div>

      </Modal.Body>

      <Modal.Footer>
            <Button variant="secondary" type="submit" onClick={returnNewProduct}>
              Xác nhận
            </Button>
            <Button variant="primary" onClick={handleCloseReturnNew}>
              Đóng
            </Button>
        </Modal.Footer>
    </Modal>


    <Modal show={errorProduct} onHide={handleCloseErrorProduct}>
      <Modal.Header>
       <Modal.Title> Gửi sản phẩm lỗi về đại lý </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
        <Form.Group> 
          
            <Form.Label>Mô tả lỗi   </Form.Label>
            <Button variant="secondary"  onClick={createTextbox}> + </Button>
            {inputArray.map((input,index) =>{return (<Form.Control   
            type = "text"
            placeholder='Lỗi'
            id={`error${index}`}
            />)}) 
            }
          </Form.Group>

        </Form>

        <div>
          <label> Sản phẩm được lưu trữ tại kho: </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={''}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            options={aStorages}
            placeholder='Tên kho'
            onChange={handleChangeAStrId}
        />
        </div>

      </Modal.Body>

      <Modal.Footer>
            <Button variant="secondary" type="submit" onClick={summitProduct}>
              Xác nhận
            </Button>
            <Button variant="primary" onClick={handleCloseErrorProduct}>
              Đóng
            </Button>
        </Modal.Footer>

    </Modal>

    <Button variant="outline-warning" onClick={getAllProduct} >Quản lý sản phẩm</Button>

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
   
    <Modal show= {showProductDetail} onHide = {handleCloseProductDetail}>
        <Modal.Header>
        <Modal.Title>Thông tin sản phẩm</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
        <div style={{padding: 1}}>
           <h5 style={{display: "inline"}}>Dòng sản phẩm: </h5> <h6 style={{display: "inline"}}>{sessionStorage.getItem("pLineName")}</h6> 
        </div><br />
        <div style={{padding: 1}}>
           <h5 style={{display: "inline"}}>Mã sản phẩm: </h5> <h6 style={{display: "inline"}}>{product._id}</h6> 
        </div><br />
        <div style={{padding: 1}}>
           <h5 style={{display: "inline"}}>Thời điểm mua hàng: </h5> <h6 style={{display: "inline"}}>{product.soldDate}</h6> 
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
            <Button variant="secondary" type="submit" onClick={returnToCustomer} 
            disabled={product.status !== "warranty_done"}>
              Bàn giao sản phẩm đã bảo hành
            </Button>

            <Button variant="secondary" type="submit" onClick={handleShowErrorProduct} disabled = {product.status !== "sold" && product.status !== "return_consumer"}>
              Trả sản phẩm lỗi về đại lý
            </Button>

            <Button variant="secondary" type="submit" onClick={handleShowReturnNew} disabled = {product.status == "sold" || product.status == "return_consumer"}>
              Hoàn trả sản phẩm mới cho khách hàng
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

    <div>
      { showPage &&
    <Pagination >{pgArr}</Pagination>
      }
    <br />
    
    </div>

    </>

)
}

export default SoldProduct