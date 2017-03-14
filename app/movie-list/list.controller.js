;
(function (angular) {
  angular.module('app')
    .controller('ListController', [
      '$scope',
      '$http',
      '$routeParams',
      '$route',
      'HttpService',
      function ($scope, $http, $routeParams, $route, HttpService) {
        // 把原来的 $scope 依赖去掉
        // 则现在的控制器函数内部 this 就是 $scope
        // 在 JavaScript 中的 this 的指向及其容易发生变化
        var vm = this // 这里的 this 简单理解就是 $scope ，但实际上是你通过 controller as 语法起的那个属性
        vm.loading = true
        vm.title = 'Loding...'
        vm.movies = []
        vm.page = parseInt($routeParams.page) || 1
        vm.total = 0
        vm.totalPage = 0
        var pageSize = 5
        var category = $routeParams.category

        vm.go = function (page) {
          // 如果要查看的页码小于等于0，不处理
          if (page <= 0) {
            return
          }
          // 如果查看的页码大于总页码大小，不处理
          if (page > vm.totalPage) {
            return
          }
          // 这种方式也可以，但是不推荐
          // window.location.href = 'http://127.0.0.1:3000/#!/in_theaters/' + page

          // 在路由中还提供了一个服务：$route
          $route.updateParams({
            page: page
          })
        }

        HttpService.jsonp({
          url: 'http://api.douban.com/v2/movie/' + category,
          data: {
            start: (vm.page - 1) * pageSize,
            count: pageSize,
            q: $routeParams.q
          },
          success: function (data) {
            vm.title = data.title
            vm.movies = data.subjects
            vm.loading = false
            vm.total = data.total
            vm.totalPage = Math.ceil(vm.total / pageSize)
              // 在咱们自己的异步回调处理函数中，如果修改了视图模型数据默认情况下是不会生效的
              // 这个时候需要手动调用 $scope.$apply() 让视图刷新
              // 注意：这里的 vm 其实是 $scope 上的一个成员对象
              // vm.$apply()

            $scope.$apply()
          }
        })
      }
    ])
})(window.angular)

// ng 有跨域的 jsonp 方法，但是又从框架角度约束了一层
// http://api.douban.com/v2/movie/in_theaters?callback=angular.callbacks._0
// angular.callbacks._0(data) data
// 对于这个 callbackName 中的 . 是因为 ng 帮你把生成的函数挂载到了 angular.callbacks 命名空间中了
// 它希望的是减少全局函数，而服务器回传回来之后应该是通过命名空间来进行调用
// 这里虽然可以访问豆瓣 API 接口，但是接收到的结果没有 p 这个处理
// 然后浏览器接收到纯的 JSON 数据的时候解析会导致语法上解析失败，直接报错
// 这个原因是因为豆瓣 API 接口对接口 jsonp 参数 callbackName 做了限制，不允许有 . 点儿 
// $http.jsonp('http://api.douban.com/v2/movie/in_theaters')
//   .then(function (data) {
//     console.log(data)
// })
