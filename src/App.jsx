import { Stage, Graphics } from '@pixi/react'
import { useState, useEffect, useCallback } from 'react'

export default function App() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const cellGraphics = useCallback(
    (g, i) => {
      const height = windowSize.height / 10
      const widht = height

      g.clear()
      g.lineStyle(1, 0x000000)
      g.beginFill(0x8fbdce)
      g.drawRect(i * widht, 0, widht, height)
      g.endFill()
    },
    [windowSize]
  )

  function Cells() {
    const cells = []
    for (let i = 0; i < 10; i++) {
      const cell = <Graphics draw={(g) => cellGraphics(g, i)} key={i} />
      cells.push(cell)
    }
    return cells
  }

  return (
    <Stage
      width={windowSize.width}
      height={windowSize.height}
      options={{ background: 0x1099bb }}
    >
      <Cells />
    </Stage>
  )
}
