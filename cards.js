// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
async function drawCard() {
    let resp = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
    let card = resp.data.cards[0]
    console.log(`${card.value} of ${card.suit}`)
}


// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
// Once you have both cards, console.log the values and suits of both cards.
async function drawCardAndAnother() {
    let cards = []

    let card1 = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
    cards.push(card1.data.cards[0])

    let deck_id = card1.data.deck_id

    let card2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    cards.push((card2.data.cards[0]))

    for (let card of cards) {
        console.log(`${card.value} of ${card.suit}`)
    }
}


// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.


// I also allowed for a reset button once all the cards are gone

let drawDeck
let drawnCard
$('#draw-btn').on('click', async function(evt) {
    evt.preventDefault()
    if (!drawDeck) {
        let resp = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
        drawnCard = resp.data.cards[0]
        drawDeck = resp.data.deck_id
        $('#card-div').append(`<img src=${drawnCard.image} />`)
    } else {
        let resp = await axios.get(`https://deckofcardsapi.com/api/deck/${drawDeck}/draw/?count=1`)

        if (!resp.data.success) {
            $('#card-div').empty()
            $('#card-div').append(`<h1 class="col-12text-center">All Cards Drawn!</h1>`)
            $('#card-div').append(`<button class="btn btn-dark"id="reshuffle-btn">Reshuffle Deck</button>`)
            $('#reshuffle-btn').on('click', function(evt) {
                evt.preventDefault()
                $('#card-div').empty()
                drawDeck = undefined
                drawnCard = undefined
            })
        } else {
            drawnCard = resp.data.cards[0]
            $('#card-div').empty()
            $('#card-div').append(`<img src=${drawnCard.image} />`)
        }

    }
})
