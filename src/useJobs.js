import { useCallback, useEffect, useRef, useState } from 'react'
import * as db from './db'
import { STATUS_IDS } from './constants'

export function newId() {
  // crypto.randomUUID only exists on https/localhost, so keep a fallback
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function todayISO() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function useJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const jobsRef = useRef(jobs)
  jobsRef.current = jobs

  useEffect(() => {
    let alive = true
    db.getAllJobs().then((list) => {
      if (!alive) return
      setJobs(list)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [])

  // Create or update. Writes to IndexedDB first, then updates the screen.
  const saveJob = useCallback(async (input) => {
    const now = Date.now()
    const existing = jobsRef.current.find((j) => j.id === input.id)
    const job = existing
      ? { ...existing, ...input, updatedAt: now }
      : { ...input, id: newId(), createdAt: now, updatedAt: now }
    await db.putJob(job)
    setJobs((prev) =>
      prev.some((j) => j.id === job.id) ? prev.map((j) => (j.id === job.id ? job : j)) : [...prev, job],
    )
  }, [])

  const removeJob = useCallback(async (id) => {
    await db.deleteJob(id)
    setJobs((prev) => prev.filter((j) => j.id !== id))
  }, [])

  const moveJob = useCallback(async (id, status) => {
    const job = jobsRef.current.find((j) => j.id === id)
    if (!job || job.status === status) return
    const updated = { ...job, status, updatedAt: Date.now() }
    setJobs((prev) => prev.map((j) => (j.id === id ? updated : j))) // instant feedback
    await db.putJob(updated)
  }, [])

  const exportJson = useCallback(() => {
    const payload = { app: 'job-tracker', version: 1, exportedAt: new Date().toISOString(), jobs: jobsRef.current }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `job-tracker-backup-${todayISO()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [])

  // Merges the file into existing data (same id = overwritten). Returns how many cards were imported.
  const importJson = useCallback(async (text) => {
    const data = JSON.parse(text)
    const list = Array.isArray(data) ? data : data.jobs
    if (!Array.isArray(list)) throw new Error('This file does not contain a jobs list.')
    const now = Date.now()
    const clean = list
      .filter((j) => j && typeof j.company === 'string' && typeof j.title === 'string')
      .map((j) => ({
        id: typeof j.id === 'string' && j.id ? j.id : newId(),
        company: j.company.trim(),
        title: j.title.trim(),
        url: j.url || '',
        resume: j.resume || '',
        dateApplied: j.dateApplied || todayISO(),
        salary: j.salary || '',
        notes: j.notes || '',
        status: STATUS_IDS.includes(j.status) ? j.status : 'wishlist',
        createdAt: j.createdAt || now,
        updatedAt: now,
      }))
    if (clean.length === 0) throw new Error('No valid jobs found in this file.')
    await db.putManyJobs(clean)
    setJobs(await db.getAllJobs())
    return clean.length
  }, [])

  return { jobs, loading, saveJob, removeJob, moveJob, exportJson, importJson }
}