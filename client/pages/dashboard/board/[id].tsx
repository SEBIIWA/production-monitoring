import { useRouter } from 'next/router'

export default function Board() {
  const { pathname, route } = useRouter()

  console.log('path name', pathname)
  console.log('route', route)

  return (
    <div>
      <h1>Board</h1>
    </div>
  )
}
