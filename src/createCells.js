class Cell {
  constructor(x, y, width) {
    this.x = x
    this.y = y
    this.width = width
    this.isAlive = Math.random() > 0.5
    this.key = `${this.x}-${this.y}`
  }
}

export default function createCells(windowSize) {
  const cellWidth = windowSize.height / 10
  const vCount = windowSize.height / cellWidth
  const hCount = windowSize.width / cellWidth

  const cells = []
  for (let i = 0; i < vCount; i++) {
    const row = []
    const y = i * cellWidth
    for (let j = 0; j < hCount; j++) {
      const x = j * cellWidth
      const cell = new Cell(x, y, cellWidth)
      row.push(cell)
    }
    cells.push(row)
  }

  console.log(cells)

  return cells
}
