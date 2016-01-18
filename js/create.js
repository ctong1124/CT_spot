$(document).ready(function() {
  // console.log("session");
  // console.log(JSON.parse(sessionStorage.getItem('session')));

var availableGenres = [
  "Post-Rock",
  "Hip-Hop",
  "Punk",
  "Pop",
  "Blues",
  "Dance",
  "Afrobeat",
  "Chaingang",
  "Surf-Punk",
  "Crust-Punk",
  "Vaporwave",
  "WitchHouse",
  "Joni-Step",
  "Dub-Step",
  "Ambient",
  "Electronic",
  "Funk",
  "Black Metal",
  "Doom-Core",
  "Death-Core",
  "Black-Metal",
  "Death-Metal",
  "Alt-Rock"
];

var availableFriends = [
  "Jill Doe",
  "Jane Doe",
  "Jimmy Dean",
  "Lisa Simpson",
  "Julia Holter",
  "Bobby McGee",
  "Sampson Mesiah",
  "Jimmy Vaughan",
  "Arlen Roth",
  "Jimmy Haha",
  "Chris Clark",
  "Wolff Vorhoff",
  "Renny Altmann",
  "Jake Ryan",
  "Carisa Tong",
  "Zach Bachiri",
  "Jue Yao",
  "Dolphin Sanders",
  "Mara Gallagher",
  "Francis Hollande",
  "Black Francis",
  "Francis Bean",
  "Sam Jenkins"
];

function addGenre(val) {
  var result = '<div class="a_tag"><p>' + val + '</p><i id="remove" class="fa fa-times"></i></div>'

  $('#add_genres > #tags').append(result);

  $( 'i#remove' ).click(function() {
    $(this).parent().remove();
  });
}

function addFriends(val) {
  var result = '<div class="a_tag"><p>' + val + '</p><i id="remove" class="fa fa-times"></i></div>'

  $('#add_friends > #tags').append(result);

  $( 'i#remove' ).click(function() {
    $(this).parent().remove();
  });
}

$( "i#edit_party_name" ).click(function() {
  $("#party_name > h2").focus();
  $("#party_name > h2").html('');
});

$( "i#edit_party_description" ).click(function() {
  $("#party_description > p").focus();
  $("#party_description > p").html('');
});


$( "h2#create_button" ).click(function() {

  var session = JSON.parse(sessionStorage.getItem('session'));
  myObject = {
    "party_name": $("#party_name > h2").text(),
    "party_description": $("#party_description > p").text(),
    "guests": getFriends(),
    "genres": getGenres(),
    "privacy": $('input[name=privacy]:checked', '#privacy > form').val()
  };

  session["Created"] = myObject;

  sessionStorage.setItem('session', JSON.stringify(session));
});

$( "#search_genres" ).autocomplete({
  source: availableGenres,
  select: function (e, ui) {
  	var val = ui.item.value;
    ui.item.value = '';
  	addGenre(val);
  },
  response: function(event, ui) {
    if (!ui.content.length) {
      var noResult = { value:"",label:"No results found" };
      ui.content.push(noResult);
    }
  }
});

$( "#search_friends" ).autocomplete({
  source: availableFriends,
  select: function (e, ui) {
  	var val = ui.item.value;
    ui.item.value = '';
  	addFriends(val);
    }, 
  response: function(event, ui) {
    if (!ui.content.length) {
      var noResult = { value:"",label:"No results found" };
      ui.content.push(noResult);
    }
  }
});

function getFriends() {
  var results = [];
  var targetTags = $("div#add_friends > div#tags > div.a_tag");
  var lengthOf = $(targetTags.length);

  if (lengthOf === 0) { //if there are no tags
    return results;
  }
  else {
    $(targetTags).each(function() { //otherwise, parse away
      results.push($("p", this).html());
    }); 
  } 
  return results;
}

function getGenres() {
  var results = [];
  var targetTags = $("div#add_genres > div#tags > div.a_tag");
  var lengthOf = $(targetTags.length);

  if (lengthOf === 0) { //if there are no tags
    return results;
  }
  else {
    $(targetTags).each(function() { //otherwise, parse away
      results.push($("p", this).html());
    }); 
  } 
  return results;

}

});
