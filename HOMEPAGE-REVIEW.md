# Homepage visual review - 23 October 2026

Branch: codex/guided-homepage. Local-only review; no production deployment or source push.

Implemented the approved five-section homepage and primary navigation, using the retained logo, photography, illustrations, colours and fonts. Removed the long homepage pathway comparison, full interactive lesson, school pitch and full eligibility block from the active homepage; original components remain available. The detailed founding offer is reused on the interim Parents destination. The existing GH₵50 component is reused on Try a Lesson. The money-skill explorer is preserved on the interim Curriculum destination.

Reconciled the live additions identified in the preceding review: preserved https://tati-childsave-mvp.vercel.app/ in navigation and footer and kept the existing Google Form URL/embedded application. Returning families use the portal utility link instead of a large homepage band. Local source retains demo labelling on learner/dashboard/workspace routes; those services and Firebase were not modified.

This milestone intentionally stops before the full dedicated-page redesign. Schools, About and Learning Pathways retain their existing content. Parents and Curriculum have usable interim destinations. The complete 12-adventure exploration is pending homepage approval; the homepage previews are not a claim that the full new curriculum page is complete. School enquiries remain disconnected/inactive.

Workbook checked: C:/Users/Y O G A/Downloads/TATI Junior Workbook_Revised.pdf (52 image-based PDF pages). Rendered and visually checked PDF pages 8, 10 and 15 (printed pages 7, 9 and 13): Adventure 1 Meet Money; Adventure 2 Earn It; Money Adventure 4 Spend Smart. Homepage summaries paraphrase those learner pages. No workbook or facilitator PDF was copied into public assets. All 12 adventures require detailed checking in the next approved implementation stage.

Validation: production build and TypeScript check passed; existing allocation test suite passed 4/4. Browser verified mobile menu and route selection, GH₵50 decrease/increase/reallocation and reflection. Homepage checked at 320, 360, 390, 768 and 1440px: no horizontal document overflow; choice descriptions have full card width rather than sitting beside photos. Google Form destination preserved; no fabricated application submitted. Screenshots are in the parent outputs directory.

Preview: http://localhost:4173/#home while the local Vite server is running. Restart from this folder with npm run dev -- --port 4173. The preview runs on this computer; it is not a public staging deployment.
