$(initEventList);


function initEventList(){

	Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");

	var objectId = getURLParameter("id");

	if (objectId) {

		var EventObject = Parse.Object.extend("Event");
		var query = new Parse.Query(EventObject);

		query.get(objectId, {
		  success: function(eventObject) {
		    // The object was retrieved successfully.

		    $("#txtNameES").val(eventObject.get('name_es'));
		    $("#txtNameEN").val(eventObject.get('name_en'));
		    $("#txtLink").val(eventObject.get('link')); 
		    $("#txtDescES").val(eventObject.get('description_es')); 
		    $("#txtDescEN").val(eventObject.get('description_en')); 
		    var coord =  eventObject.get('geoLocation');
		    $("#txtLat").val(coord.latitude); 
		    $("#txtLong").val(coord.longitude); 
		    
		    $("#txtPlace").val(eventObject.get('place')); 

		    var type = eventObject.get('type');
		    $("#hiddenType").val(type);
		    activateMenuOption(type);
		    
		    $('#createEvent').html('Editar');


		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and description.
		     alert('No se ha podido recuperar el evento');
		  }
		});
	};

}

function getURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function activateMenuOption(type){
  var menuOp = $('#' + type + 'Op');
  var title = menuOp.find('.title');
  menuOp.addClass('active');
  menuOp.find('.det').addClass('active');
  title.parent().append('<span class="selected"></span>');

  var titleText = title.text();
  $('.titlePlaceholder').text(titleText);

  var urlSection = window.location;
  $('.lnkPlaceholder').attr("href", urlSection);
}