import React, { useState, useEffect } from "react";
import axios from 'axios';

import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [fetching, setFetching] = useState(true);


  useEffect(() => {
    if(fetching) {
        axios.get(`http://localhost:5000/products/?limit=3&page=${page}`)
          .then(resp => {
            setTotalProducts(resp.data.count);
            setProducts([...products, ...resp.data.data]);
            setPage(prevState => prevState + 1 );
          })
          .finally(() => setFetching(false));  
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, [page]);

  const scrollHandler = (e) => {    
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
      && products.length < totalProducts) {
      setFetching(true);
    }
  };

  return (
    <div className="App">
      <p> List of products:</p>
      <div>
     { products.map(product => <div className="product" key={product.id}>
       <div > 
          {product.name}
       </div>
       </div>)}
      </div>
    </div>
  );
}

export default App;
