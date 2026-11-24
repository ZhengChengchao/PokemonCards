const getCardImage = (number) => {
  return (
    'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/' +
    'SV3pt5_EN_' + number + '-2x.png'
  );
};

const datasource = [
  {
    title: 'Electric',
    icon: 'bolt',
    bgColor: '#FFF0BE',
    iconColor: '#9B7414',
    data: [
      {
        key: '1',
        name: 'Pikachu',
        number: '25',
        image: getCardImage('25'),
      },
      {
        key: '2',
        name: 'Voltorb',
        number: '100',
        image: getCardImage('100'),
      },
    ],
  },
  {
    title: 'Fire',
    icon: 'fire',
    bgColor: '#FFE1D6',
    iconColor: '#BA5C3F',
    data: [
      {
        key: '3',
        name: 'Charmander',
        number: '4',
        image: getCardImage('4'),
      },
      {
        key: '4',
        name: 'Growlithe',
        number: '58',
        image: getCardImage('58'),
      },
    ],
  },
];

export { datasource, getCardImage };
