import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class DepartmentForm extends Component {
  state = { title: '' }

  componentDidMount() {
    console.log(this.props)
    if (this.props.id) {
      this.setState({ title: this.props.title })
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
    this.setState({ title: '' })
  }

  render() {
    const { title } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          required
          placeholder='title'
          label='title'
          name='title'
          value={title}
          onChange={this.handleChange}
        />
        <Form.Button color='green'>Submit</Form.Button>
      </Form>
    )
  }
}

export default DepartmentForm;