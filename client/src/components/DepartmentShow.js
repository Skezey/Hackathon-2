import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  render() {
    return (
      <ul>
        {this.state.products.map((p) => (
          <li key={p.id}>
            { <Link to={{
              pathname: `/products/${p.id}`,
              state: { product: {...p} }
              }}>{p.name}</Link>} 
          </li>
        ))}
      </ul> 
    )
  }
 }

export default DepartmentShow;