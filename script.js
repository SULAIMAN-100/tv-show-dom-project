//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  const mainEle = document.createElement('div');
  mainEle.id = 'main'
  rootElem.appendChild(mainEle)

  //creating eposides and display them with their names and summary.
  for (let i = 0 ; i < episodeList.length ; i++ ){
    divEle = document.createElement('div');
   divEle.id = 'episode'
   mainEle.appendChild(divEle)
   let titleEle = document.createElement('h1')
   titleEle.id = 'title'
   divEle.appendChild(titleEle)
   titleEle.innerText = 
   `${episodeList[i].name}-S${
     episodeList[i].season.toString().padStart(2, '0')}E${
     episodeList[i].number.toString().padStart(2, '0')}`
   let EpisodeImage = document.createElement('img')
      EpisodeImage.src = episodeList[i].image.medium;
   divEle.appendChild(EpisodeImage);
   let paraEle = document.createElement('div')
   paraEle.id = 'para'
   paraEle.innerHTML = episodeList[i].summary
   divEle.appendChild(paraEle)


  }
 // live seach 

  let list = document.querySelectorAll('#episode')
  let  arrayOfEpisodes = Array.from(list)
  //displaying numbers of Episodes
  const displaying = document.getElementById('displaying')
  displaying.innerText = `Displaying ${episodeList.length}/${episodeList.length}`
//function of live search
  const searchBar = document.forms['search'].querySelector('input');
  
  searchBar.addEventListener('keyup', function(e){
   const term = e.target.value.toLowerCase()
   arrayOfEpisodes.forEach(film=> {
         const movieText = film.innerHTML
      if(movieText.toLowerCase().indexOf(term) != -1){
        film.style.display = 'block'
      } else {
        film.style.display = 'none'
      }
    })
      //filter movies
    let show = arrayOfEpisodes.filter(f=> f.style.display === 'block')
    displaying.innerText = `Displaying ${show.length}/${episodeList.length}`
 })
     // Selection bar
     let selectionBar = document.getElementById('selection')
     let option = document.createElement('option')
     option.innerHTML = 'Select all movies'
     selectionBar.appendChild(option)
     //drop down list 
     episodeList.forEach(movie=> {
    const movieOption = document.createElement('option')
    movieOption.innerText = 
    `${movie.name}-S${
      movie.season.toString().padStart(2, '0')}E${
      movie.number.toString().padStart(2, '0')}`
    selectionBar.appendChild(movieOption)
     })
///function for select bar
     selectionBar.addEventListener('change', function(e){
     let select = e.target.value
     arrayOfEpisodes.forEach(movie=> {
     let selectHeading = movie.firstElementChild.innerText
     if(select === selectHeading || select === 'Select all movies') {movie.style.display = 'block'}
     else {movie.style.display = 'none'}
     });
     let show = arrayOfEpisodes.filter(f=> f.style.display === 'block')
     displaying.innerText = `Displaying ${show.length}/${episodeList.length}`
     })
     
}


window.onload = setup;



