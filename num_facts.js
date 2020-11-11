// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API.
async function getNumFact(num) {
    let res = await axios.get(`http://numbersapi.com/${num}?json`)
    console.log(res.data.text)
}

// Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

facts = document.querySelector('#num-facts')

async function getMultNumFacts(min, max) {
    let res = await axios.get(`http://numbersapi.com/${min}..${max}?json`)
    for (let i = min; i <= max; i++) {
        heading = document.createElement('h1')
        facts.appendChild(heading)
        heading.innerText = `Number: ${i}`
        numFact = document.createElement('p')
        facts.appendChild(numFact)
        numFact.innerText = `${res.data[i]}`
    }
}

// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
async function getFourFacts(num) {
    favNumFacts = []
    for (let i = 0; i < 4; i++) {
        res = await axios.get(`http://numbersapi.com/${num}?json`)
        favNumFacts.push(res)
    }
    heading = document.createElement('h1')
    facts.appendChild(heading)
    heading.innerText = `4 Facts About the number ${num}`
    factsList = document.createElement('ul')
    facts.appendChild(factsList)

    for (let fact of favNumFacts) {
        li = document.createElement('li')
        factsList.append(li)
        li.innerText = `${fact.data.text}`
    }
}
