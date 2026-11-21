# SriKeys Academy of Music

Website, student portal and admin dashboard for SriKeys Academy of Music — a piano, keyboard and music theory school in Chennai.

Built as a fast static site: no build step, no dependencies, no framework. Open `index.html` or serve the folder with any static server.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, trust strip, highlights, course preview, recital, founder, testimonials, philosophy |
| `about.html` | Story, vision and mission, philosophy, milestones |
| `courses.html` | Piano, keyboard and theory courses, formats, graded pathways, fees, FAQ |
| `faculty.html` | Founder and teaching faculty, teaching standards |
| `student-corner.html` | Exam results, student of the month, achievements, performance calendar |
| `gallery.html` | Recitals, classes and events |
| `testimonials.html` | Parent and student reviews |
| `blog.html` | Featured article and post teasers |
| `enrol.html` | Admission and free-trial enquiry form |
| `contact.html` | Studio details, hours, map panel, enquiry form |
| `library.html` | SriKeys Music Library with category filters |
| `portal.html` | Student portal — profile, course, schedule, attendance, homework, report cards, achievements, fees |
| `admin.html` | Admin dashboard — students, classes, attendance, fees, report cards, homework, library, announcements |

## Assets

- `assets/css/styles.css` — the whole design system (cream / orange / amber / sage palette taken from the logo)
- `assets/js/site.js` — navigation, scroll reveal, enquiry forms with WhatsApp hand-off
- `assets/js/data.js` — demo data for the portal and dashboard
- `assets/js/portal.js`, `assets/js/admin.js` — dashboard rendering and interactions
- `assets/img/` — logo and photography

## Demo behaviour

This is a front-end demo with no backend, accounts or database:

- Enquiries are stored in `localStorage` and turned into a prefilled WhatsApp message.
- Homework ticks, fee status changes, classes and announcements live in memory or `localStorage`.
- Login and admin screens are open; there is no authentication.

Replace `assets/js/data.js` with API responses when the academy backend is connected.

## Running locally

```bash
python -m http.server 4173
# then open http://127.0.0.1:4173/
```

## Contact

SriKeys Academy of Music · 14, Sardar Patel Road, Adyar, Chennai 600020
hello@srikeys.com · +91 98400 12345
