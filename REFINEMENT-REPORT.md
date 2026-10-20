# Visual refinement handoff — 20 October 2026

> Subsequent Founding Families update: the previous local-draft application route is superseded by the live Google Form link and embed. See FORM-SETUP.md and VERIFICATION.md. The offer now includes benefits and eligibility expressly supplied by TATI.

## Scope and visual result

Refined the existing React/Vite marketing experience on `codex/visual-refinement`, using the supplied full-page mockup as the primary reference. The hero now uses the approved African-child photography, large navy/blue headline, yellow underline, two working CTAs and three benefits. The remaining homepage follows the reference order: three benefits, six illustrated learning cards, blue/green/purple pathways, a functional tablet activity, schools and partners, and a warm family CTA.

The logo and TATI palette remain intact. Image text was not duplicated: Academy, Self-Paced, Money Safety and the family CTA use photographic/illustrative extractions, while headings, descriptions and buttons are semantic HTML. The optimized derivatives preserve aspect ratios. Original supplied files were not modified.

## Assets

Used source filenames: `hero.png`, `aca.png`, `self.png`, `kids.png`, `school.png`, `foo.png`, `safety.png`, `kid 1.png`, `girl gh.png`, `boy.png`, `girl.png`, plus the previously supplied `tati logo.png`.

See `ASSET-MANIFEST.md` and `ASSET-MANIFEST.json` for all 17 supplied files, original dimensions, intended use, unsuitable/unused alternatives, cropping and recommended display sizes. Browser assets are in `public/assets/refinement/`.

## Preservation

- The enrolment component, learner MVP, Redux data, Firebase reference services and authentication implementation were not changed in this refinement.
- This checkout's existing enrolment is a local draft workflow, not a live submission integration. It remains explicitly labelled as such. No live family provisioning, email or database operations were added or tested.
- The original learner experience is still reachable from navigation.
- The six-step Story → Discover → Decide → Do → Discuss → Reflect methodology is retained on Our Approach.
- The earlier money-skill explorer and real-life choice interaction remain available in an expandable area under the six learning cards.
- The school partnership CTA opens the existing schools page. Its enquiry service remains unconnected, as before.

## Functional verification

- `npm run build`: production bundle passed.
- `npm run lint`: passed (the existing lint command runs TypeScript checking).
- `npm test`: four focused allocation tests passed, including exhaustive traversal of reachable GH₵5-step plans to check non-negative values and total ≤ GH₵50.
- Browser: changed Spend from GH₵20 to GH₵15; total became GH₵45 and Next was disabled. Increased Save to GH₵25; total returned to GH₵50, Next enabled and the reflection showed the correct amounts. Reset was exercised.
- Browser: mobile menu and school partnership destination worked; existing required enrolment fields rejected an empty submission. Completed all three enrolment draft steps with fictitious data and reached the explicit local-draft success state.
- Browser: original learner view remained reachable. No learning-MVP source files were changed.

## Visual verification

Actual browser captures were made at 1440px desktop, 768px tablet and 390px mobile. All supplied images loaded. Document width stayed within the viewport at each size. The mobile hero stacks copy and CTAs before the children; faces, jar and workbook remain visible. Decorations are reduced around the mobile activity.

Screenshots are delivered separately with the project archive: `tati-refined-desktop-full.jpg`, `tati-refined-tablet-full.jpg`, and `tati-refined-mobile-full.jpg`.

## Remaining differences from the mockup

- A separate approved Club card and five exact individual learning-card illustrations were not supplied. These use relevant supplied photo/illustration crops with reusable HTML card treatments, rather than unrelated placeholders.
- The supplied hero contains a blank savings-goal card and unlabelled journey icons. These are retained as artwork; a second competing overlay was not added.
- The tablet, controls and lesson note are live HTML/CSS rather than a static mockup image. The extra reflection and existing expandable interaction add some page height.
- Unapproved certificates, event schedules, special pricing, pilot benefits, testimonials, social destinations and legal links were not invented to fill the reference.
- The original local enrolment and schools enquiry limitations remain; this design preview is not a production enrolment launch.

## Development

Open the project folder in VS Code. Run `npm install`, `npm run dev`, `npm run lint`, `npm test`, and `npm run build`. The existing port 3000 server was left untouched during QA; this refinement was previewed on port 3001.
