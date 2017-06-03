// This version will count how many times the sailor looses before winning once

// helper functions:

// returns a random integer in the range [m, n] (inclusive)
function rand(m, n) {
  return m + Math.floor((n - m + 1) * Math.random());
}

// randomly return a string representing one of the six
// Crown and Anchor faces
function randFace() {
  return ['crown', 'anchor', 'heart', 'spade', 'club', 'diamond']
    [rand(0, 5)];
}

// function that plays a game every time we call it
function playGame() {
  // Crown and Anchor. 19th-century salilors betting game.

  // control flow
  let funds = 50; // starting conditions
  let round = 0;

  while (funds > 0 && funds < 100) {
    round++;
    console.log(`round ${round}:`);
    console.log(`	starting funds: ${funds}p`);

    // place bets
    const bets = { crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0, };
    let totalBet = rand(1, funds);
    if (totalBet === 7) {
      totalBet = funds;
      bets.heart = totalBet;
    } else {
      // distribute total bet
      let remaining = totalBet;
      do {
        let bet = rand(1, remaining);
        let face = randFace();
        bets[face] = bets[face] + bet;
        remaining = remaining - bet;
      } while (remaining > 0);
    }

    funds = funds - totalBet;
    console.log('\tbets: ' +
      Object.keys(bets).map(face => `${face}: ${bets[face]} pence`).join(', ') +
      ` (total: ${totalBet} pence)`);

    // roll dice
    const hand = [];
    for (let roll = 0; roll < 3; roll++) {
      hand.push(randFace());
    }

    console.log(`	hand: ${hand.join(', ')}`);

    // collect winnings
    let winnings = 0;
    for (let die = 0; die < hand.length; die++) {
      let face = hand[die];
      if (bets[face] > 0) winnings = winnings + bets[face];
    }

    funds = funds + winnings;
    console.log(`	winnings: ${winnings}`);
  }

  console.log(`	ending funs: ${funds}`);

  if (funds < 1) {
    return { won: false, rounds: round };
  } else {
    return { won: true, rounds: round };
  }
}

function playTillWin() {
  let matches = [];
  let result;
  do {
    result = playGame();
    matches.push(result.rounds);
  } while (result.won === false);

  let sum = matches.reduce(function (a, b) {
    return a + b;
  }, 0);

  let avg = sum / matches.length;

  console.log(` we played: ${matches.length} games`);
  console.log(` with an average of: ${avg} rounds`);

  let sumOfSqDiff = matches.reduce(function (acc, xi) {
    return (xi - avg) * (xi - avg) + acc;
  }, 0);

  let stdDeviation = Math.sqrt(sumOfSqDiff / matches.length);

  console.log(` the std deviation is: ${stdDeviation}`);

  // console.log(matches);
  let freq = {};
  matches.forEach(function (elem) {
    let key = elem.toString();
    freq[key] = (freq[key] || 0) + 1;
  });

  console.log(freq);
}

playTillWin();
