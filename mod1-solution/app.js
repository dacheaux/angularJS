(function() {
    'use strict';

    angular.module('CheckApp', []).controller('CheckCtrl', CheckCtrl);
    CheckCtrl.$inject = ['$scope'];

    function CheckCtrl($scope) {
        $scope.menu = "";
        $scope.checkIf = function() {
            var entered = $scope.menu.split(',');
            entered = entered.filter(function(str) {
                return /\S/.test(str);
            });
            var numOfItems = entered.length;
            console.log(entered);
            
            var sayMessage = "";
            if (numOfItems > 3) $scope.sayMessage = "Too much!";
            else if (numOfItems == 0) $scope.sayMessage = "Please enter data first";
            else $scope.sayMessage = "Enjoy!";
        }
    }
})();