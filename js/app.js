let apiKey = 'AIzaSyBa3YyLV44aRWglixDgnEJOsV2O_kegJJ4'
let videoHttp = 'https://www.googleapis.com/youtube/v3/videos?'
let channelHttp = 'https://www.googleapis.com/youtube/v3/channels?'
const videoContainer = document.querySelector('.main')

//fetchowanie danych o video w środku zagnieżdżona funkcja fetchowania danych o kanale
fetch(
  videoHttp +
    new URLSearchParams({
      key: apiKey,
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: 10,
      regionCode: 'PL',
    }),
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((i) => {
      getChannelInfo(i)
    })
  })
  .catch((err) => console.log(err))
//funkcja fetchowania danych z gałęzi api channel
const getChannelInfo = (videoData) => {
  fetch(
    channelHttp +
      new URLSearchParams({
        key: apiKey,
        part: 'snippet',
        id: videoData.snippet.channelId,
      }),
  )
    .then((res) => res.json())
    .then((data) => {
      videoData.channelThumbnail = data.items[0].snippet.thumbnails.default.url
      //console.log(data)
      newVideo(videoData)
    })
}

// tworzenie struktury html z zamienionymi wartosciami na dane z api
//https://youtube.com/watch?v=${data.id}
const newVideo = (data) => {
  videoContainer.innerHTML += `
    <div class="video">
        <div class="video__player" onclick="popOutFunction('${data.id}')" >
        <img src="${data.snippet.thumbnails.standard.url}" class="video__thumbnail" alt=""
        </div>
        <div class="wrapper">
        <img src="${data.channelThumbnail}" class="channel__thumbnail" alt=""/>
            <div class="description">
                <h2 class="description__title">${data.snippet.title}</h2>
                <h3 class="description__channel">${data.snippet.channelTitle}</h3>
                <p class="description__info">${data.snippet.publishedAt}</p>
            </div>
            </div>
    </div>
    `
}
const overlay = document.querySelector('.popout')
const background = document.querySelector('.background')
const popOutFunction = (data) => {
  background.innerHTML += `
  <iframe class="background__video" type="text/html" width="640" height="360"
  data-consent="analytics" src="https://www.youtube-nocookie.com/embed/${data}?autoplay=0"
  frameborder="0" allowfullscreen></iframe>
  <div class="background__exit" onclick="toggle()"><i class="fa-solid fa-x" aria-hidden="true"></i></div>`
  background.style.display = 'block'
  overlay.style.display = 'block'
}
function toggle() {
  console.log('toggle')
  background.style.display = 'none'
  overlay.style.display = 'none'
  background.innerHTML = ''
}
