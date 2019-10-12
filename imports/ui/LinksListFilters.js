import React from 'react';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';
export default class LinksListFilters extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            visible: true
        }
    }    
componentDidMount(){
this.showFilter = Tracker.autorun(()=>{
const visible = Session.get('showVisible');
this.setState({visible});
})}

componentWillUnmount(){
this.showFilter.stop();
}
render(){
  return(
    <div >
    <label  className='checkbox'>
    <input type='checkbox'  className='checkbox__box' checked={!this.state.visible} onChange={(e)=>{Session.set('showVisible',!e.target.checked)}}/>
    Show hidden links
    </label>
    </div>);
}}