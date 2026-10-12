import { useDroppable } from '@dnd-kit/core'
import JobCard from './JobCard'
import { PlusIcon } from './Icons'

export default function Column({ column, jobs, onAdd, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })

  return (
    <section
      aria-label={column.title}
      className={`flex max-h-full min-w-[13.5rem] flex-1 flex-col rounded-xl border bg-slate-100/70 dark:bg-slate-900/60 ${
        isOver ? 'border-blue-400 ring-2 ring-blue-400/30' : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className="flex items-center justify-between px-3 py-2.5">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <span className={`h-2 w-2 rounded-full ${column.dot}`} />
          {column.title}
          <span
            data-testid={`count-${column.id}`}
            className="rounded-full bg-white px-1.5 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300"
          >
            {jobs.length}
          </span>
        </h2>
        <button
          type="button"
          onClick={() => onAdd(column.id)}
          aria-label={`Add job to ${column.title}`}
          title={`Add to ${column.title}`}
          className="rounded p-1 text-slate-500 hover:bg-white dark:hover:bg-slate-800"
        >
          <PlusIcon width={14} height={14} />
        </button>
      </div>

      <div ref={setNodeRef} className="flex min-h-24 flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} />
        ))}
        {jobs.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-400 dark:border-slate-700">
            Drop a card here
          </p>
        )}
      </div>
    </section>
  )
}