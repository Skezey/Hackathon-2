import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Home extends Component {
  state = { departments: [] }
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
  render() {
    return (
      <ul>
        {this.state.departments.map(({ title, id }) => (
          <li key={id}>
            { <Link to={`/departments/${id}`}>{title}</Link>}
          </li>
        ))}
      </ul> 
    )
  }
}


export default Home;