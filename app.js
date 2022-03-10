const elementId = (id) => {
    return document.getElementById(id);
};

const handleSearch = () => {
    const keyword = elementId("keyword").value;
    const artistContainer = elementId("artists");
    const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayArtist(data));
    artistContainer.innerHTML = "";
    keyword.innerHTML = "";
}
const displayArtist = (data) => {
    // console.log(data);
    const artistConatainer = elementId("artists");
    const artists = data.artists;
    artists.forEach(artist => {
        const div = document.createElement("div");
        div.classList.add("artist-card");
        div.innerHTML = `<div class="image-container" >
            <div class="image-container-inner">
                <img src="${artist.strArtistThumb ? artist.strArtistThumb : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"}"alt="" />
            </div>
            </div>
  <div class="info-container">
    <h1>${artist.strArtist ? artist.strArtist : "No Data Found"}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : "No Data Found"}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : "No Data Found"}</p>
  </div>
  <button onclick="fetchAlbum()" class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>`;
        artistConatainer.appendChild(div);
    });
}
const fetchAlbums = (id) => {
    const albumContainer = elementId("albums");
    const artistContainer = elementId("artists");
    const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => showAlbum(data));
    artistContainer.innerHTML = "";
    albumContainer.innerHTML = "";

}
const showAlbum = (data) => {
    // console.log(data);
    const albumContainer = elementId("albums");
    data?.album?.forEach((item) => {
        // console.log(item.strAlbumThumb);
        const div = document.createElement("div");
        div.classList.add("album");
        div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${item.strAlbumThumb ? item.strAlbumThumb : "https://blog.rahulbhutani.com/wp-content/uploads/2020/05/Screenshot-2018-12-16-at-21.06.29.png"}"
        alt = ""
            />
        </div >
    <div class="album-name">
        <h3>${item.strAlbum}</h3>
    </div>
`;
        albumContainer.appendChild(div);
    });
};