const url = "https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200"

var albumName;
var albumCover;
var artistName; 
var albumCount;
var albumInfo;

function fetchAlbums () {
    console.log("click");
    

}



function createAlbumTmp (artistName) {
return `<section style="display: flex; justify-content: space-between;">
  <img src="https://placeimg.com/320/240/tech" alt="Preview of Whizzbang Widget">
  <h3>Whizzbang Widget <em>$25</em></h3>
  <p>Liquorice candy macaroon soufflé jelly cake. Candy canes ice cream biscuit marzipan. Macaroon pie sesame
    snaps
    jelly-o.
  </p>
  <a href="#">Add to Cart</a>
</section>`
}