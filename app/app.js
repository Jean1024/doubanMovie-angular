;
(function (angular) {
  angular.module('app', ['ngRoute'])
    .controller('SearchController', ['$route', function ($route) {
      var vm = this
      vm.searchText = ''
      vm.search = function (searchText) {
        // 更新路由中的参数，将 category 更新
        // q 默认更新动态路径自己设定的 q，如果动态路径中没有 q，则默认把 q 当成查询字符串拼接到路径中
        $route.updateParams({
          category: 'search',
          page: 1,
          q: searchText,
        })
      }
    }])
})(angular)
