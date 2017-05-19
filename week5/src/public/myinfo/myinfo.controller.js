(function () {
'use strict';

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuItemService'];
function MyInfoController(MenuItemService) {
	var myinfo = this;
	myinfo.saved = MenuItemService.saved;
	myinfo.user = MenuItemService.user;
	myinfo.dish = MenuItemService.dish;
	myinfo.short = MenuItemService.short;
	console.log(myinfo.dish);
}

})();