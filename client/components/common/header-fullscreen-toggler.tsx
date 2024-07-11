import { FC, useState } from 'react'
import { Maximize, Minimize } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ComponentProps {}

const HeaderFullScreenToggler: FC<ComponentProps> = ({}) => {
  const [isFullScreen, setFullScreen] = useState<boolean>(false)

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement
        .requestFullscreen()
        .then(() => setFullScreen(true))
        .catch((err) => console.error(`Failed to enter fullscreen mode: ${err.message}`))
    } else {
      document
        .exitFullscreen()
        .then(() => setFullScreen(false))
        .catch((err) => console.error(`Failed to exit fullscreen mode: ${err.message}`))
    }
  }

  return (
    <Button size='icon' variant='ghost' onClick={toggleFullScreen}>
      {isFullScreen ? <Minimize size={21} /> : <Maximize size={21} />}
    </Button>
  )
}

export { HeaderFullScreenToggler }
