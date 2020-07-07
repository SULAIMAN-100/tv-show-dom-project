function setup() {
  var allShows = getAllShows()
 var sortedShows =  allShows.sort((a, b) => a.name.localeCompare(b.name))
  selectionOfShows(sortedShows)
  listOfShowsProfiles(sortedShows)
}

//---------make a home button ---------//////
let homeBtn = document.getElementById('homeBtn')
homeBtn.addEventListener('clicked', setup)
const rootElem = document.getElementById("root");
const mainEle = document.createElement('div');
mainEle.id = 'main'
rootElem.appendChild(mainEle)

/////////////////////////----Create list of shows for selection element----///////////////////////////////////
let selectionBarForShow = document.querySelector('.select')
const searchBar = document.forms['search-bar'].querySelector('input');
function selectionOfShows(orderedShowList){
  let option = document.createElement('option')
  option.innerHTML = 'SELECT A SHOW'
  selectionBarForShow.appendChild(option)
  orderedShowList.forEach(show=> { 
   const showOption = document.createElement('option')
   showOption.innerText = show.name
   showOption.value = show.id
   selectionBarForShow.appendChild(showOption)
  
  })
}

   //////////-------list of Shows profiles--------------->
function listOfShowsProfiles(orderedShows){
  displayingNumOfEpisodes(orderedShows, orderedShows, 'SHOW/S')

 ///////////////////////////////////////////////////////////
 orderedShows.forEach(show=> {
  let showProfile = document.createElement('div')
  showProfile.id = 'show-profile'
  let inShowProfile = document.createElement('div')
  inShowProfile.id = 'inShowProfile'
  let title = document.createElement('h1')
  title.id = 'show-title'
  title.innerText = show.name
  let showImage = document.createElement('img')
  if(show.image){
    showImage.src = show.image.medium
  } else {
    showImage.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'
  }
  let showSummary = document.createElement('p')
  showSummary.innerHTML = show.summary
  showImage.className = 'showImage'
  showImage.value = show.id
  let showDiscription = document.createElement('div')
  let showRate = document.createElement('p')
  let showGener = document.createElement('p')
  let showStatus = document.createElement('p')
  let showRuntime = document.createElement('p')
let replaceComma = show.genres.toString().replace(/,/g, "|")
  showRate.innerHTML = 'Rated: ' + show.rating.average
  showGener.innerHTML = 'Gener: ' + replaceComma
  showStatus.innerHTML = 'Status: ' + show.status
  showRuntime.innerHTML = 'Runtime: ' + show.runtime
 let sticker = document.createElement('div')
 sticker.id = 'showSticker'
 sticker.appendChild(title)
 sticker.appendChild(showImage)
 inShowProfile.appendChild(sticker)
  inShowProfile.appendChild(showSummary)
  showDiscription.appendChild(showRate)
  showDiscription.appendChild( showGener)
  showDiscription.appendChild(showStatus )
  showDiscription.appendChild(showRuntime)
  inShowProfile.appendChild(showDiscription)
  showProfile.appendChild(inShowProfile)
  mainEle.appendChild(showProfile)
  showImage.addEventListener('click', function (){

    let url = `https://api.tvmaze.com/shows/${showImage.value}/episodes`
    fetch(url)
    .then((response)=> response.json())
    .then((data)=> {
     let allEpisodes = data
        makePageForEpisodes(allEpisodes);
    })
    .catch(error=>console.log(error))
   })
  
  })
  filterShows()

}


   ///////////////////function for live search filters the shows
   function filterShows(){
    let showList = document.querySelectorAll('#show-profile')
    let arrayOfShows = Array.from(showList)
    searchBar.addEventListener('keyup', showSelection)
    function showSelection(e){
      searchBar.innerHTML = ''
     const term = e.target.value.toLowerCase()
     arrayOfShows.forEach(film=> {
           const movieText = film.innerHTML
        if(movieText.toLowerCase().indexOf(term) != -1 ){
          film.style.display = 'block'
        } else {
          film.style.display = 'none'
        }
      })
      displayingNumOfEpisodes(filterMovies(arrayOfShows), arrayOfShows,'SHOW/S')
    }
   }
