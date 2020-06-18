// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());
(function () {
  $(function(){
    if($('.BOLD-mc-picker-mnt')[0]){
      $(window).on('scroll', function(){
      	var timeout;
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }

        // Setup the new requestAnimationFrame()
        timeout = window.requestAnimationFrame(function () {
            if ($('.poster-cont').offset().top + $('.poster-cont').height() < ($(window).scrollTop() + window.innerHeight)) {
            	$('.form-cont-outer .poster-bold-cont').addClass('sticky');
            } else {
            	$('.form-cont-outer .poster-bold-cont').removeClass('sticky');
            }
        })
      })
      $(window).on('resize', function(){
      	var timeout;
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }

        // Setup the new requestAnimationFrame()
        timeout = window.requestAnimationFrame(function () {
            if ($('.poster-cont').offset().top + $('.poster-cont').height() < ($(window).scrollTop() + window.innerHeight)) {
            	$('.form-cont-outer .poster-bold-cont').addClass('sticky');
            } else {
            	$('.form-cont-outer .poster-bold-cont').removeClass('sticky');
            }
        })
      })
    }
  })
}());