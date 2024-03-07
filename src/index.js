import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route,Routes,useNavigate} from 'react-router-dom';
import { Provider,connect } from 'react-redux';
import { createStore } from 'redux';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import firebase from './server/firebase';
import { combinedReducers } from './store/reducer';
import { setUser } from './store/actioncreator';

import withRouter from './withRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(combinedReducers)
const Index = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUser(user);
        navigate('/');
      } 
      else {
        props.setUser(null);
        navigate('/login');
      }
    });
  }, [navigate]);
  console.log("Debug",props.currentUser);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<App />} />
    </Routes>
  );
};
const mapStateToProps = (state) => {
  return {
    currentUser : state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setUser : (user) => {dispatch(setUser(user))}
  }
}
const IndexwithRouter = withRouter(connect(mapStateToProps,mapDispatchToProps)(Index));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <IndexwithRouter />
      </Router>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
