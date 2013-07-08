


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

    var name = $("#txtName").val();
    var link = $("#txtLink").val();
    var desc = $("#txtDesc").val();
    var place = $("#txtPlace").val();
    var latitude = parseFloat($("#txtLat").val());
    var longitude = parseFloat($("#txtLong").val());
    var eventDate = $('#txtDate').val();
    var eventTime = $('#txtTime').val();
    var type = $("#hiddenType").val();


    console.log(eventDate);
    console.log(eventTime);
    console.log(name);
    console.log(link);
    console.log(place);
    console.log(desc);
    console.log(latitude);
    console.log(longitude);

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

    console.log(month);
    console.log(day);
    console.log(year);
    var timeArray = eventTime.split(':');
    var finalDate = new Date(year, month, day, timeArray[0], timeArray[1], 0, 0); 

    console.log(timeArray);
    console.log(finalDate);
  

    var point = new Parse.GeoPoint(latitude, longitude);

    console.log(point);
  
    
    var fileUploadControl = $("#profilePhotoFileUpload")[0];

    if (fileUploadControl.files.length > 0) {
      var file = fileUploadControl.files[0];
      var photoName = "photo.jpg";
     
      var parseFile = new Parse.File(photoName, file);
    }
    
    parseFile.save().then(function(){

      object.save(null, {
        success: function (contact) {


          console.log('secondo success');

          contact.set("name", name);
          contact.set("link", link);
          contact.set("description", desc);
          contact.set("place", place);
          contact.set("geoLocation", point);
          contact.set("eventDate", finalDate);
          
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

    });

    

  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }


});
  

}

