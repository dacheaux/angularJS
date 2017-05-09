(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('listFoundItems', ListFoundItems)
.directive('loader', Loader);

function ListFoundItems() {
  var ddo = {
    templateUrl: 'list.html',
    scope: {
      title: "@title",
      items: '=foundItems',
      remove: '&onRemove'
    }
  };
  return ddo;
}

function Loader() {
  var ddo = {
    templateUrl: 'loader/itemsloaderindicator.template.html',
  };
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.found = [];
    menu.searchTerm = "";
    menu.error = false;
    menu.loading = false;

    menu.getSearchedItems = function() {
      menu.found = [];
      menu.loading = true;
      menu.error = false;
      if (menu.searchTerm.length > 0) {
        MenuSearchService.getMatchedMenuItems(menu.searchTerm)
            .then(function(response) {
                menu.found = response;
                menu.loading = false;
                if (menu.found.length == 0) menu.error = true;
            })
            .catch(function(error) {
                console.log("Oh noes, something's wrong.");
            });
          } else {menu.error = true;}
    };

    menu.removeItem = function(itemIndex) {
        menu.found.splice(itemIndex, 1);
        console.log('removed');
    };

}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    }).then(function (result) {
    	var foundItems = [];
    	searchTerm = searchTerm.toLowerCase().trim();
    	for (let item of result.data.menu_items){
         if (item.description.includes(searchTerm)){
           foundItems.push(item);
         }
      }
    	return foundItems;
    });
  };
}

})();