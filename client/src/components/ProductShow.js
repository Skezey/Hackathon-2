import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import ReviewForm from './ReviewForm'

class ProductShow extends Component {
  state = { reviews: [], product: {}, editing: false }

  toggleEdit = () => this.setState({ editing: !this.state.editing })

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

  addReview = (review) => {
    axios.post(`/api/products/${this.props.match.params.id}/reviews`, { review })
      .then( res => {
        const { posts } = this.state
        this.setState({ posts: [...posts, res.data] })
      })
      .catch( err => {
        console.log(err)
      })
  }

  updateReview = (id, review) => {
    axios.put(`/api/products/${this.props.match.params.id}/reviews`, { review } )
      .then( res => {
        const reviews = this.state.reviews.map( r => {
          if (r.id === id)
            return res.data
          return r
        })
        this.setState({ reviews })
      })
      .catch( err => {
        console.log(err)
      })
  }

  deleteReview = (id) => {
    axios.delete(`/api/products/${this.props.match.params.id}/reviews/${id}`)
      .then( res => {
        alert(res.data.message)
        const { reviews } = this.state
        if (reviews.length !== 0){
          this.setState({ reviews: reviews.filter( r => r.id !== id) })
        }
      })
  }


  render() {
    const { name, description, price, stock, id } = this.state.product
    const { editing } = this.state
    return (
      <div>
      {/* <h2>{description}</h2> */}
      <p>{name}: {description}</p>
      <p>Price: {price}</p>
      <p>Stock: {stock}</p>
      <ReviewForm add={this.addReview} />
      {
        editing ?
        <ReviewForm
          {...this.props}
          update={this.updateReview}
          toggleEdit={this.toggleEdit}
        />
        :
      <ul>
        {this.state.reviews.map( r => (
          <>
          { editing ?
          <ReviewForm
            {...this.props}
            id={r.id}
            update={this.updateReview}
            toggleEdit={this.toggleEdit}
          /> : <li key={r.id}>
            {/* { <Link to={{
              pathname: `/reviews/${r.id}`,
              state: { review: {...r} }
            }}>{r.subject}</Link>}  */}
            {r.subject}: {r.body}
            <br />
            {r.stars} stars
            <Button icon color='blue' onClick={this.toggleEdit}>
              <Icon name="pencil" />
            </Button>
            <Button icon color='red' onClick={ () => this.deleteReview(r.id) }>
              <Icon name="trash" />
            </Button>
          </li>
          }
        </>
        ))}
      </ul>
    }
      </div>
    )
  }
}

export default ProductShow;
