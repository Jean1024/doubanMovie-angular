;
(function (angular) {
  angular.module('app')
    .controller('DetailController', [
      '$scope', '$routeParams', 'HttpService',
      function ($scope, $routeParams, HttpService) {
        var vm = this
        vm.loading = true
        vm.movie = {}
        var id = $routeParams.id
        HttpService.jsonp({
          url: 'http://api.douban.com/v2/movie/subject/' + id,
          success: function (data) {
            vm.movie = data
            vm.loading = false
            $scope.$apply()
          }
        })
      }
    ])
})(window.angular)
