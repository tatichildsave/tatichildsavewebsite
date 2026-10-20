# TATI ChildSave — Domain Migration & Technical Setup Guide

## Current Configuration

**Website**: www.tatichildsave.com (Lovable)  
**Learning Platform**: https://tati-childsave-mvp.vercel.app (Vercel)  
**Preferred Long-Term**: learn.tatichildsave.com (Vercel subdomain)  

---

## Phase 1: Website Integration (COMPLETE ✅)

All links now point to `LEARNING_PORTAL_URL` configured in:
```
src/config/application.ts
```

Currently set to: `https://tati-childsave-mvp.vercel.app/`

---

## Phase 2: Domain Migration to Subdomain (FUTURE)

### Prerequisites
1. ✅ Website integration complete
2. ⏳ Vercel MVP project accessible
3. ⏳ DNS access to tatichildsave.com domain
4. ⏳ Vercel account with project owner access

### Step-by-Step Implementation

#### Step 1: Vercel Project Configuration

**In Vercel Console**:
1. Go to https://vercel.com/dashboard
2. Select `tati-childsave-mvp` project
3. Click **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `learn.tatichildsave.com`
6. Vercel will show CNAME or Nameserver configuration

**Expected Output**:
```
Domain: learn.tatichildsave.com
Status: Pending (awaiting DNS configuration)
CNAME Record:
  Name: learn
  Value: cname.vercel-dns.com (or similar)
```

**Copy these values** — you'll need them for DNS.

---

#### Step 2: DNS Configuration

**If using standard DNS provider** (GoDaddy, Namecheap, etc.):

1. Log into your DNS provider
2. Find DNS records for `tatichildsave.com`
3. Add or update CNAME record:
   ```
   Type: CNAME
   Host/Name: learn
   Points To/Value: cname.vercel-dns.com
   TTL: 3600 (or default)
   ```
4. Save changes
5. **Wait**: DNS propagation can take 15 minutes to 48 hours

**If using Vercel Nameservers**:
1. Vercel will provide nameserver addresses (if root domain not already with Vercel)
2. Update domain registrar to use Vercel nameservers
3. Vercel will auto-configure DNS
4. May take 24–48 hours

---

#### Step 3: Firebase Configuration (Likely Not Needed)

**Check Current Setup**:
1. Go to Firebase Console → Project Settings
2. Look for "Authorized domains"
3. Current list should include MVP Vercel domain

**If Custom Domain Required**:
- Add `learn.tatichildsave.com` to authorized domains
- Vercel typically handles this automatically
- Only add if authentication fails after domain switch

**Firebase Session Cookie Setup** (Likely Already Configured):
- If using HttpOnly session cookies, verify `domain` attribute allows `learn.tatichildsave.com`
- Usually set to `tatichildsave.com` (parent domain) for subdomain compatibility
- Consult Firebase docs if session handling fails

---

#### Step 4: CORS & Cross-Origin Configuration

**Website → Learning Platform Communication**:
If the website makes API calls to the learning platform:
- ✅ **If Same Root Domain**: CORS automatically works (learn.tatichildsave.com)
- ⚠️ **If Different Origins**: Add website domain to Vercel/Firebase CORS config

**Typically Not Needed** because:
- Website links to portal (browser navigation)
- No direct API calls between sites
- Session/auth handled server-side

---

#### Step 5: Website Config Update (Single File)

Once DNS propagates and Vercel confirms domain:

**File**: `src/config/application.ts`
```typescript
// Update this line:
export const LEARNING_PORTAL_URL = "https://learn.tatichildsave.com/";

// Remove or update the TODO comment:
// TODO: Subdomain migration complete — learn.tatichildsave.com configured
```

**Commit & Deploy**:
```bash
git add src/config/application.ts
git commit -m "Update learning portal URL to learn.tatichildsave.com subdomain"
git push origin main

# Deploy via Lovable (your standard process)
```

---

#### Step 6: Verification

**Test on Website**:
1. Visit www.tatichildsave.com
2. Click "Learning Portal" button (header or homepage)
3. Verify you're redirected to `learn.tatichildsave.com`
4. Should NOT see Vercel deployment preview URL

**Test from MVP Domain**:
1. Directly visit `learn.tatichildsave.com`
2. Platform should load normally
3. Login should work as before

**Test Login Flows**:
- Child login with TATI ID + PIN
- Parent dashboard access
- Facilitator login (if applicable)
- Session persistence across page navigation

**Check Browser Console**:
- No CORS errors
- No mixed-content warnings (HTTP/HTTPS)
- No cookie errors related to domain

---

### Common Issues & Solutions

#### Issue 1: DNS Not Propagating
**Symptom**: Vercel shows "Pending" after 48+ hours  
**Solution**:
1. Verify DNS record is correct (copy-paste from Vercel)
2. Wait 24–48 hours (TTL expiration)
3. Check with `nslookup learn.tatichildsave.com` (Windows/Mac)
4. Clear Vercel cache: Go to Project → Settings → Deployments → Redeploy

