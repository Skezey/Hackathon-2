import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class ReviewForm extends Component {
  state = {  subject: '', body: '', stars: '', date: ''  }

  componentDidMount() {
    if (this.props.id) {
      this.setState({ subject: this.props.subject,
                      body: this.props.body,
                      stars: this.props.stars,
                      date: this.props.date})
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    if (this.props.id) {
      this.props.update(this.props.id, this.state)
      this.props.toggleEdit()
    } else {
      this.props.add(this.state)
    }
    this.setState({ subject: '',
                    body: '',
                    stars: null,
                    date: null})
  }

  render() {
    const { subject, body, stars, date } = this.state
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label='subject'
          placeholder='Add a subject'
          required
          name='subject'
          value={subject}
          onChange={this.handleChange}
        />
        <Form.Input
          label='body'
          placeholder='Write something'
          required
          name='body'
          value={body}
          onChange={this.handleChange}
        />
        <Form.Input
          label='stars'
          placeholder='How many stars?'
          required
          name='stars'
          value={stars}
          onChange={this.handleChange}
        />
        <Form.Input
          label='date'
          placeholder='Add a date'
          required
          name='date'
          value={date}
          onChange={this.handleChange}
        />
        <Form.Button color='green'>Submit</Form.Button>
      </Form>
    )
  }
}

export default ReviewForm;
