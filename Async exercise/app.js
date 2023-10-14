// #######################
// #
// #     Part One
// #
// ####################### 

const BaseURL = 'http://numbersapi.com';

let facts = {
    async randomFact() {
        let res = await axios.get(`${BaseURL}/20?json`);
        console.log(res);
    },

    async getFacts(nums) {
        let factsList = [];
        for (let i = 0; i < nums.length; i++) {
            let res = await axios.get(`${BaseURL}/${nums[i]}?json`);
            factsList.push(res.data.text)            
        }
        for (let fact of factsList) {
            $('body').append(`<h1>${fact}</h1>`)
        }
    },

    async fourFacts() {
        axios.get(`${BaseURL}/20?json`)
            .then((data) => {
                $('body').append(`<h1>${data.data.text}</h1>`)
                return axios.get(`${BaseURL}/20?json`)
            })
            .then((data) => {
                $('body').append(`<h1>${data.data.text}</h1>`)
                return axios.get(`${BaseURL}/20?json`)
            })
            .then((data) => {
                $('body').append(`<h1>${data.data.text}</h1>`)
                return axios.get(`${BaseURL}/20?json`)
            })
            .then((data) => {
                $('body').append(`<h1>${data.data.text}</h1>`)
                return axios.get(`${BaseURL}/20?json`)
            })
    }
}

// #######################
// #
// #     Part Two
// #
// ####################### 

let BaseURL2 = 'https://deckofcardsapi.com/api'

let deck = {
    async init() {
        let res = await axios.get(`${BaseURL2}/deck/new/shuffle`);
        console.log(res.data);
        this.deck_id = res.data.deck_id;
    },

    async drawCard() {
        let res = await axios.get(`${BaseURL2}/deck/${this.deck_id}/draw/?count=1`);
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);

        let img = new Image();
        img.src = res.data.cards[0].image;
        $('div').append(img);
    },

    async drawTwo() {
        let res = await axios.get(`${BaseURL2}/deck/${this.deck_id}/draw/?count=2`);
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
        console.log(`${res.data.cards[1].value} of ${res.data.cards[1].suit}`);
    }
}

$('#start').on('click', async function() {
    $(this).hide();
    await deck.init();
    deck.drawCard();
})

$('#hit').on('click', function() {
    deck.drawCard();
})
