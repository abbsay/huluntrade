#!/bin/bash
git checkout -b feat/v2-tanstack-awwwards-redesign
git add -A
git commit -m "feat: complete rewrite to TanStack Router/Start with Awwwards design
- V2 Architecture: Moved from basic CSR to TanStack Start + Vite SSR
- Layout: Abstracted heavy __root.tsx into modular Layout/Header/Footer
- Perf: Added GPU acceleration (will-change-transform) and gracefully disabled ReactLenis/Magnetic on mobile
- DX: Cleaned up iterative cjs scripts into scripts/archive/
- Routing: Leveraged routeLoader for data prefetching to prevent SSR hydration crashes
- UI: Added Framer Motion, Magic Cursor, Magnetic buttons for playful aesthetic"
git push -u origin feat/v2-tanstack-awwwards-redesign
