;
(function (angular) {
  angular.module('app')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        // /in_theaters
        // /in_theaters/1
        // /in_theaters/2
        // /in_theaters/3
        // /in_theaters/12/12  x
        // /list/*/*
        // /detail/1
        .when('/list/:category/:page?', {
          templateUrl: '/app/movie-list/list.html',
          controller: 'ListController',
          // 在这里给控制器作用域视图模型起一个别名，然后视图中访问视图模型成员就都必须通过 vm 前缀来访问
          // 之所以叫 vm 的原因是以为这是 ViewModel
          controllerAs: 'vm'
        })
        .when('/detail/:id', {
          templateUrl: '/app/movie-detail/detail.html',
          controller: 'DetailController',
          controllerAs: 'vm'
        })
        // 所有其它不认识的分配到 /in_theaters
        .otherwise({
          redirectTo: '/list/in_theaters'
        })
    }])
})(window.angular)
