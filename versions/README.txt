Orbita known-good snapshots
===========================

1) dual-feed-cyan-checkpoint.html
   Source: git 7983c6a — Split Orbita hero dual feeds: videos-only left, premium price cards right
   Also mirrored from local: orbita-agency.backup-beginners-20260911-221058.html (near-identical era)
   Markers: H1 «Ролики, которые приносят заявки», dual feed (Lifestyle/Beauty + price cards),
   accent #22e0ff, sticky-cta «Заказать», nav Работы·Цены·Заказать
   Restored: 20260912-012009
   Cache bump: index.html ?v=20260912012033 + meta orbita-build

2) Blue carousel restore (014ca28 / fe6b379 lineage)
   Pre-restore backup of working tree: orbita-agency.bak-before-dualfeed-restore-20260912-012009.html
   Related backups: orbita-agency.bak-before-blue-restore-20260912-011054.html
   Note: 014ca28 (git) / current HEAD before restore was fe6b379 blue carousel

Rollback:
  copy versions\dual-feed-cyan-checkpoint.html -> orbita-agency.html
  or: git show 7983c6a:orbita-agency.html
