;
(function (angular) {
  angular.module('app')
    .service('HttpService', [function () {
      this.jsonp = function (options) {
        // 1. 创建 script 标签
        // 2. 为 script 标签指定请求路径
        // 3. 上 DOM，由浏览器去帮你解析处理发请求
        // 4. 请求响应成功，执行 options 中的 success 指定的回调处理函数

        var script = document.createElement('script')

        var callbackName = 'itcast_' + Math.random().toString().substr(2)

        // 这里将参数选项中的 success 挂载给全局的 window 对象
        // 当服务端响应回来的数据解析执行的时候，就要调用这个全局函数 window.callback
        // 调用 window.callback 其实就相当于调用了 options.success
        window[callbackName] = function (data) {
          options.success(data)
          document.body.removeChild(script) // 删除生成的 script 标签
          delete window[callbackName] // 删除全局的回调处理函数
        }

        var queryString = []
        var queryObj = options.data
        // a=b&foo=bar
        for(var queryKey in queryObj) {
          queryString.push(queryKey + '=' + queryObj[queryKey])
        }
        queryString = queryString.join('&')

        script.src = options.url + '?callback=' + callbackName + '&' + queryString

        // 这里只是把 script 标签上到了 DOM 中，并不是即时的发请求或者调用 success 回调处理函数
        document.body.appendChild(script)
      }
    }])
})(angular)
