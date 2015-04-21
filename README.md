# Angular Timecircles

Angular module similar to jquery timecircles.

## LINK FOR DEMO

## Install:

Download  build/timecircles.min.js and add this module to your app's module dependencies

```javascript
angular.module('someModule', ['angular-timecircles'])
```
## Example:

```html
	<timecircles circles="4" types="d,h,m,s' ring-bgcolor="#FFF" ring-color="#0FF"></timecircles>
```

## Options:
* To edit the default values, change the options in the `timecirclesConfig` constant:
* `circles` number of circles that will be show. *(Default to 4)*
* `types` kind of time units. They must be separated by commas. i.e. "y,d,h". In this case first ring will show years, second will show days and last one will show hours. You can use same type of value repeatly, so it possible construction like "d,d,d". *(Default value to `d,H,M,S`)*
    * Time units and shortcuts:
    * y - years
    * m - months
    * w - weeks
    * d - days
    * H - hours
    * M - minutes
    * S - seconds
    * MS - miliseconds
* `ring-len` length of rings in timecircles. *(Default to `30px`)*
* `ring-space` distance between rings. *(Default to `10px`)*
* `ring-stroke` specifies the thickness of the line *(Defaults to `15`)*
* `ring-bgcolor`specifies background (static) color of rings.  It accepts array with colors for next rings i.e. "ring-bgcolor='array'" or string with color in hex/rgb(a) format i.e. ring-bgcolor='rgba(255,255,0, 0.5)' for all rings. If array length is smaller than numbers of rings rest of rings will have last value color. *(Defaults to `#FFF`)*
* `ring-color` specifies color (dynamic/changed) of rings.It accepts array of colors in hex/rgb(a) for next rings i.e. "ring-color='array'"  or string with color in hex/rgb(a) format i.e. ring-color='rgba(255,255,0, 0.5)' for all rings. If array length is smaller than numbers of rings rest of rings will have last value color. *(Defaults to `#000`)*
* `value-names` specifies names for time units in next rings.It accepts array of colors in hex/rgb(a) for next rings i.e. "value-names='array'". If array length is smaller than numbers of rings rest of rings will have default values. *(Defaults are same like names of time units.)*
* `end-date` accepts Date object or string in format like this "2015-04-21T21:19:54.326Z". *(Default - null)*

