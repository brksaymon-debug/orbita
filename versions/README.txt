Orbita known-good snapshots
===========================

1) dual-feed-cyan-checkpoint.html
   Source: git 7983c6a — Split Orbita hero dual feeds: videos-only left, premium price cards right
   Also mirrored from local: orbita-agency.backup-beginners-20260911-221058.html (near-identical era)
   Markers: H1 «Орбита», чёткий ценностный оффер, dual feed (Lifestyle/Beauty + price cards),
   accent #22e0ff, sticky-cta «Заказать», nav кейсы/цены/заказать
   Restored: 20260912-012009
   Cache bump: index.html ?v=20260912012033 + meta orbita-build
   Status: kept as alternate known-good (cyan dual-feed)

2) good-2b9e115-lightbox-checkpoint.html  *** CURRENT LIVE / USER-APPROVED «вроде норм» ***
   Source: git 2b9e115 tree (orbita-agency.html as at cache-bust after lightbox)
   Feature commit: 5b4d09c Make banners/flyers/posters clickable with fullscreen lightbox
   Follow-ups in tree: b75022f lightbox index fix; 2b9e115 Pages cache bust
   Markers: accent #ff5a1f (orange), services walls with clickable banners/flyers/posters,
   fullscreen lightbox (image+video, prev/next, order CTA)
   User URL: https://brksaymon-debug.github.io/orbita/orbita-agency.html?v=2b9e115
   Restored live: 20260912-012833
   Current live = 2b9e115 (this file)

3) Blue carousel restore (014ca28 / fe6b379 lineage)
   Pre-restore backup of working tree: orbita-agency.bak-before-dualfeed-restore-20260912-012009.html
   Related backups: orbita-agency.bak-before-blue-restore-20260912-011054.html
   Note: superseded for live; dual-feed cyan and 2b9e115 lightbox are the known-goods

Rollback:
  copy versions\good-2b9e115-lightbox-checkpoint.html -> orbita-agency.html
  or: git show 2b9e115:orbita-agency.html
  alternate cyan: copy versions\dual-feed-cyan-checkpoint.html -> orbita-agency.html
  or: git show 7983c6a:orbita-agency.html