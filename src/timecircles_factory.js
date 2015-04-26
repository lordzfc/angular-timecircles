(function(){
    'use strict';
    angular.module('angular-timecircles')
        .factory('timecirclesFactory', ['timecirclesTimeUnitsConst', function (timecirclesTimeUnitsConst) {
            var self = {};
            
            //getUnitTypes fn(types: string) -> [{'days': 365}, {'minutes': 60}]
            self.getUnitTypes = function(types) {
                var result = [];
                _.each(types.split(','), function(val, index) {
                    result.push(timecirclesTimeUnitsConst[val]);
                });
                return result;
            };

            // stringToArray fn(val: string, len: int) -> [val]*len
            self.stringToArray = function(val, len) {
                return _.fill(Array(len), val);
            };

            // createRings fn(
            //     ringBgColor: array, ringColor: array, valueNames: array, stroke: str, ringLen: str
            // ) -> [{},{},{}]

            self.createRings = function(ringBgColor, ringColor, valueNames, stroke, ringLen, types) {
                var result = [];
                for(var i = 0; i<types.length; i++) {
                    result.push({
                        bgcolor: ringBgColor[i] ? ringBgColor[i]: ringBgColor[0], 
                        color: ringColor[i] ? ringColor[i]: ringColor[0],
                        valueName: valueNames && valueNames[i] ? valueNames[i] : _.keys(types[i])[0],
                        maxVal: types[i][_.keys(types[i])[0]],
                        ringLen: ringLen,
                        stroke: stroke,
                    });
                }
                return result;
            };
            return self;
        }])
})()