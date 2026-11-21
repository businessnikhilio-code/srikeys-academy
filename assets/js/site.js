/* SriKeys Academy — shared site behaviour */
(function () {
  "use strict";

  var WHATSAPP = "919840012345";

  /* Mobile navigation */
  var header = document.getElementById("site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (header && toggle) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    header.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Scroll reveal */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Current year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Demo enquiry forms: store locally and offer a WhatsApp hand-off */
  var forms = document.querySelectorAll("form[data-enquiry]");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = form.querySelector(".form-status");
      var data = {};
      new FormData(form).forEach(function (value, key) {
        data[key] = String(value).trim();
      });

      try {
        var key = "srikeys_enquiries";
        var list = JSON.parse(localStorage.getItem(key) || "[]");
        list.unshift({ submittedAt: new Date().toISOString(), source: form.dataset.enquiry, fields: data });
        localStorage.setItem(key, JSON.stringify(list.slice(0, 100)));
      } catch (err) {
        /* storage can be unavailable in private mode; the form still responds */
      }

      if (status) {
        var name = data.name || data.studentName || "";
        var message =
          "Hello SriKeys! I'd like to " +
          (form.dataset.enquiry === "enrol" ? "enrol for a course" : "ask about classes") +
          "." +
          (name ? " My name is " + name + "." : "") +
          (data.course ? " Course: " + data.course + "." : "") +
          (data.age ? " Age: " + data.age + "." : "") +
          (data.phone ? " Phone: " + data.phone : "");

        status.innerHTML =
          "Thank you" + (name ? ", " + name.split(" ")[0] : "") +
          "! Your enquiry has been recorded and our team will get back to you within one working day. " +
          '<a href="https://wa.me/' + WHATSAPP + "?text=" + encodeURIComponent(message) +
          '" target="_blank" rel="noopener">Send the same details on WhatsApp →</a>';
        status.hidden = false;
        form.reset();
      }
    });
  });
})();
