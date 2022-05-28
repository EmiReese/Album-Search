let searchResults
let filterResults = document.querySelector(".filter")
let container = document.querySelector(".album-container")
let resultsHeader = document.getElementById("header__results")
let searchBar = document.querySelector(".search-input")

/// Makes sure theres a valid input
function checksForValidInput() {
    if (searchBar.value === "") {
      alert("Please enter a valid search")  
    } else {
        resultsHeader.innerHTML = `<div class="spin"></div>`

        fetch(`https://itunes.apple.com/search?term=${searchBar.value}&media=music&entity=album&attribute=artistTerm&limit=200`)
            .then(res => res.json())
            .then(data => albums = data.results) 
            .then(albums => showAlbums()) 
    }
}


function showAlbums() {
  
    container.textContent = ""
    albums.length == 0 ?
        resultsHeader.innerText = `No results for ${searchBar.value}` :
        resultsHeader.innerText = `${albums.length} results for ${searchBar.value}`
    albums.forEach(album => {

    
        let albumCover = document.createElement("img") 
        let albums = document.createElement("section")
        let artistName = document.createElement("h1") 
        let albumName = document.createElement("h3")
        let albumPrice = document.createElement("p") 

        let albumInfo = container.appendChild(albums)
        albumInfo.appendChild(albumName).innerText = album.collectionName
        albumInfo.appendChild(albumCover).src = album.artworkUrl60
        albumInfo.appendChild(albumPrice).innerText = `$${album.collectionPrice}`
        albumInfo.className = "card"
    });
}

document.querySelector(".search-btn").addEventListener("click", checksForValidInput)
document.querySelector(".search-input").addEventListener("keyup", (e) => { e.key === "Enter" && checksForValidInput() })
document.querySelector(".sort-btn").addEventListener("click", sortHandler)
document.querySelector(".filter-btn").addEventListener("click", filterHandler)

