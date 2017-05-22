(function() {
"use strict";

angular.module('public')
.service('MenuSearchService', MenuSearchService);

  //
  MenuSearchService.$inject = ['$http', 'ApiPath'];

  function MenuSearchService ($http, ApiPath) {
    var service = this;

    service.getMenuItem = function (searchTerm) {
      // Variables to hold the data the user inputted
      service.fname = document.getElementById("fname");
      service.lname = document.getElementById("lname");
      service.email = document.getElementById("email");
      service.number = document.getElementById("number");
      service.menu  = document.getElementById("menu");
      service.foundItem = [];
      service.saved = false;

      // Variable to hold found menu item
      var foundItem = [];

      // Reaching out to the JSON file for data
      var entireMenu = $http({
        method: "GET",
        url: (ApiPath + "/menu_items.json")
      });

      // When reachout to server has been successful
      return entireMenu.then(function (response) {
        // Loop through data in entireMenu to narrow down list
        for (var idx in response.data.menu_items) {
          // If any menu item exactly matches the search term in uppercases
          if (response.data.menu_items[idx].short_name === searchTerm.toUpperCase()) {
            // Save the menu in foundItem
            foundItem.push(response.data.menu_items[idx]);

            service.foundItem = foundItem;
          };
        }

        // If the search term is empty, return an error
        if (searchTerm == "") {
          return "No such menu number exists.";
        }
        else {
          service.saved = true;

          // Returns found item if search was successful
          return foundItem;
        }
      })

      // When reachout to server was unsuccessful
      .catch(function (error) {
        console.log("Something has gone terribly wrong.");
        console.log(error);
      })
    }

    service.showUserInfo = function () {
      var user = {
        foundItem: service.foundItem[0],
        fname: service.fname.value,
        lname: service.lname.value,
        email: service.email.value,
        number: service.number.value,
        menu:  service.menu,
        image: ApiPath + "/images/" + service.menu.value.toUpperCase() + ".jpg"
      }

      return user;
    };

    service.savedInfo = function () {
      return service.saved;
    };

    service.resetInfo = function () {
      service.saved = false;
    };
  };

})();