var modulename = module.exports = 'ng-map';

angular
  .module(modulename, [

  ])

  .directive('mapcanvas', function($http, $window, $q){
    
    

    function lazyLoadApi(key) {
      var deferred = $q.defer();
      function load_script() {
        deferred.resolve();
      }

      var s = document.createElement('script');
      s.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&amp;sensor=false';
      document.body.appendChild(s);
      
      // thanks to Emil Stenström: http://friendlybit.com/js/lazy-loading-asyncronous-javascript/
      if ($window.attachEvent) {  
        $window.attachEvent('onload', load_script); 
      } else {
        $window.addEventListener('load', load_script, false);
      }
      return deferred.promise;
    }
    
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
          
          var myLatlng = new google.maps.LatLng($scope.lat, $scope.long);
          var mapOptions = {
            zoom: $scope.zoom,
            scrollwheel: false,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

          var marker = new google.maps.Marker({
              position: myLatlng,
              map: map,
              animation: google.maps.Animation.DROP,
              title: 'Dry Hire UK'
          });
          
          var contentString = '<div class="info-window-content"><h2>' + $scope.title + '</h2>'+
                              '<h3>' + $scope.description + '</h3>';
                              
          var infowindow = new google.maps.InfoWindow({
              content: contentString
          });
          
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
          });
        }

        if ($window.google && $window.google.maps) {
          console.log('gmaps already loaded');
          attach_map();
        } else {
          lazyLoadApi().then(function () {
            console.log('promise resolved');
            if ($window.google && $window.google.maps) {
              console.log('gmaps loaded');
              attach_map();
            } else {
              console.log('gmaps not loaded');
            }
          }, function () {
            console.log('promise rejected');
          });
        }

      }

      
    };
  })
