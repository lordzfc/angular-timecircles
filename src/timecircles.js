(function(){
    angular.module('angular-timecircles',['angular-svg-round-progress'])
        .directive('timecircles', ['$timeout', 'timecirclesFactory', function ($timeout, timecirclesFactory) {
            return {
                template:   '<div ng-style="containerStyle">'+
                                '<span ng-repeat="circle in circles" style="margin-right: {{ringSpace}}px">'+
                                    '<span style="width: {{ringDiameter}}px; height: {{ringDiameter}}px; position: absolute;">'+
                                        '<div style="text-align: center; top: 25%; position: relative">{{time[$index]}}</div>'+
                                        '<div style="text-align: center; font-size: 12px; top: 25%; position: relative">{{circle.valueName}}</div>'+
                                    '</span>'+
                                    '<round-progress max="circle.maxVal" stroke="{{circle.stroke}}" '+
                                        'radius="{{circle.ringLen}}" current="time[$index]" color="{{circle.color}}" '+
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
                    var mytimeout;
                    var unitTypes = timecirclesFactory.getUnitTypes(scope.types);
                    scope.ringDiameter = (parseInt(scope.ringLen) +  parseInt(scope.ringStroke)) * 2
                    // if()
                    scope.circles = timecirclesFactory.createRings(
                        scope.ringbgColor, scope.ringColor, scope.valueNames, 
                        scope.ringStroke, scope.ringLen, unitTypes);

                    scope.containerStyle = {
                        height: scope.ringLen + 'px',
                        width: (scope.circles.length)*(scope.ringWidth + parseInt(scope.ringSpace)*2.5) + 'px',
                        position: 'relative',
                    };
                    
                    var timeDiff = function(end) {
                        var end1 = new Date(end);
                        var begin = new Date();

                        return end1-begin;
                    }

                    var getTime = function(endDate) {
                        scope.time = [];
                        // return time;

                        if(scope.endtime <= 0 || scope.endtime === undefined) {
                            scope.days = 0;
                            scope.hours = 0;
                            scope.minutes = 0;
                            scope.seconds = 0;
                        }
                        if(scope.endtime> 0) {
                            scope.endtime = timeDiff(scope.endDate);
                            scope.dayss = scope.endtime / 86400000;
                            scope.days = parseInt(scope.dayss);
                            scope.hourss = (scope.endtime % 86400000)/ 3600000;
                            scope.hours = parseInt(scope.hourss);
                            scope.minutess = ((scope.dayss * 86400000) % 3600000) / 60000;
                            scope.minutes = parseInt(scope.minutess);
                            scope.secondss = ((scope.hourss * 3600000) % 60000) / 1000;
                            scope.seconds = parseInt(scope.secondss);
                            
                            _.each(unitTypes, function(val, index) {
                                var value = scope[_.keys(val)[0]];
                                scope.time.push(value);
                            });
                            
                            mytimeout = $timeout(getTime, 50);
                        }
                    }
                    scope.endtime = timeDiff(scope.endDate);
                    scope.time = getTime(scope.endDate);
                    
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
