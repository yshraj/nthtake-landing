# Hold to unlock

Demo on the landing page. Client holds a button to unlock the master.

## What it does

- Preview is watermarked until unlock
- User holds **Hold to unlock** for about 0.9s
- Fill grows across the button
- Watermark fades, master files show
- Click again to lock the preview

## Rules

- Let go early: progress eases back
- Reduced motion: one click unlocks, no hold
- Lives in `components/HoldToUnlock.tsx`
