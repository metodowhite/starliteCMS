$(initEventList);


function initEventList(){

	var type = getURLParameter('type');
	activateMenuOption(type);


	Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");

	        // A Collection containing all instances of TestObject.
	        var EventCollection = Parse.Collection.extend({
	            model: 'Event',
	            query: (new Parse.Query('Event')).equalTo("type", type)
	        });
	        var eventCollection = new EventCollection();

			var arr = new Array();

	        eventCollection.fetch({
	            success: function (collection) {

	                collection.each(function (object) {
	                    var image = object.attributes.image ? '<img src="' + object.attributes.image.url() + '" style="max-width: 150px;">' : '';
	                    var description_es = object.attributes.description_es ? object.attributes.description_es : '';
	                    var name_es = object.attributes.name_es ? object.attributes.name_es : '';
	                    var eventDate = object.attributes.eventDate ? object.attributes.eventDate.toString("dd-MM-yyyy") : '';
	                    var eventHour = object.attributes.eventDate ? object.attributes.eventDate.toString("HH:mm") : '';

	                    var place = object.attributes.place ? object.attributes.place : '';
	                    var geoLocation = object.attributes.geoLocation ? object.attributes.geoLocation : '';
	                    
	                    if (geoLocation) 
	                    	place += '<br>' + 'Lat: ' + geoLocation.latitude + '<br> Long: ' + geoLocation.longitude;

	                    var editAction = '<a href="event_detail.html?id=' + object.id + '" class="btn mini purple"><i class="icon-edit"></i></a>';
	                    var deleteAction = '<a href="#delete" data-objectid="' + object.id + '" class="deleteRow btn mini black"><i class="icon-trash"></i></a>';
	                    var link = object.attributes.link ? '<a href = "' + object.attributes.link + '">Visitar</a>' : '';
	                    var element = [];
	                    
	                    element.push(name_es  + '<br>' + image);
	                    element.push(eventDate + '<br>' + eventHour);
	                    element.push(place);
	                    element.push(description_es);
	                    element.push(link);
	                    element.push(editAction + " " + deleteAction);
	                    arr.push(element);
	                });

					var loadingPlaceholder = $('#loadingPlaceholder');
					var tablePlaceHolder = $('#tablePlaceHolder')
					var tbl = '<table class="table table-striped table-bordered" id="eventTable" ></table>';
					
					tablePlaceHolder.hide();
					tablePlaceHolder.html(tbl);
					var eventTable = tablePlaceHolder.find('#eventTable');
					eventTable.dataTable( {
						"aaData": arr,
				        "aoColumns": [
				            { "sTitle": "Nombre" , "sClass": "firstColumn" },
				            { "sTitle": "Fecha", "sClass": "hidden-phone dateColumn" },
				            { "sTitle": "Lugar", "sClass": "hidden-phone placeColumn" },
				            { "sTitle": "Descripción" },
				            { "sTitle": "Enlace" },
				            { "sTitle": ""  }
				            
				        ],
				        "aaSorting": [], // No initial sorting
						"sPaginationType": "bootstrap",
			            "oLanguage": {
			                "sLengthMenu": "_MENU_ por página",
			                "oPaginate": {
			                    "sPrevious": "Anterior",
			                    "sNext": "Siguiente"
			                }
			            },
			            "fnDrawCallback": function(oSettings, json) {
							loadingPlaceholder.fadeOut(function(){
							    tablePlaceHolder.fadeIn();
							});

							eventTable.find('.deleteRow').click(function(){
								deleteEvent($(this).data('objectid'));
								return false;
							});
					    }
					} );

	            },
	            error: function (collection, error) {
	                // The collection could not be retrieved.
	            }
	        });

}

function deleteEvent(objectId){
	if(confirm('¿Está seguro de eliminar este registro?')) {
		var Event = Parse.Object.extend("Event");
		var query = new Parse.Query(Event);
		query.get(objectId, {
		  success: function(myObject) {
		    // The object was retrieved successfully.
		    myObject.destroy({
			  success: function(myObject) {
			    // The object was deleted from the Parse Cloud.
			    alert('Registro eliminado correctamente');
			    initEventList();
			  },
			  error: function(myObject, error) {
			    // The delete failed.
			    // error is a Parse.Error with an error code and description.
			    alert('Se ha producido un error eliminando el registro');
			  }
			});
		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and description.
		    alert('Se ha producido un error recuperando el registro');
		  }
		});
	}	
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
	menuOp.find('.lst').addClass('active');
	title.parent().append('<span class="selected"></span>');

	var titleText = title.text();
	$('.titlePlaceholder').text(titleText);

	var urlSection = window.location;
	$('.lnkPlaceholder').attr("href", urlSection);
}