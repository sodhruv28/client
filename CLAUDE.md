# Product Plan & PRD: Website for _sweet.bonanza_ (Cookie Tin / Dessert Ordering Platform)

**Status:** Draft v1 — based purely on public Instagram observation, no direct business input yet
**Prepared for:** Pitch/build decision on a website for a Surat-based home dessert business currently run 100% via Instagram DMs

---

## 1. Background & Opportunity

_sweet.bonanza_ is a Surat home-based dessert brand (cookie tins, Nutella/Biscoff brownie tubs, kunafa cookies, festival hampers) with a growing, engaged Instagram audience. All discovery, ordering, and delivery coordination currently happens manually through Instagram DMs.

This works at small scale but has real ceilings:

- **No structured catalog** — customers scroll stories/posts to figure out what's available and at what price.
- **Manual order-taking** — every order is a DM conversation: item, flavor, quantity, address, payment, delivery date. High founder time cost, easy to make mistakes at volume (festivals, bulk hamper orders).
- **No order tracking** — customer has to DM to ask "is it ready?" / "where's my order?"
- **No payment structure** — presumably UPI screenshots shared manually, no reconciliation trail.
- **No customer memory** — repeat customers, preferences, past orders aren't tracked anywhere.
- **Growth ceiling** — the model doesn't scale past what one person can handle in DMs, especially around festivals (Rakhi hampers, etc.) when order volume spikes.

A website doesn't need to fully replace Instagram (that stays the discovery/marketing engine) — it should become the **ordering + tracking + admin backbone** underneath it.

---

## 2. Goals

| Goal | Why it matters |
|---|---|
| Reduce founder's manual order-handling time | This is a solo/small-team operation — time saved on logistics is time for making product & content |
| Make ordering effortless for customers | Menu browsing, cart, checkout — no more "what all do you have?" DMs |
| Give order visibility to both sides | Customers track status; founder sees a clean queue instead of a DM inbox |
| Handle seasonal spikes gracefully | Festival hampers (Rakhi, Diwali) are clearly a big revenue driver — the system must not fall over during a spike |
| Look and feel as premium as the product | The Instagram content is polished — the site should match that (motion, photography-first design), not feel like a generic template |

**Non-goals (for v1):** replacing Instagram as the marketing channel, building a delivery/logistics fleet, multi-city expansion, loyalty/rewards programs.

---

## 3. Users & Personas

**1. Customer ("Priya")**
- Discovers product via Instagram reel/story
- Wants to see full menu + prices without DMing
- Orders for herself or as a gift/hamper for occasions
- Wants to know: is it fresh, when will it arrive, can I customize, how do I pay

**2. Admin / Founder**
- Currently doing everything solo via phone
- Needs a simple dashboard, not an enterprise back-office — she's managing this alongside making the product
- Needs to: see incoming orders, update statuses, manage what's available "today," see revenue at a glance

**3. (Later) Delivery partner** — someone who needs to know what to pick up and where it's going. Out of scope for v1 unless she uses a courier service already (needs confirming).

---

## 4. Assumptions to Validate (before building anything)

Since there's zero direct info from the business, the first real step isn't code — it's a discovery conversation. Key open questions:

- Does she cook to order, or keep stock? (affects whether "available today" matters)
- Delivery: self-delivered, courier (Porter/Dunzo-style), or pickup only? What area/radius?
- Payment today: UPI manually? Cash on delivery? Any card/online payment desire?
- Order lead time — same day, next day, or pre-order windows for hampers?
- Does she want the whole business run through the site, or just "big" categories (hampers, bulk/corporate orders) while regular DMs continue?
- Any repeat B2B/corporate gifting customers (this is common in the hamper business)?

This PRD assumes reasonable defaults for these and flags them as **[TBD]** — they should be confirmed before the build starts, not after.

---

## 5. Customer-Facing Site — Feature Set

### MVP (v1)
- **Home / landing** — brand story, hero imagery/video, bestsellers, festival banner slot (this is clearly a big driver — Rakhi hampers etc.)
- **Menu / catalog** — categories (Brownie Tubs, Cookie Tins, Hampers, Cakes, Seasonal), each item with photos, description, price, customization options (flavor, size, add-ons like extra hazelnuts)
- **Cart & checkout** — quantity, delivery date picker, delivery address, gifting note option, payment (UPI/Razorpay/Cashfree — India-first gateway with UPI + cards)
- **Order tracking page** — order placed → confirmed → being made → out for delivery → delivered, with simple status timeline (no need for live GPS in v1)
- **WhatsApp/Instagram fallback CTA** — for custom/bulk requests that don't fit a fixed catalog (corporate hampers, custom cake messages) — don't force everything into rigid e-commerce forms
- **Testimonials/social proof** — pull from her existing "Client love" highlight
- **Delivery area checker** — pincode/area check before checkout so no false orders

