$(function () {
  var $window = $(window);
  var $menuToggle = $(".menu-toggle");
  var $mobileMenu = $("#mobile-menu");
  var $heroMedia = $(".js-hero-media");
  var $heroContent = $(".js-hero-content");

  function closeMenu() {
    $menuToggle.removeClass("is-open").attr("aria-expanded", "false");
    $mobileMenu.stop(true, true).slideUp(220);
  }

  function openMenu() {
    $menuToggle.addClass("is-open").attr("aria-expanded", "true");
    $mobileMenu.stop(true, true).slideDown(220);
  }

  function resetMenuOnDesktop() {
    if (window.innerWidth >= 1280) {
      $menuToggle.removeClass("is-open").attr("aria-expanded", "false");
      $mobileMenu.removeAttr("style");
    }
  }

  $window.on("resize", resetMenuOnDesktop);

  $menuToggle.on("click", function () {
    if ($menuToggle.hasClass("is-open")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  $(".mobile-link, .nav-link").on("click", function () {
    closeMenu();
  });

  $(document).on("keyup", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  $('a[href^="#"]').on("click", function (event) {
    var targetId = $(this).attr("href");

    if (!targetId || targetId === "#") {
      return;
    }

    var $target = $(targetId);

    if (!$target.length) {
      return;
    }

    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $target.offset().top - 90,
      },
      700
    );
  });

  $(".hero-shell").on("mousemove", function (event) {
    if (window.innerWidth < 1024) {
      return;
    }

    var bounds = this.getBoundingClientRect();
    var x = (event.clientX - bounds.left) / bounds.width - 0.5;
    var y = (event.clientY - bounds.top) / bounds.height - 0.5;

    $heroMedia.css("transform", "scale(1.06) translate(" + x * 18 + "px," + y * 18 + "px)");
    $heroContent.css("transform", "translate(" + x * -10 + "px," + y * -10 + "px)");
  });

  $(".hero-shell").on("mouseleave", function () {
    $heroMedia.css("transform", "scale(1.05)");
    $heroContent.css("transform", "translate(0, 0)");
  });

  var $whyCarousel = $(".js-why-carousel");
  var $whyPrev = $(".js-why-prev");
  var $whyNext = $(".js-why-next");
  var whyIndex = 0;

  function getVisibleWhySlides() {
    if (window.innerWidth <= 767) {
      return 1;
    }

    if (window.innerWidth <= 1023) {
      return 2;
    }

    return 4;
  }

  function getWhyMaxIndex() {
    var total = $whyCarousel.find("img").length;
    var visible = getVisibleWhySlides();
    return Math.max(0, total - visible);
  }

  function syncWhyCarousel() {
    if (!$whyCarousel.length) {
      return;
    }

    var maxIndex = getWhyMaxIndex();

    if (whyIndex > maxIndex) {
      whyIndex = maxIndex;
    }

    var first = $whyCarousel.find("img").first();
    var slideWidth = first.outerWidth(true) || 0;
    $whyCarousel.scrollLeft(whyIndex * slideWidth);

    $whyPrev.prop("disabled", whyIndex <= 0);
    $whyNext.prop("disabled", whyIndex >= maxIndex);
  }

  $whyPrev.on("click", function () {
    whyIndex = Math.max(0, whyIndex - 1);
    syncWhyCarousel();
  });

  $whyNext.on("click", function () {
    whyIndex = Math.min(getWhyMaxIndex(), whyIndex + 1);
    syncWhyCarousel();
  });

  $window.on("resize", syncWhyCarousel);
  syncWhyCarousel();

  var $blogCarousel = $(".js-blog-carousel");
  var $blogPrev = $(".js-blog-prev");
  var $blogNext = $(".js-blog-next");
  var blogIndex = 0;
  var blogAutoplayTimer = null;

  function getVisibleBlogSlides() {
    if (window.innerWidth <= 767) {
      return 1;
    }

    if (window.innerWidth <= 1023) {
      return 2;
    }

    return 3;
  }

  function getBlogMaxIndex() {
    var total = $blogCarousel.find(".blog-card").length;
    var visible = getVisibleBlogSlides();
    return Math.max(0, total - visible);
  }

  function syncBlogCarousel() {
    if (!$blogCarousel.length) {
      return;
    }

    var maxIndex = getBlogMaxIndex();
    if (blogIndex > maxIndex) {
      blogIndex = maxIndex;
    }

    var first = $blogCarousel.find(".blog-card").first();
    var slideWidth = first.outerWidth(true) || 0;
    $blogCarousel.scrollLeft(blogIndex * slideWidth);

    $blogPrev.prop("disabled", blogIndex <= 0);
    $blogNext.prop("disabled", blogIndex >= maxIndex);
  }

  function stopBlogAutoplay() {
    if (blogAutoplayTimer) {
      clearInterval(blogAutoplayTimer);
      blogAutoplayTimer = null;
    }
  }

  function startBlogAutoplay() {
    if (!$blogCarousel.length) {
      return;
    }

    stopBlogAutoplay();
    blogAutoplayTimer = setInterval(function () {
      var maxIndex = getBlogMaxIndex();
      if (maxIndex <= 0) {
        return;
      }

      if (blogIndex >= maxIndex) {
        blogIndex = 0;
      } else {
        blogIndex += 1;
      }

      syncBlogCarousel();
    }, 4600);
  }

  $blogPrev.on("click", function () {
    blogIndex = Math.max(0, blogIndex - 1);
    syncBlogCarousel();
    startBlogAutoplay();
  });

  $blogNext.on("click", function () {
    blogIndex = Math.min(getBlogMaxIndex(), blogIndex + 1);
    syncBlogCarousel();
    startBlogAutoplay();
  });

  $blogCarousel.on("mouseenter focusin", stopBlogAutoplay);
  $blogCarousel.on("mouseleave focusout", startBlogAutoplay);
  $blogPrev.on("mouseenter focus", stopBlogAutoplay);
  $blogNext.on("mouseenter focus", stopBlogAutoplay);
  $blogPrev.on("mouseleave blur", startBlogAutoplay);
  $blogNext.on("mouseleave blur", startBlogAutoplay);

  var $trustCarousel = $(".js-trust-carousel");
  var $trustPrev = $(".js-trust-prev");
  var $trustNext = $(".js-trust-next");
  var trustIndex = 0;
  var trustAutoplayTimer = null;

  function getVisibleTrustSlides() {
    if (window.innerWidth <= 767) {
      return 1;
    }

    if (window.innerWidth <= 1023) {
      return 2;
    }

    return 3;
  }

  function getTrustMaxIndex() {
    var total = $trustCarousel.find(".trust-testimonial").length;
    var visible = getVisibleTrustSlides();
    return Math.max(0, total - visible);
  }

  function syncTrustCarousel() {
    if (!$trustCarousel.length) {
      return;
    }

    var maxIndex = getTrustMaxIndex();
    if (trustIndex > maxIndex) {
      trustIndex = maxIndex;
    }

    var first = $trustCarousel.find(".trust-testimonial").first();
    var slideWidth = first.outerWidth(true) || 0;
    $trustCarousel.scrollLeft(trustIndex * slideWidth);

    $trustPrev.prop("disabled", trustIndex <= 0);
    $trustNext.prop("disabled", trustIndex >= maxIndex);
  }

  function stopTrustAutoplay() {
    if (trustAutoplayTimer) {
      clearInterval(trustAutoplayTimer);
      trustAutoplayTimer = null;
    }
  }

  function startTrustAutoplay() {
    if (!$trustCarousel.length) {
      return;
    }

    stopTrustAutoplay();
    trustAutoplayTimer = setInterval(function () {
      var maxIndex = getTrustMaxIndex();
      if (maxIndex <= 0) {
        return;
      }

      if (trustIndex >= maxIndex) {
        trustIndex = 0;
      } else {
        trustIndex += 1;
      }

      syncTrustCarousel();
    }, 4200);
  }

  $trustPrev.on("click", function () {
    trustIndex = Math.max(0, trustIndex - 1);
    syncTrustCarousel();
    startTrustAutoplay();
  });

  $trustNext.on("click", function () {
    trustIndex = Math.min(getTrustMaxIndex(), trustIndex + 1);
    syncTrustCarousel();
    startTrustAutoplay();
  });

  $trustCarousel.on("mouseenter focusin", stopTrustAutoplay);
  $trustCarousel.on("mouseleave focusout", startTrustAutoplay);
  $trustPrev.on("mouseenter focus", stopTrustAutoplay);
  $trustNext.on("mouseenter focus", stopTrustAutoplay);
  $trustPrev.on("mouseleave blur", startTrustAutoplay);
  $trustNext.on("mouseleave blur", startTrustAutoplay);

  $window.on("resize", function () {
    syncBlogCarousel();
    startBlogAutoplay();
    syncTrustCarousel();
    startTrustAutoplay();
  });
  syncBlogCarousel();
  startBlogAutoplay();
  syncTrustCarousel();
  startTrustAutoplay();

  var $projectFilters = $(".js-project-filter");
  var $projectCards = $(".js-project-card");

  $projectFilters.on("click", function () {
    var $current = $(this);
    var filter = $current.data("filter");

    $projectFilters.removeClass("is-active");
    $current.addClass("is-active");

    $projectCards.each(function () {
      var $card = $(this);
      var categories = String($card.data("category") || "").split(" ");
      var shouldShow = filter === "all" || categories.indexOf(filter) !== -1;
      var existingTimer = $card.data("filterTimer");

      if (existingTimer) {
        clearTimeout(existingTimer);
        $card.removeData("filterTimer");
      }

      if (shouldShow) {
        if ($card.hasClass("is-hidden")) {
          $card.removeClass("is-hidden").addClass("is-showing");
          requestAnimationFrame(function () {
            $card.removeClass("is-showing");
          });
        }
        return;
      }

      if ($card.hasClass("is-hidden")) {
        return;
      }

      $card.addClass("is-hiding");
      var hideTimer = setTimeout(function () {
        $card.addClass("is-hidden").removeClass("is-hiding");
        $card.removeData("filterTimer");
      }, 280);
      $card.data("filterTimer", hideTimer);
    });
  });

  $(".faq-question").on("click", function () {
    var $item = $(this).closest(".faq-item");
    var isOpen = $item.hasClass("is-open");

    $(".faq-item")
      .removeClass("is-open")
      .find(".faq-question")
      .attr("aria-expanded", "false");

    if (!isOpen) {
      $item.addClass("is-open");
      $item.find(".faq-question").attr("aria-expanded", "true");
    }
  });
});
