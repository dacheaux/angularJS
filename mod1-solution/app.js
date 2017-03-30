(function() {
    'use strict';

    angular.module('CheckApp', []).controller('CheckCtrl', CheckCtrl);
    CheckCtrl.$inject = ['$scope'];

    function CheckCtrl($scope) {
        $scope.menu = "";
        $scope.customStyle = {};
        $scope.checkIf = function() {
            var entered = $scope.menu.split(',');
            entered = entered.filter(function(str) {
                return /\S/.test(str);
            });
            var numOfItems = entered.length;
            console.log(entered);
            
            if (numOfItems > 3) {
                $scope.color = {"color":"green"};
                $scope.border = {"border-color":"green"};
                $scope.sayMessage = "Too much!";
            }
            else if (numOfItems == 0) {
                $scope.color = {"color":"red"};
                $scope.border = {"border-color":"red"};
                console.log($scope.color);
                $scope.sayMessage = "Please enter data first";
            }
            else {
                $scope.color = {"color":"green"};
                $scope.border = {"border-color":"green"};
                $scope.sayMessage = "Enjoy!";
            }
        }
    }

})();