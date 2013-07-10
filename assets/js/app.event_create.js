



function createEvent(){

	Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");

          var nameES = $("#txtNameES").val();

          if (nameES.length <= 0) {
            $("#txtNameES").css('border', '1px solid red');
            $("#txtNameES").siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
          }

          var nameEN = $("#txtNameEN").val();

          if (nameEN.length <= 0) {
            $("#txtNameEN").css('border', '1px solid red');
            $("#txtNameEN").siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
          }

          var link = $("#txtLink").val();

          if (link.length <= 0) {

            $('#txtLink').css('border', '1px solid red');
            $('#txtLink').siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
            

          }
          var descES = $("#txtDescES").val();

          if (descES.length <= 0) {

            $('#txtDescES').css('border', '1px solid red');
            $('#txtDescES').siblings().css('visibility', 'visible');
            $('.icon-exclamation-sign').css('color', 'red');
            

          }

          var descEN = $("#txtDescEN").val();

          if (descEN.length <= 0) {

            $('#txtDescEN').css('border', '1px solid red');
            $('#txtDescEN').siblings().css('visibility', 'visible');
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


          var type = getURLParameter('type');


          if (nameES && nameEN && link && descEN && descES && place && latitude && longitude && eventDate && eventTime && type) {

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
             
             $('#createEvent').css('visibility', 'hidden');
             $('.loadingImage').css('visibility', 'visible');

             var EventObject = Parse.Object.extend("Event");
                var eventObject = new EventObject();

                eventObject.save({name_en: nameEN, name_es: nameES, place: place, description_es: descES,description_en: descEN, geoLocation: point, link: link, eventDate: finalDate, image: parseFile, type: type}, {
                  success: function(object) {
                    window.location.href = "event_list.html?type=" + type;
                  
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

