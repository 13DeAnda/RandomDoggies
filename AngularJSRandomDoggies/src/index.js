var app = angular.module("scopeExample", []);

app.controller("MyController", [
  "$scope",
  "$http",
  ($scope, $http) => {
    $scope.mainDog = null;
    $scope.linkDogs = [];

    $scope.getDogs = function (quantity) {
      $scope.gameOver = false;
      var path = `https://dog.ceo/api/breeds/image/random/${quantity}`;
      $http.get(path).then($scope.onGetDogs);
    };

    $scope.onGetDogs = function (response) {
      const transformDogData = $scope.transformDogData(response.data.message);
      if (transformDogData.length === 1) {
        $scope.mainDog = transformDogData[0];
      } else {
        $scope.linkDogs = transformDogData;
      }
      console.log("trans", transformDogData);
    };

    $scope.transformDogData = (links) => {
      const transformed = [];
      for (const link of links) {
        const breed = link.split("/")[4].split("-").join(" ");
        transformed.push({ breed: breed, image: link });
      }

      return transformed;
    };

    $scope.getDogs(1);
    $scope.getDogs(10);
  },
]);

app.directive("imageDisplayer", function () {
  function linkingFunction() {}
  function controller($scope, $timeout, $http) {}
  return {
    restrict: "E",
    template: `
                  <img ng-src="{{dog.image}}" class="image" />
                  <div class="title" ng-if="!main">
                    <a href={{dog.image}} target="_blank" rel="noopener noreferrer">
                    {{dog.breed}}
                    </a>
                  </div>
                `,
    scope: { dog: "=", main: "=" },
  };
});
