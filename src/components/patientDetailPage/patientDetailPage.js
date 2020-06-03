import React from 'react';
import { useParams } from 'react-router-dom';

const PatientDetailPage = (props) => {
  const {id} = useParams();
  debugger;
  return (
      <div>
        {id}
      </div>
  );
};

export default PatientDetailPage;