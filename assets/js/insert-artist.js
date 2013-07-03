Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");
    

    $('#createArtist').click(function(){
       
      
      var name = $("#txtName").val();
      var link = $("#txtLink").val();
      var desc = $("#txtDesc").val();
      var place = $("#txtPlace").val();
      var latitude = parseFloat($("#txtLat").val());
      var longitude = parseFloat($("#txtLong").val());
      var eventDate = $('#txtDate').val();
      var eventTime = $('#txtTime').val();
      
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
            var artistObject = new ArtistObject();

            artistObject.save({name: name, place: place, description: desc, geoLocation: point, link: link, eventDate: finalDate, image: parseFile}, {
              success: function(object) {

               
                window.location.href = "success.html";
              
              },
              error: function(model, error) {
                  alert('No se han podido guardar los datos');
            }

           });

      });

    });