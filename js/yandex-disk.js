
function fileclick(){
	//$(this).addClass('activefile');
	console.log('activefile');
	$(".file").removeClass('activefile');

}


		
function show_file_system( dir, updir ){
	

 $.ajax(
        'https://cloud-api.yandex.net/v1/disk/resources?path=' + dir, {
            type: 'GET',
            dataType: 'json',
            beforeSend: function(xhr) {
            	console.log("1");
                xhr.setRequestHeader("Authorization", $("#token").val())
            },
            complete: function(resp) {
            	
             //   console.log(resp.responseJSON.user.login);
                console.log(resp.responseJSON._embedded);
                //updir2 = updir;
             	  uparr = updir.split('/');
                
                    
                console.log("len = "+uparr.length);
                    console.log(uparr[0]);
                    console.log(uparr[1]);
                    var updir2 = "disk:";
                    count = 0;
                    for(var i = 1; i < uparr.length - 2; i++){
                      updir2 = updir2 + "/" + uparr[i]; 
                      count ++;
                    }
                    if (count == 0 ){
                      updir2 = updir2 + "/";
                    }

                root_visible = "";
				        root_visible = root_visible + "<li><div class='directory'  onclick = \"show_file_system('"+updir+"', '"+updir2+"')\" > .. </div>";
               resp.responseJSON._embedded.items.forEach(function(item, i, arr) {


        					is_dir = "class='file'";

							if(item.type == "dir"){
								is_dir = "class='directory'  onclick = \"show_file_system('"+item.path+"', '" + resp.responseJSON._embedded.path + "')\"";
							}



               				root_visible = root_visible + "<li><div "+ is_dir +"  onclick = \"fileclick(); $(this).addClass('activefile');\" >"+item.name+"</div>";
  							console.log( i + ": " + item.name);
  						
							root_visible = root_visible + "</li>";

				});

               $("ul#menu").html(root_visible);
               $("#root").text(resp.responseJSON._embedded.path); 
		

					$(".fileview").click(function(){

						//$(".fileview").removeClass('activefile');
					//	$(this).addClass("activefile");
						console.log('fileview');

					});
               // $("#root").text(dir);
              //  $("#email").text(resp.responseJSON.user.login+"@yandex.ru");

               // console.log(resp.responseJSON.system_folders);
                
            },



            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        }
    );

	


}












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
             //   console.log(resp.responseJSON);
                $("#email").text(resp.responseJSON.user.login+"@yandex.ru");

                console.log(resp.responseJSON.system_folders);
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        }
    );







 $.ajax(
        'https://cloud-api.yandex.net/v1/disk/resources?path=disk:/', {
            type: 'GET',
            dataType: 'json',
            beforeSend: function(xhr) {
            	console.log("1");
                xhr.setRequestHeader("Authorization", $("#token").val())
            },
            complete: function(resp) {
            	
             //   console.log(resp.responseJSON.user.login);
                console.log(resp.responseJSON._embedded.path);
             	
                root_visible = "";
				

              root_visible = root_visible + "<li><div class='directory'  onclick = \"show_file_system('disk:/', '" + resp.responseJSON._embedded.path + "')\" ></div>";


               resp.responseJSON._embedded.items.forEach(function(item, i, arr) {


        					is_dir = "class='file'";

							if(item.type == "dir"){
								is_dir = "class='directory'  onclick = \"show_file_system('"+item.path+"', '" + resp.responseJSON._embedded.path + "')\"";
							}



               				root_visible = root_visible + "<li><div "+ is_dir +" onclick = \"fileclick(); $(this).addClass('activefile');\">"+item.name+"</div>";
  							console.log( i + ": " + item.name);
  						
							root_visible = root_visible + "</li>";

				});

               $("ul#menu").html(root_visible);
               $("#root").text("disk:/");
               console.log("disk"); 
              //  $("#email").text(resp.responseJSON.user.login+"@yandex.ru");

               // console.log(resp.responseJSON.system_folders);
                
            },



            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        }
    );

	

  
  $( "ul#menu" ).menu();

}








$(document).ready(function(){

	bootstrap();


$("#enter").click(function(){

  bootstrap();

});



});


