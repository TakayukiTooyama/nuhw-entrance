import { Uniform, UniformId } from 'models/users';

type UniformData = { id: UniformId; name: Uniform }[];

export const uniformData: UniformData = [
  { id: 'windBreakerUp', name: 'ウィンドブレーカー上' },
  { id: 'windBreakerDown', name: 'ウィンドブレーカー下' },
  { id: 'jerseyUp', name: 'ジャージ上' },
  { id: 'jerseyDown', name: 'ジャージ下' },
  { id: 'runningShirt', name: 'ランシャツ' },
  { id: 'runningPants', name: 'ランパン' },
  { id: 'halfPants', name: 'ハーフパンツ' },
  { id: 'whiteTights', name: 'タイツ(白)' },
  { id: 'poloShirt', name: 'ポロシャツ' },
  { id: 'navyPinkTshirt', name: '紺ピンクTシャツ' },
  { id: 'lightBlueTshirt', name: '水色Tシャツ' },
];
