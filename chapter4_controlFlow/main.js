// Crown and Anchor. 19th-century salilors betting game.

let funds = 50; // starting conditions

while (funds > 1 && funds < 100) {
  // place bets
  const bets = { crown: 0, anchor: 0, heart: 0,
    spade: 0, club: 0, diamond: 0, };

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

  // roll dice
  // collect winnings (if any)
}

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
