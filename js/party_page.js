

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

    /* {
       
       }
      */

    // ordered_votes = {}
    //  for (var i in song_list) {
    //     vote = song_list[i]["votes"]
    //  }
    //  // array of 

    song_output ="";
    for (var i in song_list) {
        if ("just_added" in song_list[i]) {
            //string
            // j_added_song = song_list[i]["song"];
            console.log("lol");
            song_output += "<li><div class=\"song just_added\">";

        }
        else {
             song_output += "<li><div class=\"song\">";
        }
       
        song_output += "<img src=\"" + data.covers[song_list[i]["album"]];
        song_output += "\"><h1>";
        song_output += song_list[i]["song"];
        song_output += "</h1><h3>";
        song_output += song_list[i]["artist"];
        song_output += "</h3><div class=\"voting\"><i class=\"arrow fa fa-arrow-up grey\"></i><span data-votes=\"";
        song_output += song_list[i]["votes"] + "\">";
        song_output += song_list[i]["votes"];
        song_output += "</span><i class=\"arrow fa fa-arrow-down grey\"></i></div></div></li>";
       
    }
    $('#add_songs').html(song_output);




    $(document).on("click", '#add_song', function(){
        // event.preventDefault();

        //get rid of just_added
        //update votes and voted status
        //then repack session 
        //then go to search page 
    });

    // $('.just_added').css('background-color', 'rgba(28, 214, 171, 0.23)');

    // $(".just_added").animate({backgroundColor:'white'},10,function(){
    //     $(this).animate({backgroundColor:'#1CD6AB'},1000);
    // });

    // setTimeout(function(){
    //     console.log
    // $('.just_added').stop(true, true).delay(100).addClass('white_again');
    // animate({backgroundColor: 'white'}, 'slow');
    // }, 2000);



    
    

});


