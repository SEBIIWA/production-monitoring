import { type FC } from 'react'

import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

import { GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ComponentProps {
  id: string
  task: Task
}

const KanbanItem: FC<ComponentProps> = ({ id, task }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className='bg-white border border-[#E2E8F0] p-4 flex items-center justify-between rounded-[8px]'>
      {task.content}
      <Button {...attributes} {...listeners} variant={'ghost'} className='cursor-grab px-1 mr-2'>
        <GripVertical size={18} color='#343c47' />
      </Button>
    </div>
  )
}

export { KanbanItem }
