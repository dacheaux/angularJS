(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://dfcreate-cs.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
