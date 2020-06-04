import styled from 'styled-components';

export const TimelineWrapper = styled.div`
  max-height: 75vh;
  width: 30%;
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