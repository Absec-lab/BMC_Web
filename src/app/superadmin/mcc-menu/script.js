angular.module('myApp', ['bootstrapSubmenu']);

angular.module('myApp')
       .controller('menuController', function($scope){
         $scope.menuItems = [
           { display: 'Dropdown Item 1', href: '#', children: [
             { display: 'Child 1', href: '#', children: [
               { display: 'Sub 1', href: 'http://www.google.com', children: []},
               { display: 'Sub 2', href: '#', children: [
                 { display: 'Grand Child 1', href: 'http://www.google.com', children: []},
                 { display: 'Grand Child 2', href: 'http://www.google.com', children: []}
                 ]}
               ]},
             { display: 'Child 2', href: 'http://www.google.com', children: []}
             ]},
           { display: 'Dropdown Item 2', href: 'http://www.google.com', children: []},
           { display: 'Dropdown Item 3', href: '#', children: [
             { display: 'Child 3', href: 'http://www.google.com', children: []}
             ]}
           ];
       });