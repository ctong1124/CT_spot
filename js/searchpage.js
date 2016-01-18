jQuery(document).ready(function($){

    //populate recs at the beginning
    //{album: year}
    // recs = {}
    // for (var i in data.music) {
    //     entry = data.music[i]
    //     if (!(entry.album in discog)){
    //         recs[entry.album] = entry.year;
    //    }
    // }



    recs_gone_huh = 0;
    //form stuff
    $("#myform").on("submit", function(event){
 
      //get rid of recommendations
      if (recs_gone_huh == 0) {
        
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        $("#songs").addClass('current');
        $("li.tab-link").first().addClass('current');
        $("#recs").css('display','none');
        $("#search-page ul.tabs").css('display', 'flex');
        $("#search-page .searchbar").css('height', '6em')
        recs_gone_huh = 1;
    }

      if ($('.artist-page').css('display') != "none") {
          $(".artist-page").css('display', 'none');
          $(".tab-content").find(".search-result").css('display', 'inherit');
      }
      if ($('.album-page').css('display') != "none") {
          $(".album-page").css('display', 'none');
          $(".tab-content").find(".search-result").css('display', 'inherit');
      }

      s = $('#search').val();

      // stores entry that includes that name
      //key = string of what matches, value = index
      fill_songs = {};
      fill_albums = {};
      fill_artists = {};

      
      for (var i in data.music) {
        if ((data.music[i].song.toLowerCase().includes(s.toLowerCase()))
          || (data.music[i].album.toLowerCase().includes(s.toLowerCase()))
          || (data.music[i].artist.toLowerCase().includes(s.toLowerCase()))) {
            if (!(data.music[i].song in fill_songs)) {
                fill_songs[data.music[i].song] = i;
            }
            if (!(data.music[i].album in fill_albums)) {
                fill_albums[data.music[i].album] = i;
            }
            if (!(data.music[i].artist in fill_artists)) {
                fill_artists[data.music[i].artist] = i;
            }
        }
        // if ((data.music[i].song.toLowerCase().includes(s.toLowerCase()))
        //   || (data.music[i].album.toLowerCase().includes(s.toLowerCase()))
        //   || (data.music[i].artist.toLowerCase().includes(s.toLowerCase()))) {
        //     if (!(data.music[i].album in fill_albums)) {
        //         fill_albums[data.music[i].album] = i;
        //     }
        // }
        // if ((data.music[i].song.toLowerCase().includes(s.toLowerCase()))
        //   || (data.music[i].album.toLowerCase().includes(s.toLowerCase()))
        //   || (data.music[i].artist.toLowerCase().includes(s.toLowerCase()))) {
        //     if (!(data.music[i].artist in fill_artists)) {
        //         fill_artists[data.music[i].artist] = i;
        //     }
        // }
      }

      //songs
      song_output = ""
      if (jQuery.isEmptyObject(fill_songs)) {
        song_output = "<h2 class=\"bold\">No results found.</h2>";
      } else {
          for (var key in fill_songs) {
            album = data.music[fill_songs[key]].album;

            song_output += "<div class=\"entry \"><div class=\"songID\">"+ fill_songs[key] ;
            song_output += "</div><div class=\"pic\"><img src=\""
            song_output += data.covers[album];
            song_output += "\"></div><div class=\"info ver-align\"><h3 class=\"bold\">";
            song_output += key;
            song_output += "</h3><p class=\"normal\">";
            song_output += data.music[fill_songs[key]].artist;
            song_output += "</p><p class=\"normal\">";
            song_output += album;
            song_output += "</p></div><div class=\"icon\"><i class=\"fa fa-plus\"></i></div></div>"
        }
      }

      $('#songs .search-result').html(song_output);

      //albums
      album_output = ""
      if (jQuery.isEmptyObject(fill_albums)) {
        album_output = "<h2 class=\"bold\">No results found.</h2>";
      } else {
        for (var key in fill_albums) {
          album_output += "<div class=\"entry \">";
            album_output += "<div class=\"pic\"> <img src=\""+ data.covers[key]+"\"></div>";
          album_output += "<div class=\"info ver-align\"><h3 class=\"bold\">";
          album_output += key;
          album_output += "</h3><p class=\"normal\">";
          album_output += data.music[fill_albums[key]].artist;
          album_output += "</p><p class=\"normal\">";
          album_output += data.music[fill_albums[key]].year;
          album_output += "</p></div></div>";
        }
      }

      $('#albums .search-result').html(album_output);

      //artists
      artist_output = ""
      if (jQuery.isEmptyObject(fill_artists)) {
       artist_output = "<h2 class=\"bold\">No results found.</h2>";
      } else {
        for (var key in fill_artists) {
          artist_output +="<div class=\"entry \"><div class=\"pic\">";
          artist_output +="<img src=\"" + data.artists[key] + "\">";
          artist_output +="</div><div class=\"info ver-align\"><h3 class=\"bold\">";
          artist_output += key;
          artist_output += "</h3></div></div>";
        }
      }

    $('#artists .search-result').html(artist_output);
    });

   

	//tabs 
    $('ul.tabs li').on( "click", function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');

        if ($('.artist-page').css('display') != "none") {
            $('.artist-page').css('display', 'none');
            $('#artists .search-result').css('display', 'inherit')
        }

        if ($('.album-page').css('display') != "none") {
            $('.album-page').css('display', 'none');
            $('#albums .search-result').css('display', 'inherit')
        }
    });


    function populate_artist_page(a) {
        //{album: year}
        albums = {}

        //{album: {songID: song},
        // album: {songID: song}, 
        // album: {songID: song}}
        discog = {}
        for (var i in data.music) {
            entry = data.music[i]
            if(entry.artist == a) {
                if (!(entry.album in discog)){
                    albums[entry.album] = entry.year;
                    discog[entry.album] = {};
               }
            }
        }

        for (var i in data.music) {
            entry = data.music[i]
            if(entry.artist == a) {
                discog[entry.album][i] = entry.song;
            }
        }
        console.log(albums);
        console.log(discog);
        //return albums;

        output = "<div class=\"exit-btn\"><h1 class=\"normal\">+</h1></div><h2>";
        output += a + "</h2>";

        for (var al in discog) {
            output += "<div class=\"entry \"><div class=\"pic\">";
            output += "<img src=\"" + data.covers[al] + "\">";
            output += "</div><div class=\"info ver-align\"><h3 class=\"bold\">";
            output += al;
            output += "</h3><p class=\"normal\">";
            output += albums[al];
            output += "</p></div></div>";
            for (var id in discog[al]) {
                output += "<div class=\"song-entry \"><div class=\"songID\">"+ id +"</div><h3 class=\"normal\">";
                output += data.music[id].tracknum + ". "+ discog[al][id];
                output += "</h3><div class=\"icon\"><i class=\"fa fa-plus\"></i></div></div>";
            }
        }


        $('#artists .artist-page').html(output);

    }

    function populate_album_page(al) {
        d_album = {};
        artist = "";
        year = 0;
        for (var i in data.music) {
            entry = data.music[i]
            if(entry.album == al) {
                d_album[i] = entry.song;
                artist = entry.artist;
                year = entry.year;
            }
        }

        output = "<div class=\"exit-btn\"><h1 class=\"normal\">+</h1></div><br><div class=\"entry \"><div class=\"pic\">";
        output += "<img src=\""+ data.covers[al]+"\">";

        output += "</div><div class=\"info ver-align\"><h3 class=\"bold\">";
        output += al;
        output += "</h3><p class=\"normal\">";
        output += artist;
        output += "</p><p class=\"normal\">";
        output += year;
        output += "</p></div></div>";

        for (var id in d_album) {
            output += "<div class=\"song-entry \"><div class=\"songID\">"+ id +"</div><h3 class=\"normal\">";
            output += data.music[id].tracknum + ". "+ d_album[id];
            output += "</h3><div class=\"icon\"><i class=\"fa fa-plus\"></i></div></div>";
        }
                                
        $('#albums .album-page').html(output);

    }
        

    // opening and closing artist/album page 
    $(document).on("click",'#artists .search-result .info',function(){
        $(this).closest(".search-result").css('display', 'none');
        //console.log($(event.target).text());
        populate_artist_page($(event.target).text());
        $(this).closest(".tab-content").find(".artist-page").css('display', 'inherit');
    });

    $(document).on("click", '#albums .search-result .info', function(){
        $(this).closest(".search-result").css('display', 'none');
        populate_album_page($(event.target).text());
        $(this).closest(".tab-content").find(".album-page").css('display', 'inherit');
    });

    $(document).on("click", '.exit-btn',function(){
        if ($('.artist-page').css('display') != "none") {
            $(this).closest(".artist-page").css('display', 'none');
            $(this).closest(".tab-content").find(".search-result").css('display', 'inherit');
        }
        if ($('.album-page').css('display') != "none") {
            $(this).closest(".album-page").css('display', 'none');
            $(this).closest(".tab-content").find(".search-result").css('display', 'inherit');
        }
    });  

    //adding song to session storage

    $(document).on("click", '#songs .icon', function(){
       ID = $(this).siblings(".songID").html();

        var session = JSON.parse(sessionStorage.getItem('session'));
        adding = {"song": data.music[ID]["song"], "artist": data.music[ID]["artist"], "album": data.music[ID]["album"], "votes": 0, "my_vote": 0, "just_added": 1 };
        session["Playlist"][ID] = adding;
        sessionStorage.setItem('session', JSON.stringify(session));
        window.location.replace("party_page.html");
    });

    $(document).on("click", '#artists .artist-page .song-entry .icon', function(){
        ID = $(this).siblings(".songID").html();

         var session = JSON.parse(sessionStorage.getItem('session'));
         adding = {"song": data.music[ID]["song"], "artist": data.music[ID]["artist"], "album": data.music[ID]["album"], "votes": 0, "my_vote": 0, "just_added": 1 };
         session["Playlist"][ID] = adding;
         sessionStorage.setItem('session', JSON.stringify(session));
         window.location.replace("party_page.html");
    });

    $(document).on("click", '#albums .album-page .song-entry .icon', function(){
        ID = $(this).siblings(".songID").html();

         var session = JSON.parse(sessionStorage.getItem('session'));
         adding = {"song": data.music[ID]["song"], "artist": data.music[ID]["artist"], "album": data.music[ID]["album"], "votes": 0, "my_vote": 0, "just_added": 1 };
         session["Playlist"][ID] = adding;
         sessionStorage.setItem('session', JSON.stringify(session));
         window.location.replace("party_page.html");
    });



});