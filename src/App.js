import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import PatientsPage from './components/patientsPage/patientsPage';
import PatientDetailPage from './components/patientDetailPage/patientDetailPage';

const App = () => {
  return (
      <Router>
        <Switch>
          <Route exact path="/" children={<PatientsPage/>}/>
          <Route path="/patients/:id" children={<PatientDetailPage/>}/>
        </Switch>
      </Router>
  );
};

export default App;