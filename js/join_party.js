jQuery(document).ready(function($){


	$(document).on("click", '.party .expanded_information a.green_button', function(){
		// event.preventDefault();

		partyTitle = $(this).closest(".party").children(".party_name").html();
		partyDescription = $(this).siblings(".party_description").html();
		friendsList = $(this).siblings("ul").children("li");
		friends = [];
		

		$(friendsList).each(function( index ) {
		  name = $(this).children(".name").html();
		  friends.push(name);
		});

		var session = JSON.parse(sessionStorage.getItem('session'));

		session["Joined"]["party_name"] = partyTitle;
		session["Joined"]["party_description"] = partyDescription;
		session["Joined"]["guests"] = friends;

		add_songs = [40, 41, 42, 44, 45];
		votes = [8, 6, 3, 0, -1]
		for (var i in add_songs) {
			ID = add_songs[i];
			session["Playlist"][ID] = {"song": data.music[ID]["song"], "artist": data.music[ID]["artist"], "album": data.music[ID]["album"], "votes": votes[i], "my_vote": 0 };
			
		}
		
		
		console.log(session);

		sessionStorage.setItem('session', JSON.stringify(session));

	    
	});


});