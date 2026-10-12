import { useEffect, useMemo, useState } from 'react'
import { COLUMNS } from './constants'
import { useJobs } from './useJobs'
import Toolbar from './components/Toolbar'
import Board from './components/Board'
import JobModal from './components/JobModal'
import ConfirmDialog from './components/ConfirmDialog'

function initialDark() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
  } catch {
    /* storage blocked: fall through */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

export default function App() {
  const { jobs, loading, saveJob, removeJob, moveJob, exportJson, importJson } = useJobs()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('newest')
  const [dark, setDark] = useState(initialDark)
  const [modal, setModal] = useState(null) // { job?, status? }
  const [toDelete, setToDelete] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
  }, [dark])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(t)
  }, [toast])

  const jobsByStatus = useMemo(() => {
    const q = query.trim().toLowerCase()
    const dir = sort === 'newest' ? -1 : 1
    const groups = Object.fromEntries(COLUMNS.map((c) => [c.id, []]))
    for (const job of jobs) {
      if (q && !job.company.toLowerCase().includes(q) && !job.title.toLowerCase().includes(q)) continue
      groups[job.status]?.push(job)
    }
    for (const list of Object.values(groups)) {
      list.sort(
        (a, b) => dir * (a.dateApplied || '').localeCompare(b.dateApplied || '') || dir * (a.createdAt - b.createdAt),
      )
    }
    return groups
  }, [jobs, query, sort])

  const resumes = useMemo(() => [...new Set(jobs.map((j) => j.resume).filter(Boolean))].sort(), [jobs])

  async function handleImportFile(file) {
    try {
      const count = await importJson(await file.text())
      setToast({ type: 'ok', text: `Imported ${count} job${count === 1 ? '' : 's'}.` })
    } catch (err) {
      setToast({ type: 'error', text: `Import failed: ${err.message}` })
    }
  }

  return (
    <div className="flex h-full flex-col">
      <Toolbar
        query={query}
        onQuery={setQuery}
        sort={sort}
        onSort={setSort}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        onExport={exportJson}
        onImportFile={handleImportFile}
        onAdd={(status) => setModal({ status })}
        total={jobs.length}
      />

      <main className="min-h-0 flex-1">
        {loading ? (
          <p className="p-6 text-sm text-slate-400">Loading your jobs...</p>
        ) : (
          <Board
            jobsByStatus={jobsByStatus}
            allJobs={jobs}
            onMove={moveJob}
            onAdd={(status) => setModal({ status })}
            onEdit={(job) => setModal({ job })}
            onDelete={setToDelete}
          />
        )}
      </main>

      {modal && (
        <JobModal
          key={modal.job?.id ?? 'new'}
          job={modal.job}
          defaultStatus={modal.status}
          resumes={resumes}
          onSave={saveJob}
          onClose={() => setModal(null)}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete this job?"
          message={`${toDelete.company} - ${toDelete.title} will be removed permanently.`}
          onCancel={() => setToDelete(null)}
          onConfirm={async () => {
            await removeJob(toDelete.id)
            setToDelete(null)
          }}
        />
      )}

      {toast && (
        <div
          role="status"
          className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md px-4 py-2 text-sm text-white shadow-lg ${
            toast.type === 'error' ? 'bg-rose-600' : 'bg-slate-800'
          }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  )
}