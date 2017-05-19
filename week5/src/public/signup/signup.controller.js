(function() {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuItemService'];

  function SignUpController(MenuItemService) {
    var signup = this;
    signup.user = {};
    signup.item = true;
    signup.saved = false;
    signup.menunumber = signup.user.fname = signup.user.lname =
      signup.user.email = signup.user.phone = "";

    signup.submit = function() {
      MenuItemService.getItem(signup.menunumber).then(function(response) {
        if (response != undefined) {
          signup.retrieved = response.data;
          console.log(signup.retrieved);
          MenuItemService.user = signup.user;
          MenuItemService.dish = {
            short: signup.retrieved.short_name,
            name: signup.retrieved.name,
            description: signup.retrieved.description,
          };
          MenuItemService.short = signup.menunumber.replace(/\d+/g, '');
          signup.item = signup.saved = true;
          console.log(signup.saved);
        } else {
          console.log('No item');
          signup.item = signup.saved = false;
          MenuItemService.reset();
        }
        MenuItemService.saved = signup.saved;
      });
    };
  }

})();
