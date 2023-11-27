import styled from 'styled-components';
import { mobile } from '../responsive';


const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}

`;
const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: white;
  margin-botton: 20px;
`;
const Button = styled.button`
  border: none;
  background-color: white;
  color: gray;
  padding: 10px;
  cursor: pointer;
`;

const CategoryItems = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>Show Now </Button>
      </Info>
    </Container>
  );
};

export default CategoryItems;
