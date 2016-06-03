var myapp = angular.module('myApp', []);

myapp.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {
    console.log("Hello world form controller");

    $scope.contactlist = null;

    $scope.refresh = function() {
        $http.get('/contactlist').then(function(response){
            $scope.contactlist = response.data;
            $scope.contact = "";
        });
    };
    $scope.refresh();

    $scope.addContact = function(){
        $http.post('/contactlist', $scope.contact).then(function(response) {
            $scope.refresh();
        });
    };

    $scope.remove = function(contact) {
        $http.delete('/contactlist/' + contact).then(function(response){
            $scope.refresh();
        });
    };

    $scope.edit = function(contact) {
        $http.get('/contactlist/' + contact).then(
            function(response) {
                $scope.contact = response.data;
            });
    };

    $scope.update = function(contact) {
        $http.put('/contactlist/' + contact, $scope.contact)
            .then(function(response) {
                $scope.refresh();
            });
    };

    $scope.clear = function(){
        $scope.contact = "";
    };

}])
