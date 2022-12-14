import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { Modal, Pagination } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Col from 'react-bootstrap/Col';
import { getAllAccountAPI, getProductDetailAPI, getAllProductAPI, agencyToWarrantyAPI} from '../Api/Auth';

function  WarrantyProduct() {
  
  sessionStorage.setItem("user", `?userId=${sessionStorage.getItem("userId")}&status=need_warranty`)
  sessionStorage.setItem("page", "")
  localStorage.setItem("role", "?role=warranty_center")



  const [wCenters, handleWCenters] = useState([]);
  async function getAllWarrantyCenter() {
    const response2 = await getAllAccountAPI();
     let res = [];
    response2.data.items.map((item,index) => {
      let mid = {
        label : item.name,
        value : item._id,
      } 
        res.push(mid)
    })

    handleWCenters(res);
    }
    const [idWCenter,setIdWCenter] = useState('')
    const handleChangeIdWCenter = (e) => {
      setIdWCenter(e.value)
      sessionStorage.setItem("user", `?userId=${e.value}`)
    }

    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isRtl, setIsRtl] = useState(false);

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

 const [showProductDetail, setshowProductDetail] = useState(false);
 const handleShowProductDetail = () => {setshowProductDetail(true);}
 const handleCloseProductDetail = () => setshowProductDetail(false);

  async function getAllProduct() {

    sessionStorage.setItem("export", JSON.stringify([]))
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
    row5.innerHTML = "T??nh tr???ng";
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
        let arr = JSON.parse(sessionStorage.getItem("export"))
        if(checkbox.checked) {
            arr.push(item._id)
        } else{
         arr = arr.filter((id) => {
            return id != item._id
         })
        }
        sessionStorage.setItem("export", JSON.stringify(arr))
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
      column5.innerHTML = item.status;
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

        async function handleSendProduct() {
      
          let data = {
            "warrantyCenterId": idWCenter,
            "productIds": JSON.parse(sessionStorage.getItem("export"))
          }

          const response = await agencyToWarrantyAPI(data)
          closeSendToWCenter()
          getAllProduct()
        }

        const [sendToWCenter, setSendToWCenter] = useState(false)
        const showSendToWCenter = () => {setSendToWCenter(true);getAllWarrantyCenter()}
        const closeSendToWCenter = () => {setSendToWCenter(false)}

    return(
        <>
        <Button variant="outline-warning" onClick={getAllProduct} >Qu???n l?? s???n ph???m</Button>
        <Button variant="outline-warning" onClick={showSendToWCenter}>
           ????a c??c s???n ph???m ???? chon t???i trung t??m b???o h??nh
           </Button>
        
        <Modal show= {sendToWCenter} onHide = {closeSendToWCenter}>
        
        <Modal.Header>
        <Modal.Title>????a s???n ph???m l???i t???i trung t??m b???o h??nh</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <div>
          <label>T??n ?????i l?? </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={''}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            options={wCenters}
            placeholder='T??n ?????i l??'
            onChange={handleChangeIdWCenter}
        />
        </div>
        </Modal.Body>

        <Modal.Footer>

        <Button variant="primary" onClick={handleSendProduct}>
              X??c nh???n
        </Button>

        <Button variant="secondary" onClick={closeSendToWCenter}>
              ????ng
        </Button>

        </Modal.Footer>

        </Modal>


        <Modal show= {showProductDetail} onHide = {handleCloseProductDetail}>
        <Modal.Header>
        <Modal.Title>Th??ng tin s???n ph???m</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
        <div style={{padding: 1}}>
           <h5 style={{display: "inline" }}>D??ng s???n ph???m: </h5> <h6 style={{display: "inline"}}>{sessionStorage.getItem("pLineName")}</h6> 
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

export default WarrantyProduct