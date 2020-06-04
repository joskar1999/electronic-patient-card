import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PatientCard from '../patientCard/patientCard';
import axiosInstance from '../../utils/axiosInstance';
import TopBar from '../topBar/topBar';
import { baseUrl } from '../../constants/constants';
import ObservationsTimeline from '../observationsTimeline/observationsTimeline';
import { PatientDataTile, TileTitle, TimelinesContainer, TimelineWrapper } from './componentStyles';
import MedicationRequestsTimeline from '../medicationRequestsTimeline/medicationRequestsTimeline';
import MedicalChart from '../medicalChart/medicalChart';
import DateSelection from '../dateSelection/dateSelection';

const PatientDetailPage = (props) => {
  const [userData, setUserData] = useState({
    firstName: '',
    surname: '',
    birthDate: '',
    telecom: ''
  });
  const [observations, setObservations] = useState([]);
  const [medicationRequests, setMedicationRequests] = useState([]);
  const [chartTitle, setChartTitle] = useState('Click on observation to see chart');
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState('1900-01-01');
  const [endDate, setEndDate] = useState('2200-01-01');
  const [titleApplicable, setTitleApplicable] = useState(true);
  const {id} = useParams();

  const fetchData = async (next, handleFetchedData, url) => {
    return next
        ? await axiosInstance.get(next).then(({data: {entry, link}}) => {
          handleFetchedData(entry, link);
        })
        : await axiosInstance.get(url).then(({data: {entry, link}}) => {
          handleFetchedData(entry, link);
        });
  };

  const fetchNextPage = (link, recursiveCall) => {
    link.filter(item => item.relation === 'next').length
        ? recursiveCall(link.filter(item => item.relation === 'next')[0].url)
        : console.log('data fetched');
  };

  const mapAndUpdateObservations = (entry) => {
    const entries = entry.map(({resource: {id, category, code, valueQuantity, effectiveDateTime}}) => {
      return {id, category, code, valueQuantity, effectiveDateTime};
    });
    setObservations(prevState => [...prevState, ...entries]);
  };

  const mapAndUpdateMedicationRequests = (entry) => {
    const entries = entry.map(({resource: {id, medicationCodeableConcept, authoredOn}}) => {
      return {id, medicationCodeableConcept, authoredOn};
    });
    setMedicationRequests((prevState => [...prevState, ...entries]));
  };

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
        mapAndUpdateObservations(entry);
        fetchNextPage(link, fetchObservations);
      };
      return await fetchData(next, handleFetchedData, `${baseUrl}/Observation?patient=${id}`);
    };
    fetchObservations().then();
  }, [id]);

  useEffect(() => {
    const fetchMedicationRequests = async (next) => {
      const handleFetchedData = (entry, link) => {
        mapAndUpdateMedicationRequests(entry);
        fetchNextPage(link, fetchMedicationRequests);
      };
      return await fetchData(next, handleFetchedData, `${baseUrl}/MedicationRequest?patient=${id}`);
    };
    fetchMedicationRequests().then();
  }, [id]);

  const updateChart = (dataType) => {
    setChartTitle(dataType);
    const filtered = observations.filter(observation => observation.code.text === dataType)
        .filter(observation => !!startDate && new Date(observation.effectiveDateTime) >= new Date(startDate))
        .filter(observation => !!endDate && new Date(observation.effectiveDateTime) <= new Date(endDate));
    filtered.length && filtered[0].valueQuantity
        ? setTitleApplicable(true)
        : setTitleApplicable(false);
    const data = filtered
        .map(observation => {
          return {
            date: observation.effectiveDateTime.substr(0, 10),
            value: observation.valueQuantity ? Math.round(observation.valueQuantity.value * 100) / 100 : 0
          };
        });
    setChartData([...data]);
  };

  const filterChartByDate = ({fromDate, toDate}) => {
    if (fromDate) setStartDate(fromDate);
    if (toDate) setEndDate(toDate);
    updateChart(chartTitle);
  };

  return (
      <React.Fragment>
        <TopBar title={`${userData.firstName} ${userData.surname}`}/>
        <PatientCard
            firstName={userData.firstName}
            surname={userData.surname}
            birthDate={userData.birthDate}
            telecom={userData.telecom}/>
        <TimelinesContainer>
          <PatientDataTile width={60}>
            <TileTitle>Observations</TileTitle>
            <TimelineWrapper>
              <ObservationsTimeline observations={observations} onClick={updateChart}/>
            </TimelineWrapper>
          </PatientDataTile>
          <PatientDataTile width={40}>
            <TileTitle>Medication Requests</TileTitle>
            <TimelineWrapper>
              <MedicationRequestsTimeline medicationRequests={medicationRequests}/>
            </TimelineWrapper>
          </PatientDataTile>
          <PatientDataTile width={70}>
            <TileTitle>{chartData.length && titleApplicable ? chartTitle : `${chartTitle} - Not Applicable`}</TileTitle>ii
            <TimelineWrapper>
              <MedicalChart data={chartData}/>
            </TimelineWrapper>
            <DateSelection
                onFromChanged={filterChartByDate}
                onToChanged={filterChartByDate}/>
          </PatientDataTile>
        </TimelinesContainer>
      </React.Fragment>
  );
};

export default PatientDetailPage;