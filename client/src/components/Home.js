import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DepartmentForm from './DepartmentForm';
import { Header, Segment, Button, Icon } from 'semantic-ui-react';


class Home extends Component {

  state = { departments: [], editing: false }
  toggleEdit = () => this.setState({ editing: !this.state.editing })
  componentDidMount() {
    axios.get('/api/departments')
    .then( res => {
      console.log(res)
      this.setState({ departments: res.data })
    })
    .catch( err => {
      console.log(err)
    })
  }


  addDepartment = (department) => {
    // {post: { title: 'food', body: 'yummy'}}
    axios.post('/api/departments', department )
      .then( res => {
        const { departments } = this.state
        this.setState({ departments: [...departments, res.data] })
      })
      .catch( err => {
        console.log(err)
      })
  }

  updateDepartment = (id, department) => {
    axios.put(`/api/departments/${id}`, { department } )
      .then( res => {
        const departments = this.state.departments.map( d => {
          if (d.id === id)
            return res.data
          return d
        })
        this.setState({ departments })
      })
      .catch( err => {
        console.log(err)
      })
  }

  deleteDepartment = (id) => {
    axios.delete(`/api/departments/${id}`)
      .then( res => {
        alert(res.data.message)
        const { departments } = this.state
        this.setState({ departments: departments.filter( p => p.id !== id) })
      })
  }

  render() {
    const { id, title, body, updateDepartment, deleteDepartment } = this.props
    const { editing } = this.state
    return (
      <div>
      {
        editing ?
          <DepartmentForm
            { ...this.props }
            update={ this.updateDepartment }
            toggleEdit={this.toggleEdit}
            add={this.addDepartment}
            delete={this.deleteDepartment}
          />
        :
          <ul>
            {this.state.departments.map(({ title, id }) => (
            <li key={id}>
              { <Link to={`/departments/${id}`}>{title}</Link>}
              <Button icon color='blue' onClick={this.toggleEdit}>
                <Icon name="pencil" />
              </Button>
              <Button icon color='red' onClick={ () => this.deleteDepartment(id) }>
                <Icon name="trash" />
              </Button>
            </li>
            ))}
          </ul> 
      }
      <DepartmentForm add={this.addDepartment} />

      </div>
    )
  }
}


export default Home;


