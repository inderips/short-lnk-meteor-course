import React from "react";
import { Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }
  Submit(e) {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    Meteor.loginWithPassword({ email }, password, err => {
      if (err) {
        this.setState({
          error: err.reason
        });
      } else {
        this.setState({
          error: err.reason
        });
      }
    });
  }
  render() {
    return (
      <div className="boxed-view">
      <div className="boxed-view__box">
        <p>Short Lnk Login</p>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.Submit.bind(this)} noValidate className='boxed-view__form'>
          <input type="email" ref="email" placeholder="Email" name="email" />
          <input type="password" ref="password" placeholder="Password" name="password"/>
          <button className='button'>Login</button>
        </form>

        <Link to="/signup">Sign Up</Link>
      </div>
      </div>
    );
  }
}
