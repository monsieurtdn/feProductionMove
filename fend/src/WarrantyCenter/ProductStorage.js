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
    console.log(res);
    handleAgencys(res);
    }
    const [idAgency,setIdAgency] = useState('')
    const handleChangeIdAgency = (e) => {
      setIdAgency(e.value)
      sessionStorage.setItem("user", `?userId=${e.value}`)
      getAllAgencyStorage()
    }

    async function getAllAgencyStorage() {
      console.log(idAgency)
      const response2 = await getStorageDetailAPI();
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
    console.log(choose)
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
    const response = await getProductDetailAPI(id);
    const response2 = await getProductErrorAPI(id);
    setErrors(response2.data.items)
    midproduct = response.data
    transfer()
    console.log(midproduct)
    console.log(product)
    console.log(response2.data)
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
    row3.innerHTML = "Mã sản phẩm";
    row4.innerHTML = "Dòng sản phẩm";
    row5.innerHTML = "Tình trạng";
    row6.innerHTML = "Đơn vị yêu cầu";
    row7.innerHTML = "Chi tiết";
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
      sessionStorage.setItem("itemId",item._id) 
      let btn = document.createElement("button");
      btn.innerText = "Chi tiết"
      btn.addEventListener("click", (e) => {
        sessionStorage.setItem("fixed", JSON.stringify([]))
         getProductDetail(item._id)
         if(product != NaN)
          sessionStorage.setItem(`product${index}`, JSON.stringify(item) )
          const p = JSON.parse(sessionStorage.getItem(`product${index}`))
          errors.map((item,index) =>{
            sessionStorage.setItem(`error${index}`,item.description)
            
          })
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
            console.log(response.data)
        }

        

    
return (

    <>
<Button variant="outline-warning" onClick={getAllProduct} >Quản lý sản phẩm</Button>
<Button variant="outline-warning" onClick={handleShowReturnAgency} >Trả các sản phẩm đã chọn về đại lý</Button>


<Modal show= {returnAgency} onHide = {handleCloseReturnAgency}>

  <Modal.Header>
        <Modal.Title>Trả sản phẩm về đại lý</Modal.Title>
  </Modal.Header>

  <Modal.Body>
  <div>
          <label>Tên đại lý </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={''}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            options={agencys}
            placeholder='Tên đại lý'
            onChange={handleChangeIdAgency}
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
            options={aStorages}
            placeholder='Tên kho'
            onChange={handleChangeAStrId}
        />
        </div>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="primary" onClick={returnToAgency}>
      Xác nhận
    </Button>
    <Button variant="secondary" onClick={handleCloseReturnAgency}>
      Đóng
    </Button>
  </Modal.Footer>
</Modal>

<Modal show= {showProductDetail} onHide = {handleCloseProductDetail}>
        <Modal.Header>
        <Modal.Title>Thông tin sản phẩm</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
        <div style={{padding: 1}}>
           <h5 style={{display: "inline"}}>Dòng sản phẩm: </h5> <h6 style={{display: "inline"}}>{sessionStorage.getItem("pLineName")}</h6> 
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
           <h5 style={{display: "inline"}}>Đơn giá: </h5> <h6 style={{display: "inline"}}>{sessionStorage.getItem("price")} VND</h6> 
        </div> <br />
        <div style={{padding: 1}}>
          <h5 style={{display: "inline"}}>Tình trạng: </h5> <h6 style={{display: "inline"}}>{product.status}</h6>
        </div> <br />
        <div style={{padding: 1}}>
          <h5 style={{display: "inline"}}>Danh sách các lỗi: </h5> 
        </div> <br />
        {errors.map((item,index) => {
            
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
              <h5 style={{display: "inline"}}>Lỗi {index + 1}: </h5> <h6 style={{display: "inline"}}>{sessionStorage.getItem(`error${index}`)}</h6>
            </div> <br /></InputGroup>)
          })}

        </Modal.Body>
  
        <Modal.Footer>
            <Button variant="primary" onClick={handleFixedDone}>
              Xác nhận đã sửa lỗi được chọn
            </Button>
            <Button variant="secondary" onClick={handleCloseProductDetail}>
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