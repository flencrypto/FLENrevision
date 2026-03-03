const html = `<header class="d-flex justify-content-between main_header align-items-center">
  <div class="p-0 ms-5">
    <a href="/" aria-label="Home"><img width="198.2" height="70" src="/assets/logo/wide_logo_dark.svg" aria-label="FLENrevision Logo" alt="FLENrevision Logo"></a>
  </div>
  <nav>
    <ul class="nav h-100 d-none d-md-flex align-items-center">
      <li class="nav-item fs-5"><a style="display: inline !important" href="/create"
          class="nav-link link-light header-link">Create</a>
      </li>
      <li class="nav-item fs-5"><a style="display: inline !important" href="/contact" class="nav-link link-light header-link">Contact
          us</a>
      </li>
      <li class="nav-item fs-5"><a style="display: inline !important" href="/about" class="nav-link link-light header-link">About</a>
      </li>
      <li class="nav-item fs-5"><a style="display: inline !important" href="/privacy-policy"
          class="nav-link link-light header-link">Privacy Policy</a></li>
    </ul>
  </nav>
</header>

<div class="d-flex sidebar-wrapper" id="wrapper">
  <div id="sidebar" style="z-index: 1000;">
    <a class="d-flex justify-content-center mb-5" href="/">
      <img class="side-logo" src="/assets/logo/regular_logo_dark_no_text.svg" aria-label="FLENrevision Logo" alt="FLENrevision Logo" width="200" height="200">
    </a>
    <ul class="list-group list-group-flush">
      <li><a href="/create" class="list-group-item">Create</a></li>
      <li><a href="/contact/" class="list-group-item">Contact us</a></li>
      <li><a href="/about" class="list-group-item">About</a></li>
      <li><a href="/privacy-policy/" class="list-group-item">Privacy Policy</a></li>
    </ul>
  </div>
</div>
`;

const sidebar_header_wrapper = document.createElement('div');
sidebar_header_wrapper.innerHTML = html;
document.querySelector('.main_wrapper').insertBefore(sidebar_header_wrapper, document.querySelector('.main_wrapper').children[0]);

var icon = document.createElement('div');
var icon1 = document.createElement('div');
var icon2 = document.createElement('div');
var icon3 = document.createElement('div');

icon.classList.add('hamburger-icon');
icon1.classList.add('icon-1');
icon2.classList.add('icon-2');
icon3.classList.add('icon-3');

icon.append(icon1, icon2, icon3);
document.body.appendChild(icon);

icon.addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('active');
  icon1.classList.toggle('a');
  icon2.classList.toggle('c');
  icon3.classList.toggle('b');
  if (sidebar.classList.contains('active')) sidebar.setAttribute('aria-hidden', 'true');
  else sidebar.setAttribute('aria-hidden', 'false');
});

/* ADHD session timer & break reminder
 * Shows a visible session clock in the corner and prompts the student
 * to take a short break after BREAK_AFTER_MINS minutes of continuous study.
 */
(function () {
  const BREAK_AFTER_MINS = 20;
  const SNOOZE_MINS = 5;

  var sessionSeconds = 0;
  var breakSnoozed = false;
  var reminderShown = false;

  // Session timer badge
  var badge = document.createElement('div');
  badge.className = 'session-timer-badge';
  badge.setAttribute('aria-label', 'Session timer');
  document.body.appendChild(badge);

  // Break reminder overlay
  var overlay = document.createElement('div');
  overlay.className = 'break-reminder-overlay invis';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'break-title');
  overlay.innerHTML = `
    <div class="break-reminder-card">
      <div style="font-size:3rem;margin-bottom:0.4rem;">🧠</div>
      <h2 id="break-title">Time for a break!</h2>
      <p>You've been studying for <strong>${BREAK_AFTER_MINS} minutes</strong>.<br>
         A short break helps your brain stay sharp.</p>
      <button class="break-btn break-btn-primary" id="break-ok">Take a 5-min break ✅</button>
      <button class="break-btn break-btn-secondary" id="break-snooze">Remind me in ${SNOOZE_MINS} min</button>
    </div>`;
  document.body.appendChild(overlay);

  document.getElementById('break-ok').addEventListener('click', function () {
    overlay.classList.add('invis');
    sessionSeconds = 0;
    reminderShown = false;
    breakSnoozed = false;
  });

  document.getElementById('break-snooze').addEventListener('click', function () {
    overlay.classList.add('invis');
    breakSnoozed = true;
    reminderShown = false;
    sessionSeconds = (BREAK_AFTER_MINS - SNOOZE_MINS) * 60;
  });

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  setInterval(function () {
    sessionSeconds++;
    var m = Math.floor(sessionSeconds / 60);
    var s = sessionSeconds % 60;
    badge.textContent = '⏱ ' + pad(m) + ':' + pad(s);

    if (!reminderShown && sessionSeconds >= BREAK_AFTER_MINS * 60) {
      overlay.classList.remove('invis');
      reminderShown = true;
    }
  }, 1000);
}());
