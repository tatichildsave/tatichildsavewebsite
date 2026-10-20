# Verification

## Founding Families Google Form update

- Added the owner-supplied benefits, eligibility and 50-place cohort offer.
- Main Join links use the supplied public Google Form respondent link.
- The register route embeds the same form; its actual Google Form heading was verified inside the iframe. No test response was submitted.
- The previous local draft wizard is no longer the active application route.
- Desktop offer layout and mobile document-width checks passed; mobile content width matched the 375px client viewport at a 390px browser setting.
- Production build and TypeScript checks passed.
- Source access to the form does not enable owner email notifications. Those must be enabled in the form editor as described in FORM-SETUP.md.

- Production Vite build passed.
- TypeScript check passed.
- Browser checked at desktop 1366 × 900 and mobile 390 × 844.
- Mobile homepage document width matched viewport after ribbon overflow fix.
- Verified money-choice feedback, skill selection, FAQ expansion, mobile navigation and curriculum chapter expansion.
- Completed the three-step enrolment draft with fictitious data, including pathway selection and parent acknowledgement; completion correctly reported an unsubmitted local draft.
- Live authentication, database writes, email delivery and payments were not connected or tested.
- Inherited learning games and parent dashboard remain demonstration features and require further production review.

## Brand revision

- Supplied TATI logo preserved unchanged and checked in the header.
- Primary button computed colour verified as rgb(16, 72, 180), matching #1048B4.
- Plus Jakarta Sans heading font verified in the browser; Space Grotesk assigned to labels.
- Desktop and mobile previews inspected; mobile document and viewport widths both 375 px.
- Production build and TypeScript checks passed after the brand update.

