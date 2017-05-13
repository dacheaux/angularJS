(function () {
'use strict';
angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('home', {
		url: '/',
		templateUrl: 'templates/home.html'
	})

	.state('categories', {
		url: '/categories',
		templateUrl: 'templates/categories.html',
		controller: 'CategoriesController as catsCtrl',
		resolve: {
			categories: ['MenuDataService', function (MenuDataService) {
				return MenuDataService.getAllCategories()
					.then(function (response) {
						return response;
					});
			}]
		}
	})

	.state('items', {
		url: '/categories/{category}',
		templateUrl: 'templates/items.html',
		controller: 'ItemsController as itemsCtrl',
		resolve: {
			items: ['$stateParams', 'MenuDataService', 
				function ($stateParams, MenuDataService) {
					return MenuDataService.getItemsForCategory($stateParams.category)
						.then(function (response) {
							return response.menu_items;
						});
			}]
		}
	});
}

})();