import {Meteor} from 'meteor/meteor';
import React from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";
import moment from 'moment';
export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.clipboard = null;
    this.state = {
      justCopied:false
    };
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard
      .on("success", () => {
        this.setState({ justCopied: true });
        setTimeout(()=>this.setState({ justCopied: false }),1000)
      })
      .on("error", () => {
        this.setState({ justCopied: false });        
      });
  }
  componentWillUnmount() {    
    this.clipboard.destroy();
    }
    renderStats(){
      const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;

    if (typeof this.props.lastVisited === 'number') {
      visitedMessage = `(visited ${ moment(this.props.lastVisited).fromNow() })`;
    }

    return <p className='item__message'>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>;
      }
  render() {
    return (
      <div className='item'>
        <h2>{this.props.url}</h2>
        <p className='item__message'>{this.props.shortUrl}</p>
        {this.renderStats()}
        
        <a href={this.props.shortUrl} target='_blank' className='button button--pill button--link'>Visit</a>
        <button ref="copy" className='button button--pill' data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied?'Copied':'Copy'}          
        </button>   
        <button onClick={()=>{
          Meteor.call('links.setVisibility',this.props._id,!this.props.visible);
        }} className='button button--pill '>{this.props.visible?"Hide":"Unhide"}</button>     
        
        
      </div>
    );
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  visitedCount:PropTypes.number.isRequired,
  lastVisited:PropTypes.number

};
