// Kanban columns. Class names are written out in full so Tailwind can find them.
export const COLUMNS = [
  { id: 'wishlist', title: 'Wishlist', accent: 'border-l-slate-400', dot: 'bg-slate-400' },
  { id: 'applied', title: 'Applied', accent: 'border-l-blue-500', dot: 'bg-blue-500' },
  { id: 'followup', title: 'Follow-up', accent: 'border-l-amber-500', dot: 'bg-amber-500' },
  { id: 'interview', title: 'Interview', accent: 'border-l-violet-500', dot: 'bg-violet-500' },
  { id: 'offer', title: 'Offer', accent: 'border-l-emerald-500', dot: 'bg-emerald-500' },
  { id: 'rejected', title: 'Rejected', accent: 'border-l-rose-500', dot: 'bg-rose-500' },
]

export const STATUS_IDS = COLUMNS.map((c) => c.id)

export const COLUMN_BY_ID = Object.fromEntries(COLUMNS.map((c) => [c.id, c]))