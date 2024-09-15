'use client'

import { type JSX } from 'react'

import { Button } from '@/components/ui/button'

import { KanbanBoard } from '@/components/kanban-board'
import { useRouter } from 'next/router'

const initialTasks: { [key: string]: Task } = {
  task1: { id: 'task1', content: 'Learn React' },
  task2: { id: 'task2', content: 'Build a Kanban board' },
  task3: { id: 'task3', content: 'Review PR' },
  task4: { id: 'task4', content: 'Setup project' },
  task5: { id: 'task5', content: 'Deploy project' },
  task6: { id: 'task6', content: 'Write tests' },
  task7: { id: 'task7', content: 'Refactor code' },
  task8: { id: 'task8', content: 'Add new feature' },
  task9: { id: 'task9', content: 'Update dependencies' },
  task10: { id: 'task10', content: 'Fix bugs' },
  task11: { id: 'task11', content: 'Write documentation' },
  task12: { id: 'task12', content: 'Create a new project' },
  task13: { id: 'task13', content: 'Learn Next.js' },
  task14: { id: 'task14', content: 'Learn TypeScript' },
  task15: { id: 'task15', content: 'Learn GraphQL' },
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    taskIds: ['task1', 'task2', 'task5', 'task6', 'task7', 'task8', 'task9', 'task10'],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    taskIds: ['task3', 'task11', 'task12', 'task13', 'task14', 'task15'],
  },
  {
    id: 'done',
    title: 'Done',
    taskIds: ['task4'],
  },
  {
    id: 'review',
    title: 'Review',
    taskIds: [],
  },
]

export default function Index(): JSX.Element {
  const data: any = null
  const { push } = useRouter()

  return (
    <main className='h-full flex flex-1 flex-col gap-4 px-4 lg:gap-6 overflow-x-hidden'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-start'>
          <h1 className='text-lg font-semibold md:text-2xl'>Tasks</h1>
          <p className='text-muted-foreground'>{data && data.length !== 0 ? `${data.length} tasks` : 'You have no tasks'}</p>
        </div>
        {/*  */}
      </div>

      <KanbanBoard initialTasks={initialTasks} initialColumns={initialColumns} />
    </main>
  )
}
