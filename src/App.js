import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Switch, Route, useLocation,
} from 'react-router-dom';
import Login from './components/Login';
import Appointments from './components/Appointments';
import Basic from './components/Scheduler';
import NewAppointment from './components/NewAppointment';
import EditAppointment from './components/EditAppointment';
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
          <Route exact path={['/', '/home']} component={Basic} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/appointments" component={Appointments} />
          <Route exact path="/appointments/new" component={NewAppointment} />
          <Route exact path="/appointments/:id" component={EditAppointment} />
          <Route exact path="/patient/new" component={NewPatient} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
