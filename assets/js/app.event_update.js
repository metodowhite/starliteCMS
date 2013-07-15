


function updateEvent(objectId) {

Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");
    
    
console.log("objectId:", objectId);

var Event = Parse.Object.extend("Event");
var query = new Parse.Query(Event);

query.equalTo("objectId", objectId);

query.first({
  success: function(object) {

    // Successfully retrieved the object.
    
    $('#createEvent').css('visibility', 'hidden');
    $('.loadingImage').css('visibility', 'visible');
    
    console.log('success');

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
    var type = $("#hiddenType").val();



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

      }

    
    var timeArray = eventTime.split(':');
    var finalDate = new Date(year, month, day, timeArray[0], timeArray[1], 0, 0); 

  
  

    var point = new Parse.GeoPoint(latitude, longitude);


  
    
    var fileUploadControl = $("#profilePhotoFileUpload")[0];

    if (fileUploadControl.files.length > 0) {
      var file = fileUploadControl.files[0];
      var photoName = "photo.jpg";
     
      var parseFile = new Parse.File(photoName, file);
    }

    var fileUploadControlMini = $("#profilePhotoFileUploadMini")[0];
          
          if (fileUploadControlMini.files.length > 0) {
            var file = fileUploadControlMini.files[0];
            var photoName = "photomini.jpg";
           
            var parseFileMini = new Parse.File(photoName, file);
    }

    if (parseFile){
      parseFile.save().then(function(){
        if (parseFileMini) {
          parseFileMini.save().then(function() {
              saveObject(object,type, nameES, nameEN, link, descES, descEN, place, point, finalDate, parseFileMini, parseFile);
          });
        }else{
          saveObject(object,type, nameES, nameEN, link, descES, descEN, place, point, finalDate, null, parseFile);
        }
      });

    }else{
      saveObject(object, type, nameES, nameEN, link, descES, descEN, place, point, finalDate, null, null);
    }

    

  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }


});


  

}


function saveObject(object, type, nameES, nameEN, link, descES, descEN, place, point, finalDate, parseFileMini, parseFile){


  object.save(null, {
    success: function (contact) {


      console.log('secondo success');

      contact.set("name_es", nameES);
      contact.set("name_en", nameEN);
      contact.set("link", link);
      contact.set("description_es", descES);
      contact.set("description_en", descEN);
      contact.set("place", place);
      contact.set("geoLocation", point);
      contact.set("eventDate", finalDate);
      if (parseFileMini) 
        contact.set("image_th", parseFileMini);
      if (parseFile)
        contact.set("image", parseFile);

      contact.save(null, {

        success: function(object){
          console.log('llamado con exito: evento modificado');
          window.location.href="event_list.html?type=" + type;
        },

        error: function(object, error){
          console.log('no se ha podido modificar el evento');
        }

      });

    }
  });

}

