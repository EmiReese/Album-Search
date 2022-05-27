const url = "https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200"


const fetchJSONP = ( url => 
    new Promise(rs => {
      // INIT
      let script = document.createElement('script')
      let name = "_jsonp_" 
      
      if (url.match(/\?/)) url += "&callback="+name
      else url += "?callback="+name
      
      script.src = url
      window[name] = json => {
        rs(new Response(JSON.stringify(json)))
        script.remove()
        delete window[name]
      }
      
      document.body.appendChild(script)
    })
  )(0)