import React from 'react';
import ReactDOM from 'react-dom';
import IssueList from './IssueList';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IssueList />, div);
  ReactDOM.unmountComponentAtNode(div);
});