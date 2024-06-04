import { Stage, Graphics } from '@pixi/react'
import { useState, useEffect, useCallback } from 'react'
import { createCells } from './golLogic'

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

  const cellGraphics = useCallback((g, cell) => {
    const cellColor = cell.isAlive ? 0x000000 : 0xffffff

    g.clear()
    g.beginFill(cellColor)
    g.lineStyle(1, 0x000000)
    g.drawRect(cell.x, cell.y, cell.width, cell.width)
    g.endFill()
  }, [])

  function Cells() {
    const cells = createCells(windowSize)
    const cellsGraphics = []
    cells.map((row) => {
      row.map((cell) => {
        const graphics = (
          <Graphics key={cell.key} draw={(g) => cellGraphics(g, cell)} />
        )
        cellsGraphics.push(graphics)
      })
    })

    return cellsGraphics
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
