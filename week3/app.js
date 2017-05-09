(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('listFoundItems', ListFoundItems);

function ListFoundItems() {
  var ddo = {
    templateUrl: 'loader/itemsloaderindicator.template.html',
    scope: {
      title: "@title",
      items: '=foundItems',
      remove: '&onRemove'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.found = [];

    menu.getSearchedItems = function(searchTerm) {
        if (searchTerm == null || searchTerm.trim().length == 0) {
            menu.error = true;
        }
        MenuSearchService.getMatchedMenuItems(menu.searchTerm)
            .then(function(response) {
                menu.found = response;
                if (menu.found == null || menu.found.length == 0) {
                    menu.error = true;
                } else {
                    menu.error = false;
                }
            })
            .catch(function(error) {
                console.log("Oh noes, something's wrong.");
            });
    };

    menu.removeItem = function(itemIndex) {
        menu.found.splice(itemIndex, 1);
        console.log('Removed');
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
    	searchTerm = searchTerm.toLowerCase();
    	/*for (var item in result.data.menu_items){
         if (result.data.menu_items[item].description.includes(searchTerm)){
           foundItems.push(result.data.menu_items[item])
           console.log(result.data.menu_items[item]);
         }
      }*/
      for (var i = 0, len = result.data.menu_items.length; i < len; i++) {
            var found = result.data.menu_items[i].description.toLowerCase().indexOf(searchTerm);
            if (found != -1) {
              foundItems.push(result.data.menu_items[i]);
            }
          }
    	return foundItems;
    });
  };
}

})();