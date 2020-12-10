$(document).ready(function() {

  function init() {
    $window = $(window);
    $body = $('body');
    $nav = $('.navbar');
    $navOffsetTop = $nav.offset().top;

    $window.on('scroll', onScroll);
    $window.on('resize', resize);
  }

  function resize() {
    $body.removeClass('has-docked-nav')
    $navOffsetTop = $nav.offset().top
    onScroll()
  }
  
  function onScroll() {
    if($navOffsetTop < $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
      $body.addClass('has-docked-nav')
    }
    if($navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
      $body.removeClass('has-docked-nav')
    }
  }

  // init();
});

