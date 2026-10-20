# TATI ChildSave Website & Learning Platform Integration Plan

**Date**: October 20, 2026  
**Status**: Pre-Implementation Review  
**Repository**: `tatichildsave/tatichildsavewebsite` (Lovable - Main Website)  
**Target Application**: Public Website (Vite + React 19 + TypeScript)

---

## 1. Current State Analysis

### A. Website Repository
- **Location**: `C:\Users\Y O G A\Desktop\Final Website`
- **Framework**: Vite + React 19 + TypeScript
- **Hosting**: Lovable
- **Deployment**: Manual (no auto-deploy visible)
- **Package Manager**: npm

### B. Key Components Identified
1. **Header.tsx** (`src/components/common/Header.tsx`)
   - Navigation with routes: about, junior, for-schools, learner, register
   - CTA button: "Join a Founding Family" (external link to Google Form)
   - Menu toggle for mobile
   - Logo navigation to home

2. **Footer.tsx** (`src/components/common/Footer.tsx`)
   - Same navigation links as header
   - Brand and tagline
   - Copyright info
   - No section structure (single links, not grouped)

3. **HomePage.tsx** (`src/components/home/HomePage.tsx`)
   - Hero section with main CTA
   - "Try a Free Lesson" button
   - "How TATI Works" section
   - Learning pathways cards
   - "Try a Lesson" interactive section (GH₵50 Challenge)
   - "For Schools & Partners" section
   - Founding Families testimonial section
   - **NO existing "returning user" section**

4. **Routing** (`src/App.tsx`)
   - Hash-based routing (#home, #learner, #register, etc.)
   - Routes managed via Redux `setActiveTab()`

### C. Configuration
- **Application URLs** stored in `src/config/application.ts`
- Currently only contains Google Form URL

### D. MVP Learning Platform
- **Location**: `C:\Users\Y O G A\tati-childsave-mvp`
- **Current URL**: https://tati-childsave-mvp.vercel.app/
- **Target URL**: https://learn.tatichildsave.com/ (not yet configured)
- **Status**: Requires separate inspection for auth routes

---

## 2. Proposed Integration Approach

### Navigation Strategy
Use **centralized portal URL** in config for maintainability.

**File**: `src/config/application.ts`
```typescript
export const LEARNING_PORTAL_URL = "https://tati-childsave-mvp.vercel.app/"; // Update when subdomain ready
```

### Changes Required

#### A. Header.tsx
- Add **"Learning Portal ↗"** button positioned right of nav links
- Desktop: Display inline with other nav buttons
- Mobile: Include in menu items
- Link to LEARNING_PORTAL_URL
- Use `ArrowUpRight` icon (already imported)
- Match existing brand colors and spacing

#### B. Footer.tsx
- Add **"Learning Portal"** link to footer navigation
- Place after "Try a lesson" or before brand section
- Link to LEARNING_PORTAL_URL

#### C. HomePage.tsx
- Add new section: **"Already part of TATI family?"**
- Section title and subtitle (as specified)
- Button: **"Continue Learning →"** 
- Link to LEARNING_PORTAL_URL
- Insert between "Try a Lesson" and "For Schools & Partners" sections
- Styling: Subtle, non-intrusive, uses existing brand colors
- Image or visual: Optional, consider existing asset style

#### D. Config
- Create centralized portal URL config
- No changes to Firebase, auth, or security

---

## 3. Implementation Steps

1. **Update config** - Add LEARNING_PORTAL_URL
2. **Update Header** - Add portal nav button
3. **Update Footer** - Add portal link
4. **Update HomePage** - Add returning-user section
5. **Verify responsiveness** - Desktop, tablet, mobile
6. **Test links** - Navigation to MVP (may not load locally)
7. **Run build** - Ensure no TypeScript errors
8. **Browser preview** - Check visual alignment

---

## 4. Testing Checklist

- [ ] Desktop navigation - Learning Portal button visible and clickable
- [ ] Mobile navigation - Learning Portal accessible in menu
- [ ] Homepage returning-user section displays correctly
- [ ] Footer Learning Portal link visible
- [ ] All links point to correct URL
- [ ] Button styling matches existing design
- [ ] Responsive at breakpoints: mobile (375px), tablet (768px), desktop (1920px)
- [ ] Accessibility: keyboard navigation, button labels
- [ ] No TypeScript errors: `npm run lint`
- [ ] Production build succeeds: `npm run build`

---

## 5. Domain Migration (Future)

When ready to migrate to `learn.tatichildsave.com`:

1. Update `LEARNING_PORTAL_URL` in config
2. No code changes required (centralized config)
3. Verify Vercel project settings for subdomain
4. Document DNS and CNAME requirements
5. Test redirects and session handling

---

## 6. Security & Constraints

✅ **Preserved**:
- No changes to authentication flows
- No hardcoded credentials or tokens in URLs
- No modification of Firebase rules
- No new user databases
- Existing session handling untouched

---

## 7. Deliverables

Upon completion:
1. ✅ Integrated Header with Learning Portal button
2. ✅ Integrated Footer with Learning Portal link
3. ✅ HomePage with returning-user section
4. ✅ Centralized portal URL config
5. ✅ Responsive verification report
6. ✅ Build validation report
7. 📋 Domain migration guide (separate document)

---

## 8. Next Steps

**Approval Needed For**:
- ✔️ Proceeding with implementation
- ✔️ Preferred position of "Learning Portal" button in header (right side vs. integrated into menu)
- ✔️ Copy for returning-user section (using suggested or custom)
- ✔️ Color/styling of Learning Portal button (existing brand colors or new accent?)

**Ready to Implement**: Yes - no blockers identified

---

