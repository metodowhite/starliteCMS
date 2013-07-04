


$(initArtistList);

function initArtistList(){

	Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");

	var getParameter = location.search.substring(1);
	var arrObjectId = getParameter.split('=');
	var objectId = arrObjectId[1];

	if (objectId) {

		console.log(objectId);

		var ArtistObject = Parse.Object.extend("Artist");
		var query = new Parse.Query(ArtistObject);

		query.get(objectId, {
		  success: function(artistObject) {
		    // The object was retrieved successfully.

		    $("#txtName").val(artistObject.get('name'));
		    $("#txtLink").val(artistObject.get('link')); 
		    $("#txtDesc").val(artistObject.get('description')); 
		    var coord =  artistObject.get('geoLocation');
		    $("#txtLat").val(coord.latitude); 
		    $("#txtLong").val(coord.longitude); 
		    
		    $("#txtPlace").val(artistObject.get('place')); 
		    var eventDate =  artistObject.get('eventDate');
		    console.log(eventDate);

		    var artist = new ArtistObject();


		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and description.
		     alert('No se ha podido recuperar el artista');
		  }
		});
	};

}