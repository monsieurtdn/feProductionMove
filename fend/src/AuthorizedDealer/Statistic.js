import { Form } from "react-bootstrap"
import DemoPie from "./DemoPie"
import { ReactDOM } from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Statistic () {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Form  >

        <Form.Group> 
            <Form.Select aria-label="Default select example">
                <option>Lựa chọn dòng sản phẩm cần thống kê</option>
                <option value="1">Samsung galaxy 1</option>
                <option value="2">Samsung galaxy 2</option>
                <option value="3">Samsung galaxy 3</option>
                <option value="3">Samsung galaxy 4</option>
            </Form.Select>
        </Form.Group>

        <Form.Group> 
            <Form.Select aria-label="Default select example">
                <option>Lựa chọn số liệu thống kê</option>
                <option value="1">Thống kê số lượng sản phẩm theo trạng thái</option>
                <option value="2">Thống kê số lượng sản phẩm bán ra</option>
                <option value="3">Thống kê tỉ lệ sản phẩm bị lỗi</option>
            </Form.Select>
        </Form.Group>

        <Form.Group> 
            <Form.Select aria-label="Default select example">
                <option>Khoảng thời gian thống kê</option>
                <option value="1">Tháng</option>
                <option value="2">Quý</option>
                <option value="3">Năm</option>
            </Form.Select>
        </Form.Group>

        </Form>
        
        <Button variant="outline-warning" onClick={handleShow}>
            Xem biểu đồ
        </Button>

        <Container id='information'>
            {show && <DemoPie    />}
        </Container>
        
        </>
    )
    
}   
export default Statistic