


function updateArtist() {

Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");
    
  alert('estoy en update');

  var getParameter = location.search.substring(1);
  var arrObjectId = getParameter.split('=');
  var objectId = arrObjectId[1];

  console.log(objectId);
  alert(objectId);

  var GameScore = Parse.Object.extend("Artist");
  var query = new Parse.Query(GameScore);

  console.log(query);

  query.equalTo("name", "Paco3");

  query.first({

    success: function(object) {
      // Successfully retrieved the object.

      alert('funziona');

    },

    error: function(error) {

      alert("Error: " + error.code + " " + error.message);

    }
  });

  

}