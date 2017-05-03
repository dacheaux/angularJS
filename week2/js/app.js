(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list = this;

  list.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

  list.addItem = function (itemIndex) {
    try {
      ShoppingListCheckOffService.addItem(list.itemsToBuy[itemIndex].name, list.itemsToBuy[itemIndex].quantity);
      this.removeItem(itemIndex);
      if (list.itemsToBuy.length == 0) list.Message = "Everything is bought!";
    } catch (error) {
      list.errorMessage = error.message;
    }
  };

  list.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list = this;
  
  list.itemsBought = ShoppingListCheckOffService.getItemsBought(); 
  list.Message = function () {
    return (list.itemsBought.length == 0);
  }
}

function ShoppingListCheckOffService() {
  var service = this;

  var itemsToBuy = [
      {name: "cress", quantity: 3},
      {name: "dandelion", quantity: 5},
      {name: "dill", quantity: 8},
      {name: "endive", quantity: 9},
      {name: "fat hen", quantity: 5}
    ]

  var itemsBought = [];

  service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      itemsBought.push(item);
  };

  service.removeItem = function (itemIndex) {
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };
}

})();
