$(initArtist);


function initArtist() {

	Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");

	$('#creat').click(function(e){

		var ArtistObject = Parse.Object.extend("Artist");
	    var query = new Parse.Query(ArtistObject);

	    query.equalTo("name", 'cosimo');

	    query.first({

	      success: function(collection) {


	        collection.set('name', 'antimo');
	        

	        collection.save();
	                
	         window.location.href = "artist_list.html";


	      },
	      error: function(error) {
	        alert("Error: " + error.code + " " + error.message);
	      }
	    });

    });


}