import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router';
import {createBrowserHistory} from 'history';
import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';



export const onAuthChange=(isAuthenticated)=>{
const pathname = browserHistory.location.pathname;
const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
const isauthenticatedPage = authenticatedPages.includes(pathname);

console.log("Is Authenticated", isAuthenticated);

if(isUnauthenticatedPage && isAuthenticated)
{
  browserHistory.replace('/links');
}
else if(isauthenticatedPage && !isAuthenticated)
  browserHistory.replace('/');
}

const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/links'];
onEnterPublicPage = () =>{  
  if(Meteor.userId())
  {    
    browserHistory.replace('/links');
    
  }
}
onEnterPrivatePage = () =>{  
  if(!Meteor.userId())
  {    
    browserHistory.replace('/');    
  }
}
export const routes = () => (
  <Router history={browserHistory}>
    <Switch>      
      <Route exact path='/' render={() => {onEnterPublicPage();return <Login />;}}/>
      <Route exact path="/signup" render={() => {onEnterPublicPage();return <Signup />;}}/>
      <Route exact path="/links" render={() => {onEnterPrivatePage();return <Link />;}} />
      <Route path='*' render={() => {onEnterPrivatePage(); return <NotFound />}} />
    </Switch>
  </Router>
);
