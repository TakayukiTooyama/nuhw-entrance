import {
  FemaleUniform,
  FemaleUniformId,
  MaleUniform,
  MaleUniformId,
} from 'models/users';

export type MaleUniformData = {
  id: MaleUniformId;
  name: MaleUniform;
  image: string;
}[];

export type FemaleUniformData = {
  id: FemaleUniformId;
  name: FemaleUniform;
  image: string;
}[];

export const maleUniformData: MaleUniformData = [
  {
    id: 'windBreakerUp',
    name: 'ウィンドブレーカー上',
    image: '/Images/uniform/windBreakerUp.jpg',
  },
  {
    id: 'windBreakerDown',
    name: 'ウィンドブレーカー下',
    image: '/Images/uniform/windBreakerDown.jpg',
  },
  {
    id: 'jerseyUp',
    name: 'ジャージ上',
    image: '/Images/uniform/jerseyUp.jpg',
  },
  {
    id: 'jerseyDown',
    name: 'ジャージ下',
    image: '/Images/uniform/jerseyDown.jpg',
  },
  {
    id: 'runningShirt',
    name: 'ランシャツ',
    image: '/Images/uniform/runningShirt.jpg',
  },
  {
    id: 'runningPants',
    name: 'ランパン',
    image: '/Images/uniform/runningPants.jpg',
  },
  {
    id: 'whiteTights',
    name: 'タイツ(白)',
    image: '/Images/uniform/whiteTights.jpg',
  },
  {
    id: 'halfPants',
    name: 'ハーフパンツ',
    image: '/Images/uniform/halfPants.jpg',
  },
  {
    id: 'poloShirt',
    name: 'ポロシャツ',
    image: '/Images/uniform/poloShirt.jpg',
  },
  {
    id: 'navyPinkTshirt',
    name: '紺ピンクTシャツ',
    image: '/Images/uniform/navyPinkTshirt.jpg',
  },
  {
    id: 'lightBlueTshirt',
    name: '水色Tシャツ',
    image: '/Images/uniform/lightBlueTshirt.jpg',
  },
];
export const femaleUniformData: FemaleUniformData = [
  {
    id: 'windBreakerUp',
    name: 'ウィンドブレーカー上',
    image: '/Images/uniform/windBreakerUp.jpg',
  },
  {
    id: 'windBreakerDown',
    name: 'ウィンドブレーカー下',
    image: '/Images/uniform/windBreakerDown.jpg',
  },
  {
    id: 'jerseyUp',
    name: 'ジャージ上',
    image: '/Images/uniform/jerseyUp.jpg',
  },
  {
    id: 'jerseyDown',
    name: 'ジャージ下',
    image: '/Images/uniform/jerseyDown.jpg',
  },
  {
    id: 'runningShirt',
    name: 'ランシャツ',
    image: '/Images/uniform/runningShirt.jpg',
  },
  {
    id: 'runningPants',
    name: 'ランパン',
    image: '/Images/uniform/runningPants.jpg',
  },
  {
    id: 'separateTop',
    name: 'セパレートトップ',
    image: '/Images/uniform/separateTop.jpg',
  },
  {
    id: 'separateShorts',
    name: 'セパレートショーツ',
    image: '/Images/uniform/separateShorts.jpg',
  },
  {
    id: 'navyPinkTights',
    name: 'タイツ(紺ピンク) 12cm',
    image: '/Images/no-image.png',
  },
  {
    id: 'halfPants',
    name: 'ハーフパンツ',
    image: '/Images/uniform/halfPants.jpg',
  },
  {
    id: 'poloShirt',
    name: 'ポロシャツ',
    image: '/Images/uniform/poloShirt.jpg',
  },
  {
    id: 'navyPinkTshirt',
    name: '紺ピンクTシャツ',
    image: '/Images/uniform/navyPinkTshirt.jpg',
  },
  {
    id: 'lightBlueTshirt',
    name: '水色Tシャツ',
    image: '/Images/uniform/lightBlueTshirt.jpg',
  },
];
