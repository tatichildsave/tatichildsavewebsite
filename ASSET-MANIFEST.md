# TATI asset audit and mapping

Supplied files are treated as visual content; implementation requirements come from the user’s brief. Original files remain unchanged. WebP derivatives are proportionally resized/cropped to remove baked-in copy.

| Filename | Dimensions | Section | Type | Use / cropping | Display |
|---|---|---|---|---|---|
| aca.png | 1448 × 1086 | Academy pathway | Complete card composite | Extract right-side portrait only; HTML provides all titles and benefits. | academy.webp, 155–200px tall, contain; no face crop |
| all.png | 2178 × 722 | Optional hero journey | Four-step illustrated composite with embedded labels | Not used: hero.png already contains the learning journey. | If needed, contain at 320–420px; no duplicate labels |
| b1719e9c-1b1c-4ee1-9cd4-87fc8fdabd7e.png | 1448 × 1086 | Hero alternative | Children/workbook composite | Not used: approved hero.png matches reference more closely. | Contain; preserve both faces, jar and workbook |
| boy.png | 1122 × 1402 | Smart Spending learning card | Portrait photograph with illustrated accents | Portrait extraction; semantic HTML handles copy. | smart-spending.webp, 100px-wide visual, contain |
| foo.png | 2153 × 730 | Founding Family CTA | Full-width composite with embedded heading, copy and button | Extract mother/child and separate decorative note; recreate central copy/button in HTML. | family.webp at 280–350px; closing-note.webp at 210px; contain |
| girl gh.png | 1536 × 1024 | Saving for Goals + lesson decoration | Photograph and goal illustration composite | Extract piggy-bank illustration and book decoration. | saving-goals.webp 90px; lesson-decor.webp 160px; contain |
| girl.png | 1122 × 1402 | Borrowing Basics learning card | Tablet-learner portrait | Portrait extraction; retain face and tablet. | borrowing.webp 100px wide; contain |
| hero cedi.png | 2172 × 724 | Hero alternative | Wide children/learning composite | Not used: short panoramic aspect leaves children too small in split hero. | Contain at natural 3:1; do not stretch |
| hero.png | 1672 × 941 | Homepage hero | Children, workbook, jar, progress and journey composite | Use directly; no additional overlaid text or competing graphics. | hero.webp; desktop 700px, mobile full width; contain; no face/workbook/jar crop |
| hero1.png | 1774 × 887 | Hero alternative | Hero composite with embedded TATI brand | Not used: duplicates the accessible header logo and product name. | Contain only if replacing complete hero treatment |
| kid 1.png | 1536 × 1024 | Needs vs Wants + Growing Good Habits | Boy with aspirational financial illustrations | Extract central portrait and separate growth illustration. | needs-wants.webp / good-habits.webp at 100px wide; contain |
| kids.png | 1536 × 1024 | Club pathway | Group-learning photograph with illustration | Use directly as lower card photo panel. | club.webp; cover at 2:1, bottom/center; preserve all four children |
| safety.png | 2153 × 730 | Money Safety card | Complete learning card with embedded text | Extract right-side child/lock only; use HTML title and description. | money-safety.webp 110px wide; contain |
| save png.png | 1536 × 1024 | Optional savings progress | Transparent graphic with embedded wording | Not used: same goal graphic already appears in hero composite. | Contain at 170–220px if reused; no duplicate copy |
| save.png | 1536 × 1024 | Optional savings progress | Opaque goal/progress composite | Not used: transparent alternative is cleaner and hero already supplies it. | Contain; do not stack with duplicate progress graphic |
| school.png | 1536 × 1024 | Schools & partners | Teacher and three learners photograph | Use directly in a rounded photo panel; preserve faces. | school.webp 300–380px; cover at 3:2 |
| self.png | 1254 × 1254 | Self-Paced pathway | Complete card with embedded copy and tablet learner | Extract right-side learner/tablet; recreate copy in HTML. | self-paced.webp at 155–200px tall; contain |

## Gaps and differences

- No separate approved Club card exists; the supplied kids.png is used with a purple HTML card.
- Only Money Safety is supplied as a complete individual learning card. The other five use relevant extracted illustrations/photographs from the supplied assets, with accessible HTML copy.
- No standalone tablet/background composition was supplied for the GH₵50 activity. Its tablet is built in HTML/CSS and remains interactive.
- The closing composite contains unverified early-access/special-benefit copy. Those pixels are not used; the implementation does not repeat those promises.
- The supplied hero’s goal card is blank; a redundant extra progress overlay is deliberately omitted.