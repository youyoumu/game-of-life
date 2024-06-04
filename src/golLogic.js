class Cell {
  constructor(x, y, width) {
    this.x = x
    this.y = y
    this.width = width
    this.isAlive = Math.random() > 0.5
    this.key = `${this.x}-${this.y}`
    this.lifetime = 0
  }
}

export function createCells(windowSize) {
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
  return cells
}

export function createNextGeneration(cells) {
  const nextGeneration = []
  let rowIndex = 0
  let cellIndex = 0
  cells.forEach((row) => {
    const nextGenerationRow = []
    row.forEach((cell) => {
      const liveNeighbors = countLiveNeighbors(cells, rowIndex, cellIndex)
      const oldNeighbors = countOldNeighbours(cells, rowIndex, cellIndex)
      if (cell.isAlive) {
        if (liveNeighbors < 2) {
          cell.isAlive = false
          cell.lifetime = 0
        } else if (liveNeighbors > 3) {
          cell.isAlive = false
          cell.lifetime = 0
        } else {
          cell.lifetime++
        }
      } else {
        if (liveNeighbors === 3 || oldNeighbors > 0) {
          cell.isAlive = true
        }
      }
      nextGenerationRow.push(cell)
      cellIndex++
    })
    nextGeneration.push(nextGenerationRow)
    rowIndex++
    cellIndex = 0
  })
  return nextGeneration
}

const neighbourCellsMap = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1]
]

function countLiveNeighbors(cells, rowIndex, cellIndex) {
  return neighbourCellsMap.reduce((numNeighbours, [dx, dy]) => {
    return (
      numNeighbours + (cells[rowIndex + dy]?.[cellIndex + dx]?.isAlive ? 1 : 0)
    )
  }, 0)
}

function countOldNeighbours(cells, rowIndex, cellIndex) {
  return neighbourCellsMap.reduce((numNeighbours, [dx, dy]) => {
    return (
      numNeighbours +
      (cells[rowIndex + dy]?.[cellIndex + dx]?.lifetime > 10 ? 1 : 0)
    )
  }, 0)
}
