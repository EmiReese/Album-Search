let searchResults
let filterResults = document.querySelector(".filter")
let container = document.querySelector(".album-container")
let resultsHeader = document.getElementById("header__results")
let searchBar = document.querySelector(".search-input")
const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    document.getElementsByClassName('.card').classList.toggle('dark');
})
// adding event listeners to the buttons 
document.querySelector(".search-btn").addEventListener("click", search)
document.querySelector(".search-input").
addEventListener("keyup", (e) => { e.key === "Enter" && search() })
// document.querySelector(".sort-btn").addEventListener("click", Sort)
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


// This function displays all albums related to search
function showAlbums() {
    albums.length == 0 ?
        resultsHeader.innerText = `No results for ${searchBar.value}` :
        resultsHeader.innerText = `${albums.length} results for ${searchBar.value}`
        resultsHeader.className= "resultsHeader"
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

        // Delete Button
        let deleteButton = albumInfo.appendChild(document.createElement("button"))
        deleteButton.addEventListener("click", deleteHandler)
        deleteButton.innerText = "delete"
        deleteButton.id = album.collectionId

        // Edit Button 
        //create button
        let editButton = albumInfo.appendChild(document.createElement("button"))
        // add event listener to button
        editButton.addEventListener("click", (e) => editHandler(e, album))
        // make the inner text say "edit", so the user is aware of what the button does
        editButton.innerText = "edit"
        editButton.id = album.collectionId
    });
}

function deleteHandler(e) {
    e.target.parentNode.remove() 
    albums = albums.filter(album => album.collectionId !== +this.id)
    albums.length == 0 ?
        resultsHeader.innerText = `No results results for ${searchBar.value}, please try again` :
        resultsHeader.innerText = `${albums.length} results for ${searchBar.value}`

}

function editHandler(e, album) {
    let id = album.collectionId

    let newInput = document.createElement('input')
    let oldTitle = e.target.parentNode.firstChild
    let parent = e.target.parentNode
    parent.prepend(newInput)
    newInput.placeholder = oldTitle.innerText
    oldTitle.remove()
    newInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            let newTitle = document.createElement('h3')
            e.target.parentNode.prepend(newTitle)
            newTitle.innerText = e.target.value
            newInput.remove()
            console.log()
            albums.map(album => album.collectionId === id ? album.collectionName = e.target.value : album)
        }
    })
}

