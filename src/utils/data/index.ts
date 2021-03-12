import { Uniform, UniformId } from 'models/users';

type UniformData = { id: UniformId; name: Uniform; image: string }[];

export const uniformData: UniformData = [
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
