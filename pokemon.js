// FURTHER STUDY

// 1. Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.
const totalPokemonCount = 1050

$('#btn').on('click', async function(evt) {
    evt.preventDefault()
    $('#3-pokemon').empty()
    
    let allPokemon = []
    let resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${totalPokemonCount}?json`)
    for (let pokemon of resp.data.results) {
        allPokemon.push(pokemon)
    }

    // 2. Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.
    for (i = 0; i < 3; i++) {
        let rand = Math.ceil(Math.random() * totalPokemonCount)
        let randPokemon = allPokemon[rand]
        let pokemonInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randPokemon.name}/`)

        // 3. Store the name of the pokemon in a variable and then make another request, this time to that pokemon’s species URL (you should see a key of species in the data). Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English.
        let name = pokemonInfo.data.name
        let img = pokemonInfo.data.sprites.front_default
        let speciesURL = await axios.get(`${pokemonInfo.data.species.url}`)
        
        // BONUS Instead of relying on console.log, let’s create a UI for these random pokemon. Build an HTML page that lets you click on a button to generate data from three randomly chosen pokemon. Include the name of the pokemon, an image of the pokemon, and the description of its species which you found in 3.
        addPokemonToDOM(speciesURL, name, img)
    }
})

function addPokemonToDOM(speciesURL, name, img) {
    let flavorText = determineFlavorText(speciesURL)
    html = generatePokemonHTML(name, img, flavorText)
    $('#3-pokemon').append(html)
}

function determineFlavorText(speciesURL) {
    let flavorText
        console.log(speciesURL)
        for (let entry of speciesURL.data.flavor_text_entries) {
            if (entry.language.name === 'en' && !flavorText) {
                flavorText = entry.flavor_text
            }
        }
        return flavorText
}

function generatePokemonHTML(name, img, flavorText) {
    return `
    <div class="col-sm-6 col-lg-4">
        <div class="jumbotron-fluid bg-primary rounded p-2 my-2">
            <h1 class="display-6 text-center">${name}</h1>
            <p class="text-center"><img src="${img}" /></p>
            <hr class="my-4">
            <p class="text-center">${flavorText}</p>
        </div>
    </div>
    
    `
}