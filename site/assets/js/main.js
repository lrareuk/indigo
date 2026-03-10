/* ─── NOODLE LANDING · MAIN JS ─────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initPhoneMockup();
  initReveal();
  initWaitlist();
  initFloatingDot();
  initUntangleDemo();
});

/* ─── Typewriter ──────────────────────────────────────── */

function initTypewriter() {
  const el = document.getElementById('hero-typewriter');
  if (!el) return;
  const text = 'Think it. Catch it. Keep it.';
  let i = 0;

  setTimeout(() => {
    const interval = setInterval(() => {
      if (i <= text.length) {
        el.innerHTML = text.slice(0, i) + '<span class="cursor"></span>';
        i++;
      } else {
        clearInterval(interval);
        el.innerHTML = text;
      }
    }, 48);
  }, 400);
}

/* ─── Phone Mockup ────────────────────────────────────── */

function initPhoneMockup() {
  var phone = document.getElementById('phone-mockup');
  if (!phone) return;

  var phrases = [
    "what if the onboarding was just... nothing?",
    "ask mum about sunday",
    "podcast idea: interviews but only questions",
    "that colour on the building off leith walk",
    "rename the project to noodle",
    "read: the creative act by rick rubin"
  ];

  var captureScreen = phone.querySelector('.phone__screen--capture');
  var feedScreen = phone.querySelector('.phone__screen--feed');
  var captureText = phone.querySelector('.phone__capture-text');
  var swipeBar = phone.querySelector('.phone__swipe-bar');
  var swipeHint = phone.querySelector('.phone__swipe-hint');
  var feedList = phone.querySelector('.phone__feed-list');
  var feedCount = phone.querySelector('.phone__feed-count');
  var dot = phone.querySelector('.phone__dot');

  if (!captureScreen || !feedScreen || !captureText || !feedList) {
    console.warn('Phone mockup: missing elements');
    return;
  }

  var pi = 0;
  var ci = 0;
  var saved = [];

  function typeNext() {
    var phrase = phrases[pi];
    if (ci < phrase.length) {
      ci++;
      captureText.innerHTML = phrase.slice(0, ci) + '<span class="cursor"></span>';
      captureText.classList.remove('phone__capture-text--placeholder');
      setTimeout(typeNext, 40 + Math.random() * 40);
    } else {
      setTimeout(doSwipe, 1200);
    }
  }

  function doSwipe() {
    // Show swipe active state
    swipeBar.classList.add('phone__swipe-bar--active');
    swipeHint.classList.add('phone__swipe-hint--active');
    swipeHint.textContent = 'saving...';

    // Slide capture up via CSS class
    captureScreen.classList.add('phone__screen--swiping-up');

    setTimeout(function() {
      // Save the entry
      saved.unshift(phrases[pi]);
      if (saved.length > 5) saved = saved.slice(0, 5);
      renderFeed();

      // Swap screens: hide capture, show feed
      captureScreen.classList.add('phone__screen--gone');
      feedScreen.classList.remove('phone__screen--hidden-down');
      dot.classList.remove('phone__dot--hidden');

      // Hold on feed
      setTimeout(goBackToCapture, 2400);
    }, 500);
  }

  function goBackToCapture() {
    // Hide feed
    feedScreen.classList.add('phone__screen--hidden-down');
    dot.classList.add('phone__dot--hidden');

    setTimeout(function() {
      // Reset capture while invisible
      pi = (pi + 1) % phrases.length;
      ci = 0;
      captureText.innerHTML = "what's on your mind?" + '<span class="cursor"></span>';
      captureText.classList.add('phone__capture-text--placeholder');
      swipeBar.classList.remove('phone__swipe-bar--active');
      swipeHint.classList.remove('phone__swipe-hint--active');
      swipeHint.textContent = 'swipe up to save';

      // Remove transition classes with transitions disabled
      captureScreen.classList.add('phone__screen--no-transition');
      captureScreen.classList.remove('phone__screen--swiping-up');
      captureScreen.classList.remove('phone__screen--gone');

      // Force reflow
      void captureScreen.offsetHeight;

      // Re-enable transitions
      captureScreen.classList.remove('phone__screen--no-transition');

      // Start typing again
      setTimeout(typeNext, 400);
    }, 450);
  }

  function renderFeed() {
    var html = '';
    for (var i = 0; i < saved.length; i++) {
      var opacity = Math.max(0.3, 1 - i * 0.15);
      var timeClass = i === 0 ? 'phone__feed-entry-time phone__feed-entry-time--new' : 'phone__feed-entry-time';
      var timeText = i === 0 ? 'just now' : (i * 3 + 1) + ' min ago';
      html += '<div class="phone__feed-entry" style="opacity:' + opacity + '">';
      html += '<p class="phone__feed-entry-text">' + saved[i] + '</p>';
      html += '<p class="' + timeClass + '">' + timeText + '</p>';
      html += '</div>';
    }
    feedList.innerHTML = html;
    feedCount.textContent = saved.length + ' thought' + (saved.length !== 1 ? 's' : '');
  }

  // Go
  setTimeout(typeNext, 800);
}

/* ─── Scroll Reveal ───────────────────────────────────── */

function initReveal() {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) e.target.classList.add('is-visible');
      });
    },
    { threshold: 0.12 }
  );

  els.forEach(function(el) { observer.observe(el); });
}

/* ─── Waitlist Forms ──────────────────────────────────── */

function initWaitlist() {
  document.querySelectorAll('.waitlist').forEach(function(form) {
    var input = form.querySelector('.waitlist__input');
    var btn = form.querySelector('.waitlist__btn');
    if (!input || !btn) return;

    btn.addEventListener('click', function() {
      var email = input.value.trim();
      if (email && email.includes('@') && email.includes('.')) {
        document.querySelectorAll('.waitlist').forEach(function(f) {
          f.outerHTML =
            '<div class="waitlist__success">' +
            '<div class="waitlist__dot"></div>' +
            "<p class=\"waitlist__msg\">You're on the list. We'll be in touch.</p>" +
            '</div>';
        });
      }
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') btn.click();
    });
  });
}

/* ─── Floating Dot ────────────────────────────────────── */

function initFloatingDot() {
  var dot = document.querySelector('.floating-dot');
  if (!dot) return;

  window.addEventListener('scroll', function() {
    dot.classList.toggle('floating-dot--visible', window.scrollY > 400);
  }, { passive: true });

  dot.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── Untangle Demo ───────────────────────────────────── */

function initUntangleDemo() {
  var demo = document.querySelector('.untangle-demo');
  if (!demo) return;

  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var nodes = demo.querySelectorAll('.untangle-demo__node');
          nodes.forEach(function(n, i) {
            setTimeout(function() { n.classList.add('is-visible'); }, 200 + i * 100);
          });
          var insight = demo.querySelector('.untangle-demo__insight');
          if (insight) {
            setTimeout(function() { insight.classList.add('is-visible'); }, 1400);
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(demo);
}
