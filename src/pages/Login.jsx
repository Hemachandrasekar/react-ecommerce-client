import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('../images/register.jpg');
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #fff;
  ${mobile({ width: "75%" })}

`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Link = styled.div`
  margin: 10px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Button = styled.button`
  width: 40%;
  padding: 15px 20px;
  boder: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 5px;
  &:disabled{
    color:green;
    cursor:not-allowed;
  }
`;

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector((state => state.user))

  const handleClick = (e) => {
    e.preventDefault()
    login(dispatch, { username, password })
  }
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN </Title>
        <Form>
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />

          <Input type='password' placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <Link>DO NOT YOU REMEMBER THE PASSWORD ?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>

          <Button disabled={isFetching} onClick={handleClick}>LOGIN</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
