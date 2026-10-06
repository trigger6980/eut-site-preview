(function () {
  "use strict";

  // Mobile nav
  var toggle = document.querySelector(".menu-toggle");
  var mobile = document.getElementById("mobile-nav");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      var open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Active nav link
  var path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-desktop a, .mobile-nav a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").split("#")[0].toLowerCase();
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });

  // Unity Shield quick-check demo (no scanning — sample messages only)
  var samples = {
    suspicious1: {
      risk: "suspicious",
      title: "Worth a closer look",
      copy: "Unexpected password-reset links can be a trick. Open your account in the official app or by typing the real website address yourself — don't tap the link in the message."
    },
    safe: {
      risk: "safe",
      title: "Looks routine",
      copy: "A monthly statement from an address you already know, with no urgent threat and no weird link, is usually fine. Still open the bank through your own bookmark or app if you want to double-check."
    },
    suspicious2: {
      risk: "suspicious",
      title: "Treat this as a scam",
      copy: "Prize claims with a 10-minute deadline are a classic pressure trick. Don't share codes, cards, or remote-access. Delete it, or forward it to Eric if you want a second look."
    }
  };

  var options = document.querySelectorAll(".demo-option");
  var result = document.getElementById("demo-result");
  var resultTitle = document.getElementById("result-title");
  var resultCopy = document.getElementById("result-copy");
  if (options.length && result && resultTitle && resultCopy) {
    options.forEach(function (btn) {
      btn.addEventListener("click", function () {
        options.forEach(function (b) { b.classList.remove("selected"); });
        btn.classList.add("selected");
        var key = btn.getAttribute("data-sample");
        var data = samples[key];
        if (!data) return;
        result.className = "demo-result risk-" + data.risk;
        resultTitle.textContent = data.title;
        resultCopy.textContent = data.copy;
      });
    });
  }

  // Sample after-hours call walkthrough
  var script = [
    { who: "Caller", role: "caller", text: "Hi — my AC just died and it's after 8. Can someone come out tomorrow morning?" },
    { who: "AI receptionist (Nova)", role: "ai", text: "You've reached Gulf Coast Comfort. I'm the after-hours assistant. Sorry about the AC — I can take a few details and book a morning slot." },
    { who: "Caller", role: "caller", text: "Name's Marcus. Phone is this number. Tomorrow around 9 if you have it." },
    { who: "AI receptionist (Nova)", role: "ai", text: "Got it, Marcus. I have Tuesday 9:00–11:00 open for a no-cool diagnostic. I'll text you a confirmation and notify the owner now." },
    { who: "System", role: "ai", text: "Owner summary: After-hours lead — Marcus, AC no-cool, booked Tue 9–11. Message saved. No job missed." }
  ];
  var bubbles = document.getElementById("call-bubbles");
  var nextBtn = document.getElementById("call-next");
  var resetBtn = document.getElementById("call-reset");
  var step = 0;

  function renderCall() {
    if (!bubbles) return;
    bubbles.innerHTML = "";
    for (var i = 0; i < step; i++) {
      var s = script[i];
      var div = document.createElement("div");
      div.className = "bubble " + s.role + " show";
      div.innerHTML = '<span class="who">' + s.who + "</span>" + s.text;
      bubbles.appendChild(div);
    }
    if (nextBtn) {
      nextBtn.disabled = step >= script.length;
      nextBtn.textContent = step >= script.length ? "Call complete" : (step === 0 ? "Start sample call" : "Next");
    }
  }

  if (nextBtn && bubbles) {
    nextBtn.addEventListener("click", function () {
      if (step < script.length) {
        step += 1;
        renderCall();
        var last = bubbles.lastElementChild;
        if (last) {
          last.classList.remove("show");
          void last.offsetWidth;
          last.classList.add("show");
        }
      }
    });
  }
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      step = 0;
      renderCall();
    });
  }
  renderCall();
})();
