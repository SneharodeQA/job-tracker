import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { COLUMNS, STATUS_IDS } from '../constants'
import Column from './Column'
import { JobCardView } from './JobCard'

export default function Board({ jobsByStatus, allJobs, onMove, onAdd, onEdit, onDelete }) {
  const [activeId, setActiveId] = useState(null)

  // Mouse: start dragging after 6px so clicks still work. Touch: press and hold, so the board can still scroll.
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
  )

  const activeJob = allJobs.find((j) => j.id === activeId)

  function handleDragEnd({ active, over }) {
    setActiveId(null)
    if (over && STATUS_IDS.includes(over.id)) onMove(active.id, over.id)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActiveId(active.id)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="flex h-full gap-3 overflow-x-auto p-4">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            column={column}
            jobs={jobsByStatus[column.id] ?? []}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <DragOverlay>{activeJob ? <JobCardView job={activeJob} overlay /> : null}</DragOverlay>
    </DndContext>
  )
}