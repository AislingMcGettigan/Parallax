var clsParallax = function() {
  $(function() {
    $('.para').bind('mousemove', moveLayers);
    $('.para').bind('mouseleave', doIdleAnim);
  });

  var limiter = 5;
  var speed = 0;
  var animTimer;

  function moveLayers(e) {
    if (e.auto == undefined || e.auto == null) clearInterval(animTimer);

    speed++;
    if (speed < limiter) return;
    speed = 0;

    var obj = $('.para');

    var cx = obj.offset().left + obj.width() / 2;
    var cy = obj.offset().top + obj.height() / 2;

    var dx = e.pageX - cx;
    var dy = e.pageY - cy;

    obj.find('.debug').text('x: ' + dx + ' , y: ' + dy);

    obj.find('.layer').each(function() {
      var layer = $(this);

      var force = Number($(this).attr('data-force'));

      var sdx = (layer.width() - obj.width()) / 2;
      var sdy = (layer.height() - obj.height()) / 2;
      var nx = dx * force - sdx;
      var ny = dy * force - sdy;

      layer.css({
        left: nx,
        top: ny
      });
    });
  }

  function doIdleAnim() {
    animTimer = setInterval(function() {
      var fromLeft = $('.para').offset().left;
      var fromTop = $('.para').offset().top;
      var paraWidth = $('.para').width() + fromLeft;
      var paraHeight = $('.para').height() + fromTop;
      var nx = getRandomInt(fromLeft, paraWidth);
      var ny = getRandomInt(fromTop, paraHeight);

      speed = limiter;

      moveLayers({
        auto: true,
        pageX: nx,
        pageY: ny
      });
    }, 4000);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

var myPara = new clsParallax();
