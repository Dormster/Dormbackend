angular.module('dorm', [])
      .controller('DormController', function ($http, $scope) {
        var dorm = this
        dorm.login = function() {
      $http.post('/public/admin', {username : dorm.username , password : dorm.password}).then(function(response){
        if(response.data) window.location = "add.html"
          else alert("incorrect")
      })
    }
        dorm.addroom = function() {
          data= { namedormair : dorm.namedorm,
                  addressdormair : dorm.address,
                  priceair : dorm.price,
                  pricefan : dorm.priceair,
                  contact : dorm.tel,
                  namecontact : dorm.nametel,
                  distance : dorm.distance,
                  emproomair : dorm.emp,
                  emproomfan : dorm.empair,
                  etc : dorm.etc
           }
      $http.post('/public/add', data).then(function(response){
          if(response.data) 
          else alert("Incorrect")
      })
    }
})