

function bootstrap(){

 $.ajax(
        'https://cloud-api.yandex.net/v1/disk', {
            type: 'GET',
            dataType: 'json',
            beforeSend: function(xhr) {
            	console.log("1");
                xhr.setRequestHeader("Authorization", $("#token").val())
            },
            complete: function(resp) {
            	
             //   console.log(resp.responseJSON.user.login);
                console.log(resp.responseJSON);
                $("#email").text(resp.responseJSON.user.login+"@yandex.ru");

                console.log(resp.responseJSON.system_folders);
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        }
    );



 $.ajax(
        'https://cloud-api.yandex.net/v1/disk/resources?path=/', {
            type: 'GET',
            dataType: 'json',
            beforeSend: function(xhr) {
            	console.log("1");
                xhr.setRequestHeader("Authorization", $("#token").val())
            },
            complete: function(resp) {
            	
             //   console.log(resp.responseJSON.user.login);
                console.log(resp.responseJSON._embedded);

                root_visible = "";

               resp.responseJSON._embedded.items.forEach(function(item, i, arr) {
  							console.log( i + ": " + item.name);

							root_visible = root_visible + "<li><div>"+item.name+"</div></li>";

				});

               $("ul#menu").html(root_visible);

                
              //  $("#email").text(resp.responseJSON.user.login+"@yandex.ru");

               // console.log(resp.responseJSON.system_folders);
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        }
    );

		




    $( "#menu" ).menu();


}








$(document).ready(function(){

	bootstrap();

});


$("#enter").click(function(){

	bootstrap();

});

