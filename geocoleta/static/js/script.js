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
     
     //Química
     var coords_quimica = [
        new google.maps.LatLng(-21.2274293603013, -43.764177560806274),
        new google.maps.LatLng(-21.22745686274811, -43.76384228467941),
        new google.maps.LatLng(-21.227266845738235, -43.76382619142532),
        new google.maps.LatLng(-21.227236843030102, -43.764161467552185),
     ];
     var place_quimica = new google.maps.Polygon({
        paths: coords_quimica,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5   
     });
     place_quimica.setMap(map);
     
     
     //Informática
     var coords_informatica = [
        new google.maps.LatLng(-21.22746186319244, -43.7638396024704),
        new google.maps.LatLng(-21.22750436696233, -43.76337558031082),
        new google.maps.LatLng(-21.2275293691742, -43.76322269439697),
        new google.maps.LatLng(-21.227346852930143, -43.763185143470764),
        new google.maps.LatLng(-21.227316850238267, -43.76334339380264),
        new google.maps.LatLng(-21.227266845738235, -43.76382350921631),
     ];
     var place_informatica = new google.maps.Polygon({
        paths: coords_informatica,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
     });
     place_informatica.setMap(map); 
     
     
     //auditorioII
      var coords_auditorioII = [
        new google.maps.LatLng(-21.227629377979284, -43.76554548740387),
        new google.maps.LatLng(-21.227521868511086, -43.765317499637604),
        new google.maps.LatLng(-21.227446861858965, -43.7653523683548),
        new google.maps.LatLng(-21.227556871602356, -43.76558572053909),
      ];
      var place_auditorioII = new google.maps.Polygon({
        paths: coords_auditorioII,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
        
      });
      place_auditorioII.setMap(map);
      

      //Laboratório de Solos
       var coords_labSolos = [
        new google.maps.LatLng(-21.228011911033043, -43.76661032438278),
        new google.maps.LatLng(-21.227989409116176, -43.766419887542725),
        new google.maps.LatLng(-21.227876899480304, -43.7664332985878),
        new google.maps.LatLng(-21.22789190077003, -43.766623735427856),
       ];
       var place_labSolos = new google.maps.Polygon({
        paths: coords_labSolos,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5     
       });
       place_labSolos.setMap(map);
       
       //Garagem
       var coords_garagem = [
        new google.maps.LatLng(-21.230764619634144, -43.76743108034134),
        new google.maps.LatLng(-21.23078462096185, -43.767313063144684),
        new google.maps.LatLng(-21.23078462096185, -43.76721650362015),
        new google.maps.LatLng(-21.230519603149492, -43.7672084569931),
        new google.maps.LatLng(-21.230504602127013, -43.76734793186188),
        new google.maps.LatLng(-21.230467099564127, -43.76735061407089),
        new google.maps.LatLng(-21.2304595990504, -43.76741498708725),
       ];
       var place_garagem = new google.maps.Polygon({
        paths: coords_garagem,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5      
       });
       place_garagem.setMap(map);
 
      //Refeitório
      var coords_refeitorio = [
        new google.maps.LatLng(-21.228099418454935, -43.7666317820549),
        new google.maps.LatLng(-21.228334438131057, -43.7666130065918),
        new google.maps.LatLng(-21.22834693916719, -43.7666130065918),
        new google.maps.LatLng(-21.228356939995304, -43.76661032438278),
        new google.maps.LatLng(-21.228369441029507, -43.76659959554672),
        new google.maps.LatLng(-21.228371941236226, -43.76659154891968),
        new google.maps.LatLng(-21.228369441029507, -43.7665781378746),
        new google.maps.LatLng(-21.22835944020223, -43.766567409038544),
        new google.maps.LatLng(-21.22834693916719, -43.76656472682953),
        new google.maps.LatLng(-21.228336938338362, -43.766556680202484),
        new google.maps.LatLng(-21.22831943688633, -43.766540586948395),
        new google.maps.LatLng(-21.228309436055657, -43.76652717590332),
        new google.maps.LatLng(-21.22829943522431, -43.766513764858246),
        new google.maps.LatLng(-21.228289434392288, -43.7665057182312),
        new google.maps.LatLng(-21.22827443314297, -43.7664869427681),
        new google.maps.LatLng(-21.228254431474856, -43.76646280288696),
        new google.maps.LatLng(-21.228221928758355, -43.76643866300583),
        new google.maps.LatLng(-21.22819942687352, -43.76642256975174),
        new google.maps.LatLng(-21.228174424775247, -43.76640111207962),
        new google.maps.LatLng(-21.228156923303917, -43.766387701034546),
        new google.maps.LatLng(-21.22813192119842, -43.7663796544075),
        new google.maps.LatLng(-21.22811191951097, -43.766376972198486),
        new google.maps.LatLng(-21.228076916551412, -43.7663796544075),
        new google.maps.LatLng(-21.228061915280477, -43.766382336616516),
        new google.maps.LatLng(-21.22804191358355, -43.76639038324356),
        new google.maps.LatLng(-21.228036913158885, -43.766403794288635),
        new google.maps.LatLng(-21.228036913158885, -43.76641720533371),
        new google.maps.LatLng(-21.228034412946492, -43.7664520740509),
        new google.maps.LatLng(-21.228051914432353, -43.7666317820549),
      ];
      var place_refeitorio = new google.maps.Polygon({
        paths: coords_refeitorio,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5  
      });
      place_refeitorio.setMap(map);
      
      // Campo de Futebol
      var coords_CampoFutebol = [
        new google.maps.LatLng(-21.232904746316247, -43.764628171920776),
        new google.maps.LatLng(-21.233127257705195, -43.764255344867706),
        new google.maps.LatLng(-21.233142258460916, -43.76422584056854),
        new google.maps.LatLng(-21.233154759089505, -43.76421242952347),
        new google.maps.LatLng(-21.233169759842415, -43.764193654060364),
        new google.maps.LatLng(-21.233182260468677, -43.76418024301529),
        new google.maps.LatLng(-21.23320476159328, -43.7641641497612),
        new google.maps.LatLng(-21.23322726271447, -43.764150738716125),
        new google.maps.LatLng(-21.2332497638322, -43.76413732767105),
        new google.maps.LatLng(-21.23327476507011, -43.76412391662598),
        new google.maps.LatLng(-21.233307266673034, -43.76411318778992),
        new google.maps.LatLng(-21.233307266673034, -43.76411318778992),
        new google.maps.LatLng(-21.23335226888067, -43.76410782337189),
        new google.maps.LatLng(-21.233382270344798, -43.76410782337189),
        new google.maps.LatLng(-21.233404771438884, -43.76410245895386),
        new google.maps.LatLng(-21.233444773375464, -43.76410514116287),
        new google.maps.LatLng(-21.233477274940935, -43.76411318778992),
        new google.maps.LatLng(-21.23351477673834, -43.76412659883499),
        new google.maps.LatLng(-21.233542278050376, -43.764145374298096),
        new google.maps.LatLng(-21.23356727923869, -43.764161467552185),
        new google.maps.LatLng(-21.23359228042276, -43.764182925224304),
        new google.maps.LatLng(-21.233612281366966, -43.76420438289642),
        new google.maps.LatLng(-21.233632282308463, -43.76422852277756),
        new google.maps.LatLng(-21.2336472830128, -43.764260709285736),
        new google.maps.LatLng(-21.233659783598593, -43.764287531375885),
        new google.maps.LatLng(-21.233677284416903, -43.76433044672012),
        new google.maps.LatLng(-21.233687284883583, -43.764381408691406),
        new google.maps.LatLng(-21.233689785000138, -43.76441091299057),
        new google.maps.LatLng(-21.233687284883583, -43.76443773508072),
        new google.maps.LatLng(-21.233689785000138, -43.76448601484299),
        new google.maps.LatLng(-21.233689785000138, -43.76448601484299),
        new google.maps.LatLng(-21.233672284183303, -43.76454770565033),
        new google.maps.LatLng(-21.233654783364393, -43.76457720994949),
        new google.maps.LatLng(-21.233637282543413, -43.76461207866669),
        new google.maps.LatLng(-21.233604781013206, -43.76467376947403),
        new google.maps.LatLng(-21.23342977265052, -43.76497149467468),
        new google.maps.LatLng(-21.233182260468677, -43.76538723707199),
        new google.maps.LatLng(-21.233164759591613, -43.765411376953125),
        new google.maps.LatLng(-21.233137258209172, -43.76543551683426),
        new google.maps.LatLng(-21.233112256947948, -43.76545429229736),
        new google.maps.LatLng(-21.233079755302033, -43.76547306776047),
        new google.maps.LatLng(-21.233049753776367, -43.76548647880554),
        new google.maps.LatLng(-21.233022252372464, -43.76549452543259),
        new google.maps.LatLng(-21.232989750706718, -43.76550257205963),
        new google.maps.LatLng(-21.23296224929163, -43.76550257205963),
        new google.maps.LatLng(-21.232922247224177, -43.76550257205963),
        new google.maps.LatLng(-21.232897245926488, -43.76550257205963),
        new google.maps.LatLng(-21.232869744494163, -43.76549452543259),
        new google.maps.LatLng(-21.23283224253272, -43.76548111438751),
        new google.maps.LatLng(-21.232809741351257, -43.76546770334244),
        new google.maps.LatLng(-21.23278474003451, -43.76545697450638),
        new google.maps.LatLng(-21.23276473897808, -43.76544088125229),
        new google.maps.LatLng(-21.2327397376537, -43.76541942358017),
        new google.maps.LatLng(-21.23271723645813, -43.765395283699036),
        new google.maps.LatLng(-21.232699735525877, -43.76537382602692),
        new google.maps.LatLng(-21.232684734725144, -43.76534968614578),
        new google.maps.LatLng(-21.23267473419048, -43.76533091068268),
        new google.maps.LatLng(-21.23266473365514, -43.76530408859253),
        new google.maps.LatLng(-21.232657233253178, -43.76528263092041),
        new google.maps.LatLng(-21.232642232448132, -43.76524776220322),
        new google.maps.LatLng(-21.232642232448132, -43.76522362232208),
        new google.maps.LatLng(-21.232639732313814, -43.76517802476883),
        new google.maps.LatLng(-21.232642232448132, -43.76515656709671),
        new google.maps.LatLng(-21.232649732850845, -43.765132427215576),
        new google.maps.LatLng(-21.232647232716655, -43.76510828733444),
        new google.maps.LatLng(-21.232657233253178, -43.76507341861725),
        new google.maps.LatLng(-21.2326697339229, -43.76504123210907),
        new google.maps.LatLng(-21.232682234591554, -43.76500904560089),
        new google.maps.LatLng(-21.232704735792453, -43.76497954130173),
        new google.maps.LatLng(-21.23272973712276, -43.764933943748474),  
      ];
      var place_CampoFutebol = new google.maps.Polygon({
        paths: coords_CampoFutebol,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
      });
      place_CampoFutebol.setMap(map);
      
      
      
      
           

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
