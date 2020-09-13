import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import firebase from './firebase';

import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { setUser } from './actions';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        this.props.setUser(user);
        this.props.history.push('/');
      }
    });
  }

  render() {
    return (
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    );
  }
}

const RootWithAuth = withRouter(connect(null, { setUser })(Root));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
