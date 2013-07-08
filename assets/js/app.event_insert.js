
$(initEvent);

function initEvent() {

Parse.initialize("rsHSnes1jOsyo41HrTUrJsMVWinxjc3d39BEt2Ot", "L0tuiwffSYyPomR5WLCK1LU8qKX9Riip67eSlwqb");
    
    var type = getURLParameter('type');
    if(type)
      activateMenuOption(type);

    var objectId = getURLParameter("id");


      $('#createEvent').click(function(e){


         if (!objectId) {
        
          e.preventDefault();
          createEvent();
        
      
      } else if (objectId) {


        e.preventDefault();
        updateEvent(objectId);

      }



    });

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
  menuOp.find('.det').addClass('active');
  title.parent().append('<span class="selected"></span>');

  var titleText = title.text();
  $('.titlePlaceholder').text(titleText);

  var urlSection = window.location;
  $('.lnkPlaceholder').attr("href", urlSection);
}