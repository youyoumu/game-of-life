import { createCells } from './golLogic'
import { Graphics } from '@pixi/react'
import { useCallback } from 'react'

export default function Cells({ windowSize }) {
  const cellGraphics = useCallback((g, cell) => {
    const cellColor = cell.isAlive ? 0x000000 : 0xffffff

    g.clear()
    g.beginFill(cellColor)
    g.lineStyle(1, 0x000000)
    g.drawRect(cell.x, cell.y, cell.width, cell.width)
    g.endFill()
  }, [])

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
