import { Add, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethod';
// import { useHistory } from 'react-router-dom';

const KEY = process.env.REACT_APP_STRIPE_SECRET_KEY;


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}

`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`;
const TopTexts = styled.div`
${mobile({ display: "none" })}

`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const ProductAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;
const SummaryItemTitle = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #333;
  font-weight: 600;
  color: #fff;
`;
const Cart = () => {

  const cart = useSelector(state => state.cart)
  const [stripeToken, setStripeToken] = useState(null)
  // const history = useHistory()

  const onToken = (token) => {
    setStripeToken(token)
  }

  console.log("toej=ken", stripeToken)
  useEffect(() => {
    const makePayment = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100
        })
        // history.push('/success', { data: res.data })
      } catch (error) {

      }
    }
    stripeToken && makePayment()
  }, [stripeToken])

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Whishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((item) => (
              <>
                <Product>
                  <ProductDetail>
                    <Image src={item.img} />
                    <Details>
                      <ProductName>
                        <b>Product :</b> {item.title}
                      </ProductName>
                      <ProductId>
                        <b>ID :</b>{item._id}
                      </ProductId>
                      <ProductColor color={item.color} />
                      <ProductSize>
                        <b>Size :</b>{item.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{item.quantity}</ProductAmount>
                      <Remove />
                      <ProductPrice>$ {item.price * item.quantity}</ProductPrice>
                    </ProductAmountContainer>
                  </PriceDetail>
                </Product>
                <Hr />
              </>
            ))


            }

          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemTitle>Sub Total</SummaryItemTitle>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemTitle>Estimate Shipping</SummaryItemTitle>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemTitle>Shipping Discount</SummaryItemTitle>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemTitle> Total</SummaryItemTitle>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name='Lama Shop'
              billingAddress
              amount={cart.total * 100}
              stripeKey={KEY}
              token={onToken}
              image='https://avatars.githubusercontent.com/u/1486366?v=4'
              shippingAddress
              description={`your total is $${cart.total}`}>

              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container >
  );
};

export default Cart;
