let searchResults
let filterResults = document.querySelector(".filter")
let container = document.querySelector(".album-container")
let resultsHeader = document.getElementById("header__results")
let searchBar = document.querySelector(".search-input")

// adding event listeners to the buttons 
document.querySelector(".search-btn").addEventListener("click", search)
document.querySelector(".search-input").
addEventListener("keyup", (e) => { e.key === "Enter" && search() })
document.querySelector(".sort-btn").addEventListener("click", Sort)
document.querySelector(".filter-btn").addEventListener("click", filterHandler)

  // This function  is checking to see if the user entered a valid search. Once a valid search input is put into the search bar, the search bar will grab the data from the API. Once the information is gathered, then it will call the "showAlbums" function to render the albums onto the page. 
function search() {
    if (searchBar.value === "") {
      alert("Please enter a valid search")  
    } else {
        resultsHeader.innerHTML = `<div class="spin"></div>`
        // Fetch response from API
        fetch(`https://itunes.apple.com/search?term=${searchBar.value}&media=music&entity=album&attribute=artistTerm&limit=200`)
        // get data and turn it into a json 
            .then(res => res.json())
            //take the json data and return the data.results. turn data.results into a variable called "Albums"
            .then(data => 
                albums = data.results) 
                //put the ablums variable in the "showAlbums" function
            .then(albums => showAlbums()) 
    }
}


// this clears all older entries 
function clearContainer() {
    allAlbumsContainer.textContent = ""
}


// This function displays all albums related to search
function showAlbums() {

    clearContainer();

    document.getElementById("tools").hidden = false;
    document.getElementById("tools").style.display = "flex";
    
    container.textContent = ""
    albums.length == 0 ?
        resultsHeader.innerText = `No results for ${searchBar.value}` :
        resultsHeader.innerText = `${albums.length} results for ${searchBar.value}`
    albums.forEach(album => {

    // Creating elements to hold data 
        let albumCover = document.createElement("img") 
        let albums = document.createElement("section")
        let artistName = document.createElement("h1") 
        let albumName = document.createElement("h3")
        let albumPrice = document.createElement("p") 
    // Appending data to elements
        let albumInfo = container.appendChild(albums)
        albumInfo.appendChild(artistName).innerText = album.artistName
        albumInfo.appendChild(albumName).innerText = album.collectionName
        albumInfo.appendChild(albumCover).src = album.artworkUrl60
        albumInfo.appendChild(albumPrice).innerText = `$${album.collectionPrice}`
        albumInfo.className = "card"
    });
}


function Sort (e) {

    function sortHandler(e) {

        // first time sort is pressed it sorts by price --- after that it sorts by name 
        if (document.querySelector("#header___sort-btn").innerText === "Sort price") {
            allAlbums.sort((a, b) => (parseInt(a.collectionPrice) - parseInt(b.collectionPrice)))
            document.querySelector("#header___sort-btn").innerText = "Sort name"
            displayAlbums()
        }
        else {
            allAlbums.sort((a, b) => a.collectionName.localeCompare(b.collectionName))
            document.querySelector("#header___sort-btn").innerText = "Sort price"
            displayAlbums()
        }
    }
    document.querySelector("#header___sort-btn").addEventListener("click", sortHandler)

    ///Rework the allAlbums array then call the showAlbums  function to rerender
}