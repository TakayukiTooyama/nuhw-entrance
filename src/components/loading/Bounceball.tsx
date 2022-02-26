import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import type { VFC } from 'react';

const bounce = keyframes`
  0% {
    top: 30px;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    transform: scaleX(2);
  }
  35% {
    height: 15px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0;
  }
`;

const Wrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Text = styled.div`
  color: #fbae17;
  display: inline-block;
  margin-left: 5px;
  font-size: 20px;
`;

const Bounceball = styled.div`
  position: relative;
  display: inline-block;
  height: 37px;
  width: 30px;
  &:before {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #fbae17;
    transform-origin: 50%;
    animation: ${bounce} 500ms alternate infinite ease;
  }
`;

export const BounceballLoading: VFC = () => (
  <Wrap>
    <Bounceball />
    <Text>NOW LOADING</Text>
  </Wrap>
);
