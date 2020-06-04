import styled from 'styled-components';

export const TimelineWrapper = styled.div`
  max-height: 70vh;
  width: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  margin-right: 20px;
`;

export const TimelinesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PatientDataTile = styled.div`
  width: ${props => props.width}%;
`;

export const TileTitle = styled.h2`
  margin-left: 20px;
`;