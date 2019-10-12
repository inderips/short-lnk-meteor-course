import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Login extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      error:''
    };
  }
  onSubmit=(e)=>{
    e.preventDefault();
    let email = this.refs.email.value.trim();    
    let password = this.refs.password.value.trim(); 

    if(password.length<2)
    {
      this.setState({error:'Password should be more than 8 characters long'})
      return;
    }
    Accounts.createUser({email,password},(err=>{
      console.log(err);    
      if(err)
      {
this.setState({
  error:err.reason
});
      }
      else{
        this.setState({
          error:''
        });     
      }
    }))
  }
    render()
    {
      return (
        <div className='boxed-view'>
        <div className='boxed-view__box'>
        <h1>Short Lnk</h1>
        <p>Join Short Lnk</p>
        {this.state.error?<p>{this.state.error}</p>:undefined}
        <form onSubmit={this.onSubmit.bind(this)} noValidate className='boxed-view__form'>
        <input type='email' placeholder='Email' ref='email'/>
        <input type='password' placeholder='Password' ref='password'/>
        <button  className='button'>Create Account</button>
        </form>


        <Link to='/'>Have an account?</Link>
        
        </div>
        </div>
      );
    };
  }