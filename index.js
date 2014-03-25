var modulename = module.exports = 'ng-map';

angular
  .module(modulename, [

  ])

  .directive('mapcanvas', function($http, $window, $q){
    

    
    return {
      restrict:'EA',
      scope:{
        lat:'=',
        long:'=',
        zoom:'=',
        title:'=',
        description:'='
      },
      template: require('./template'),
      replace: true,
      link:function($scope, $elem, $attrs){

        function attach_map(){
          var myLatlng = new $window.google.maps.LatLng($scope.lat, $scope.long);
          var mapOptions = {
            zoom: $scope.zoom,
            scrollwheel: false,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          var map = new $window.google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

          var marker = new $window.google.maps.Marker({
              position: myLatlng,
              map: map,
              animation: google.maps.Animation.DROP,
              title: 'Dry Hire UK'
          });
          
          if($scope.title && $scope.title.match(/\w/)){
            var contentString = '<div class="info-window-content"><h2>' + $scope.title + '</h2>'+
                              '<h3>' + $scope.description + '</h3>';
                              
            var infowindow = new $window.google.maps.InfoWindow({
                content: contentString
            });
            
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map,marker);
            });  
          }
          
          
        }

        window.gMapsCallback = function(){
          angular.element($window).trigger('gMapsLoaded');
        }

        if ($window.google && $window.google.maps) {
          
          attach_map();
        } else {

          function loadGoogleMaps(){
            var script_tag = document.createElement('script');
            script_tag.setAttribute("type","text/javascript");
            script_tag.setAttribute("src","//maps.google.com/maps/api/js?sensor=false&callback=gMapsCallback");
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
          }

          angular.element($window).bind('gMapsLoaded', function(){
            attach_map();
          })

          loadGoogleMaps();

        }

      }

      
    };
  })
