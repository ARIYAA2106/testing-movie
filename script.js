const API_KEY = "5f028727b3bae688e81ac1f641d66db4"; //API_KEY THE MOVIESDB

let page = 1;
const API_URL =()=> `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}` //variabel url dari API KEY + PAGE
const API_IMAGE_URL = "https://image.tmdb.org/t/p/w1280" //API image dari the moviedb
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

async function getMovies(url) {
  const respon = await fetch(url)
  const data = await respon.json()
  showMovies(data.results); //memanggil variabel function dari showMovies
}

//Pagination
function nextPage(){
  if(page>=1){
  page ++;
  updatePage()
  }
}
function prevPage(){
  if(page>1){
  page --;
  updatePage()
  } 
}
next.addEventListener("click", ()=>{
  nextPage()
})
prev.addEventListener("click", ()=>{
  prevPage()
})

//Update Page
function updatePage(){
  getMovies(API_URL())
  currentPage.innerHTML = page
}

function showMovies(movies) {
  moviesElement.innerHTML = ''                       //panggil id data dari HTML 
  movies.forEach((movie) => {                       //mapping ( LOOPING PERULANGAN )
    const { title, poster_path, overview, popularity, vote_average } = movie; //variabel dengan nilai ambil data dari movie
    const movieCard = document.createElement('div') //Variabel menanampung element dari div
    movieCard.classList.add("movie")                //Styling / membuat class

//Memunculkan + styling kedalam halaman HTML
    movieCard.innerHTML = `                 
    <img src="${API_IMAGE_URL + poster_path}" alt="HTML THE MOVIE IMAGE"/>
    <div class="detail">
    <h3>${title}</h3>
    <p>${overview.substring(0,150)}....</p> <br/><hr>
    <p>Popularity :${popularity}% <br/> Vote Avg :${vote_average}</p>
    </div>`         
    moviesElement.appendChild(movieCard)              //mengisi anak ke parents
  })
}

//form search
// use submit
searchForm.addEventListener("submit",(event)=>{
  event.preventDefault()
  const searchQuery = search.value

  if(searchQuery !==''){
    getMovies(API_SEARCH_URL + searchQuery)
    search.value=''
  }
})

//title
title.addEventListener("click", ()=>{
  location.reload()
})
updatePage()


