import React from "react";
import LinksList from "./Linkslist";
import PrivateHeader from "./PrivateHeader";
import AddLink from "./AddLink";
import LinksListFilters from './LinksListFilters';
export default () => {
  return (
    <div>    
      <PrivateHeader title="" />
      <div className='page-content'>
      <LinksListFilters/>      
      <AddLink />
      <LinksList />      
      </div>
    </div>
  );
};
