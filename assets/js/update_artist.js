


function editArtist() {

Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");
    
    var getParameter = location.search.substring(1);
    var arrObjectId = getParameter.split('=');
    var objectId = arrObjectId[1];

    
    if (objectId) {

    $('#createArtist').click(function(e){
      
      e.preventDefault();


      var name = $("#txtName").val();
      var link = $("#txtLink").val();
      var desc = $("#txtDesc").val();
      var place = $("#txtPlace").val();
      var latitude = parseFloat($("#txtLat").val());
      var longitude = parseFloat($("#txtLong").val());
      var eventDate = $('#txtDate').val();
      var eventTime = $('#txtTime').val();


      if (name && link && desc && place && latitude && longitude && eventDate && eventDate) {

      var timeArray = eventTime.split(':');
       
      var point = new Parse.GeoPoint(latitude, longitude);

      if (eventDate.charAt(2)=='/') {

        var dateArray = eventDate.split('/');
        
        var month = dateArray[0] - 1; 
        var day = dateArray[1];
        var year = dateArray[2];

      } else if (eventDate.charAt(2)=='-') {

        var dateArray = eventDate.split('-');

        var month = dateArray[1] - 1; 
        var day = dateArray[0];
        var year = dateArray[2];

      };

      var finalDate = new Date(year, month, day, timeArray[0], timeArray[1], 0, 0); 

      

      var fileUploadControl = $("#profilePhotoFileUpload")[0];
      if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var photoName = "photo.jpg";
       
        var parseFile = new Parse.File(photoName, file);
      }

      parseFile.save().then(function() {
         
         $('#createArtist').css('visibility', 'hidden');
         $('.loadingImage').css('visibility', 'visible');

         var ArtistObject = Parse.Object.extend("Artist");
         

          var query = new Parse.Query(ArtistObject);
          query.equalTo('objectId', objectId);

          query.first({
            success: function(object) {
              // The object was retrieved successfully.

              alert('estoy en la query');

              object.set('name', name);
              object.set('description', desc);
              object.set('link', link);
              object.set('place', place);
              object.set('image', parseFile);
              object.set('eventDate', finalDate);
              object.set('geoLocation', point);

              object.save();
              
              window.location.href = "artist_list.html";


            },
            error: function(object, error) {
              // The object was not retrieved successfully.
              // error is a Parse.Error with an error code and description.
               alert('No se ha podido recuperar el artista');
          }

       });

      });

    }else{
      alert('Debe Completar todos los datos');
    }
    });

  }

}