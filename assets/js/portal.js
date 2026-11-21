/* SriKeys Academy — student portal renderer */
(function () {
  "use strict";

  var D = window.SriKeysData;
  if (!D) return;
  var S = D.student;
  var $ = function (sel) { return document.querySelector(sel); };
  var esc = function (value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var money = function (n) { return "₹" + Number(n).toLocaleString("en-IN"); };

  function statusPill(status) {
    var cls = "pill--grey";
    if (status === "Present" || status === "Paid") cls = "pill--green";
    if (status === "Absent" || status === "Overdue") cls = "pill--red";
    if (status === "Rescheduled" || status === "Due") cls = "pill--amber";
    return '<span class="pill ' + cls + '">' + esc(status) + "</span>";
  }

  /* ---------- Shared profile bits ---------- */
  $("#side-avatar").textContent = S.initials;
  $("#side-name").textContent = S.name;
  $("#side-meta").textContent = S.grade + " · " + S.course.split("—")[0].trim();
  $("#greet-name").textContent = S.firstName;
  $("#profile-avatar").textContent = S.initials;
  $("#profile-name").textContent = S.name;
  $("#profile-id").textContent = "Student ID " + S.id;
  $("#profile-grade").textContent = S.grade;

  var now = new Date();
  var hour = now.getHours();
  var greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  var greetEl = $("#view-overview .dash-head h1");
  if (greetEl) greetEl.innerHTML = greeting + ', <span id="greet-name">' + esc(S.firstName) + "</span>.";
  $("#overview-date").textContent = now.toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  }) + " · Week 12 of the academic year";

  /* ---------- Navigation ---------- */
  var navButtons = document.querySelectorAll("#portal-nav button");
  function showView(name, updateHash) {
    var found = false;
    document.querySelectorAll(".view").forEach(function (view) {
      var match = view.id === "view-" + name;
      view.classList.toggle("is-active", match);
      if (match) found = true;
    });
    if (!found) return;
    navButtons.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.dataset.view === name);
    });
    if (updateHash !== false) history.replaceState(null, "", "#" + name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  navButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { showView(btn.dataset.view); });
  });
  document.querySelectorAll("[data-goto]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      showView(link.dataset.goto);
    });
  });
  if (location.hash) showView(location.hash.replace("#", ""), false);

  /* ---------- Overview KPIs ---------- */
  $("#kpi-next").textContent = "Tue 24 Nov";
  $("#kpi-next-sub").textContent = S.nextClass.time + " · " + S.nextClass.mode;
  $("#kpi-attendance").textContent = S.attendancePct + "%";
  $("#kpi-streak").textContent = S.streak + " days";
  $("#kpi-points").textContent = S.points + " points this month";
  $("#kpi-fees").textContent = money(S.feesDue);

  /* ---------- Next class card ---------- */
  $("#next-class-card").innerHTML =
    '<p class="post-meta" style="margin-bottom:8px">' + esc(S.nextClass.day) + " " + esc(S.nextClass.date) + "</p>" +
    '<h3 style="font-size:1.25rem;margin-bottom:6px">' + esc(S.nextClass.topic) + "</h3>" +
    '<p class="small" style="color:var(--ink-soft)">' + esc(S.nextClass.time) + " · " + esc(S.nextClass.room) + "</p>" +
    '<div class="mini-row" style="border:0;padding:12px 0 0"><div class="avatar" style="width:36px;height:36px;font-size:.78rem">SR</div>' +
    '<div class="mini-body"><strong>' + esc(S.nextClass.teacher) + '</strong><span>Your teacher</span></div></div>' +
    '<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">' +
    '<a class="btn btn--primary btn--sm" href="' + (S.nextClass.link || "#schedule") + '" data-goto="schedule">' +
    (S.nextClass.link ? "Join online class" : "Class details") + "</a>" +
    '<a class="btn btn--ghost btn--sm" href="#homework" data-goto="homework">Homework</a></div>';

  /* ---------- Overview report summary ---------- */
  var latest = S.report.skills;
  var avg = latest.reduce(function (sum, s) { return sum + s.score; }, 0) / latest.length;
  $("#overview-report").innerHTML =
    '<p class="post-meta" style="margin-bottom:6px">' + esc(S.report.term) + "</p>" +
    '<div style="display:flex;align-items:baseline;gap:10px;margin-bottom:10px">' +
    '<strong style="font-family:var(--serif);font-size:2.1rem;line-height:1">' + avg.toFixed(1) + "</strong>" +
    '<span class="small muted">/ 5 average</span></div>' +
    '<p class="small" style="color:var(--ink-soft)">' + esc(S.report.feedback.slice(0, 132)) + "…</p>" +
    '<p class="small muted" style="margin-top:8px">Published ' + esc(S.report.published) + "</p>";

  /* ---------- Overview recent lessons ---------- */
  $("#overview-lessons").innerHTML = S.completedLessons.slice(0, 3).map(function (lesson) {
    var parts = lesson.date.split(" ");
    return '<div class="mini-row">' +
      '<div class="date-chip"><strong>' + esc(parts[0]) + "</strong><span>" + esc(parts[1]) + "</span></div>" +
      '<div class="mini-body"><strong>' + esc(lesson.title) + "</strong><span>" + esc(lesson.summary.slice(0, 92)) + "…</span></div>" +
      '<div class="mini-right">' + statusPill(lesson.teacher === "—" ? "Rescheduled" : "Present") + "</div></div>";
  }).join("");

  /* ---------- Homework state ---------- */
  var HW_KEY = "srikeys_homework_" + S.id;
  var hwState = {};
  try { hwState = JSON.parse(localStorage.getItem(HW_KEY) || "{}"); } catch (err) { hwState = {}; }
  function isDone(task) {
    return Object.prototype.hasOwnProperty.call(hwState, task.id) ? hwState[task.id] : task.done;
  }
  function setDone(id, done) {
    hwState[id] = done;
    try { localStorage.setItem(HW_KEY, JSON.stringify(hwState)); } catch (err) { /* ignore */ }
  }

  function homeworkRow(task) {
    var done = isDone(task);
    return '<label class="check-row' + (done ? " is-done" : "") + '">' +
      '<input type="checkbox" data-task="' + esc(task.id) + '"' + (done ? " checked" : "") + ">" +
      '<span class="check-text"><strong>' + esc(task.title) + "</strong>" +
      "<span>" + esc(task.teacher) + " · due " + esc(task.due) + "</span>" +
      '<span style="margin-top:4px">' + esc(task.instructions) + "</span>" +
      '<span style="margin-top:6px;color:var(--orange-deep);font-weight:700">' +
      task.resources.map(function (r) { return "↗ " + esc(r); }).join(" &nbsp; ") + "</span></span></label>";
  }

  function renderHomework() {
    var pending = S.homework.filter(function (t) { return !isDone(t); });
    var done = S.homework.filter(isDone);

    $("#overview-homework").innerHTML = pending.slice(0, 3).map(homeworkRow).join("") ||
      '<p class="empty-note">Everything is complete. Excellent work.</p>';
    $("#overview-hw-note").textContent = pending.length
      ? pending.length + " task" + (pending.length === 1 ? "" : "s") + " left this week. Tick each one as you practise it."
      : "No outstanding homework.";

    $("#homework-pending").innerHTML = pending.map(homeworkRow).join("") ||
      '<p class="empty-note">No pending homework — your teacher will set new work after the next lesson.</p>';
    $("#homework-done").innerHTML = done.map(homeworkRow).join("") ||
      '<p class="empty-note">Completed tasks will appear here.</p>';

    $("#hw-count").textContent = pending.length;
    $("#hw-count").style.display = pending.length ? "" : "none";
    $("#hw-pending-pill").textContent = pending.length + " pending";

    document.querySelectorAll("#view-homework input[data-task], #overview-homework input[data-task]").forEach(function (box) {
      box.addEventListener("change", function () {
        setDone(box.dataset.task, box.checked);
        renderHomework();
      });
    });
  }
  renderHomework();

  /* ---------- Practice streak ---------- */
  $("#streak-grid").innerHTML = S.practiceDays.map(function (level) {
    return '<span class="streak-dot' + (level === 2 ? " is-on" : level === 1 ? " is-half" : "") + '"></span>';
  }).join("");
  $("#streak-note").textContent = S.streak + " days · personal best 31";

  /* ---------- Profile ---------- */
  $("#profile-contact").innerHTML =
    '<div class="mini-row" style="border:0;padding:6px 0"><div class="mini-body"><strong>Parent</strong><span>' + esc(S.parent) + "</span></div></div>" +
    '<div class="mini-row" style="border:0;padding:6px 0"><div class="mini-body"><strong>Phone</strong><span>' + esc(S.phone) + "</span></div></div>" +
    '<div class="mini-row" style="border:0;padding:6px 0"><div class="mini-body"><strong>Email</strong><span>' + esc(S.email) + "</span></div></div>";

  var personal = [
    ["Full name", S.name], ["Student ID", S.id], ["Age", S.age + " years"],
    ["Date joined", S.joined], ["Parent / guardian", S.parent], ["Phone", S.phone],
    ["Email", S.email], ["Lesson format", S.format], ["Assigned teacher", S.teacher]
  ];
  $("#profile-table").innerHTML = personal.map(function (row) {
    return "<tr><td style='width:38%'><strong>" + esc(row[0]) + "</strong></td><td>" + esc(row[1]) + "</td></tr>";
  }).join("");

  var learning = [
    ["Course", S.course], ["Current grade", S.grade], ["Next examination", S.nextExam],
    ["Theory level", "ABRSM Grade 2 (completed, distinction)"], ["Preferred hand", "Right"],
    ["Learning notes", "Responds well to visual aids and counting aloud. Slight performance anxiety — building confidence through small audiences."]
  ];
  $("#learning-table").innerHTML = learning.map(function (row) {
    return "<tr><td style='width:38%'><strong>" + esc(row[0]) + "</strong></td><td>" + esc(row[1]) + "</td></tr>";
  }).join("");

  $("#edit-profile").addEventListener("click", function () {
    this.textContent = "Edit requested";
    this.disabled = true;
    var note = document.createElement("p");
    note.className = "form-note";
    note.textContent = "In production this opens an editable form. Contact the academy office to change details in the meantime.";
    $("#profile-table").parentElement.appendChild(note);
  });

  /* ---------- Course ---------- */
  $("#course-kpis").innerHTML =
    '<div class="kpi"><span class="kpi-label">Course</span><strong style="font-size:1.2rem;font-family:var(--sans);font-weight:800;margin-top:10px">Piano</strong><span class="kpi-sub">Classical foundation</span></div>' +
    '<div class="kpi kpi--sage"><span class="kpi-label">Grade</span><strong style="font-size:1.2rem;font-family:var(--sans);font-weight:800;margin-top:10px">Grade 3</strong><span class="kpi-sub">ABRSM</span></div>' +
    '<div class="kpi kpi--amber"><span class="kpi-label">Lessons completed</span><strong>64</strong><span class="kpi-sub">Since June 2024</span></div>' +
    '<div class="kpi kpi--orange"><span class="kpi-label">Exam target</span><strong style="font-size:1.2rem;font-family:var(--sans);font-weight:800;margin-top:10px">March 2027</strong><span class="kpi-sub">Provisional</span></div>';

  $("#course-table").innerHTML =
    "<tr><td style='width:34%'><strong>Course</strong></td><td>" + esc(S.course) + "</td></tr>" +
    "<tr><td><strong>Teacher</strong></td><td>" + esc(S.teacher) + " · " + esc(S.teacherContact) + "</td></tr>" +
    "<tr><td><strong>Format</strong></td><td>" + esc(S.format) + "</td></tr>" +
    "<tr><td><strong>Weekly commitment</strong></td><td>1 × 45-minute lesson + 1 × 30-minute theory class</td></tr>" +
    "<tr><td><strong>Practice expectation</strong></td><td>15–20 minutes, 5 days a week</td></tr>" +
    "<tr><td><strong>Repertoire</strong></td><td>Minuet in G (Petzold) · Czerny Op. 599 No. 12 · Clementi Sonatina in C</td></tr>";

  $("#pathway-table").innerHTML =
    "<thead><tr><th>Stage</th><th>Board</th><th>Status</th><th>Result</th></tr></thead><tbody>" +
    "<tr><td><strong>Initial</strong></td><td>ABRSM</td><td>Completed</td><td>" + statusPill("Paid").replace("Paid", "Merit") + "</td></tr>" +
    "<tr><td><strong>Grade 1</strong></td><td>ABRSM</td><td>Completed</td><td>" + statusPill("Paid").replace("Paid", "Distinction") + "</td></tr>" +
    "<tr><td><strong>Grade 2</strong></td><td>ABRSM</td><td>Completed</td><td>" + statusPill("Paid").replace("Paid", "Distinction · 137") + "</td></tr>" +
    "<tr><td><strong>Grade 3</strong></td><td>ABRSM</td><td>In preparation</td><td>" + statusPill("Due").replace("Due", "Target Mar 2027") + "</td></tr>" +
    "<tr><td><strong>Grade 4</strong></td><td>ABRSM</td><td>Planned</td><td>" + statusPill("Rescheduled").replace("Rescheduled", "2027–28") + "</td></tr></tbody>";

  /* ---------- Schedule ---------- */
  $("#schedule-table").innerHTML =
    "<thead><tr><th>Date</th><th>Time</th><th>Topic</th><th>Teacher</th><th>Mode</th><th></th></tr></thead><tbody>" +
    S.schedule.map(function (c) {
      var action = c.link
        ? '<a class="btn btn--primary btn--sm" href="' + esc(c.link) + '" target="_blank" rel="noopener">Join class</a>'
        : '<a class="btn btn--ghost btn--sm" href="#schedule">Details</a>';
      return "<tr><td><strong>" + esc(c.day) + " " + esc(c.date) + "</strong></td><td>" + esc(c.time) + "</td><td>" +
        esc(c.topic) + "</td><td>" + esc(c.teacher) + "</td><td>" + statusPill(c.mode === "Online" ? "Due" : "Paid").replace("Due", "Online").replace("Paid", "In studio") + "</td><td>" + action + "</td></tr>";
    }).join("") + "</tbody>";

  $("#rs-class").innerHTML = S.schedule.map(function (c) {
    return "<option>" + esc(c.day + " " + c.date + " · " + c.time) + "</option>";
  }).join("");

  $("#request-reschedule").addEventListener("click", function () {
    var panel = $("#reschedule-panel");
    panel.hidden = !panel.hidden;
    if (!panel.hidden) panel.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  $("#reschedule-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var status = this.querySelector(".form-status");
    status.hidden = false;
    status.textContent = "Request sent. The academy office will confirm the new slot by WhatsApp within one working day.";
    this.querySelector("textarea").value = "";
  });

  /* ---------- Attendance ---------- */
  var present = S.attendance.filter(function (a) { return a.status === "Present"; }).length;
  var rescheduled = S.attendance.filter(function (a) { return a.status === "Rescheduled"; }).length;
  $("#attendance-kpis").innerHTML =
    '<div class="kpi kpi--sage"><span class="kpi-label">Attendance</span><strong>' + S.attendancePct + '%</strong><span class="kpi-sub">Last 12 classes</span></div>' +
    '<div class="kpi"><span class="kpi-label">Present</span><strong>' + present + '</strong><span class="kpi-sub">Classes attended</span></div>' +
    '<div class="kpi kpi--amber"><span class="kpi-label">Rescheduled</span><strong>' + rescheduled + '</strong><span class="kpi-sub">Moved with notice</span></div>' +
    '<div class="kpi kpi--orange"><span class="kpi-label">Missed</span><strong>0</strong><span class="kpi-sub">This term</span></div>';

  $("#attendance-table").innerHTML =
    "<thead><tr><th>Date</th><th>Topic</th><th>Teacher</th><th>Status</th></tr></thead><tbody>" +
    S.attendance.map(function (a) {
      return "<tr><td><strong>" + esc(a.date) + "</strong></td><td>" + esc(a.topic) + "</td><td>" + esc(a.teacher) + "</td><td>" + statusPill(a.status) + "</td></tr>";
    }).join("") + "</tbody>";

  /* ---------- Progress ---------- */
  $("#repertoire-list").innerHTML = S.progress.map(function (p) {
    return '<div class="report-skill"><div class="report-skill-top"><span>' + esc(p.piece) + "</span><span>" + esc(p.stage) + " · " + p.percent + "%</span></div>" +
      '<div class="progress"><i style="width:' + p.percent + '%"></i></div></div>';
  }).join("");

  function reportMarkup(report, label) {
    return '<div class="panel"><div class="panel-head"><div><h2>' + esc(report.term) + "</h2>" +
      '<span class="hint">' + esc(label) + " · published " + esc(report.published) + " · " + esc(report.teacher) + "</span></div>" +
      '<span class="pill pill--green">Published</span></div>' +
      '<div class="grid grid-2" style="gap:26px">' +
      '<div>' + report.skills.slice(0, 4).map(skillBar).join("") + "</div>" +
      '<div>' + report.skills.slice(4).map(skillBar).join("") + "</div></div>" +
      '<div style="margin-top:22px;padding-top:18px;border-top:1px solid var(--line)">' +
      '<h3 style="font-size:1rem">Teacher feedback</h3><p class="small" style="color:var(--ink-soft)">' + esc(report.feedback) + "</p>" +
      '<h3 style="font-size:1rem;margin-top:14px">Areas requiring improvement</h3><p class="small" style="color:var(--ink-soft)">' + esc(report.improve) + "</p>" +
      "</div></div>";
  }
  function skillBar(skill) {
    return '<div class="report-skill"><div class="report-skill-top"><span>' + esc(skill.name) + "</span><span>" + skill.score + " / 5</span></div>" +
      '<div class="progress' + (skill.score >= 4 ? " progress--sage" : "") + '"><i style="width:' + (skill.score * 20) + '%"></i></div>' +
      '<p class="small muted" style="margin:6px 0 0;font-size:.76rem">' + esc(skill.note) + "</p></div>";
  }

  var q2 = {
    term: "Quarter 2 · April – June 2026",
    published: "10 July 2026",
    teacher: "Sridevi Raman",
    feedback: "A steady quarter. Aarav completed Grade 2 with a distinction and settled into the Grade 3 repertoire. Reading is improving but he still guesses at notes he does not recognise rather than working them out — we have started daily sight-reading as a result.",
    improve: "Note reading beyond the staff; steady pulse in faster pieces; confidence playing for others.",
    skills: S.report.skills.map(function (s, i) {
      return { name: s.name, score: Math.max(2, s.score - (i % 2 === 0 ? 1 : 0)), note: "Progressing towards the level expected at this stage." };
    })
  };

  function renderReport(term) {
    var report = term === "q2" ? q2 : S.report;
    $("#report-card").innerHTML = reportMarkup(report, term === "q2" ? "Previous term" : "Current term");
    $("#report-goals").innerHTML = (term === "q2"
      ? ["Complete Grade 2 with distinction", "Begin Grade 3 repertoire", "Improve sight-reading to Grade 2 standard"]
      : S.report.goals
    ).map(function (goal) { return "<li>" + esc(goal) + "</li>"; }).join("");
  }
  renderReport("current");

  document.querySelectorAll("#report-tabs button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("#report-tabs button").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      renderReport(btn.dataset.term);
    });
  });

  /* ---------- Achievements ---------- */
  var earned = S.badges.filter(function (b) { return b.earned; }).length;
  $("#points-pill").textContent = S.points + " points";
  $("#reward-kpis").innerHTML =
    '<div class="kpi kpi--orange"><span class="kpi-label">Points</span><strong>' + S.points + '</strong><span class="kpi-sub">This month</span></div>' +
    '<div class="kpi kpi--sage"><span class="kpi-label">Practice streak</span><strong>' + S.streak + '</strong><span class="kpi-sub">Days in a row</span></div>' +
    '<div class="kpi kpi--amber"><span class="kpi-label">Badges</span><strong>' + earned + " / " + S.badges.length + '</strong><span class="kpi-sub">Earned</span></div>' +
    '<div class="kpi"><span class="kpi-label">Awards</span><strong>' + S.awards.length + '</strong><span class="kpi-sub">Certificates</span></div>';

  $("#badge-grid").innerHTML = S.badges.map(function (b) {
    return '<div class="badge-item' + (b.earned ? "" : " is-locked") + '">' +
      '<div class="medal">' + b.icon + "</div><strong>" + esc(b.name) + "</strong><span>" + esc(b.note) + "</span></div>";
  }).join("");

  $("#awards-list").innerHTML = S.awards.map(function (a) {
    return '<div class="mini-row"><div class="date-chip"><strong>★</strong><span>Award</span></div>' +
      '<div class="mini-body"><strong>' + esc(a.title) + "</strong><span>" + esc(a.detail) + "</span></div>" +
      '<div class="mini-right"><span class="small muted">' + esc(a.month) + "</span></div></div>";
  }).join("");

  /* ---------- Fees ---------- */
  var paid = S.fees.filter(function (f) { return f.status === "Paid"; });
  var paidTotal = paid.reduce(function (sum, f) { return sum + f.amount; }, 0);
  $("#fee-kpis").innerHTML =
    '<div class="kpi kpi--amber"><span class="kpi-label">Amount due</span><strong style="font-size:1.5rem">' + money(S.feesDue) + '</strong><span class="kpi-sub">Due ' + esc(S.feesDueDate) + '</span></div>' +
    '<div class="kpi"><span class="kpi-label">Monthly fee</span><strong style="font-size:1.5rem">₹2,400</strong><span class="kpi-sub">45-minute lessons</span></div>' +
    '<div class="kpi kpi--sage"><span class="kpi-label">Paid this year</span><strong style="font-size:1.5rem">' + money(paidTotal) + '</strong><span class="kpi-sub">' + paid.length + ' invoices</span></div>' +
    '<div class="kpi"><span class="kpi-label">Discounts applied</span><strong style="font-size:1.5rem">₹240</strong><span class="kpi-sub">Sibling discount</span></div>';

  function feeRows() {
    return S.fees.map(function (f) {
      var action = f.status === "Paid"
        ? '<button class="btn btn--ghost btn--sm" data-receipt="' + esc(f.invoice) + '">Receipt</button>'
        : '<button class="btn btn--primary btn--sm" data-receipt="' + esc(f.invoice) + '">Pay now</button>';
      return "<tr><td><strong>" + esc(f.period) + "</strong><br><span class='small muted'>" + esc(f.invoice) + "</span></td><td>" +
        money(f.amount) + "<br><span class='small muted'>" + (f.note ? esc(f.note) : "&nbsp;") + "</span></td><td>" + esc(f.due) + "</td><td>" +
        statusPill(f.status) + "</td><td>" + action + "</td></tr>";
    }).join("");
  }
  $("#fees-table").innerHTML = "<thead><tr><th>Invoice</th><th>Amount</th><th>Due date</th><th>Status</th><th></th></tr></thead><tbody>" + feeRows() + "</tbody>";

  $("#fee-structure").innerHTML =
    "<thead><tr><th>Item</th><th>Detail</th><th>Amount</th></tr></thead><tbody>" +
    "<tr><td><strong>Piano tuition</strong></td><td>4 × 45-minute lessons per month</td><td>₹2,400</td></tr>" +
    "<tr><td><strong>Theory add-on</strong></td><td>4 × 30-minute classes per month</td><td>₹1,200</td></tr>" +
    "<tr><td><strong>Sibling discount</strong></td><td>Second enrolment, 10%</td><td>−₹240</td></tr>" +
    "<tr><td><strong>Exam entry</strong></td><td>Charged at cost when entering</td><td>At cost</td></tr></tbody>";

  function showReceipt(invoiceNo) {
    var fee = S.fees.find(function (f) { return f.invoice === invoiceNo; });
    if (!fee) return;
    var panel = $("#receipt-panel");
    panel.hidden = false;
    $("#receipt-body").innerHTML =
      '<div style="display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:18px">' +
      "<div><h3 style='margin:0'>SriKeys Academy of Music</h3><p class='small muted' style='margin:4px 0 0'>14, Sardar Patel Road, Adyar, Chennai 600020<br>GSTIN 33AABCS1234F1Z5</p></div>" +
      "<div style='text-align:right'><strong>" + (fee.status === "Paid" ? "PAID" : "PAYMENT DUE") + "</strong><p class='small muted' style='margin:4px 0 0'>" + esc(fee.invoice) + "</p></div></div>" +
      "<table class='data'><tbody>" +
      "<tr><td><strong>Student</strong></td><td>" + esc(S.name) + " · " + esc(S.id) + "</td></tr>" +
      "<tr><td><strong>Period</strong></td><td>" + esc(fee.period) + "</td></tr>" +
      "<tr><td><strong>Amount</strong></td><td><strong>" + money(fee.amount) + "</strong></td></tr>" +
      "<tr><td><strong>Status</strong></td><td>" + statusPill(fee.status) + "</td></tr>" +
      "<tr><td><strong>" + (fee.status === "Paid" ? "Paid on" : "Due on") + "</strong></td><td>" + esc(fee.paidOn || fee.due) + "</td></tr>" +
      (fee.note ? "<tr><td><strong>Note</strong></td><td>" + esc(fee.note) + "</td></tr>" : "") +
      "</tbody></table>" +
      (fee.status === "Paid"
        ? "<p class='form-note'>This is a computer-generated receipt and does not require a signature. Thank you for paying on time.</p>"
        : "<div style='margin-top:16px;padding:14px 16px;border-radius:10px;background:var(--amber-soft);font-size:.86rem'><strong>To pay:</strong> UPI to srikeys@upi (reference " + esc(fee.invoice) + "), or bank transfer to SriKeys Academy, A/c 1234 5678 9012, IFSC HDFC0001234. The status updates once the office confirms receipt.</div>" +
          "<p class='form-note'>Online card payment is not connected in this demo.</p>");
    panel.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  $("#fees-table").addEventListener("click", function (event) {
    var btn = event.target.closest("[data-receipt]");
    if (btn) showReceipt(btn.dataset.receipt);
  });
  $("#close-receipt").addEventListener("click", function () { $("#receipt-panel").hidden = true; });
  $("#pay-now").addEventListener("click", function (event) {
    event.preventDefault();
    showReceipt("INV-2026-1121");
  });

  /* ---------- Library picks ---------- */
  $("#portal-library").innerHTML = S.libraryPicks.map(function (item) {
    return '<article class="lib-card"><div class="lib-top"><span class="lib-type">' + esc(item.type) + '</span><span class="pill pill--amber">Recommended</span></div>' +
      "<h3>" + esc(item.title) + "</h3><p>" + esc(item.meta) + "</p>" +
      '<div class="lib-meta"><span>Teacher pick</span><a class="link-arrow" href="library.html">Open</a></div></article>';
  }).join("");

  /* ---------- Sign out ---------- */
  $("#portal-signout").addEventListener("click", function (event) {
    event.preventDefault();
    if (confirm("Sign out of the student portal?")) window.location.href = "index.html";
  });
})();
