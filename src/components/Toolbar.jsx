import { useRef } from 'react'
import { DownloadIcon, MoonIcon, PlusIcon, SearchIcon, SunIcon, UploadIcon } from './Icons'

const btn =
  'inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'

export default function Toolbar({
  query,
  onQuery,
  sort,
  onSort,
  dark,
  onToggleDark,
  onExport,
  onImportFile,
  onAdd,
  total,
}) {
  const fileRef = useRef(null)

  return (
    <header className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="mr-2 text-lg font-semibold tracking-tight">
        Job Tracker <span className="ml-1 text-sm font-normal text-slate-400">{total} jobs</span>
      </h1>

      <div className="relative min-w-[12rem] flex-1 sm:max-w-sm">
        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search company or role"
          aria-label="Search jobs"
          className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800"
        />
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-2">
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          aria-label="Sort cards by date applied"
          className={btn}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>

        <button type="button" className={btn} onClick={onExport} title="Download all data as JSON">
          <DownloadIcon /> Export
        </button>
        <button type="button" className={btn} onClick={() => fileRef.current?.click()} title="Restore from a JSON backup">
          <UploadIcon /> Import
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          data-testid="import-input"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onImportFile(file)
            e.target.value = ''
          }}
        />

        <button
          type="button"
          className={btn}
          onClick={onToggleDark}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={dark ? 'Light mode' : 'Dark mode'}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>

        <button
          type="button"
          onClick={() => onAdd()}
          className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <PlusIcon /> Add job
        </button>
      </div>
    </header>
  )
}