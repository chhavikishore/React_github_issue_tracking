import React from 'react';
import ReactDOM from 'react-dom';
import IssueDetails from './IssueDetails';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IssueDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});