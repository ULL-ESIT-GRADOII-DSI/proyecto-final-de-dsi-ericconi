(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it


            
          
                   
              
        
 
    $(document).ready(() => {
        $("#save").click(() => {
                  $.get("/save", {
                    titulo: $("#fname").val(),
                    content: $("#original").val()
                   });
            
        });
        
        
        $.get('/buscarSeguidores',function(data){
            var i,l;
            //console.log(data)
            for (l in data){
                for (i in l){
                    $('#seg').append(data[l].name  + ' ')
                }
            }
                
                
        });
        
        $("#edit").click(() => {
            $("#form_input").css("display","inherit");
            $("#saveima").css("display","inherit");
            $("#edit").css("display","none");
             
            
        });
        
         $('.seguir').click(() => {
       
            $.get('/seguir',{"creador": $('.seguir').attr('id')});
         
         });
         /*
         $("#like").click(() =>{
             $.get('/like',{"creador": $("#like").attr('id')});
         });*/
         
    });

   $(window).load(function (){
    var i = setInterval(function ()
    {
        if ($('.center').length)
        {
            clearInterval(i);
            $('.center').each( (_,y) => {
                var tit =  $(y).attr('id');
                var val =  $(y).attr('value');
                $(y).click(() => { 
                         $.get("/buscar",{
                             titulo: tit,
                             creador: val});
                });
                 
            });
           
           $('.borrar').each( (_,y) => {
                var tit =  $(y).attr('value');
                $(y).click(() => { 
                         $.get("/borrar",{
                             titulo: tit
                             });
                        window.location.reload();
                             
                });
                 
            });
           
        }
    }, 100);
});
})();