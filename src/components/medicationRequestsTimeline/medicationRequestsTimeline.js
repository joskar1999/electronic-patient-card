import React from 'react';
import { Icon, Timeline } from 'rsuite';

const MedicationRequestsTimeline = ({medicationRequests}) => {
  return (
      <div>
        <Timeline className="medication-requests-timeline">
          {medicationRequests.map(medicationRequest => {
            return (
                <Timeline.Item
                    key={medicationRequest.id}
                    dot={<Icon icon={'observation-icon'} size="2x"/>}>
                  <p>{medicationRequest.authoredOn.substr(0, 10)}</p>
                  <p>{medicationRequest.medicationCodeableConcept.text}</p>
                </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
  );
};

export default MedicationRequestsTimeline;