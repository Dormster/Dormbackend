angular.module('dorm', [])
  .controller('DormController', function ($http, $scope, $filter) {
    var dorm = this
    dorm.testng = 'angular OK'
    var arraylength
    var dormdata
    var i = 0

    $http.get('/database').success(function (data) {
      $scope.dormdb = data
      arraylength = $scope.dormdb.length
      dormdata = data
      
      getdata()
    }).error(function (data, status, headers, config) {})

    getdata = function () {
      $http.get('/detaildorm').success(function (data) {
        do {
          if (dormdata[i]._id == data) {
            // console.log(dormdata[i])
            $scope.detaildorm = dormdata[i]
            dorm.test = $scope.detaildorm

$('iframe#d1').attr('src',$scope.detaildorm.maps);           


            console.log(dorm.test)
          }
          i++
        } while (i < arraylength)

         //console.log($scope.detaildorm)
        }).error(function (data, status, headers, config) {})

        $http.get('/editdata').success(function (data) {
          i = 0
          do {
            if (dormdata[i]._id == data) {
              // console.log(dormdata[i])
              $scope.detaildorm = dormdata[i]
              console.log($scope.detaildorm)
              dorm.id = $scope.detaildorm._id
              dorm.namedorm = $scope.detaildorm.namedormair
              dorm.address = $scope.detaildorm.addressdormair
              dorm.priceair = $scope.detaildorm.priceair
              dorm.pricefan = $scope.detaildorm.pricefan
              dorm.tel = $scope.detaildorm.contact
              dorm.nametel = $scope.detaildorm.namecontact
              dorm.distance = $scope.detaildorm.distance
              dorm.namedorm = $scope.detaildorm.namedormair
              dorm.empair = $scope.detaildorm.emproomair
              dorm.empfan = $scope.detaildorm.emproomfan
              dorm.etc = $scope.detaildorm.etc
              dorm.maps = $scope.detaildorm.maps
              break
            }
            i++
          } while (i < arraylength)

          // console.log($scope.detaildorm)
          }).error(function (data, status, headers, config) {})
        }

        $scope.querydorm = function (id) {
          console.log(id)

        }

        dorm.login = function () {
          datalogin = {
            username: dorm.username,
            password: dorm.password
          }
          $http.post('/public/admin', datalogin).then(function (response) {
            if (response.data) window.location = 'data.html'
            else alert('incorrect')
          })
        }
        dorm.edit = function (id, index) {
          console.log('=' + id + index)
        }
        dorm.editroom = function () {
          console.log('edit')
          data = {
            _id: dorm.id,
            namedormair: dorm.namedorm,
            addressdormair: dorm.address,
            priceair: dorm.priceair,
            pricefan: dorm.pricefan,
            contact: dorm.tel,
            namecontact: dorm.nametel,
            distance: dorm.distance,
            emproomair: dorm.empair,
            emproomfan: dorm.empfan,
            etc: dorm.etc
          }
          $http.post('/public/update', data).then(function (response) {
            if (response.data) {
              window.location = '../data.html'
            }
            else alert('Incorrect')
          })
        }
        dorm.addroom = function () {
         
          //dorm.add = dorm.links 
          // console.log(dorm.link)

          data = { namedormair: dorm.addnamedorm,
            addressdormair: dorm.addaddress,
            priceair: dorm.addprice,
            pricefan: dorm.addpriceair,
            contact: dorm.addtel,
            namecontact: dorm.addnametel,
            distance: dorm.adddistance,
            emproomair: dorm.addemp,
            emproomfan: dorm.addempair,
            etc: dorm.addetc,
            links : dorm.links,
            maps : dorm.map
          }
          $http.post('/public/add', data).then(function (response) {
            if (response.data) {
              window.location = 'data.html'
            }
            else alert('Incorrect')
          })
        }
        dorm.cancer = function () {
          window.location = 'admin.html'
        }
        dorm.goadd = function () {
          dorm.addnamedorm = ''
          dorm.addaddress = ''
          dorm.addpriceair = ''
          dorm.addpricefan = ''
          dorm.addtel = ''
          dorm.addnametel = ''
          dorm.adddistance = ''
          dorm.addnamedorm = ''
          dorm.addempair = ''
          dorm.addempfan = ''
          dorm.addetc = ''
          window.location = 'add.html'
        }
        dorm.delete = function (id, index) {
          $http.post('/database', { _id: id}).then(function (response) {
            dorm.data.splice(index, 1)
          })
        }
        dorm.query = function () {
          $http.get('/database').success(function (response) {
            //console.log(response)
            dorm.data = response
            
          })
        }
  
          $http.get('/databasesortpricefan').success(function (response) {
            //console.log("="+response)
            dorm.datapricefan = response
            
          })
          $http.get('/databasesortpriceair').success(function (response) {
            //console.log("="+response)
            dorm.datapriceair = response
            
          })
           $http.get('/databasesortdistan').success(function (response) {
            //console.log("="+response)
            dorm.datadistan = response
            
          })
           $http.get('/dataslide').success(function (response) {
   
            dorm.dataslide = response
                   console.log(dorm.dataslide)  
          })
           $http.get('/datamap').success(function (response) {
            //console.log("="+response.namedormair)
            dorm.datamap = response
           // console.log(response)
            
          })

        dorm.links = [
        

        ]
     dorm.add = function(link) {
        var newLinks = {
          Link: link
        }
         dorm.links.push(newLinks)
         dorm.link = ''

        link = ''   
     }
     dorm.map = ''
     dorm.addmap = function(linkmap) {
        dorm.newmap =  linkmap
        dorm.map = dorm.newmap
          
     }

})
