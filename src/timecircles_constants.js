(function(){
    'use strict';
    angular.module('angular-timecircles')
        .constant('timecirclesTimeUnitsConst',
            {
                    'MS':   {'miliseconds': 1000},
                    'S':    {'seconds': 60},
                    'M':    {'minutes': 60},
                    'H':    {'hours': 24},
                    'd':    {'days': 365},
                    'w':    {'weeks': 52},
                    'm':    {'months': 12},
            } 
        )
})()