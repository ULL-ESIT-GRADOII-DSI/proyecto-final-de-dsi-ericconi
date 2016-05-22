//(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it


            
          
                   
              
        
 
    $(document).ready(() => {
        $("#save").click(() => {
                  $.get("/save", {
                    titulo: $("#fname").val(),
                    content: $("#original").val()
                   });
            
        });
         //$('.click_inicio').each( (_,y) => {
             
               $('tr').click(() => { 
                     console.log("hola");
                     $.get("/visualizar")/*,{titulo: $('tr > td > # + '  + y + '1') ,creador:  $('tr > td > #' + y + '2')},(readData) => {
                       console.log("gola");
                     });*/
                });
         //});
        
        //$.get("visualizar",{json[l].titulo,json[l]._creator.name};' + ');"
        
        
        $("#edit").click(() => {
            $("#form_input").css("display","inherit");
            $("#saveima").css("display","inherit");
             $("#edit").css("display","none");
             
            
        });
        
    
          
    });
   $(document).ready(function() { 
  $(window).load(function() { 
     //insert all your ajax callback code here. 
     //Which will run only after page is fully loaded in background.

         
    });
   });
   $(window).load(function (){
    var i = setInterval(function ()
    {
        if ($('.center').length)
        {
            clearInterval(i);
             $('tr').click(() => { 
                     $.get("/visualizar")/*,{titulo: $('tr > td > # + '  + y + '1') ,creador:  $('tr > td > #' + y + '2')},(readData) => {
                            console.log("hola");
                     });*/
                });
            // safe to execute your code here
        }
    }, 100);
});
//})();