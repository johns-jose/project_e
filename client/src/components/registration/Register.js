import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import validation from './RegisterValidation';

export default function Registration() {
const [regData,setRegData]= useState({})
const [errors,setErrors]= useState({})

const handleSubmit = (e)=>{
  e.preventDefault()
  setErrors( validation(regData))
}  

const handleChange = (e)=>{
  setRegData({...regData,[e.target.name]:e.target.value})
  
}
console.log('regData',regData);
console.log('errors',errors)
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    prodigit
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit} >
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control type="text" name ='name' value={regData.name} placeholder="Enter Name" onChange={handleChange} />
                      </Form.Group>
                      {errors.name&&<p style={{color:'red'}}>{errors.name}</p>}

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" name='email'value={regData.email} placeholder="Enter email"onChange={handleChange} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Phone Number
                        </Form.Label>
                        <Form.Control type="number" name='phone' value={regData.phone} placeholder="Enter Phone number"onChange={handleChange} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' value={regData.password} placeholder="Password" onChange={handleChange} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"  name='confirmPassword' value={regData.confirmPassword} placeholder="Password" onChange={handleChange}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" >
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{' '}
                        <a href="{''}" className="text-primary fw-bold">
                          Sign In
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}