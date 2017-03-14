;(function (angular) {
  angular.module('app')
    .filter('getNames', [function () {
      return function (input, join) {
        var names = []
        input.forEach(function (director) {
          names.push(director.name)
        })
        return names.join(join || '、')
      }
    }])
})(window.angular)
