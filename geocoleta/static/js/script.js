$(document).ready(function(){

    var lat = -21.228686966943123;
    var lng = -43.767511546611786;
    var accuracy = 999999;
   

    geolocation = function(){
        navigator.geolocation.getCurrentPosition(get_location, handle_error);
    }

    get_location = function(position){
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        accuracy = position.coords.accuracy;
    }
   
    handle_error = function(error){
        var PERMISSION_DENIED = 1;
        var POSITION_UNAVAILABLE = 2;
        var TIMEOUT = 3;
        
        alert('erro');
        
        if (error.code == PERMISSION_DENIED){
            alert('why not?');
        }
    }
    

    // Eventos do menu

    $('#opt_atualizar').click(function(){
        //alert('atualizar');
        //$('#panel').html(cache_main_menu);       
        //$('#panel').trigger('updatelayout');
    });

    $('#opt_infra').click(function(){
        $.get('ajax_infraestrutura', function(data){
            $('#main_list').hide();
            $('#panel').prepend(data).trigger('create');
            $('#panel').trigger('updatelayout');
        });
    });

    $('#opt_locais').click(function(){
        $.get('ajax_locais_coleta', function(data){
            $('#main_list').hide();
            $('#panel').prepend(data).trigger('create');
            $('#panel').trigger('updatelayout');
        });
    });

    $('#opt_noticias').click(function(){
        $.get('ajax_noticias', function(data){
            $('#main_list').hide();
            $('#panel').prepend(data).trigger('create');
            $('#panel').trigger('updatelayout');
        });
    });

    $('#opt_descartes').click(function(){
        alert('descartes');
    });

    $('#opt_coletores').click(function(){
        alert('coletores');
    });



    /* Inicialização das funcionalidades */

    // Inicia a detecção da localização do usuário
    geolocation();
    

    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 22,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

    user = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            //icon: new google.maps.MarkerImage("/static/img/user.png")
    });

    /* Desenha as coordenadas */
    var coords_sede = [
        new google.maps.LatLng(-21.228004410394462, -43.76750886440277),
        new google.maps.LatLng(-21.228516953153143, -43.76747399568558),
        new google.maps.LatLng(-21.228516953153143, -43.767428398132324),
        new google.maps.LatLng(-21.228631962503105, -43.767428398132324),
        new google.maps.LatLng(-21.228621961693626, -43.76735866069794),
        new google.maps.LatLng(-21.228516953153143, -43.767374753952026), 
        new google.maps.LatLng(-21.22851445294888, -43.76722723245621),
        new google.maps.LatLng(-21.228541955193375, -43.76720577478409),
        new google.maps.LatLng(-21.228524453765658, -43.767001926898956),
        new google.maps.LatLng(-21.22848195028969, -43.76700460910797),
        new google.maps.LatLng(-21.22847194947005, -43.76684635877609),
        new google.maps.LatLng(-21.228256931683497, -43.76686781644821),
        new google.maps.LatLng(-21.228246930848602, -43.76678466796875),        
        new google.maps.LatLng(-21.228331937923713, -43.76676857471466),
        new google.maps.LatLng(-21.228331937923713, -43.7666130065918),
        new google.maps.LatLng(-21.228061915280477, -43.766639828681946),
        new google.maps.LatLng(-21.228071916127934, -43.7668839097023),
        new google.maps.LatLng(-21.227959406554984, -43.766897320747375),
    ];

    var place_sede = new google.maps.Polygon({
        paths: coords_sede,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.25
    });

    place_sede.setMap(map);

   //Biblioteca
    var coords_biblioteca = [
        new google.maps.LatLng(-21.228526953969734, -43.76678466796875),
        new google.maps.LatLng(-21.228569457432723, -43.766787350177765), 
        new google.maps.LatLng(-21.22867946633889, -43.7667390704155), 
        new google.maps.LatLng(-21.22853445458175, -43.766409158706665),
        new google.maps.LatLng(-21.228416944949828, -43.76647084951401), 
        new google.maps.LatLng(-21.228424445567434, -43.766540586948395),     
   ];
   
    var place_biblioteca = new google.maps.Polygon({
        paths: coords_biblioteca,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
    });
    
    place_biblioteca.setMap(map);
    
    //DAP
    var coords_dap = [
        new google.maps.LatLng(-21.227881899910372, -43.76578688621521),
        new google.maps.LatLng(-21.22799940996853, -43.76571714878082),
        new google.maps.LatLng(-21.22784189646495, -43.76546770334244),
        new google.maps.LatLng(-21.2278018930087, -43.76547574996948),
        new google.maps.LatLng(-21.227799392792335, -43.76547306776047),
        new google.maps.LatLng(-21.227704384538598, -43.76553475856781),
        new google.maps.LatLng(-21.22785689775826, -43.765778839588165),
          
        
    ];
    
    var place_dap = new google.maps.Polygon({
         paths: coords_dap,
         strokeColor: "#FF0000",
         strokeOpacity: 0.8,
         strokeWeight: 0.5,
         fillColor: "#FF0000",
         fillOpacity: 0.5
     });
     
     place_dap.setMap(map);
   
     //Enfermaria
     var coords_enfermaria = [
        new google.maps.LatLng(-21.227711885192434, -43.76549184322357),
        new google.maps.LatLng(-21.22783689603352, -43.76541942358017),
        new google.maps.LatLng(-21.227721886063627, -43.76520484685898),
        new google.maps.LatLng(-21.22766938148233, -43.76522362232208),
        new google.maps.LatLng(-21.22763437841776, -43.765148520469666),
        new google.maps.LatLng(-21.227581873805317, -43.76516729593277),
        new google.maps.LatLng(-21.227616876882365, -43.76525044441223),
        new google.maps.LatLng(-21.227576873365074, -43.76527726650238),
        new google.maps.LatLng(-21.227679382356396, -43.76548647880554),
        new google.maps.LatLng(-21.22770188432058, -43.76548111438751),
        
        
     ];
     var place_enfermaria = new google.maps.Polygon({
        paths: coords_enfermaria,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
     });
     place_enfermaria.setMap(map);

    /* Eventos no mapa */

    google.maps.event.addListener(user, 'dragend', function(){
        //user.getPosition().lng()
        map.setCenter(user.getPosition());
        var pos = user.getPosition();
        alert(pos.lat() + ', ' + pos.lng());
    });

    google.maps.event.addListener(map, 'click', function(ev){
        //alert(ev.latLng.lat() + ', ' + ev.latLng.lng());
    });

    google.maps.event.addListener(place_sede, 'click', function(){
        alert('PRÉDIO SEDE');
    });

    /* Carrega os coletores */
    for(i=0; i < coletores.length; i++) {  
        var marker = new google.maps.Marker({
            position: coletores[i],
            map: map,
            icon: new google.maps.MarkerImage("/static/img/lixeira.png")
        });
    }

    //$("#panel").panel("open");
});
