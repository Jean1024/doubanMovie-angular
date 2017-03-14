;
(function (angular) {
  angular.module('app')
    .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        'self', // 如果加入了 sce 配置，一定要加入 self ，否则自己的域也无法请求访问
        'http://api.douban.com/v2/**'
      ])
    }])
})(window.angular)
