const words = ['Beachball', 'Rodeo', 'Angel',
  'Aardvark', 'Xylophone', 'November', 'Chocolate',
  'Papaya', 'Uniform', 'Joker', 'Clover', 'Bali'
];
//
// const longWords = words.reduce((a, w) => w.length > 6 ? a + ' ' + w : a, '').trim();
// // longWords: "Beachball Aardvark Xylophone November Chocolate Uniform"
//
// console.log(longWords);

// Use filter and join instead of reduce
const filtLongWords = words.filter(char => char.length > 6).join(' ');

console.log(filtLongWords);
