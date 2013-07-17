



function createArtist(){

	Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");

          var name = $("#txtName");

          if (name.val().length <= 0) {
            name.css('border', '1px solid red');
            name.siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
          }

          var link_es = $("#txtLinkES").val();

          if (link_es.length <= 0) {

            $('#txtLinkES').css('border', '1px solid red');
            $('#txtLinkES').siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
            

          }

          var link_en = $("#txtLinkEN").val();

          if (link_en.length <= 0) {

            $('#txtLinkEN').css('border', '1px solid red');
            $('#txtLinkEN').siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
            

          }

          var desc = $("#txtDesc").val();

          if (desc.length <= 0) {

            $('#txtDesc').css('border', '1px solid red');
            $('#txtDesc').siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
            

          }
          var place = $("#txtPlace").val();

          if (place.length <= 0) {

            $('#txtPlace').css('border', '1px solid red');
            $('#txtPlace').siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
            

          }
          var latitude = parseFloat($("#txtLat").val());

          if (latitude.length <= 0) {

            $('#txtLat').css('border', '1px solid red');
            $('#txtLat').siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
            

          } else if (!$.isNumeric(latitude)) {
            $('#txtLat').css('border', '1px solid red');
            $('#txtLat').siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
          }
          var longitude = parseFloat($("#txtLong").val());

          if (longitude.length <= 0) {

            $('#txtLong').css('border', '1px solid red');
            $('#txtLong').siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
            

          } else if (!$.isNumeric(latitude)) {
            $('#txtLong').css('border', '1px solid red');
            $('#txtLong').siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
          }


          var eventDate = $('#txtDate').val();

          if (eventDate.length <= 0) {

            $('#txtDate').css('border', '1px solid red');
            $('#txtDate').css('color', 'red');
            
            $('#txtDate').siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
            

          }

          var eventTime = $('#txtTime').val();

          if (eventTime.length <= 0) {

            $('#txtTime').css('border', '1px solid red');
            $('#txtTime').css('color', 'red');
            
            $('#txtTime').siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
            

          }

          if (name && link_en && link_es && desc && place && latitude && longitude && eventDate && eventTime) {

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

                artistObject.save({name: name, place: place, description: desc, geoLocation: point, link_en: link_en, link_es: link_es, eventDate: finalDate, image: parseFile}, {
                  success: function(object) {

                   alert('estoy en update 1');
                    window.location.href = "artist_list.html";
                  
                  },
                  error: function(model, error) {
                      alert('No se han podido guardar los datos');
                }

               });

          });

        }else{
          alert('Debe Completar todos los datos');
        }
}