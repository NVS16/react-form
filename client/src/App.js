import React, { Component } from 'react';


import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';

import './App.css';

const override = css`
  position: fixed;
  z-index: 2000;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      loading: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  clearForm() {
    this.setState({name: "", email: "", message: ""});
  }


  handleSubmit(event) {
    // alert('The Form Was Submitted!' + this.state.name + "\n" + this.state.email + "\n" + this.state.message);
    event.preventDefault();

    this.setState({loading: true});

    const data = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }
  };
    fetch('http://localhost:4000/api/submit', options).then(response => {
      response.json().then(body => {
        this.setState({loading: false});
        alert(body.msg);
        this.clearForm();
      });
    });
  }

  render() {
    return (
      <div className="App">
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={100}
          color={'#00B2EE'}
          loading={this.state.loading}
        />
        <form onSubmit={this.handleSubmit}>
          <h2>Contact Us</h2>
          <div className="row">
            <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label>Name</label>
              <input type="text" required className="form-control" value={this.state.name} onChange={this.handleNameChange}/>
            </div>
            <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label>Email</label>
              <input type="email" required className="form-control" value={this.state.email} onChange={this.handleEmailChange}/>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <label>Message</label>
              <textarea required className="form-control" rows="5" value={this.state.message} onChange={this.handleMessageChange} ></textarea>
            </div>
          </div>
          <input className="form-control col-md-3 btn btn-info" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
