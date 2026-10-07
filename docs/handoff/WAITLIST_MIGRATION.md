# orax.world · waitlist migration (grandfathering the old signups)

Every email collected on the old site becomes a **founder** on the new one: same email, first code, a Founder patch in the bag. Nothing is re-asked and nobody is dropped.

## 1. Where the emails are today
- **Primary**: Cloudflare D1, database `orax-db` (id `ce66eee2-09ba-436a-b360-8960a168ccc8`, binding `DB` in `OraX/server/wrangler.toml`), table `alpha_signups(id, email UNIQUE, created_at, deleted_at, deleted_reason)` — schema in `OraX/server/migrations/0001_create_alpha_signups.sql` (+ later migrations add the soft-delete columns).
- **Secondary**: Supabase project `hnxumyvyggiabwawxgth`, table `alpha_signups` — a non-blocking dual-write from `OraX/server/src/worker.ts` (`handleSignup`). Treat it as incomplete: rows written before dual-write was enabled only exist in D1.
- **Collectors**: `OraX/client/src/components/ComingSoon.tsx` → `POST /api/signup`; the QR/NFC promo pages (`qr.orax.world`, `nfc.orax.world`) log visits only, no emails.

## 2. Export (one-off, read-only)
```bash
cd OraX/server
npx wrangler d1 execute orax-db --remote --json \
  --command "SELECT lower(trim(email)) AS email, min(created_at) AS first_seen FROM alpha_signups WHERE deleted_at IS NULL GROUP BY 1 ORDER BY 2" \
  > founders-d1.json
```
Then union with Supabase (`select lower(email), created_at from alpha_signups`) and de-duplicate on email, keeping the earliest `first_seen`. Soft-deleted rows stay deleted.

## 3. Land in OraX-prime (Supabase)
```sql
create table waitlist (
  email        citext primary key,
  node         text check (node in ('NUS','SMU','SG')),
  source       text not null default 'orax.world',      -- 'alpha_signups' for grandfathered rows
  founder      boolean not null default false,
  first_seen   timestamptz not null default now(),
  invited_at   timestamptz,
  invite_code  text unique
);
-- grandfather: every exported email, founder = true, source = 'alpha_signups', first_seen preserved, node null until they tell us
```
Invite codes: 6 characters from `ABCDEFGHJKMNPQRSTUVWXYZ23456789` (no 0/O/1/I/L), generated per row into `invites(code, issued_by = null, node, founder = true)` from `PWA.md` §5 and mirrored into `waitlist.invite_code`.

## 4. The new form (`POST /api/waitlist`)
Body `{ email, node }`. Server lowercases and validates (reuse the regex and rate limit from `worker.ts`), then:
- email exists with `founder = true` → ensure a code exists, send the **founder email**, respond `{ status: 'founder' }`.
- email exists, not founder → respond `{ status: 'joined' }` (idempotent, update `node` if given).
- new → insert with `source = 'orax.world'`, respond `{ status: 'joined' }`.
The landing page (`OraX-World.dc.html`) renders exactly these two states plus idle. Keep `POST /api/signup` alive as an alias so old links and the promo pages keep working.

## 5. The two emails (Resend or Postmark; plain text first, one HTML variant on the tokens)
**Founder** — subject `Your OraX invite · you were here first`
> You joined orax.world before there was anything to join. That makes you a founder.
> Your code: **{{code}}**. Open orax.world/app on your phone, enter it, and take the identity test. A Founder patch is in your bag.
> One email, no newsletter. THE GAME IS LIFE · PLAY IT TOGETHER

**Joined** — subject `You are on the OraX list`
> Codes go out by node as tables open — {{node}} first. A bondmate with a code can move you up; nothing else can.
> We write once more, with your code.

## 6. Rollout order
1. Export and de-duplicate (§2). Count: expect it to match `GET /api/signup-count` on the old worker.
2. Create `waitlist` + `invites`, import founders (§3). Re-run the count.
3. Deploy the new `orax.world` page with `/api/waitlist`; alias `/api/signup`.
4. Send founder emails in batches of 200/hour so a bounce storm is visible early; log `invited_at`.
5. Retire `alpha_signups` writes in the old worker (leave reads for the admin page until the new admin exists).

## 7. What not to do
- No re-opt-in email. They already opted in; the founder email *is* the fulfilment.
- No newsletter list, no "updates" cadence. Two emails total per person, both transactional.
- Never show a count of people on the list in the UI.