### Phase 2
- Customer accounts + order history
- Pre-order/festival countdown pages (e.g., a dedicated Rakhi hamper microsite each season)
- Subscription/repeat order ("send this every month")
- Reviews & ratings per product
- Referral/gifting links ("send a hamper to someone else's address")

---

## 6. Admin Panel — Feature Set

### MVP (v1)
- **Order queue** — list/kanban view: New → Confirmed → In Progress → Out for Delivery → Delivered/Cancelled
- **Menu management** — add/edit/remove items, mark items "sold out today," update prices without a developer
- **Order detail view** — items, customization notes, customer contact, delivery address & date, payment status
- **Manual order entry** — for the DM/phone orders that will still happen at first, so everything lives in one system
- **Basic dashboard** — orders today/this week, revenue, top-selling items
- **Notifications** — new order alert (email/WhatsApp/push) so nothing sits unseen

### Phase 2
- Inventory/ingredient tracking
- Delivery zone & slot management (cutoff times, blackout dates around festivals)
- Discount codes / bulk order pricing tiers
- Staff roles (if she hires help later)
- Export orders/revenue for accounting

---

## 7. Core User Flow (customer)

```
Instagram post/story
      │
      ▼
Website landing page  ──►  Browse menu/category
      │                          │
      │                          ▼
      │                   Select item → customize (flavor/size) → add to cart
      │                          │
      ▼                          ▼
Delivery area check  ◄──  Cart review
      │
      ▼
Checkout: date, address, note → Pay (UPI/card)
      │
      ▼
Order confirmation page + confirmation on WhatsApp/email
      │
      ▼
Order tracking page (status updates as admin moves the order along)
      │
      ▼
Delivered → optional review prompt
```

## 8. Core Flow (admin)

```
New order comes in (site) or manual entry (phone/DM order)
      │
      ▼
Appears in "New" queue → admin confirms (availability/date)
      │
      ▼
Moves to "In Progress" while making the product
      │
      ▼
Marks "Out for Delivery" → customer notified
      │
      ▼
Marks "Delivered" → order closed, shows in revenue dashboard
```

---

## 9. Suggested Tech Stack

Matched to what's practical for a fast-moving, design-forward small-business site, and to your own stack:

- **Frontend:** Next.js + TypeScript + Tailwind — fast, SEO-friendly (important, since Instagram traffic will land here and it should also be discoverable via Google), good animation support
- **Animation:** Framer Motion for UI micro-interactions, GSAP for the hero/scroll storytelling moments (product photography deserves motion, not a static grid)
- **Backend:** Next.js API routes or a small Node/Express service — no need for a heavy separate backend at this scale
- **Database:** Supabase (Postgres) — gives you auth, database, and storage (product photos) in one place, and a real admin-friendly data layer without over-engineering
- **Payments:** Razorpay (UPI-first, standard for Indian D2C) or Cashfree
- **Admin panel:** Could be a protected `/admin` route inside the same Next.js app (simplest) rather than a separate Flutter app — keeps one codebase, one deploy, and she only needs a phone browser, not an installed app
- **Notifications:** WhatsApp Business API (or a service like Interakt/Gupshup) for order confirmations — this audience already lives in WhatsApp/Instagram, so meeting them there for status updates will land better than email

---

## 10. Suggested Phasing

| Phase | Scope | Rough focus |
|---|---|---|
| 0 — Discovery | Confirm assumptions in Section 4 with the business owner; finalize menu, pricing, delivery logic | 1 short call/visit |
| 1 — MVP | Sections 5 & 6 "MVP" scope: catalog, cart, checkout, order tracking, basic admin queue | Core build |
| 2 — Polish | Animation pass, festival landing pages, WhatsApp notifications | Design/marketing lift |
| 3 — Scale | Accounts, subscriptions, delivery slot management, discounts | Once volume justifies it |

---

## 11. Success Metrics (once live)

- % of orders placed via site vs. still via DM (target: majority within a few months)
- Time-to-confirm per order (should drop sharply vs. manual DM back-and-forth)
- Repeat order rate
- Average order value (hampers/bulk orders should show up clearly here)
- Site → order conversion rate from Instagram bio link clicks

---

## 12. Immediate Next Step

Before writing a line of code: reach out (as a pitch, or via a mutual contact) and run through Section 4's open questions. That conversation will turn this from a plausible plan into an accurate one — particularly around delivery logistics and whether she wants a full storefront or a lighter "catalog + WhatsApp checkout" hybrid, which is a very different (and much faster) build.