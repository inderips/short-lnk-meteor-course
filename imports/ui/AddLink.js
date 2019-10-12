import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error:''
    };
  }
  onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
         this.handleClose();
        }
        else{
          this.setState({error:err.reason});
        }
      });
    }
  }
  onChange(e) {
    this.setState({
      url: e.target.value,
      error:''
    });
  }
  handleClose(){
    this.setState({ url: '', isOpen: false,error:'' });          
  }
  render() {
    return (
      <div>
        <button className='button' onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
        <Modal isOpen={this.state.isOpen} 
        contentLabel="Add link" 
        onAfterOpen={()=>this.refs.url.focus()} 
        onRequestClose={this.handleClose.bind(this)} 
        className='boxed-view__box'
        overlayClassName='boxed-view boxed-view--modal'>
          <p>Add Link</p>
          <form onSubmit={this.onSubmit.bind(this)} className='boxed-view__form'>
              <input
                type="text" ref="url"
                placeholder="URL"
                value={this.state.url}
                onChange={this.onChange.bind(this)}/>
              <button className='button'>Add Link</button>
              {this.state.error?<p>{this.state.error}</p>:undefined}
              <button type='button' className='button button--secondary' onClick={this.handleClose.bind(this)}>Cancel</button>
          </form>
          
        </Modal>
      </div>
    );
  }
}
