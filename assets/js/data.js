/* SriKeys Academy — demo data for the student portal and admin dashboard.
   Replace with API responses when the academy backend is connected. */
window.SriKeysData = {
  student: {
    name: "Aarav Menon",
    firstName: "Aarav",
    initials: "AM",
    id: "SK-2024-0148",
    age: 9,
    parent: "Lakshmi Menon",
    phone: "+91 98410 22334",
    email: "lakshmi.menon@example.com",
    joined: "14 June 2024",
    course: "Piano — Classical Foundation",
    grade: "ABRSM Grade 3",
    nextExam: "March 2027 (provisional)",
    teacher: "Sridevi Raman",
    teacherContact: "sridevi@srikeys.com",
    format: "In studio, Adyar · Studio 1",
    attendancePct: 96,
    streak: 26,
    points: 480,
    feesDue: 2400,
    feesDueDate: "5 December 2026",
    nextClass: {
      day: "Tuesday",
      date: "24 November 2026",
      time: "5:00 – 5:45 pm",
      mode: "In studio",
      room: "Studio 1, Adyar",
      topic: "Minuet in G — phrasing and left-hand balance",
      teacher: "Sridevi Raman",
      link: ""
    },
    schedule: [
      { day: "Tuesday", date: "24 Nov", time: "5:00 – 5:45 pm", mode: "In studio", topic: "Minuet in G — phrasing", teacher: "Sridevi Raman", link: "" },
      { day: "Saturday", date: "28 Nov", time: "10:00 – 10:30 am", mode: "Online", topic: "Theory: intervals & key signatures", teacher: "Karthik Venkatesh", link: "https://meet.google.com/srikeys-theory" },
      { day: "Tuesday", date: "1 Dec", time: "5:00 – 5:45 pm", mode: "In studio", topic: "Czerny study & C major scale", teacher: "Sridevi Raman", link: "" },
      { day: "Saturday", date: "5 Dec", time: "10:00 – 10:30 am", mode: "Online", topic: "Theory: cadences", teacher: "Karthik Venkatesh", link: "https://meet.google.com/srikeys-theory" },
      { day: "Tuesday", date: "8 Dec", time: "5:00 – 5:45 pm", mode: "In studio", topic: "Sight-reading & recital run-through", teacher: "Sridevi Raman", link: "" }
    ],
    attendance: [
      { date: "17 Nov 2026", topic: "Minuet in G — hands together", teacher: "Sridevi Raman", status: "Present" },
      { date: "14 Nov 2026", topic: "Theory: intervals", teacher: "Karthik Venkatesh", status: "Present" },
      { date: "10 Nov 2026", topic: "Czerny Op. 599 No. 12", teacher: "Sridevi Raman", status: "Present" },
      { date: "7 Nov 2026", topic: "Theory: key signatures", teacher: "Karthik Venkatesh", status: "Present" },
      { date: "3 Nov 2026", topic: "Minuet in G — bars 1–8", teacher: "Sridevi Raman", status: "Rescheduled" },
      { date: "31 Oct 2026", topic: "Theory: rhythm dictation", teacher: "Karthik Venkatesh", status: "Present" },
      { date: "27 Oct 2026", topic: "C major scale, two octaves", teacher: "Sridevi Raman", status: "Present" },
      { date: "24 Oct 2026", topic: "Theory: time signatures", teacher: "Karthik Venkatesh", status: "Present" },
      { date: "20 Oct 2026", topic: "Repertoire: Minuet in G", teacher: "Sridevi Raman", status: "Present" },
      { date: "17 Oct 2026", topic: "Theory: treble clef notes", teacher: "Karthik Venkatesh", status: "Present" },
      { date: "13 Oct 2026", topic: "Technique: hand shape & tone", teacher: "Sridevi Raman", status: "Present" },
      { date: "10 Oct 2026", topic: "Theory: note values", teacher: "Karthik Venkatesh", status: "Present" }
    ],
    completedLessons: [
      { date: "17 Nov 2026", title: "Minuet in G — hands together", summary: "Joined both hands at half tempo. Left hand now consistently softer than the melody; pedal introduced at cadences.", teacher: "Sridevi Raman" },
      { date: "10 Nov 2026", title: "Czerny Op. 599 No. 12", summary: "Evenness in the right-hand semiquavers improved. Assigned hands separately at 60 bpm.", teacher: "Sridevi Raman" },
      { date: "3 Nov 2026", title: "Rescheduled — no lesson", summary: "Moved to 10 November at the family's request. No charge.", teacher: "—" },
      { date: "27 Oct 2026", title: "C major scale, two octaves", summary: "Fingering secure. Began contrary motion; thumb-under still needs slow practice.", teacher: "Sridevi Raman" }
    ],
    homework: [
      {
        id: "hw-1",
        title: "C major scale — two octaves, hands together",
        due: "24 Nov 2026",
        assigned: "17 Nov 2026",
        teacher: "Sridevi Raman",
        instructions: "Slow and even at 60 bpm. Listen for the thumb-under: no accent, no gap. Then try contrary motion at the same tempo, hands separately first.",
        resources: ["Scales book p.6 (PDF)", "Reference audio — 60 bpm"],
        done: false
      },
      {
        id: "hw-2",
        title: "Minuet in G — bars 1–16, hands separately",
        due: "24 Nov 2026",
        assigned: "17 Nov 2026",
        teacher: "Sridevi Raman",
        instructions: "Left hand alone first, counting aloud. The melody must stay above the accompaniment when you join hands. Mark the two bars you find hardest and bring them to the lesson.",
        resources: ["Sheet music (PDF)", "Reference recording — tutorial tempo"],
        done: false
      },
      {
        id: "hw-3",
        title: "Sight-reading — 5 exercises in G major",
        due: "28 Nov 2026",
        assigned: "14 Nov 2026",
        teacher: "Karthik Venkatesh",
        instructions: "One exercise a day, 60 seconds to look before you play. No stopping to correct — keep the pulse going and note your slips afterwards.",
        resources: ["Sight-reading set 3 (PDF)"],
        done: false
      },
      {
        id: "hw-4",
        title: "Theory worksheet — intervals",
        due: "21 Nov 2026",
        assigned: "14 Nov 2026",
        teacher: "Karthik Venkatesh",
        instructions: "Complete questions 1–10. Write the interval above each pair of notes, then check with the answer sheet.",
        resources: ["Worksheet 4 (PDF)", "Answer sheet"],
        done: true
      },
      {
        id: "hw-5",
        title: "Listen: Bach Minuet in G, three recordings",
        due: "17 Nov 2026",
        assigned: "10 Nov 2026",
        teacher: "Sridevi Raman",
        instructions: "Note one difference in tempo and one difference in articulation between the recordings. We will discuss in the lesson.",
        resources: ["Listening list"],
        done: true
      }
    ],
    fees: [
      { invoice: "INV-2026-1121", period: "December 2026", amount: 2400, due: "5 Dec 2026", status: "Due", paidOn: "" },
      { invoice: "INV-2026-1021", period: "November 2026", amount: 2400, due: "5 Nov 2026", status: "Paid", paidOn: "3 Nov 2026" },
      { invoice: "INV-2026-0921", period: "October 2026", amount: 2400, due: "5 Oct 2026", status: "Paid", paidOn: "2 Oct 2026" },
      { invoice: "INV-2026-0821", period: "September 2026", amount: 2160, due: "5 Sep 2026", status: "Paid", paidOn: "4 Sep 2026", note: "Sibling discount 10%" },
      { invoice: "INV-2026-0721", period: "August 2026", amount: 2400, due: "5 Aug 2026", status: "Paid", paidOn: "1 Aug 2026" },
      { invoice: "INV-2026-0621", period: "July 2026", amount: 2400, due: "5 Jul 2026", status: "Paid", paidOn: "5 Jul 2026" }
    ],
    report: {
      term: "Quarter 3 · July – September 2026",
      published: "12 October 2026",
      teacher: "Sridevi Raman",
      skills: [
        { name: "Technical skills", score: 4, note: "Secure five-finger position; thumb-under still developing." },
        { name: "Sight-reading", score: 3, note: "Reads stepwise motion well; needs more confidence with ledger lines." },
        { name: "Rhythm", score: 4, note: "Steady pulse; counting aloud has helped considerably." },
        { name: "Musical expression", score: 4, note: "Natural phrasing in lyrical pieces; dynamics now deliberate." },
        { name: "Repertoire progress", score: 4, note: "Minuet in G learnt in five weeks, ahead of plan." },
        { name: "Theory knowledge", score: 3, note: "Intervals and key signatures improving; cadences next." },
        { name: "Practice consistency", score: 5, note: "26-day streak this month. Outstanding." }
      ],
      feedback: "Aarav has had an excellent quarter. His reading has become noticeably more fluent, and the Minuet in G is now played with real shape rather than note-by-note. He responds well to being asked to explain what he is doing, so we have been using that in lessons. The next step is confidence: he plays accurately at home but rushes the opening bars when someone is listening.",
      improve: "Evenness in scale passages; keeping the left hand quieter than the melody; looking ahead while reading.",
      goals: [
        "Complete ABRSM Grade 3 pieces to performance standard",
        "Two-octave scales in C, G and F, hands together, evenly at 72 bpm",
        "Perform at the Winter Recital on 7 December",
        "Finish theory unit on cadences and begin Grade 3 practice papers"
      ]
    },
    progress: [
      { piece: "Minuet in G — Petzold", stage: "Polishing", percent: 85 },
      { piece: "Czerny Op. 599 No. 12", stage: "Learning", percent: 60 },
      { piece: "Sonatina in C — Clementi (1st mvt)", stage: "Starting", percent: 25 },
      { piece: "C major scale & arpeggio", stage: "Consolidating", percent: 75 },
      { piece: "ABRSM Grade 3 sight-reading", stage: "Ongoing", percent: 55 }
    ],
    practiceDays: [2,2,1,2,2,0,1, 2,2,2,2,1,2,2, 2,1,2,2,2,0,2, 2,2,1,2,2,2,1],
    badges: [
      { icon: "🎹", name: "First Recital", earned: true, note: "June 2025" },
      { icon: "🔥", name: "21-Day Streak", earned: true, note: "October 2026" },
      { icon: "🎼", name: "Theory Explorer", earned: true, note: "Grade 2 theory" },
      { icon: "⭐", name: "Student of the Month", earned: true, note: "November 2026" },
      { icon: "🏅", name: "Grade 3 Complete", earned: false, note: "In progress" },
      { icon: "🎯", name: "100-Day Streak", earned: false, note: "74 days to go" },
      { icon: "🎵", name: "Composer", earned: false, note: "Write your first piece" },
      { icon: "🏆", name: "Exam Distinction", earned: false, note: "Grade 3 exam" }
    ],
    awards: [
      { title: "Student of the Month", month: "November 2026", detail: "Best practice consistency across all grades." },
      { title: "Practice Award", month: "October 2026", detail: "24 practice days out of 31." },
      { title: "Recital Certificate", month: "June 2026", detail: "Performance of 'Allegro' by Hook." }
    ],
    libraryPicks: [
      { title: "Minuet in G — full lesson", type: "Video", meta: "Faculty walkthrough · 18 min" },
      { title: "Grade 3 scales & arpeggios", type: "PDF", meta: "Scales · all keys" },
      { title: "Sight-reading set 3", type: "PDF", meta: "12 exercises · G and F major" }
    ]
  },

  students: [
    { id: "SK-2024-0148", name: "Aarav Menon", age: 9, parent: "Lakshmi Menon", phone: "+91 98410 22334", course: "Piano", grade: "Grade 3", teacher: "Sridevi Raman", attendance: 96, fee: 2400, feeStatus: "Due", joined: "14 Jun 2024", next: "Tue 24 Nov, 5:00 pm", status: "Active" },
    { id: "SK-2023-0091", name: "Ananya Raghavan", age: 14, parent: "Suresh Raghavan", phone: "+91 94440 88112", course: "Piano", grade: "Grade 6", teacher: "Sridevi Raman", attendance: 100, fee: 3000, feeStatus: "Paid", joined: "2 Mar 2023", next: "Wed 25 Nov, 6:00 pm", status: "Active" },
    { id: "SK-2025-0203", name: "Rohan Mathew", age: 11, parent: "Susan Mathew", phone: "+91 98840 55221", course: "Piano", grade: "Grade 4", teacher: "Sridevi Raman", attendance: 92, fee: 2400, feeStatus: "Overdue", joined: "8 Jan 2025", next: "Thu 26 Nov, 5:30 pm", status: "Active" },
    { id: "SK-2024-0176", name: "Diya Srinivasan", age: 12, parent: "Ramesh Srinivasan", phone: "+91 90030 71456", course: "Theory", grade: "Grade 5", teacher: "Karthik Venkatesh", attendance: 98, fee: 1800, feeStatus: "Paid", joined: "20 Jun 2024", next: "Sat 28 Nov, 10:00 am", status: "Active" },
    { id: "SK-2022-0044", name: "Ishita Prakash", age: 16, parent: "Nandini Prakash", phone: "+91 89390 11002", course: "Piano", grade: "Grade 8", teacher: "Sridevi Raman", attendance: 94, fee: 3000, feeStatus: "Paid", joined: "11 Apr 2022", next: "Wed 25 Nov, 7:00 pm", status: "Active" },
    { id: "SK-2025-0231", name: "Kabir Nair", age: 10, parent: "Deepa Nair", phone: "+91 98400 77654", course: "Piano", grade: "Grade 3", teacher: "Sridevi Raman", attendance: 88, fee: 2400, feeStatus: "Due", joined: "3 Feb 2025", next: "Fri 27 Nov, 4:30 pm", status: "Active" },
    { id: "SK-2026-0288", name: "Priya Kannan", age: 41, parent: "—", phone: "+91 99400 32178", course: "Keyboard", grade: "Adult beginner", teacher: "Ananya Nair", attendance: 100, fee: 2200, feeStatus: "Paid", joined: "5 Aug 2026", next: "Thu 26 Nov, 7:30 pm", status: "Active" },
    { id: "SK-2025-0214", name: "Vihaan Shah", age: 7, parent: "Mitali Shah", phone: "+91 90080 44567", course: "Piano", grade: "Grade 1", teacher: "Sridevi Raman", attendance: 90, fee: 2400, feeStatus: "Due", joined: "12 Dec 2025", next: "Sat 28 Nov, 11:00 am", status: "Active" },
    { id: "SK-2026-0295", name: "Meera Iyer", age: 6, parent: "Anand Iyer", phone: "+91 98410 66009", course: "Little Keysers", grade: "Beginner", teacher: "Ananya Nair", attendance: 84, fee: 1600, feeStatus: "Paid", joined: "1 Sep 2026", next: "Sat 28 Nov, 9:00 am", status: "Active" },
    { id: "SK-2023-0121", name: "Nikhil Verma", age: 13, parent: "Anita Verma", phone: "+91 98840 11902", course: "Theory", grade: "Grade 4", teacher: "Karthik Venkatesh", attendance: 91, fee: 1800, feeStatus: "Overdue", joined: "17 Jul 2023", next: "Sat 28 Nov, 12:00 pm", status: "Paused" }
  ],

  revenue: [
    { month: "Jun 2026", amount: 118400, invoices: 62, pending: 7200 },
    { month: "Jul 2026", amount: 124800, invoices: 64, pending: 4800 },
    { month: "Aug 2026", amount: 130600, invoices: 67, pending: 9600 },
    { month: "Sep 2026", amount: 134200, invoices: 69, pending: 4200 },
    { month: "Oct 2026", amount: 138900, invoices: 71, pending: 6600 },
    { month: "Nov 2026", amount: 142500, invoices: 72, pending: 9600 }
  ],

  classesToday: [
    { time: "4:30 pm", student: "Kabir Nair", teacher: "Sridevi Raman", topic: "Grade 3 pieces", mode: "In studio", status: "Upcoming" },
    { time: "5:00 pm", student: "Aarav Menon", teacher: "Sridevi Raman", topic: "Minuet in G", mode: "In studio", status: "Upcoming" },
    { time: "6:00 pm", student: "Ananya Raghavan", teacher: "Sridevi Raman", topic: "Grade 6 repertoire", mode: "In studio", status: "Upcoming" },
    { time: "7:00 pm", student: "Ishita Prakash", teacher: "Sridevi Raman", topic: "Grade 8 — Bach", mode: "Online", status: "Upcoming" },
    { time: "7:30 pm", student: "Priya Kannan", teacher: "Ananya Nair", topic: "Chord voicings", mode: "Online", status: "Upcoming" }
  ],

  announcements: [
    { date: "18 Nov 2026", title: "Winter Recital — 7 December", body: "All students are invited to perform. Please confirm your piece with your teacher by 28 November. Families may bring up to four guests." },
    { date: "10 Nov 2026", title: "December fee invoices issued", body: "Invoices for December are now in the portal. Please settle by 5 December. Sibling discounts are applied automatically." },
    { date: "2 Nov 2026", title: "Theory workshop moved online", body: "The 7 November musicianship workshop will be held online at 10 am. The joining link is in each student's schedule." }
  ],

  libraryCount: 186
};
