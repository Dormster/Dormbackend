angular.module('dorm', [])
      .controller('DormController', function ($http, $scope) {
        var dorm = this
        dorm.name = "ddddd"
        dorm.login = function() {
         datalogin = {
           username : dorm.username ,
           password : dorm.password
         }
      $http.post('/public/admin', datalogin).then(function(response){
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
          if(response.data) window.location = "add.html"
          else alert("Incorrect")
      })
    }
     dorm.cancer = function() {
     window.location = "admin.html"
    }
    dorm.delete = function(id,index){
        $http.delete('/public/add'+id)
          .then(function(response) {
            dorm.data.splice(index,1)           
          })
          .error(function(data) {
            console.log('Error: ' + data)
          })
    }
})