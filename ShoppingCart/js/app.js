'use strict';

// App Module: the name AngularStore matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page
var storeApp = angular.module('AngularStore', ['ngRoute']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/menu', {
        templateUrl: 'partials/menu.htm',
        controller: storeController
      }).
      when('/store', {
        templateUrl: 'partials/store.htm',
        controller: storeController
      }).
      when('/products/:productSku', {
        templateUrl: 'partials/product.htm',
        controller: storeController
      }).
      when('/cart', {
        templateUrl: 'partials/shoppingCart.htm',
        controller: storeController
      }).
      otherwise({
        redirectTo: '/store'
      });
}]);

// create a data service that provides a store and a shopping cart that
// will be shared by all views (instead of creating fresh ones for each view).
storeApp.factory("DataService", function () {
    // create menu
    // var myMenu = new menu();
    // create store
    var myStore = new store();

    // create shopping cart
    var myCart = new shoppingCart("AngularStore");


    myCart.addCheckoutParameters("Stripe", "pk_test_APSM3ySrNp9DjxzmW6gD8nv9",
        {
            chargeurl: "https://localhost:1234/processStripe.aspx"
        }
    );

    // return data object with store and cart
    return {
        menu: myStore,
        store: myStore,
        cart: myCart
    };
});
