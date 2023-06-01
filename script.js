let currentPageUrl = 'https://swapi.dev/api/people'

window.onload = async() => {
  try{
    await loadCharacters(currentPageUrl);
  }catch(error){
     console.log(err)
     alert('Erro ao carregar cards')
  }
  const nextButton = document.getElementById('next-button')
  const backButton = document.getElementById('back-button')

  nextButton.addEventListener('click', loadNextPage)
  backButton.addEventListener('click', loadBeforePage)
}

async function loadCharacters(url) {
  const mainContent = document.getElementById('main-content')
  mainContent.innerHTML = '' // Limpar resultados anteriores

  try{
    const response = await fetch(url)
    const responseJson = await response.json();

    responseJson.results.forEach((character) => {
      const card = document.createElement('div')
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
      card.className = 'cards'

      const characterNameBG = document.createElement('div')
      characterNameBG.className = 'character-name-bg'

      const characterName = document.createElement('span')
      characterName.className = 'character-name'
      characterName.innerText = `${character.name}`

      characterNameBG.appendChild(characterName)
      card.appendChild(characterNameBG)
      
      mainContent.appendChild(card)

      card.onclick = () => {
        const modal = document.getElementById('modal')
        modal.style.visibility = 'visible'

        const modalContent = document.getElementById('modal-content')
        modalContent.innerHTML = '';

        const characterImage = document.createElement('div')
        characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
        characterImage.className = 'character-image'
        modalContent.appendChild(characterImage)

        const characterName = document.createElement('span')
        characterName.className = 'character-details'
        characterName.innerText = `Nome: ${character.name}`
        modalContent.appendChild(characterName)

        const characterHeight = document.createElement('span')
        characterHeight.className = 'character-details'
        characterHeight.innerText = `Altura: ${heightFormater(character.height)}`
        modalContent.appendChild(characterHeight)

        const characterMass = document.createElement('span')
        characterMass.className = 'character-details'
        characterMass.innerText = `Peso: ${massFormater(character.mass)}`
        modalContent.appendChild(characterMass)

        const characterEyeColor = document.createElement('span')
        characterEyeColor.className = 'character-details'
        characterEyeColor.innerText = `Cor do olho: ${FormatEyeColor(character.eye_color)}`
        modalContent.appendChild(characterEyeColor)

        const characterGender = document.createElement('span')
        characterGender.className = 'character-details'
        let gender = character.gender
        let generoFormatado;
        if(gender === 'male') generoFormatado = 'Masculino'
        else if(gender === 'female') generoFormatado = 'Feminino'
        else if(gender === 'hermaphrodite') generoFormatado = 'Hermafrodita'
        else generoFormatado = 'Desconhecido'
        characterGender.innerText = `Gênero: ${generoFormatado}`
        modalContent.appendChild(characterGender)

        const characterBirthYear = document.createElement('span')
        characterBirthYear.className = 'character-details'
        characterBirthYear.innerText = `Data de aniversário: ${character.birth_year === 'unknown'? 'Desconhecida' : character.birth_year}`
        modalContent.appendChild(characterBirthYear)
      }


    });
    
    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.style.visibility = responseJson.next? 'visible' : 'hidden'
    backButton.style.visibility = responseJson.previous? 'visible' : 'hidden'

    currentPageUrl = url
  
  } catch(error){
    window.alert('Erro ao carregar os personagens')
  }
}

async function loadNextPage(){
  try{
    const response = await fetch(currentPageUrl)
    const responseJson = await response.json();

    await loadCharacters(responseJson.next)

  } catch(error){
    console.log(error)
    alert('Erro ao carregar próxima página!')
  }
}

async function loadBeforePage(){
  try{
    const response = await fetch(currentPageUrl)
    const responseJson = await response.json();

    await loadCharacters(responseJson.previous)

  } catch(error){
    console.log(error)
    alert('Erro ao carregar página anterior!')
  }
}

function hideModal(){
  modal.style.visibility = 'hidden'
}

function FormatEyeColor(eyeColor){
  const cores = {
    blue: "Azul",
    brown: 'Castanho',
    green: 'Verde',
    yellow: 'Amarelo',
    black: 'Preto',
    pink: 'Rosa',
    red: 'Vermelho',
    orange: 'Laranja',
    hazel: 'Avelã',
    unknown: 'Desconhecida'
  }
  return cores[eyeColor.toLowerCase()] || eyeColor.charAt(0).toUpperCase() + eyeColor.toLowerCase().slice(1)
}

function heightFormater(height){
  if(height === 'unknown') return 'Desconhecida'
  else return (height / 100).toFixed(2)
}

function massFormater(mass){
  if(mass === 'unknown') return 'Desconhecido'
  else return `${mass} kg`
}


