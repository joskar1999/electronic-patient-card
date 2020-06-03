import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PatientCard from '../patientCard/patientCard';
import axiosInstance from '../../utils/axiosInstance';
import TopBar from '../topBar/topBar';
import { baseUrl } from '../../constants/constants';

const PatientDetailPage = (props) => {
  const [userData, setUserData] = useState({
    firstName: '',
    surname: '',
    birthDate: '',
    telecom: ''
  });
  const [observations, setObservations] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      const {data: {name, telecom, birthDate}} = await axiosInstance.get(`${baseUrl}/Patient/${id}`);
      return {name, telecom, birthDate};
    };
    fetchUserData().then(response => setUserData({
      firstName: response.name[0].given[0],
      surname: response.name[0].family,
      birthDate: response.birthDate,
      telecom: response.telecom[0].value
    }));
  }, [id]);

  useEffect(() => {
    const fetchObservations = async (next) => {
      const handleFetchedData = (entry, link) => {
        setObservations(prevState => [...prevState, ...entry.map(({resource: {id, category, code, valueQuantity, effectiveDateTime}}) => {
          return {id, category, code, valueQuantity, effectiveDateTime};
        })]);
        link.filter(item => item.relation === 'next').length
            ? fetchObservations(link.filter(item => item.relation === 'next')[0].url)
            : console.log('data fetched');
      };
      return next
          ? await axiosInstance.get(next).then(({data: {entry, link}}) => {
            handleFetchedData(entry, link);
          })
          : await axiosInstance.get(`${baseUrl}/Observation?patient=${id}`).then(({data: {entry, link}}) => {
            handleFetchedData(entry, link);
          });
    };
    fetchObservations().then();
  }, [id]);

  return (
      <div>
        <TopBar title={`${userData.firstName} ${userData.surname}`}/>
        <PatientCard
            firstName={userData.firstName}
            surname={userData.surname}
            birthDate={userData.birthDate}
            telecom={userData.telecom}/>
        {observations.map(observation => {
          return (
              <div key={observation.id}>
                <p>{observation.category[0].coding[0].display} / {observation.code.text} / {observation.valueQuantity ? Math.round(observation.valueQuantity.value * 100) / 100 : ''}</p>
                <p>{observation.effectiveDateTime.substring(0, 10)}</p>
              </div>
          );
        })}
      </div>
  );
};

export default PatientDetailPage;