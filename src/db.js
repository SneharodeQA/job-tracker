import { openDB } from 'idb'

const DB_NAME = 'job-tracker'
const DB_VERSION = 1
const STORE = 'jobs'

let dbPromise

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' })
        store.createIndex('status', 'status')
      },
    })
  }
  return dbPromise
}

export async function getAllJobs() {
  return (await getDB()).getAll(STORE)
}

export async function putJob(job) {
  return (await getDB()).put(STORE, job)
}

export async function putManyJobs(jobs) {
  const db = await getDB()
  const tx = db.transaction(STORE, 'readwrite')
  for (const job of jobs) tx.store.put(job)
  await tx.done
}

export async function deleteJob(id) {
  return (await getDB()).delete(STORE, id)
}