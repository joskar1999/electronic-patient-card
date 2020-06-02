import React, { useEffect, useState } from 'react';
import TopBar from './components/topBar/topBar';
import PatientCard from './components/patientCard/patientCard';
import * as axios from 'axios';

const App = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/baseR4',
    timeout: 10000,
    headers: {'Accept': 'application/fhir+json'}
  });

  const [patients, setPatients] = useState([]);
  const [searched, setSearched] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const {data: {entry}} = await axiosInstance.get('/Patient');
      return entry.map(({resource: {address, birthDate, name, id, telecom}}) => {
        return {address, birthDate, name, id, telecom};
      });
    };
    fetchPatients().then(r => {
      console.log(r);
      setPatients(r);
    });
  }, []);

  return (
      <div>
        <TopBar onSearch={setSearched}/>
        {patients.filter(patient => !searched.length || patient.name[0].family.toLowerCase().match(searched))
            .map((patient) => {
              return (
                  <PatientCard
                      key={patient.id}
                      firstName={patient.name[0].given[0]}
                      surname={patient.name[0].family}
                      birthDate={patient.birthDate}
                      telecom={patient.telecom}/>
              );
            })}
      </div>
  );
};

export default App;