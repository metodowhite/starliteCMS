$(initEventList);


function initEventList(){

	Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");

	var objectId = getURLParameter("id");

	if (objectId) {

		var EventObject = Parse.Object.extend("Event");
		var query = new Parse.Query(EventObject);
		console.log(query);

		query.get(objectId, {
		  success: function(eventObject) {
		    // The object was retrieved successfully.

		    $("#txtNameES").val(eventObject.get('name_es'));
		    $("#txtNameEN").val(eventObject.get('name_en'));
		    $("#txtLinkES").val(eventObject.get('link')); 
		    $("#txtLinkEN").val(eventObject.get('link_en')); 
		    $("#txtDescES").val(eventObject.get('description_es')); 
		    $("#txtDescEN").val(eventObject.get('description_en')); 
		    var coord =  eventObject.get('geoLocation');
		    $("#txtLat").val(coord.latitude); 
		    $("#txtLong").val(coord.longitude); 
		    $("#txtPlace").val(eventObject.get('place'));
		    
		    if (eventObject.get('image')) {
		    	$('#profilePhoto').css('display', 'inline');
		    	$('#profilePhoto').attr('src', eventObject.get('image').url());
			}
		    if (eventObject.get('image_th')) {
		    	$('#profilePhotoMini').css('display', 'inline');
		    	$('#profilePhotoMini').attr('src', eventObject.get('image_th').url());
		    }
		    
		    
		    var date = eventObject.get('eventDate'); 
		    console.log(date);
		    var day = date.getUTCDate();
		    var month = date.getUTCMonth() + 1;
		    var year = date.getUTCFullYear();
		    var hours = date.getHours();
		    var minutes = date.getMinutes();
		    if (minutes < 10) {

		    	minutes = '0' + minutes;
		    }

		    if (day<10) {
		    	day = '0' + day;
		    }
		    if (month<10) {
		    	month = '0' + month;
		    }
		    

		    $("#txtDate").val(day + "-" + month + "-" + year);
		    $("#txtTime").val(hours+ ":" + minutes);

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