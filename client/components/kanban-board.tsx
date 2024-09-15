import { type FC, useState } from 'react'

import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

import { KanbanItem } from '@/components/common/kanban-item'
import { KanbanColumn } from '@/components/common/kanban-column'

interface ComponentProps {
  initialTasks: { [key: string]: Task }
  initialColumns: Column[]
}

const KanbanBoard: FC<ComponentProps> = ({ initialTasks, initialColumns }) => {
  const [columns, setColumns] = useState(initialColumns)
  const [tasks, setTasks] = useState(initialTasks)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: any) => {
    const { active } = event
    setActiveId(active.id)
  }

  const handleDragOver = (event: any) => {
    const { active, over } = event
    if (!over) return

    const activeColumnId = columns.find((col) => col.taskIds.includes(active.id))?.id
    const overColumnId = over.data?.current?.type === 'Column' ? over.id : columns.find((col) => col.taskIds.includes(over.id))?.id

    if (!activeColumnId || !overColumnId || activeColumnId === overColumnId) return

    setColumns((prev) => {
      const activeColumn = prev.find((col) => col.id === activeColumnId)
      const overColumn = prev.find((col) => col.id === overColumnId)

      if (!activeColumn || !overColumn) return prev

      return prev.map((col) => {
        if (col.id === activeColumnId) {
          return { ...col, taskIds: col.taskIds.filter((id) => id !== active.id) }
        }
        if (col.id === overColumnId) {
          return { ...col, taskIds: [...col.taskIds, active.id] }
        }
        return col
      })
    })
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over) return

    const activeColumnId = columns.find((col) => col.taskIds.includes(active.id))?.id
    const overColumnId = over.data?.current?.type === 'Column' ? over.id : columns.find((col) => col.taskIds.includes(over.id))?.id

    if (!activeColumnId || !overColumnId) return

    setColumns((prev) => {
      const activeColumn = prev.find((col) => col.id === activeColumnId)
      const overColumn = prev.find((col) => col.id === overColumnId)

      if (!activeColumn || !overColumn) return prev

      if (activeColumnId === overColumnId) {
        // Reorder within the same column
        const oldIndex = activeColumn.taskIds.indexOf(active.id)
        const newIndex = over.id in tasks ? overColumn.taskIds.indexOf(over.id) : overColumn.taskIds.length

        const newTaskIds = arrayMove(overColumn.taskIds, oldIndex, newIndex)
        return prev.map((col) => (col.id === overColumnId ? { ...col, taskIds: newTaskIds } : col))
      } else {
        // Move to a different column
        return prev.map((col) => {
          if (col.id === activeColumnId) {
            return { ...col, taskIds: col.taskIds.filter((id) => id !== active.id) }
          }
          if (col.id === overColumnId) {
            const newIndex = over.id in tasks ? col.taskIds.indexOf(over.id) : col.taskIds.length
            const newTaskIds = [...col.taskIds]
            newTaskIds.splice(newIndex, 0, active.id)
            return { ...col, taskIds: newTaskIds }
          }
          return col
        })
      }
    })

    setActiveId(null)
  }

  return (
    <div className='relative h-full'>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <div className='flex gap-4 absolute top-0 left-0 w-full h-full'>
          {columns.map((column) => (
            <KanbanColumn key={column.id} column={column} tasks={column.taskIds.map((id) => tasks[id])} />
          ))}
        </div>
        <DragOverlay>{activeId ? <KanbanItem id={activeId} task={tasks[activeId]} /> : null}</DragOverlay>
      </DndContext>
    </div>
  )
}

export { KanbanBoard }
