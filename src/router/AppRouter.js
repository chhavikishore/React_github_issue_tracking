import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import IssueList from '../components/IssueList/IssueList';
import IssueDetails from '../components/IssueDetails/IssueDetails';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/issueList/:name/:repo" component={IssueList} />
        <Route path="/issueDetail/:id" component={IssueDetails} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;