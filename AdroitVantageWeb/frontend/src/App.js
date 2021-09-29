import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
//import HomeComponent from './components/HomeComponent';
import ListCandidateComponent from './components/Career/ListCandidateComponent';
import CreateCandidateComponent from './components/Career/CreateCandidateComponent';
import UpdateCandidateComponent from './components/Career/UpdateCandidateComponent';
import ViewCandidateComponent from './components/Career/ViewCandidateComponent';
import ListWriteToUsComponent from './components/WriteToUs/ListWriteToUsComponent';
import CreateWriteToUsComponent from './components/WriteToUs/CreateWriteToUsComponent';
import UpdateWriteToUsComponent from './components/WriteToUs/UpdateWriteToUsComponent';
import ViewWriteToUsComponent from './components/WriteToUs/ViewWriteToUsComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          {/* Career Service */}
                          {/*<Route path = "/" exact component = {HomeComponent}></Route>*/}
                          <Route path = "/" exact component = {ListCandidateComponent}></Route>
                          <Route path = "/candidates" component = {ListCandidateComponent}></Route>
                          <Route path = "/add-candidate/:id" component = {CreateCandidateComponent}></Route>
                          <Route path = "/view-candidate/:id" component = {ViewCandidateComponent}></Route>
                          <Route path = "/update-candidate/:id" component = {UpdateCandidateComponent}></Route>

                          {/* Write to us service */}
                          <Route path = "/writeToUs" component = {ListWriteToUsComponent}></Route>
                          <Route path = "/add-writeToUs/:id" component = {CreateWriteToUsComponent}></Route>
                          <Route path = "/view-writeToUs/:id" component = {ViewWriteToUsComponent}></Route>
                          <Route path = "/update-writeToUs/:id" component = {UpdateWriteToUsComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