#### Issue 2: Authentication Fails on Subdomain
**Symptom**: Login returns error or redirects to old domain  
**Solution**:
1. Verify `learn.tatichildsave.com` added to Firebase authorized domains
2. Check session cookie `domain` attribute in Firebase settings
3. Clear browser cookies and try again
4. Check Vercel logs for errors

#### Issue 3: Mixed Content Warning
**Symptom**: Browser shows security warning (HTTP/HTTPS mismatch)  
**Solution**:
1. Ensure all links use `https://` (not `http://`)
2. Vercel auto-redirects HTTP → HTTPS
3. Update `src/config/application.ts` to use HTTPS
4. Clear browser cache

#### Issue 4: Old Domain Still Works
**Symptom**: `tati-childsave-mvp.vercel.app` still resolves  
**Acceptable**: Keep working (users with bookmarks won't be broken)  
**Optional**: Set up redirect on Vercel to route old domain → new domain

---

## Rollback Plan

If domain migration fails or needs reversal:

### Quick Rollback (Same Day)

**Step 1**: Update Website Config
```typescript
// src/config/application.ts
export const LEARNING_PORTAL_URL = "https://tati-childsave-mvp.vercel.app/";
```

**Step 2**: Deploy
```bash
git add src/config/application.ts
git commit -m "Rollback: revert to Vercel MVP domain due to [reason]"
git push origin main
# Deploy via Lovable
```

**Step 3**: DNS (Optional)
- Remove `learn.tatichildsave.com` CNAME record from DNS
- Website will work immediately with rollback
- Learning platform still accessible via Vercel URL

### Full Rollback (If Infrastructure Issues)

1. Restore website to commit before integration
2. Restore learning platform to pre-migration state
3. Investigate issues separately
4. Re-attempt migration with fixes

---

## Timeline Estimate

| Phase | Task | Duration | Notes |
|-------|------|----------|-------|
| 1 | Vercel domain setup | 5 min | Add domain in Vercel console |
| 2 | DNS configuration | 5 min | Update DNS records |
| 3 | DNS propagation | 15 min–48 hours | Varies by DNS provider |
| 4 | Testing | 30 min | Verify all flows work |
| 5 | Website code update | 5 min | Change 1 line in config |
| 6 | Website deployment | 5–10 min | Depends on Lovable process |
| 7 | Final verification | 15 min | Test across devices |

**Total Active Time**: ~30 minutes  
**Total Calendar Time**: 24–72 hours (DNS propagation)

---

## Security Checklist

- [ ] HTTPS enforced on both domains
- [ ] Firebase authorized domains updated
- [ ] Session cookies allow subdomain access
- [ ] No sensitive data in URLs
- [ ] External links use `target="_blank" rel="noopener noreferrer"`
- [ ] CORS configured (if needed)
- [ ] Firestore rules unchanged
- [ ] Firebase authentication unchanged

---

## Post-Migration Monitoring

### 1. Analytics
- Monitor Vercel analytics for `learn.tatichildsave.com` traffic
- Should see click-through from website to portal

### 2. Error Tracking
- Monitor Vercel error logs
- Watch for 404s or redirect loops
- Check browser console errors

### 3. User Feedback
- Test on variety of devices/browsers
- Monitor support channels for domain-related issues
- Collect feedback on portal accessibility

### 4. Performance
- Compare page load times (before/after domain migration)
- Check Vercel performance metrics
- Verify no performance degradation

---

## Contact & Support

### For Vercel Configuration Questions
- Vercel Docs: https://vercel.com/docs/projects/domains
- Vercel Support: support@vercel.com

### For Firebase Configuration Questions
- Firebase Docs: https://firebase.google.com/docs/auth/custom-domain
- Firebase Support: https://firebase.google.com/support

### For Website Deployment Questions
- Lovable Support/Documentation

---

## Appendix: Configuration References

### Vercel Project Settings
- **Project Name**: tati-childsave-mvp
- **Current Domain**: https://tati-childsave-mvp.vercel.app
- **Framework**: React + TanStack Start
- **Region**: [Verify in Vercel console]

### Website Configuration
- **File**: `src/config/application.ts`
- **Variable**: `LEARNING_PORTAL_URL`
- **Current Value**: `"https://tati-childsave-mvp.vercel.app/"`
- **Target Value**: `"https://learn.tatichildsave.com/"`

### Firebase Project
- **Region**: [Verify in Firebase console]
- **Authorized Domains**: [Current list in Firebase → Settings]
- **Authentication**: Firebase Authentication + Firestore

---

**Document Version**: 1.0  
**Last Updated**: October 20, 2026  
**Status**: Ready for Implementation  

