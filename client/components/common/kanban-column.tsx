import { type FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { KanbanItem } from '@/components/common/kanban-item'
import { cn } from '@/utils/tm'

interface ComponentProps {
  column: Column
  tasks: Task[]
}

const KanbanColumn: FC<ComponentProps> = ({ column, tasks }) => {
  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  })

  const switchColumnColor = function (title: string) {
    switch (title) {
      case 'To Do':
        return 'bg-[#4F46E5]'
      case 'In Progress':
        return 'bg-[#F59E0B]'
      case 'Done':
        return 'bg-[#22C55E]'
      case 'Review':
        return 'bg-[#EF4444]'
      default:
        return 'bg-[#121212]'
    }
  }

  return (
    <div ref={setNodeRef} className='relative flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl overflow-auto h-full'>
      <div className='bg-[#F8FAFC] top-0 left-0 p-4 sticky flex items-center gap-2'>
        <div className={cn('p-1 rounded-full', switchColumnColor(column.title))} />
        <h1 className='text-lg font-semibold md:text-2xl'>{column.title}</h1>
      </div>
      <div className='flex flex-col gap-4 p-4'>
        <SortableContext items={column.taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanItem key={task.id} id={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export { KanbanColumn }
