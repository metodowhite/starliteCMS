
$(initArtist);

function initArtist() {

Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");
    
    var getParameter = location.search.substring(1);
    var arrObjectId = getParameter.split('=');
    var objectId = arrObjectId[1];


      $('#createArtist').click(function(e){
        
         
        
        

         if (!objectId) {
        
          e.preventDefault();
          createArtist();
        
        

      } else if (objectId) {


        e.preventDefault();

        updateArtist(objectId);


      }



    });

}