////////////// fetching urls from the show list
selectionBarForShow.addEventListener('change', function (){
  let url = `https://api.tvmaze.com/shows/${selectionBarForShow.value}/episodes`
  fetch(url)
  .then((response)=> response.json())
  .then((data)=> {
   let allEpisodes = data
      makePageForEpisodes(allEpisodes);
  })
  .catch(error=>console.log(error))
})
///////////////////////////////////////////////////////////////
  //////////////// displaying numbers of existing number of shows/episodes
  function displayingNumOfEpisodes(num, total, name){
    const displaying = document.getElementById('displaying')
    displaying.innerText = `FOUND (${num.length}/${total.length}) ${name}`
}

///////////// filter for the displaying function to filter search out of total number
function filterMovies(num){
  return num.filter(film=> film.style.display === 'block')
}
///////////////////////////////////////////////////////////////
////------------create a select for the list of episodes----------->
let searchArea = document.getElementById('search-bar')
let selectionBar = document.createElement('select')
selectionBar.id = 'Episodes-selection'
searchArea.appendChild(selectionBar)
selectionBar.style.display = 'none'
function makePageForEpisodes(episodeList) {
  selectionBar.style.display = 'block'
  mainEle.innerHTML = ''
//creating eposides and display them with their names and summary.
 function createEpisode(){
  episodeList.forEach((episode)=>{
  episodeFrame = document.createElement('div')
  episodeFrame.id = 'episode'
  mainEle.appendChild(episodeFrame)
  let episodeTitle = document.createElement('h1')
  episodeTitle.id = 'title'
  episodeFrame.appendChild(episodeTitle)
  episodeTitle.innerText = nameOfEpisodes(episode)
  let EpisodeImage = document.createElement('img')
  if(episode.image){
    EpisodeImage.src = episode.image.medium
  } else {
    EpisodeImage.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'
  }

  episodeFrame.appendChild(EpisodeImage)
  let episodeSummary = document.createElement('div')
  episodeSummary.id = 'para'
  if(episode.summary){ episodeSummary.innerHTML = episode.summary}
  else{episodeSummary.innerHTML = 'Sorry there is no summary to this episode'}

  episodeFrame.appendChild(episodeSummary)
  });
}
createEpisode()
displayingNumOfEpisodes(episodeList, episodeList, 'EPISODE/S')
  ////// create the name of the episodes with added zero
  function nameOfEpisodes(film){
    return`${film.name}-S${
      film.season.toString().padStart(2, '0')}E${
      film.number.toString().padStart(2, '0')}`
  }

 ///////////// live seach for episodes--------->
 let list = document.querySelectorAll('#episode')
 let arrayOfEpisodes = Array.from(list)
     ///////////////////function of live search
  searchBar.addEventListener('keyup', episodesSelection)
   
  function episodesSelection(e){
    searchBar.innerHTML = ''
   const term = e.target.value.toLowerCase()
   arrayOfEpisodes.forEach(film=> {
         const movieText = film.innerHTML
      if(movieText.toLowerCase().indexOf(term) != -1 ){
        film.style.display = 'block'
      } else {
        film.style.display = 'none'
      }
    })
    displayingNumOfEpisodes(filterMovies(arrayOfEpisodes), episodeList, 'EPISODE/S')
 }

     ///////// Selection bar for episodes ------>
     selectionBar.innerHTML = ''
     let option = document.createElement('option')
     option.innerHTML = 'Select all episodes'
     selectionBar.appendChild(option)
     ///////////////drop down list 
     episodeList.forEach(movie=> {
    const movieOption = document.createElement('option')
    movieOption.innerText = nameOfEpisodes(movie)
    selectionBar.appendChild(movieOption)
     })
      
     //////////function for episodes selection 
    selectionBar.addEventListener('change', function(e){   
     let select = e.target.value
     arrayOfEpisodes.forEach(movie=> {
     let selectHeading = movie.firstElementChild.innerText
     if(select === selectHeading || select === 'Select all episodes') {movie.style.display = 'block'}
     else {movie.style.display = 'none'}
     });
     
    displayingNumOfEpisodes(filterMovies(arrayOfEpisodes), episodeList)
     })

}


window.onload = setup;



