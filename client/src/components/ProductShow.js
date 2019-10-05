import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProductShow extends Component {
  state = { reviews: [], product: {} }
  componentDidMount(reviews) {
    console.log(this.props)
    axios.get(`/api/products/${this.props.match.params.id}/reviews`)
    .then( res => {
      console.log(res)
      this.setState({ reviews: res.data })
    })
    .catch( err => {
      console.log(err)
    })
    axios.get(`/api/departments/${this.props.location.state.product.department_id}/products/${this.props.location.state.product.id}`)
    .then( res => {
      console.log(res)
      this.setState({ product: res.data })
    })
    .catch( err => {
      console.log(err)
    })
  }

  render() {
    const { name, description, price, stock, id } = this.state.product
    return (
      <div>
      {/* <h2>{description}</h2> */} 
      <p>{name}: {description}</p> 
      <p>Stock: {stock}</p>
      <ul>
        {this.state.reviews.map((r) => (
          <li key={r.id}>
            {/* { <Link to={{
              pathname: `/reviews/${r.id}`,
              state: { review: {...r} }
            }}>{r.subject}</Link>}  */}
            {r.subject}: {r.body}
            <br />
            {r.stars} stars
          </li>
        ))}
      </ul> 
      </div>
    )
  }
}

export default ProductShow;

