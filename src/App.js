import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Switch, Route, useLocation,
} from 'react-router-dom';
import Login from './components/Login';
import NewAppointment from './components/NewAppointment';
import EditAppointment from './components/EditAppointment';
import Home from './components/Home';
import Calendar from './components/Calendar';
import NewPatient from './components/NewPatient';
import { clearMessage } from './redux/actions/message';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch, location]);


  return (
    <div>
      <main>
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/appointments/new" component={NewAppointment} />
          <Route exact path="/appointments/:id" component={EditAppointment} />
          <Route exact path="/calendar/:id" component={Calendar} />
          <Route exact path="/patient/new" component={NewPatient} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
