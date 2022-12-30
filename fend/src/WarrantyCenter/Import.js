import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { Modal, Pagination } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getTransitionAPI, agencyImportAPI, warrantyCenterReceiceProductAPI } from '../Api/Auth';
import Select from 'react-select';


function Import() {

    async function handleImport(id) {
        let data ={
          "transitionId": id
        }
      const response = await warrantyCenterReceiceProductAPI(data)

      handleCloseConfirm()
      getTransitionDetail()
    }

    async function getTransitionDetail() {


        let tablehead = document.getElementById("head")
        tablehead.innerHTML = " "
        let row0 = document.createElement("tr")
        let row1 = document.createElement("th")
        let row2 = document.createElement("th")
        let row3 = document.createElement("th")
        let row5 = document.createElement("th")
        let row6 = document.createElement("th")

        row1.innerHTML = "STT";
        row2.innerHTML = "Mã vận chuyển";
        row3.innerHTML = "Cơ sở xuất hàng";
        row5.innerHTML = "Số lượng"
        row6.innerHTML = " ";

        row0.appendChild(row1)
        row0.appendChild(row2)
        row0.appendChild(row3)
        row0.appendChild(row5)
        row0.appendChild(row6)
        tablehead.appendChild(row0)
        sessionStorage.setItem("user", `?userId=${sessionStorage.getItem("userId")}`)
        const response = await getTransitionAPI()

        let tablebody = document.getElementById("allSession")
        tablebody.innerHTML = " "
         response.data.items.map(async (item,index) => {
          let btn = document.createElement("button");
          btn.innerText = "Xác nhận"
          btn.addEventListener("click", (e) => {
            sessionStorage.setItem("transId", item._id)
            handleConfirm()
          })
          let column = document.createElement("tr")
          let column1 = document.createElement("td")
          let column2 = document.createElement("td")
          let column3 = document.createElement("td")
          let column5 = document.createElement("td")
          let column6 = document.createElement("td")

          column1.innerHTML = index + 1 ;
          column2.innerHTML = item._id;
          column3.innerHTML = item.previousUser.name;
          column5.innerHTML = item.productIds.length;
          column6.appendChild(btn)
          column.appendChild(column1)
          column.appendChild(column2)
          column.appendChild(column3)

          column.appendChild(column5)
          column.appendChild(column6)

          tablebody.appendChild(column)
        })
        }
      // getTransitionDetail()
      
        const [transition,getTransition] = useState(false)
        const handleGetTransition = ()=> {
          getTransition(true);
          getTransitionDetail();
        }

        const [confirm, getConfirm] = useState(false)
        const handleConfirm = () => getConfirm(true);
        const handleCloseConfirm = () => getConfirm(false)

      return(
      <>
   <Button variant="outline-warning" onClick={handleGetTransition} >Quản lý sản phẩm</Button>
    <Table striped bordered hover size="sm">
        <thead id = "head">

        </thead>
        <tbody id = "allSession">

        </tbody>
    </Table>

    <Modal show={confirm} onHide={handleCloseConfirm}>
                <Modal.Header closeButton>
                  <Modal.Title>Xác nhận vận chuyển thành công</Modal.Title>
                </Modal.Header>
                <Modal.Body>Xác nhận đơn đã được vận chuyển tới trung tâm? </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={()=>{handleImport(sessionStorage.getItem("transId"))}}>
                    Có
                  </Button>
                  <Button variant="primary" onClick={handleCloseConfirm}>
                    Không
                  </Button>
                </Modal.Footer>
            </Modal>

        </>
      )

}
export default Import