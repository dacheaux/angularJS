(function () {
'use strict';

angular.module('common')
.service('MenuItemService', MenuItemService);

MenuItemService.$inject = ['$http', 'ApiPath'];
function MenuItemService($http, ApiPath) {
	var service = this;
	service.user = {};
	service.saved = false;
	service.short = "";

	service.getItem = function (shortName) {
		service.fname = '';

		return $http({
			method: 'GET',
			url: (ApiPath + '/menu_items/' + shortName + '.json')
		}).then(function (response) {
			console.log(response);
			console.log(response.data);
			return response;
		}).catch(function (eror) {
			console.log('Nothing fetched');
		})
	}

	service.reset = function () {
		service.user = {};
	}

}
})();