import React, { useEffect, useState } from 'react';
import TopBar from '../topBar/topBar';
import PatientCard from '../patientCard/patientCard';
import axiosInstance from '../../utils/axiosInstance';
import { baseUrl } from '../../constants/constants';

const PatientsPage = (props) => {
  const [patients, setPatients] = useState([]);
  const [searched, setSearched] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const {data: {entry}} = await axiosInstance.get(`${baseUrl}/Patient`);
      return entry.map(({resource: {address, birthDate, name, id, telecom}}) => {
        return {address, birthDate, name, id, telecom};
      });
    };
    fetchPatients().then(r => setPatients(r));
  }, []);

  return (
      <div>
        <TopBar title="Patients" search onSearch={setSearched}/>
        {patients.filter(patient => !searched.length || patient.name[0].family.toLowerCase().match(searched))
            .map((patient) => {
              return (
                  <PatientCard
                      key={patient.id}
                      id={patient.id}
                      firstName={patient.name[0].given[0]}
                      surname={patient.name[0].family}
                      birthDate={patient.birthDate}
                      telecom={patient.telecom[0].value}/>
              );
            })}
      </div>
  );
};

export default PatientsPage;