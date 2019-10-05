import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class ProductForm extends Component {
  state = { name: '', description: '', price: '', stock: '' }

  componentDidMount() {
    console.log(this.props)
    if (this.props.id) {
      this.setState({ name: this.props.name, description: this.props.description, price: this.props.price, stock: this.props.stock })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.id) {
      this.props.update(this.props.id, this.state)
      this.props.toggleEdit()
    } else {
      this.props.add(this.state)
    }
    this.setState({ name: '', description: '', price: 0, stock: 0 })
  }

  render() {
    const { name, description, price, stock } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          required
          placeholder='name'
          label='name'
          name='name'
          value={name}
          onChange={this.handleChange}
        />
          <Form.Input
          required
          placeholder='price'
          label='price'
          name='price'
          value={price}
          onChange={this.handleChange}
        />
          <Form.Input
          required
          placeholder='description'
          label='description'
          name='description'
          value={description}
          onChange={this.handleChange}
        />
          <Form.Input
          required
          placeholder='stock'
          label='stock'
          name='stock'
          value={stock}
          onChange={this.handleChange}
        />
        <Form.Button color='green'>Submit</Form.Button>
      </Form>
    )
  }
}

export default ProductForm;