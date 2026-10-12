import { useEffect, useState } from 'react'
import { COLUMNS } from '../constants'
import { todayISO } from '../useJobs'
import { XIcon } from './Icons'

const inputBase =
  'w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 dark:bg-slate-800'
const inputOk = 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700'
const inputBad = 'border-rose-500 focus:ring-rose-500/20'

function validate(form) {
  const errors = {}
  if (!form.company.trim()) errors.company = 'Company name is required.'
  if (!form.title.trim()) errors.title = 'Job title is required.'
  const url = form.url.trim()
  if (url) {
    try {
      const parsed = new URL(url)
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('bad protocol')
    } catch {
      errors.url = 'Enter a full link starting with http:// or https://'
    }
  }
  if (!form.dateApplied) errors.dateApplied = 'Pick the date.'
  return errors
}

function Field({ id, label, error, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1 text-xs text-rose-600">
          {error}
        </p>
      )}
    </div>
  )
}

// Slide-over form for adding and editing. The parent mounts it fresh each time (using `key`).
export default function JobModal({ job, defaultStatus, resumes, onSave, onClose }) {
  const [form, setForm] = useState(() =>
    job
      ? {
          company: job.company,
          title: job.title,
          url: job.url || '',
          resume: job.resume || '',
          dateApplied: job.dateApplied || todayISO(),
          salary: job.salary || '',
          notes: job.notes || '',
          status: job.status,
        }
      : {
          company: '',
          title: '',
          url: '',
          resume: '',
          dateApplied: todayISO(),
          salary: '',
          notes: '',
          status: defaultStatus || 'wishlist',
        },
  )
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const set = (name) => (e) => {
    setForm((f) => ({ ...f, [name]: e.target.value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return
    setSaving(true)
    await onSave({
      ...(job ? { id: job.id } : {}),
      company: form.company.trim(),
      title: form.title.trim(),
      url: form.url.trim(),
      resume: form.resume.trim(),
      dateApplied: form.dateApplied,
      salary: form.salary.trim(),
      notes: form.notes.trim(),
      status: form.status,
    })
    onClose()
  }

  const cls = (name) => `${inputBase} ${errors[name] ? inputBad : inputOk}`

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} aria-hidden="true" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={job ? 'Edit job' : 'Add job'}
        className="relative flex h-full w-full max-w-md flex-col bg-white shadow-xl dark:bg-slate-900"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-base font-semibold">{job ? 'Edit job' : 'Add job'}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <XIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            <Field id="company" label="Company name *" error={errors.company}>
              <input id="company" autoFocus value={form.company} onChange={set('company')} className={cls('company')} />
            </Field>
            <Field id="title" label="Job title / role *" error={errors.title}>
              <input id="title" value={form.title} onChange={set('title')} className={cls('title')} />
            </Field>
            <Field id="url" label="LinkedIn job URL" error={errors.url}>
              <input
                id="url"
                inputMode="url"
                placeholder="https://www.linkedin.com/jobs/view/..."
                value={form.url}
                onChange={set('url')}
                className={cls('url')}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field id="status" label="Status">
                <select id="status" value={form.status} onChange={set('status')} className={cls('status')}>
                  {COLUMNS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="dateApplied" label="Date applied" error={errors.dateApplied}>
                <input
                  id="dateApplied"
                  type="date"
                  value={form.dateApplied}
                  onChange={set('dateApplied')}
                  className={cls('dateApplied')}
                />
              </Field>
            </div>
            <Field id="resume" label="Resume used" hint="Pick a previous name or type a new one.">
              <input id="resume" list="resume-options" value={form.resume} onChange={set('resume')} className={cls('resume')} />
              <datalist id="resume-options">
                {resumes.map((r) => (
                  <option key={r} value={r} />
                ))}
              </datalist>
            </Field>
            <Field id="salary" label="Salary range">
              <input
                id="salary"
                placeholder="₹25-30 LPA or $150-180K"
                value={form.salary}
                onChange={set('salary')}
                className={cls('salary')}
              />
            </Field>
            <Field id="notes" label="Notes">
              <textarea
                id="notes"
                rows={4}
                placeholder="Recruiter name, referral info..."
                value={form.notes}
                onChange={set('notes')}
                className={cls('notes')}
              />
            </Field>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-3 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {job ? 'Save changes' : 'Add job'}
            </button>
          </div>
        </form>
      </aside>
    </div>
  )
}