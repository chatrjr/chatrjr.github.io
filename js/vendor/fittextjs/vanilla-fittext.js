/*! 
* FitText.js 1.0 jQuery free version
*
* Copyright 2011, Dave Rupert http://daverupert.com 
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
* Modified by Slawomir Kolodziej http://slawekk.info
*
* Date: Tue Aug 09 2011 10:45:54 GMT+0200 (CEST)
*/
!function(){var b=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},c=function(a,b){for(key in b)b.hasOwnProperty(key)&&(a[key]=b[key]);return a};window.fitText=function(a,d,e){var f=c({minFontSize:-1/0,maxFontSize:1/0},e),g=function(a){var c=d||1,e=function(){a.style.fontSize=Math.max(Math.min(a.clientWidth/(10*c),parseFloat(f.maxFontSize)),parseFloat(f.minFontSize))+"px"};e(),b(window,"resize",e)};if(a.length)for(var h=0;h<a.length;h++)g(a[h]);else g(a);return a}}();