import { showAlbums } from './index'; 
// Importing the function that displays the albums 

export default function Sort (e) {
    document.querySelector("#header___sort-btn").addEventListener("click", sortHandler)

    ///Rework the allAlbums array then call the showAlbums  function to rerender

    // first time sort is pressed it sorts by price --- after that it sorts by name 
    if (document.querySelector("#header___sort-btn").innerText === "Sort price") {
        allAlbums.sort((a, b) => (parseInt(a.collectionPrice) - parseInt(b.collectionPrice)))
        document.querySelector("#header___sort-btn").innerText = "Sort name"
        showAlbums()
    }
    else {
        allAlbums.sort((a, b) => a.collectionName.localeCompare(b.collectionName))
        document.querySelector("#header___sort-btn").innerText = "Sort price"
        showAlbums()
    }
}


