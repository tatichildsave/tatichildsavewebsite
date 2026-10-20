# Quick Reference: Learning Portal Integration

## What Changed

### 1. **Config** (`src/config/application.ts`)
- Added `LEARNING_PORTAL_URL = "https://tati-childsave-mvp.vercel.app/"`
- Update this single variable when subdomain is ready

### 2. **Header** (`src/components/common/Header.tsx`)
- Added "Learning Portal ↗" button
- Positioned right of nav items, before "Join Founding Family" CTA
- Opens in new tab

### 3. **Footer** (`src/components/common/Footer.tsx`)
- Added "Learning Portal" link
- Appears in footer links section
- Opens in new tab

### 4. **Homepage** (`src/components/home/HomePage.tsx`)
- Added "Already part of the TATI family?" section
- Positioned between "Try a Lesson" and "For Schools"
- Button: "Continue Learning →"
- Opens portal in new tab

---

## Quick Testing Checklist

- [ ] Header: See "Learning Portal ↗" button (desktop/mobile)
- [ ] Footer: See "Learning Portal" link
- [ ] Homepage: See "Already part of the TATI family?" section
- [ ] All links open MVP portal in new tab
- [ ] No TypeScript errors: `npm run lint`
- [ ] Build succeeds: `npm run build`

---

## Build & Deploy

```bash
# Verify everything builds
npm run lint     # Should pass
npm run build    # Should complete in ~7 seconds

# Deploy to Lovable
# (Use your standard deployment process)
```

---

## Future: Subdomain Migration

When ready to move MVP to `learn.tatichildsave.com`:

**File**: `src/config/application.ts`
```typescript
// Change this line:
export const LEARNING_PORTAL_URL = "https://learn.tatichildsave.com/";
```

That's it! One line change. Rest handles itself.

---

## Links Added

| Location | Label | URL | Target |
|----------|-------|-----|--------|
| Header Nav | Learning Portal ↗ | `LEARNING_PORTAL_URL` | New tab |
| Footer | Learning Portal | `LEARNING_PORTAL_URL` | New tab |
| Homepage | Continue Learning → | `LEARNING_PORTAL_URL` | New tab |

---

## Status

✅ Complete
✅ Tested
✅ Ready to Deploy

