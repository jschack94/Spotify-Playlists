

//Album Constructor Function
function Album(name, artist, releaseDate, externalUrl, imageUrl) {
    this.name = name
    this.artist = artist
    this.releaseDate = releaseDate
    this.externalUrl = externalUrl
    this.imageUrl = imageUrl
  
    //Custom Album Object Method
    this.recent = function() {
      if (this.releaseDate > "2018-01-01")
        return "Recent!"
    }
  }
  
  
  $(function () {
  
    //Search Spotify API and Return Search Results as JSON Album Objects
    $('#search_form').on("submit", function(e) {
      e.preventDefault();
      accessToken = $("input[name='credentials']").val()
      term = $("input[name='search']").val()
      url = "https://api.spotify.com/v1/search?q=" + term + "&type=album"
      $.ajax({
        url: url,
        beforeSend: function(request) {
          request.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        }
      }).success(function(response) {
  
        //Show Search Results in DOM
        var $search_list = $("div#search_results ul")
        $search_list.html("")
        let i = 0
        $.each(response.albums.items, function(name, value) {
          let nameAtt = value.name
          let artist = value.artists[0].name
          let releaseDate = value.release_date
          let externalUrl = value.external_urls.spotify
          let imageAtt = value.images[0].url
  
          let album = new Album(nameAtt, artist, releaseDate, externalUrl, imageAtt);
  
          $search_list.append('<li class="returned_albums"><div id="list_item_img"><img alt="album_cover" height="45" width="45" src="' + album.imageUrl + '"></div><div id="list_item_text"><p class="search_results_title">' +
            album.name +
            '</p><p class="search_results_artist">' +
            album.artist +
            '</p></div><div id="list_item_form"><form class="add_album" id="' + i + '"><input type=hidden name="authenticity_token" value="' + '<%= form_authenticity_token %>' + '"><input id="name" value="' + album.name + '" type="hidden"><input id="artist" value="' + album.artist + '" type="hidden"><input id="release" value="' + album.releaseDate + '" type="hidden"><input id="url" value="' + album.externalUrl + '" type="hidden"><input id="image" value="' + album.imageUrl + '" type="hidden"><input type="submit" value="+" name="commit" class="button_add_album"></div>' +
            '</li>');
          i++
        })
  
        //Persist Album in Database
        $(function createAlbum() {
          $("form.add_album").on('click', function(e){
            let that = $(this);
            e.preventDefault();
            url = this.action
            data = {
              'authenticity_token': $("input[name='authenticity_token']").val(),
              album: {
                'name': $(this.name).val(),
                'artist': $(this.artist).val(),
                'release_date': $(this.release).val(),
                'external_url': $(this.url).val(),
                'image_url': $(this.image).val(),
              }
            };
            $.ajax({
              type: "POST",
              url: url,
              data: data,
              success: function(response) {
  
                //Add Album to 'Albums' list in DOM
                $('#album_list').append("<li class='albums' style='padding-right:5px'><a class='more_info' href='/users/" + response.user_id + "/albums/" + response.id + "'><img alt='album_cover' height='125' width='125' src='" + response.image_url + "'></a></li>")
                $('.more_info').on('click', function(e) {
                  e.preventDefault()
                    $.ajax({
                      type: "GET",
                      url: this.href + ".json"
                    }).done(function(data) {
                      var $show_album = $('#show_album')
                      $show_album.empty()
  
                      //Show 'More Info' in DOM
                      $('#show_album').append("<img src='" + data.image_url + "' heigh='200' width='200'><h6 id='show_name'>" + data.name + "</h6><p>" + data.artist + "</p><a href='" + data.external_url + "' target='_blank' rel='noopener noreferrer'>Listen</a>")
                    })
                })
              }
            })
          })
  
          //Reset Buttons and Forms
          $('form.add_album').each(function() {
            this.reset();
          });
        });
        $('#search_form').each(function() {
          this.reset();
        });
  
      //Error Alert
      }).error(function(notNeeded) {
        alert("Error, please try again. If error persists, please log out and back in again.")
      });
    });
  
    //'More Info' functionality with adding an Album first
    $('.more_info').on('click', function(e) {
      e.preventDefault()
        $.ajax({
          type: "GET",
          url: this.href,
          contentType: 'application/json'
        }).done(function(data) {
          var $show_album = $('#show_album')
          $show_album.empty()
          $('#show_album').append("<img src='" + data.image_url + "' heigh='200' width='200'><h6 id='show_name'>" + data.name + "</h6><p>" + data.artist + "</p><a href='" + data.external_url + "' target='_blank' rel='noopener noreferrer'>Listen</a>")
        })
    })
  
    $('#alphabatize').on('click', function(e) {
      e.preventDefault();
        $.get(this.href, function(data) {
          $('#album_list').empty()
  
          // data.sort(function(a, b) {
          //   return compareNames(a.name, b.name);
          // })
  
          data.sort(compareNames)
  
          $.each(data, function(i, name) {
            $('#album_list').append('<li>' + data[i].name + ' --- ' + "<a href='/users/" + data[i].user_id + "/albums/" + data[i].id + "' class='more_info'>More Info</a> - <a href='" + data[i].external_url + "' target='_blank' rel='noopener noreferrer'>LISTEN!</a></li>")
          })
  
          $('.more_info').on('click', function(e) {
            e.preventDefault()
              $.ajax({
                type: "GET",
                url: this.href,
                contentType: 'application/json'
              }).done(function(data) {
                var $show_album = $('#show_album')
                $show_album.empty()
                $('#show_album').append("<img src='" + data.image_url + "' heigh='200' width='200'><h6 id='show_name'>" + data.name + "</h6><p>" + data.artist + "</p><a href='" + data.external_url + "' target='_blank' rel='noopener noreferrer'>Listen</a>")
              })
          })
        }, "json")
    })
  
    function compareNames(a, b) {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
  
      return (a < b) ? -1 : (a > b) ? 1 : 0;
    }
  
  });