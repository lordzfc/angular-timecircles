(function(){
    angular.module('angular-timecircles',['angular-svg-round-progress'])
        .directive('timecircles', ['$timeout', 'timecirclesFactory', function ($timeout, timecirclesFactory) {
            return {
                template:   '<div ng-style="containerStyle">'+
                                '<span ng-repeat="circle in circles" style="margin-right: {{ringSpace}}px">'+
                                    '<span style="width: {{ringDiameter}}px; height: {{ringDiameter}}px; position: absolute;">'+
                                        '<div style="text-align: center; top: 25%; position: relative">10</div>'+
                                        '<div style="text-align: center; font-size: 12px; top: 25%; position: relative">{{circle.valueName}}</div>'+
                                    '</span>'+
                                    '<round-progress max="circle.maxVal" stroke="{{circle.stroke}}" '+
                                        'radius="{{circle.ringLen}}" current="50" color="{{circle.color}}" '+
                                        ' bgcolor="{{circle.bgcolor}}">'+
                                    '</round-progress>'+
                                '</span>'+
                            '</div>',
                replace: true,
                transclude: true,
                restrict: 'AE',
                scope: {
                    circles:        "@",
                    types:          "@",
                    endDate:        "@",
                    ringLen:        "@",
                    ringStroke:     "@",
                    ringSpace:      "@",
                    ringbgColor:    "=?",
                    ringColor:      "=?",
                    valueNames:     "=?",
                },
                link: function (scope, iElement, iAttrs) {
                    var unitTypes = timecirclesFactory.getUnitTypes(scope.types);
                    scope.ringDiameter = (parseInt(scope.ringLen) +  parseInt(scope.ringStroke)) * 2
                    // if()
                    scope.circles = timecirclesFactory.createRings(
                        scope.ringbgColor, scope.ringColor, scope.valueNames, 
                        scope.ringStroke, scope.ringLen, unitTypes);

                    scope.containerStyle = {
                        height: scope.ringLen + 'px',
                        width: (scope.circles.length)*(scope.ringWidth
                            + parseInt(scope.ringSpace)*2.5) + 'px',
                        position: 'relative',
                    };
                    
                    var getTime = function(unitTypes, endDate) {
                        var time = [];
                        return time;
                    }
                    $timeout(function() {
                        scope.time = getTime(unitTypes, scope.endDate);
                    }, 1000);

                    
                }
            };
        }])
})()


    // factory:

    // getUnitTypes fn(types: string) -> [{'days': 365}, {'minutes': 60}]

    // stringToArray fn(val: string, len: int) -> [val]*len
    
    // createRings fn(
    //     ringBgColor: array, ringColor: array, valueNames: array, stroke: str, ringLen: str
    // ) -> [{},{},{}]
    
    // in $timeout()
    //     getTime fn(unitTypes, endDate) -> [{'weeks': 30}, {'days': 12}, {'minutes': 1}] ~~ TO scope
    // Maybe I have to manually stick to $scope. (scope.$apply)
    
    // template:
    // Maybe I haven't to modify angular-roundprogress. I'll add layer on circle with position: absolute 
    // (roundprogress will have position: absolute too) and parent html tag will have position: relative. 
    // In layer I stick value with valueName.
