const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export const games = [
  { id: 'game1', image: asset('assets/images/game1.png'), url: 'https://flappybird.io/', enabled: true },
  { id: 'game2', image: asset('assets/images/game2.jpeg'), url: 'https://gridland.doublespeakgames.com/', enabled: true },
  { id: 'game3', image: asset('assets/images/1.png'), enabled: false },
  { id: 'game4', image: asset('assets/images/2.png'), enabled: false },
  { id: 'game5', image: asset('assets/images/3.png'), enabled: false }
];

export const providers = [
  { name: 'PG전자', image: asset('assets/images/4.png') },
  { name: 'PRAGMATIC PLAY', image: asset('assets/images/5.png') }
];

export const featuredGame = {
  titleKey: 'feature',
  subKey: 'featureSub',
  image: asset('assets/images/6.png')
};
