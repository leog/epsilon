/*global define*/
define(function () {
    "use strict";
    return ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state){
        $scope.id = $stateParams.id;
        $scope.filter = $stateParams.filter;
        $scope.data = $state.current.data;
    }];
});