class CardDeck {
  deck = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
  preCards = [];
  postCards = [];

  useCard(cardNo) {
    this.preCards.unshift()
  }

  shuffle() {
    return this.deck.map(function (n) {
      return [Math.random(), n]
    }).sort().map(function (n) {
      return n[1]
    });
  }
}