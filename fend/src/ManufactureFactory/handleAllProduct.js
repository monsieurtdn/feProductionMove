import { Component } from "react";
import { getAllProductAPI } from "../Api/Auth";
import { Button, Table } from "react-bootstrap";


async function getProductData() {
    let productData = [];
    const response2 = await getAllProductAPI() 
    response2.data.items.map(async (item,index) => {
      productData.push({STT: index +1, name: item.name, storage: item.storage.name,
                                     pLineName: item.productLine.name, price: item.productLine.name })
    })
    return productData
}

    class HandleAllProduct extends Component {
    
    

    

    constructor() {
        super();
        let productData = [];
        getProductData().then(res =>{
            productData = res;
        });
        this.productData = productData;
        
        this.state ={

            columns: [
            {
                datafield: "STT",
                text: "STT",
                sort: true
            },
            {
                datafield: "name",
                text: "Tên sản phẩm",
                sort: true
            },
            {
                datafield: "storage",
                text: "Thuộc về kho",
                sort: true
            },
            {
                datafield: "pLineName",
                text: "Dòng sản phẩm",
                sort: true
            },
            {
                datafield: "price",
                text: "Giá tiền",
            },
            {
                dataField: "info",
                text: "Chi tiết",
                formatter: this.linkFollow,
                sort: true
            }
            
        ],
        isFollow: true
        };

        this.onFollowchanged.bind(this);

    }
    onFollowchanged() {
        this.setState({isFollow: !this.state.isFollow});
        console.log(this.state.isFollow);
    }
    linkFollow = (cell, row, rowIndex, formatExtraData) => {
        return (
          <Button
            onClick={() => {
              this.onFollowChanged(row);
            }}
          >
            Chi tiết
          </Button>
        );
      };

      render() {
        return (
          <div style={{ padding: "20px" }}>
            <h1 className="h2">Products</h1>
            <Table
              data={this.productData}
              columns={this.state.columns}
            />
          </div>
        );
      }

    // let btn = document.createElement("button");
    // btn.innerText = "Chi tiết"
    // btn.onClick = ()=>{console.log(2307)}

    // let tablehead = document.getElementById("head")
    // tablehead.innerHTML = " "
    // let row0 = document.createElement("tr")
    // let row1 = document.createElement("th")
    // let row2 = document.createElement("th")
    // let row3 = document.createElement("th")
    // let row4 = document.createElement("th")
    // let row5 = document.createElement("th")
    // let row6 = document.createElement("th")
    // row1.innerHTML = "STT";
    // row2.innerHTML = "Tên SP";
    // row3.innerHTML = "Thuộc kho";
    // row4.innerHTML = "Dòng sản phẩm";
    // row5.innerHTML = "Giá tiền";
    // row6.innerHTML = "Chi tiết";
    // row0.appendChild(row1)
    // row0.appendChild(row2)
    // row0.appendChild(row3)
    // row0.appendChild(row4)
    // row0.appendChild(row5)
    // row0.appendChild(row6)
    // tablehead.appendChild(row0)
    // const response2 = await getAllProductAPI() 

    // console.log(response2.data)
    // let tablebody = document.getElementById("allProduct")
    // tablebody.innerHTML = " "
    //  response2.data.items.map(async (item,index) => {
    //   let column = document.createElement("tr")
    //   let column1 = document.createElement("td")
    //   let column2 = document.createElement("td")
    //   let column3 = document.createElement("td")
    //   let column4 = document.createElement("td")
    //   let column5 = document.createElement("td")
    //   let column6 = document.createElement("td")
    //   column1.innerHTML = index + 1 ;
    //   column2.innerHTML = item.name;
    //   column3.innerHTML = item.storage.name;
    //   column4.innerHTML = item.productLine.name;
    //   column5.innerHTML = item.productLine.price;
    //   column6.appendChild(btn)
    //   column.appendChild(column1)
    //   column.appendChild(column2)
    //   column.appendChild(column3)
    //   column.appendChild(column4)
    //   column.appendChild(column5)
    //   column.appendChild(column6)
    //   tablebody.appendChild(column)
    // })

  }
  export default HandleAllProduct