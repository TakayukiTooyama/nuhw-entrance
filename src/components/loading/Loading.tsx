import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { VFC } from 'react';

const load = keyframes`
  50% {
    width: 5px;
    margin-right: 95px;
    opacity: .1;
  }
`;

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -10px;
  text-align: center;
  font-family: Arial;
  font-weight: bold;
  span {
    display: block;
    background: #000;
    width: 100px;
    height: 5px;
    margin-top: 5px;
    animation: ${load} 2s infinite;
    border-radius: 5px;
    &:nth-child(2) {
      animation-delay: 100ms;
    }
    &:nth-child(3) {
      animation-delay: 200ms;
    }
  }
`;

const Loading: VFC = () => {
  return (
    <Container>
      <span></span>
      <span></span>
      <span></span>
      <p>LOADING</p>
    </Container>
  );
};

export default Loading;
