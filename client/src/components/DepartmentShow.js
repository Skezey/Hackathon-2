import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header, Button, Segment, Icon } from 'semantic-ui-react';
import ProductForm from './ProductForm';


class DepartmentShow extends Component {
  state = { products: [] }
  componentDidMount(products) {
    console.log(this.props)
    axios.get(`/api/departments/${this.props.match.params.id}/products`)
    .then( res => {
      console.log(res)
      this.setState({ products: res.data })
    })
    .catch( err => {
      console.log(err)
    })
  }

  addProduct = (product) => {
    axios.post('/api/department/products', product )
      .then( res => {
        const { products } = this.state
        this.setState({ products: [...products, res.data] })
      })
      .catch( err => {
        console.log(err)
      })
  }

  updateProduct = (id, product) => {
    axios.put(`/api/products/${id}`, { product } )
      .then( res => {
        const products = this.state.products.map( p => {
          if (p.id === id)
            return res.data
          return p
        })
        this.setState({ products })
      })
      .catch( err => {
        console.log(err)
      })
  }
  
  deleteProduct = (id) => {
    axios.delete(`/api/departments/${this.props.match.params.id}/products/${id}`)
    .then( res => {
      alert(res.data.message)
      const { products } = this.state
      if (products.length !== 0){
        this.setState({ products: products.filter( p => p.id !== id) })
      }
    })
  }



  render() {
    return (
      <div>
      <ul>
        {this.state.products.map((p) => (
          <li key={p.id}>
            { <Link to={{
              pathname: `/products/${p.id}`,
              state: { product: {...p} },
              }}>{p.name}</Link>} 
              <Button icon color='red' onClick={ () => this.deleteProduct(p.id)}>
                <Icon name="trash" />
              </Button>
          </li>
        ))}
      </ul> 
      <ProductForm add={this.addProduct} />
      </div>
    )
  }
 }

export default DepartmentShow;