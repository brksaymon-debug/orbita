Orbita known-good snapshots
===========================

LIVE (current): cyan dual-feed + Aiskra scramble hover + slower лента
  File: orbita-agency.html
  Accent: #22e0ff (NOT orange #ff5a1f)
  H1: «Ролики, которые приносят заявки»
  Layout: dual-feed (video + price columns), sticky «Заказать»
  Feed: feedMarqueeUp 72s / feedMarqueeDown 84s / wallScroll 80s (~1.9× slower); pause on hover kept
  Scramble: .scramble on accent H1 span, process h3s, section h2s; reduced-motion = accent color only
  Cache: index.html ?v=20260912013904
  Restored from dual-feed-cyan-checkpoint then patched 20260912-013831 / 20260912013904

1) dual-feed-cyan-checkpoint.html
   Source: git 7983c6a — Split Orbita hero dual feeds: videos-only left, premium price cards right
   Markers: H1 «Ролики, которые приносят заявки», dual feed, accent #22e0ff, sticky-cta
   Status: kept as known-good cyan baseline (untouched)

2) good-2b9e115-lightbox-checkpoint.html
   Orange #ff5a1f lightbox services walls — kept untouched as alternate known-good
   Do NOT use as live while user wants cyan dual-feed screenshot look

3) before-blue-scramble-20260912-013831.html
   Snapshot of restored cyan dual-feed immediately before scramble + slow-feed edits

4) before-scramble-slow-20260912-013608.html
   Pre-edit snapshot of old orange 2b9e115 live (historical)

Rollback:
  copy versions\dual-feed-cyan-checkpoint.html -> orbita-agency.html
  or: git show 7983c6a:orbita-agency.html
  orange alternate: versions\good-2b9e115-lightbox-checkpoint.html
