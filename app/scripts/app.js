var headroomOptions = {
  offset: 300,
  tolerance: 5,
  classes: {
    initial: 'topbar',
    pinned: 'topbar--pinned',
    unpinned: 'topbar--unpinned',
    top: 'topbar--top',
    notTop: 'topbar--not-top'
  }
};

// Interactive stuff
$(function(){

  // UI Elements
  var $navdrawerElement = $('.navdrawer-container');
  var $body = $('body');
  var $appbarElement = $('.app-bar');
  var $menuBtn = $('.menu');
  var $main = $('main');

  // Make opening/closing navbar work
  var toggleMenu = function() {
    $body.toggleClass('open');
    $appbarElement.toggleClass('open');
    $navdrawerElement.toggleClass('open');
  };

  var closeMenu = function() {
    $body.removeClass('open');
    $appbarElement.removeClass('open');
    $navdrawerElement.removeClass('open');
  };

  // Menu stuff
  $main.on('click', closeMenu);
  $menuBtn.on('click', toggleMenu);

  // Hide header on scroll
  $appbarElement.headroom(headroomOptions);

  // Smooth scrolling for top button
  $('.app-bar-actions .link-to-top', '#navigation').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return false;
  });

  // Add smooth scrolling listeners for each navdrawer link
  $navdrawerElement.find('li').each(function() {
    $(this).on('click', function(){

      // Get href of link and scroll to the linked position
      var href = $(this).children().attr('href');
      $('html, body').animate({
        scrollTop: $(href).offset().top
      }, 'slow');

      // If the topbar is pinned, unpin it and close menu after navigating.
      if($navdrawerElement.hasClass('topbar--pinned') ||
          $appbarElement.hasClass('topbar--pinned')) {

        // Wait till we're done scrolling.
        $('html, body').promise().done(function() {
          var pinnedElement = $navdrawerElement.hasClass('topbar--pinned')
            ? $navdrawerElement
            : $appbarElement;

          // Unpin the element and close the menu
          pinnedElement.data().headroom.unpin();
          closeMenu();
        });
      }
      return false;
    });
  });

  // Media query callbacks
  enquire.register('(min-width: 990px)', {
    match: function() {
      // Pin `.navdrawer-container`
      $navdrawerElement.headroom(headroomOptions);
      $navdrawerElement.on('mouseover', function() {
        $navdrawerElement.data().headroom.pin();
      });

      // Unpin `.app-bar`
      var appBarData = $appbarElement.data();
      if (typeof appBarData.headroom !== 'undefined') {
        appBarData.headroom.destroy();
        delete appBarData.headroom;
      }
    },
    unmatch: function() {
      // Pin `.app-bar`
      $appbarElement.headroom(headroomOptions);

      // Unpin `.navdrawer-container`
      var navDrawerData = $navdrawerElement.data();
      if (typeof navDrawerData.headroom !== 'undefined') {
        navDrawerData.headroom.destroy();
        delete navDrawerData.headroom;
      }
    }
  });
});

