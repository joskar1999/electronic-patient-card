import React from 'react';
import { Icon, Timeline } from 'rsuite';

const ObservationsTimeline = ({observations}) => {
  return (
      <Timeline className="observations-timeline">
        {observations.map(observation => {
          return (
              <Timeline.Item key={observation.id} dot={<Icon icon={'observation-icon'} size="2x"/>}>
                <p>{observation.effectiveDateTime.substring(0, 10)}</p>
                <p>{observation.category[0].coding[0].display} / {observation.code.text} / {observation.valueQuantity ? Math.round(observation.valueQuantity.value * 100) / 100 : ''}</p>
              </Timeline.Item>
          );
        })}
      </Timeline>
  );
};

export default ObservationsTimeline;