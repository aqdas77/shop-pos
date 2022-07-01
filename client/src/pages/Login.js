import React, { useEffect } from 'react'
import { Button, Col, Form, Input, message, Row } from "antd";
import '../resources/authentication.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish=(values)=>{
    dispatch({type:'showLoading'})
    axios.post('/api/users/login',values).then((res)=>{
      dispatch({type:'hideLoading'})
      message.success('Login Successful')
      localStorage.setItem('pos-user',JSON.stringify(res.data))
      navigate('/home')
    }).catch(()=>{
      dispatch({type:'hideLoading'})
      message.error('Something went wrong')
    })
}

useEffect(()=>{
   if(localStorage.getItem('pos-user'))
   navigate('/home')
},[])
  return (
    <div className='authentication'>
          <Row>
            <Col lg={8} xs={22}>
            <Form
            layout="vertical"
            onFinish={onFinish}
          >
            <h3><b>SHOP POS</b></h3>
            <hr />
            <h3>LOGIN</h3>
          
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type='password' />
            </Form.Item>

            <div className="d-flex justify-content-between align-items center">
                <Link to='/register'><b>Not yet Registered ? Click here to Register</b></Link>
              <Button htmlType="submit" type="primary" >
                LOGIN
              </Button>
            </div>
          </Form>
            </Col>
          </Row>
    </div>
  )
}

export default Login