import styled from 'styled-components';
import { popularproducts } from '../data';
import Product from './Product';
import { useState, useEffect } from 'react';
import axios from 'axios'


const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = ({ category, filters, sort }) => {
  console.log("products", category, filters, sort)

  const [products, setProducts] = useState([])
  const [filteredProduct, setFilteredProduct] = useState([])
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(category ? `https://react-ecommerce-dbgk.onrender.com/api/v1/product?category=man` : `https://react-ecommerce-dbgk.onrender.com/api/v1/product`)
        console.log("response", res)
        setProducts(res.data)
      } catch (error) {

      }
    }
    getProduct()
  }, [category])

  useEffect(() => {
    category && setFilteredProduct(
      products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value)))
    )
  }, [category, filters, products])

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProduct((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt))
    } else if (sort === 'asc') {
      setFilteredProduct((prev) => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setFilteredProduct((prev) => [...prev].sort((a, b) => b.price - a.price))
    }


  }, [sort])


  return (
    <Container>
      {category ? filteredProduct.map((item) => (
        <Product item={item} />
      )) : products.slice(0, 8).map((item) => (
        <Product item={item} />
      ))}
    </Container>
  );
};

export default Products;
