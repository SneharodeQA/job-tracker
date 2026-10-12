import { useDraggable } from '@dnd-kit/core'
import { COLUMN_BY_ID } from '../constants'
import { LinkedInBadge, PencilIcon, TrashIcon } from './Icons'

function daysSince(dateStr) {
  const [y, m, d] = (dateStr || '').split('-').map(Number)
  if (!y) return null
  const start = new Date(y, m - 1, d)
  const today = new Date()
  const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.max(0, Math.round((midnight - start) / 86400000))
}

function ageLabel(job) {
  const days = daysSince(job.dateApplied)
  if (days === null) return ''
  const verb = job.status === 'wishlist' ? 'Saved' : 'Applied'
  if (days === 0) return `${verb} today`
  return `${verb} ${days}d ago`
}

// The card's looks. Used both in the column and in the floating drag preview.
export function JobCardView({ job, onEdit, onDelete, dragging = false, overlay = false }) {
  const accent = COLUMN_BY_ID[job.status]?.accent ?? 'border-l-slate-400'
  return (
    <div
      data-testid="job-card"
      className={`group rounded-lg border border-l-4 border-y-slate-200 border-r-slate-200 bg-white p-3 text-left shadow-sm dark:border-y-slate-800 dark:border-r-slate-800 dark:bg-slate-900 ${accent} ${
        dragging ? 'opacity-40' : ''
      } ${overlay ? 'rotate-1 cursor-grabbing shadow-lg' : 'cursor-grab'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{job.company}</p>
          <p className="truncate text-sm text-slate-600 dark:text-slate-400">{job.title}</p>
        </div>
        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open LinkedIn job"
            aria-label={`Open job link for ${job.company}`}
            className="shrink-0"
          >
            <LinkedInBadge />
          </a>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {job.resume && (
          <span className="max-w-full truncate rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {job.resume}
          </span>
        )}
        {job.salary && (
          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-xs text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            {job.salary}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-slate-400">{ageLabel(job)}</span>
        {!overlay && (
          <span className="flex gap-1 opacity-60 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onEdit(job)}
              aria-label={`Edit ${job.company}`}
              title="Edit"
              className="rounded p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <PencilIcon width={14} height={14} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(job)}
              aria-label={`Delete ${job.company}`}
              title="Delete"
              className="rounded p-1 text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950"
            >
              <TrashIcon width={14} height={14} />
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

export default function JobCard({ job, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: job.id })
  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <JobCardView job={job} onEdit={onEdit} onDelete={onDelete} dragging={isDragging} />
    </div>
  )
}