import { useState } from 'react';
import React from 'react';
//import 'LogIn./LogIn.css'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap';
import { Card, Container } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Login(){
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
    return (
        <>
        <div className='d-flex justify-content-center sm'>
        <img src='Logo.jpg' alt='Logo' ></img>
        </div> 

        <Container fluid>

<Row className='d-flex justify-content-center align-items-center h-100'>
  <Col col='12'>

    <Card className=' my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
      <Card.Body className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

        <Card.Title >Log In</Card.Title>

        <Form className='pt-4' noValidate validated={validated} onSubmit={handleSubmit}>
        <FloatingLabel
        controlId="floatingInput"
        label="Địa chỉ Email"
        className="mb-3 "
      >
        <Form.Control  required type="email" placeholder="name@example.com" />
        <Form.Control.Feedback type="invalid">
              Chưa nhập Email hoặc Email chưa hợp lệ!
            </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel controlId="floatingPassword" label="Password" hasValidation>
        <Form.Control  required type="password" placeholder="Password" />
        <Form.Control.Feedback type="invalid">
              Chưa nhập Mật khẩu!
            </Form.Control.Feedback>
      </FloatingLabel>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>


        <Button variant="outline-primary" type="submit">
        Đăng nhập
        </Button>
        </Form>


        <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>

      </Card.Body>
    </Card>

  </Col>
</Row>

</Container>
      </>
      );

    
}
export default Login;