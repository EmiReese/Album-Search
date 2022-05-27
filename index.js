const url = "https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200"
const searchInput = document.getElementsByClassName('searchInput');
const searchButton = document.getElementsByClassName('searchButton');


const search = () => {
    searchButton.addEventListener('click', function(e){
    let artist = searchInput.value
    if (!artist){
        alert('Please enter an artist name')
        return
    }

    document.querySelector(".loader").style.display = "block"

    fetchJsonp(url)
    .then(res => res.json())
    .then((res) => {
        console.log(res.results)
        })
    })
}

searchInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      searchButton.click()
    }
  })


      function showAlbums(data){
        document.querySelector(".loader").style.display = "none"
        let numOfAlbums = data.length
    
 
      const albumCount = document.createElement('h1')
      albumCount.classList.add("result-h1")
      albumCount.innerHTML = `${numOfAlbums} albums found for "${searchInput.value}"`
      document.querySelector('albumCount').appendChild(albumCount)

      const albumContainer = document.createElement('section')
     albumContainer.classList.add("container")
      document.querySelector('.results').appendChild(albumContainer)

      data.forEach(album => {
        const albumNames = document.createElement('h4')
        albumNames.classList.add('albumName')

        albumNames.innerText = album.collectionName
        albumDiv.appendChild(albumNames)

        const albumInfo = document.createElement('ul')
        albumInfo.classList.add('albumInfo')

        const albumCovers = document.createElement('img')
        albumCovers.classList.add('albumCover')

        albumCovers.src = album.artworkUrl100
        albumDiv.appendChild(albumCovers)
        document.querySelector('container').appendChild(albumInfo)
      })
      }
