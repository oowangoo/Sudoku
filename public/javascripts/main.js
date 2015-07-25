/**
 * Created by wang on 2015/7/25.
 */
myapp = angular.module("myapp",['ng']);
maxIndex = 9
myapp.controller("someController",function($scope){
  arrays = []
  for(var i = 0; i < maxIndex; i++){
    arrays[i] = new Array(maxIndex)
  }

  $scope.data = arrays
});