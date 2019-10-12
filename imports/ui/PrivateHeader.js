import React from "react";
import { Accounts } from "meteor/accounts-base";
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
  return (
    <div className='header'>    
    <div className='header-content'>
      <h1 className='header-title'>Your Links {props.title}</h1>
      <input type="button" className='button--link-text' onClick={() => Accounts.logout()} value="Logout" />
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PrivateHeader;