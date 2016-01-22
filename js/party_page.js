

jQuery(document).ready(function($){


    if (document.getElementById("just_added")) {
      $('html,body').animate({
       scrollTop: $("#just_added").offset().top - 10
        });
    } 
    


    $( "#info" ).click(function() {
      $( "#party_description" ).toggle("medium");
      $( "i").toggleClass("active");
    });

    var session = JSON.parse(sessionStorage.getItem('session'));


    //populate party description

    if (!(jQuery.isEmptyObject(session["Created"]))) {
        partyName = session["Created"]["party_name"];
        partyDescription = session["Created"]["party_description"];
        guests = session["Created"]["guests"];

    } else {
        partyName = session["Joined"]["party_name"];
        partyDescription = session["Joined"]["party_description"];
        guests = session["Joined"]["guests"];
        
    }

    $("#party_description .party_name").html(partyName);
    $("#party_description .description").html(partyDescription);

    output="";
    for (var i in guests) {

        output+="<li><div class=\"placeholder_image\"></div><span class=\"name\">";
        output += guests[i];
        output+= "</span></li>";

    }

    $('.friends_list').html(output);


    //populate song list 
    song_list = session["Playlist"];
    console.log(song_list);

    if (jQuery.isEmptyObject(song_list)) {
        song_output = "<h1 class=\"nosongs\">Begin by adding a song</h1>";
        $('#add_songs').html(song_output);
    }
    else {
        song_output ="";
        for (var i in song_list) {
            if ("just_added" in song_list[i]) {
                //string
                // j_added_song = song_list[i]["song"];
                console.log("lol");
                song_output += "<li data-songid=\"" + i + "\"><div class=\"song just_added\">";

            }
            else {
                 song_output += "<li data-songid=\"" + i + "\"><div class=\"song\">";
            }
           
            song_output += "<img src=\"" + data.covers[song_list[i]["album"]];
            song_output += "\"><h1>";
            song_output += song_list[i]["song"];
            song_output += "</h1><h3>";
            song_output += song_list[i]["artist"];
            song_output += "</h3><div class=\"voting\"><i class=\"arrow fa fa-arrow-up ";
            if(song_list[i]["my_vote"] == 1) {
                song_output += "green";
            }
            else {
                song_output += "grey"
            }

            song_output += "\"></i><span data-votes=\"";
            song_output += song_list[i]["votes"] + "\">";
            song_output += song_list[i]["votes"];
            song_output += "</span><i class=\"arrow fa fa-arrow-down "; 
            if(song_list[i]["my_vote"] == -1) {
                song_output += "green";
            }
            else {
                song_output += "grey"
            }
            song_output += "\"></i></div></div></li>";
           
        }
        $('#add_songs').html(song_output);
        reorderSongs();
    }
    

    



    // $('.just_added').css('background-color', 'rgba(28, 214, 171, 0.23)');

    // $(".just_added").animate({backgroundColor:'white'},10,function(){
    //     $(this).animate({backgroundColor:'#1CD6AB'},1000);
    // });

    // setTimeout(function(){
    //     console.log
    // $('.just_added').stop(true, true).delay(100).addClass('white_again');
    // animate({backgroundColor: 'white'}, 'slow');
    // }, 2000);

    function compareNum(a,b) {
      if (a>b) 
        return -1;
      else if (a<b) 
        return 1;
      return 0;
    }

    function reorderSongs() {
        $('#add_songs').append($('#add_songs li').detach().sort(function(a,b){
          return compareNum($('span',a).attr('data-votes'), $('span',b).attr('data-votes'));
        }).fadeIn("slow"));
    }


    // VOTING
    $('.fa-arrow-up').click(function(){

        var thisVotes = $(this).siblings("span").attr("data-votes");
        var prevVotes = $(this).closest("li").prev("li").find("span").attr("data-votes");

        if ($(this).siblings('.fa-arrow-down').hasClass('green')) {
            var temp = parseInt(thisVotes)+2;
            $(this).siblings('span').attr('data-votes', temp);
            $(this).siblings('span').html(temp);
        } else {
            if($(this).hasClass('green')){
                var temp = parseInt(thisVotes)-1;
                $(this).siblings('span').html(temp);
                $(this).siblings('span').attr('data-votes', temp);
            } 
            if ($(this).hasClass('grey')) {
                var temp = parseInt(thisVotes)+1;
                $(this).siblings('span').attr('data-votes', temp);
                $(this).siblings('span').html(temp);
            } 
        }

        thisVotes = $(this).siblings("span").attr("data-votes");
        if(parseInt(thisVotes) > parseInt(prevVotes)) {
            reorderSongs();
        }
        
    });


    $('.fa-arrow-down').click(function(){
        var thisVotes = $(this).siblings("span").attr("data-votes");
        var nextVotes = $(this).closest("li").next("li").find("span").attr("data-votes");

        if ($(this).siblings('.fa-arrow-up').hasClass('green')) {
            var temp = parseInt(thisVotes)-2;
            $(this).siblings('span').attr('data-votes', temp);
            $(this).siblings('span').html(temp);
        }
        else {
            if ($(this).hasClass('green')){
                var temp = parseInt(thisVotes)+1;
                $(this).siblings('span').attr('data-votes', temp);
                $(this).siblings('span').html(temp);
            } 
            if ($(this).hasClass('grey')) {
                var temp = parseInt(thisVotes)-1;
                $(this).siblings('span').attr('data-votes', temp);
                $(this).siblings('span').html(temp);
            }
        }

        thisVotes = $(this).siblings("span").attr("data-votes");
        if(parseInt(thisVotes) < parseInt(nextVotes)) {
            reorderSongs();
        }
            

    });

     $('.arrow').click(function(){
          $(this).siblings('.green').addClass('grey');
          $(this).siblings('.green').removeClass('green');
          $(this).toggleClass('green');
          $(this).toggleClass('grey');
    });

    $('a#add_song').click(function(){
        event.preventDefault();
        
        // update my_vote
        // update votes

        // go through li in add_songs 
        // check if fa-arrow-up or fa-arrow-down has a class green
        // if so then update my_vote, votes in corresponding sessionStorage item 
        $("#add_songs li ").each(function( index ) {
            var songID = $(this).attr('data-songid');
            session["Playlist"][songID]["votes"] = $(this).find('span').html();

            if($(this).find('i').hasClass('fa-arrow-up green')) {

            session["Playlist"][songID]["my_vote"] = 1;
            }
            if($(this).find('i').hasClass('fa-arrow-down green')) {
            session["Playlist"][songID]["my_vote"] = -1;
            }

        });
        sessionStorage.setItem('session', JSON.stringify(session));
        console.log(sessionStorage.getItem('session'));
        window.location.replace("search.html");
    });



});


