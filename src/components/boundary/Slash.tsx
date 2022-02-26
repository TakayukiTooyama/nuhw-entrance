import styled from '@emotion/styled';
import type { VFC } from 'react';

const Polygon = styled.polygon`
  opacity: 1;
`;

const Svg = styled.svg`
  display: block;
  height: '100px';
`;

export const Slash: VFC = () => (
  <Svg viewBox="0 0 1600 200">
    <polygon fill="#fff" points="-4,24 800,198 1604,24 1604,204 -4,204" />
    <Polygon
      fill="#95a5a6"
      points="-4,0 800,198 1604,0 1604,11.833 800,198 -4,12 "
    />
    <Polygon
      fill="#d2d7d3"
      points="-4,12 -4,24 800,198 1604,24 1604,11.833 800,198 "
    />
  </Svg>
);
