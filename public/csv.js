//(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it


            
          
                   
              
        
 
    $(document).ready(() => {
        $("#save").click(() => {
                  $.get("/save", {
                    titulo: $("#fname").val(),
                    content: $("#original").val()
                   });
            
        });
        
        
        
        $("#edit").click(() => {
            $("#form_input").css("display","inherit");
            $("#saveima").css("display","inherit");
             $("#edit").css("display","none");
             
            
        });
        
    
          
    });

   $(window).load(function (){
    var i = setInterval(function ()
    {
        if ($('.center').length)
        {
            clearInterval(i);
            $('.center').each( (_,y) => {
                console.log($(y))
                var tit =  $(y).attr('id');
                var val =  $(y).attr('value');
                $(y).click(() => { 
                         $.get("/buscar",{
                             titulo: tit,
                             creador: val});
                });
            
            });
        }
    }, 100);
});
//})();