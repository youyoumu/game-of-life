import { createCells, createNextGeneration } from './golLogic'
import { Graphics, useTick } from '@pixi/react'
import { useCallback, useEffect, useState } from 'react'

export default function Cells({ windowSize }) {
  const [cells, setCells] = useState(createCells(windowSize))
  const cellsGraphics = []

  useEffect(() => {
    setCells(createCells(windowSize))
  }, [windowSize])

  const cellGraphics = useCallback((g, cell) => {
    const cellColor = cell.isAlive ? 0x000000 : 0xffffff
    g.clear()
    g.beginFill(cellColor)
    g.lineStyle(1, 0x000000)
    g.drawRect(cell.x, cell.y, cell.width, cell.width)
    g.endFill()
  }, [])

  cells.forEach((row) => {
    row.forEach((cell) => {
      const graphics = (
        <Graphics key={cell.key} draw={(g) => cellGraphics(g, cell)} />
      )
      cellsGraphics.push(graphics)
    })
  })

  let stopwatch = 0
  useTick((delta) => {
    stopwatch += delta
    if (stopwatch > 5) {
      stopwatch = 0
      setCells(createNextGeneration(cells))
    }
  })

  return cellsGraphics
}
