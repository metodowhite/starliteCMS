$(initArtistList);

function initArtistList(){

Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");

	        // A Collection containing all instances of TestObject.
	        var ArtistCollection = Parse.Collection.extend({
	            model: 'Artist'
	        });
	        var artistCollection = new ArtistCollection();

			var arr = new Array();

	        artistCollection.fetch({
	            success: function (collection) {

	                collection.each(function (object) {
	                    var image = object.attributes.image ? '<img src="' + object.attributes.image.url() + '" style="max-width: 150px;">' : '';
	                    var description = object.attributes.description ? object.attributes.description : '';
	                    var name = object.attributes.name ? object.attributes.name : '';
	                    var eventDate = object.attributes.eventDate ? object.attributes.eventDate.toString("dd-MM-yyyy") : '';
	                    var eventHour = object.attributes.eventDate ? object.attributes.eventDate.toString("HH:mm") : '';

	                    var place = object.attributes.place ? object.attributes.place : '';
	                    var geoLocation = object.attributes.geoLocation ? object.attributes.geoLocation : '';
	                    
	                    if (geoLocation) 
	                    	place += '<br>' + 'Lat: ' + geoLocation.latitude + '<br> Long: ' + geoLocation.longitude;

	                    var editAction = '<a href="artist_detail.html?id=' + object.id + '" class="btn mini purple"><i class="icon-edit"></i></a>';
	                    var deleteAction = '<a href="#delete" data-objectid="' + object.id + '" class="deleteRow btn mini black"><i class="icon-trash"></i> </a>';
	                    var link = object.attributes.link ? '<a href = "' + object.attributes.link + '">Visitar</a>' : '';
	                    var element = [];
	                    
	                    element.push(name + '<br>' + image);
	                    element.push(eventDate + '<br>' + eventHour);
	                    element.push(place);
	                    element.push(description);
	                    element.push(editAction + " " + deleteAction);
	                    element.push(link);
	                    element.push(deleteAction);
	                    arr.push(element);
	                });

					var loadingPlaceholder = $('#loadingPlaceholder');
					var tablePlaceHolder = $('#tablePlaceHolder')
					var tbl = '<table class="table table-striped table-bordered" id="artistTable" ></table>';
					
					tablePlaceHolder.hide();
					tablePlaceHolder.html(tbl);
					var artistTable = tablePlaceHolder.find('#artistTable');
					artistTable.dataTable( {
						"aaData": arr,
				        "aoColumns": [
				            { "sTitle": "Nombre" , "sClass": "firstColumn" },
				            { "sTitle": "Fecha", "sClass": "hidden-phone dateColumn" },
				            { "sTitle": "Lugar", "sClass": "hidden-phone placeColumn" },
				            { "sTitle": "Descripción" },
				            { "sTitle": "Enlace"  },
				            { "sTitle": "" }
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
			            "fnInitComplete": function(oSettings, json) {
							loadingPlaceholder.fadeOut(function(){
							    tablePlaceHolder.fadeIn();
							});

							artistTable.find('.deleteRow').click(function(){
								deleteArtist($(this).data('objectid'));
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

function deleteArtist(objectId){
	if(confirm('¿Está seguro de eliminar este registro?')) {
		var Artist = Parse.Object.extend("Artist");
		var query = new Parse.Query(Artist);
		query.get(objectId, {
		  success: function(myObject) {
		    // The object was retrieved successfully.
		    myObject.destroy({
			  success: function(myObject) {
			    // The object was deleted from the Parse Cloud.
			    alert('Registro eliminado correctamente');
			    initArtistList();
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