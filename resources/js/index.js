import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home';
import Main from './pages/Main';
// import Video from './pages/Video';
// import Search from './pages/Search';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import stores from './stores';
import { Provider } from 'mobx-react';

ReactDOM.render(
  <Router>
    <Provider {...stores}>
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/m/:page?" component={Main} />
      </React.Fragment>
    </Provider>
  </Router>,
  document.getElementById('app')
);
