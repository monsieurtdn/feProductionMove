import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { Modal, Pagination } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Select from 'react-select';
import Col from 'react-bootstrap/Col';
import { getProductDetailAPI, getAllProductAPI, getProductErrorAPI, getFixedDoneAPI, returnToAgencyAPI,
          getAllAccountAPI, getStorageDetailAPI} from '../Api/Auth';
function ProductStorage() {
  sessionStorage.setItem("user", `?userId=${sessionStorage.getItem("userId")}`)
  localStorage.setItem("role", "?role=agency")
  async function returnToAgency() {
    let data = {
      "agencyId": idAgency,
      "agencyStorageId": idStrA,
      "productIds": JSON.parse(sessionStorage.getItem("checkout"))
    }
    const response = await returnToAgencyAPI(data)
    handleCloseReturnAgency();
    getAllProduct()
  }
  const [agencys, handleAgencys] = useState([]);
  const [aStorages, handleAStorages] = useState([]);

  async function getAllAgency() {
    const response2 = await getAllAccountAPI();
     let res = [];
    response2.data.items.map((item,index) => {
      let mid = {
        label : item.name,
        value : item._id,
      } 
        res.push(mid)
    })

    handleAgencys(res);
    }
    const [idAgency,setIdAgency] = useState('')
    const handleChangeIdAgency = (e) => {
      setIdAgency(e.value)
      sessionStorage.setItem("user", `?userId=${e.value}`)
      getAllAgencyStorage()
    }

    async function getAllAgencyStorage() {

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

  sessionStorage.setItem("page", "")

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
  const[errors,setErrors] = useState([])
 

  let midproduct = {}

  function transfer() {
    setProduct(midproduct)
  }

  async function handleGetProductDetail(id) {
    const response2 = await getProductErrorAPI(id);
    const response = await getProductDetailAPI(id);
    
    sessionStorage.setItem("error",JSON.stringify(response2.data.items))


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
    row2.innerHTML = "T??n SP";
    row3.innerHTML = "M?? s???n ph???m";
    row4.innerHTML = "D??ng s???n ph???m";
    row5.innerHTML = "T??nh tr???ng";
    row6.innerHTML = "????n v??? y??u c???u";
    row7.innerHTML = "Chi ti???t";
    row0.appendChild(row1)
    row0.appendChild(row2)
    row0.appendChild(row3)
    row0.appendChild(row4)
    row0.appendChild(row5)
    row0.appendChild(row6)
    row0.appendChild(row7)
    tablehead.appendChild(row0)
    
    const response2 = await getAllProductAPI()

    let tablebody = document.getElementById("allProduct")
    tablebody.innerHTML = " "
     response2.data.items.map(async (item,index) => {
      
      let btn = document.createElement("button");
      btn.innerText = "Chi ti???t"
      btn.addEventListener("click", (e) => {
        sessionStorage.setItem("itemId",item._id) 
        sessionStorage.setItem("fixed", JSON.stringify([]))
           getProductDetail(item._id)


          sessionStorage.setItem(`product${index}`, JSON.stringify(item) )
          const p = JSON.parse(sessionStorage.getItem(`product${index}`))

          sessionStorage.setItem("pLineName",p.productLine.name)
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
      let column7 = document.createElement("td")
      
      column1.innerHTML = index + 1 ;
      column2.innerHTML = item.name;
      column3.innerHTML = item._id;
      column4.innerHTML = item.productLine.name;
      column5.innerHTML = item.status;
      column6.innerHTML = item.createdBy.name;
      column7.appendChild(btn)
      column1.appendChild(checkbox)
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

        const [returnAgency, setShowReturnAgency] = useState(false);
        const handleShowReturnAgency = () => {getAllAgency();getAllAgencyStorage();setShowReturnAgency(true);}
        const handleCloseReturnAgency = () => setShowReturnAgency(false);



        const [showPage, setShowPage] = useState(false)
        const handleShowPage = () => setShowPage(true);

        async function handleFixedDone() {
          let data = {
              "productId": sessionStorage.getItem("itemId"),
              "errorReportIds": JSON.parse(sessionStorage.getItem("fixed"))
          }
            const response = await getFixedDoneAPI(data)

            handleCloseProductDetail()
            getAllProduct()
        }

        

    
return (

    <>
<Button variant="outline-warning" onClick={getAllProduct} >Qu???n l?? s???n ph???m</Button>
<Button variant="outline-warning" onClick={handleShowReturnAgency} >Tr??? c??c s???n ph???m ???? ch???n v??? ?????i l??</Button>


<Modal show= {returnAgency} onHide = {handleCloseReturnAgency}>

  <Modal.Header>
        <Modal.Title>Tr??? s???n ph???m v??? ?????i l??</Modal.Title>
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
            options={agencys}
            placeholder='T??n ?????i l??'
            onChange={handleChangeIdAgency}
        />
        </div>

        <div>
          <label> S???n ph???m ???????c l??u tr??? t???i kho: </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={''}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            options={aStorages}
            placeholder='T??n kho'
            onChange={handleChangeAStrId}
        />
        </div>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="primary" onClick={returnToAgency}>
      X??c nh???n
    </Button>
    <Button variant="secondary" onClick={handleCloseReturnAgency}>
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
           <h5 style={{display: "inline"}}>D??ng s???n ph???m: </h5> <h6 style={{display: "inline"}}>{sessionStorage.getItem("pLineName")}</h6> 
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
           <h5 style={{display: "inline"}}>????n gi??: </h5> <h6 style={{display: "inline"}}>{sessionStorage.getItem("price")} VND</h6> 
        </div> <br />
        <div style={{padding: 1}}>
          <h5 style={{display: "inline"}}>T??nh tr???ng: </h5> <h6 style={{display: "inline"}}>{product.status}</h6>
        </div> <br />
        <div style={{padding: 1}}>
          <h5 style={{display: "inline"}}>Danh s??ch c??c l???i: </h5> 
        </div> <br />
        {JSON.parse(sessionStorage.getItem("error"))?.map((item,index) => {
            
            return (<InputGroup className="mb-3" onChange={() =>{
              
                let arr = JSON.parse(sessionStorage.getItem("fixed"))
                if(document.getElementById(`fix${index}`).checked) {
                    arr.push(item._id)
                } else{
                 arr = arr.filter((id) => {
                    return id != item._id
                 })
                }
                sessionStorage.setItem("fixed", JSON.stringify(arr))
              
            }}>
              <InputGroup.Checkbox aria-label="Checkbox for following text input" id={`fix${index}`}/>
              <div style={{padding: 1}}>
              <h5 style={{display: "inline"}}>L???i {index + 1}: </h5> <h6 style={{display: "inline"}}>{item.description}</h6>
            </div> <br /></InputGroup>)
          })}

        </Modal.Body>
  
        <Modal.Footer>
            <Button variant="primary" onClick={handleFixedDone}>
              X??c nh???n ???? s???a l???i ???????c ch???n
            </Button>
            <Button variant="secondary" onClick={handleCloseProductDetail}>
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