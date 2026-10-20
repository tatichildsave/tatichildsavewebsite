# TATI ChildSave

A local React + TypeScript + Vite project for continued development in VS Code.

## Run

Requires Node.js 22.12+ (or a supported newer LTS release).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

```sh
npm run typecheck
npm run build
npm run preview
```

## This revision

- Responsive TATI blue, amber and emerald homepage using the supplied logo and brand typography with a CSS savings illustration; no remote hero image dependency.
- Simplified navigation and footer, interactive money-skill explorer, choice feedback, pathway selection and accessible FAQ.
- Three-step enrolment draft with native input validation, review and JSON download. This stores input only in component memory and does not submit or email anything.
- Removed public admin passcode shortcut and Google auth initialization on startup.
- Existing learner games and parent dashboard retained as development previews; curriculum previews rebuilt as accessible expandable chapters.

## Where to edit

- `src/components/home/HomePage.tsx`: public homepage copy, sample interaction and pathways.
- `src/index.css`: existing application styles plus the public-site design system.
- `src/components/common/Header.tsx` and `Footer.tsx`: global navigation.
- `src/components/registration/RegistrationWizard.tsx`: local draft flow.
- `src/components/learner/`: original learning experience.
- `src/data/curriculumData.ts`: curriculum content.
- `reference/services/`: inherited Firebase and Google integration code, requiring production review.
- `reference/RegistrationWizard.ai-studio.tsx`: original registration flow, retained for developer reference only.

## Before production

Founding Families applications now use TATI’s existing Google Form. Join links open the public respondent form, and the register route embeds it with a fallback link. Read FORM-SETUP.md for receiving responses, linking a Google Sheet and enabling notifications. The previous RegistrationWizard component is retained in source but is no longer the active application page. The learning MVP and backend reference services remain development features. Confirm programme details before expanding enrolment, and review authentication, data handling and retention before using those separate MVP services with real family data.

A private hosted design preview accompanies the visual-refinement handoff. See REFINEMENT-REPORT.md for scope, verification, asset gaps and existing integration limitations.

## Navigation

Pages use hash URLs (for example `#junior`, `#for-schools` and `#register`) with browser back/forward support. Replace this with your chosen router if you need server-rendered route metadata.

## Brand

See `BRAND.md` for exact colours, typography and logo location.

## Visual refinement

Use `src/visual-refinement.css` for the approved-mockup styling, `HomePage.tsx` for the marketing sections, and `GhcChallenge.tsx` / `allocation.ts` for the live GH₵50 activity. Run `npm test` for allocation invariants. See `ASSET-MANIFEST.md` for image provenance and cropping decisions.
