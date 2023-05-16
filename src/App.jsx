import { useEffect, useReducer } from 'react';
import { ACTIONS, LOGIN_STATUS, ERROR } from './constants';
import './App.css';
import Loading from './Loading';
import Main from './Main';
import Login from './Login';
import { fetchLogin, fetchLogout, fetchSession } from './services';
import reducer, { initialState } from './appReducer';

function App() {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  function onLogin( username ) {
    fetchLogin(username)
    .then( response => {
      dispatch({ type: ACTIONS.LOG_IN, username: response.username });
    })
    .catch( error => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: error.error });
    });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_PENDING });
    fetchLogout()
    .then( () => {
      dispatch({ type: ACTIONS.LOG_OUT });
    })
    .catch( error => {
      if(error.error === ERROR.AUTH_MISSING) dispatch({ type: ACTIONS.LOG_OUT });
      else dispatch({ type: ACTIONS.REPORT_ERROR, error: error.error });
    })
  }

  function checkForSession() {
    fetchSession()
    .then( response => {
      dispatch({ type: ACTIONS.LOG_IN, username: response.username });
    })
    .catch( error => {
      if(error.error === ERROR.AUTH_MISSING) dispatch({ type: ACTIONS.LOG_OUT });
      else dispatch({ type: ACTIONS.REPORT_ERROR, error: error.error });
    })
  }

  useEffect( () => {
    checkForSession()
  }, []);

  return (
    <div className="App">
      <div className='error'>{state.error === ERROR.NETWORK_ERROR && state.error}</div>
      { state.loginStatus === LOGIN_STATUS.PENDING && <Loading /> }
      { state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && <Main onLogout={onLogout} username={state.username}/> }
      { state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <Login onLogin={onLogin} error={state.error}/>}
    </div>
  );
}

export default App;
