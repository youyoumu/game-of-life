class Cell {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.isAlive = Math.random() > 0.9
    this.key = `${this.x}-${this.y}`
    this.lifetime = 0
    this.deadtime = 3
    this.isAliveNextGen
  }
}

export function createCells(windowSize) {
  const cellHeight = windowSize.height / 40
  const vCount = windowSize.height / cellHeight
  const hCount =
    windowSize.width / cellHeight > 80 ? 80 : windowSize.width / cellHeight
  const cellWidth = windowSize.width / hCount
  const cells = []
  for (let i = 0; i < vCount; i++) {
    const row = []
    const y = i * cellHeight
    for (let j = 0; j < hCount; j++) {
      const x = j * cellWidth
      const cell = new Cell(x, y, cellWidth, cellHeight)
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
        if (liveNeighbors === 2 || liveNeighbors === 3) {
          cell.lifetime++
          cell.isAliveNextGen = true
        } else if (liveNeighbors > 3 || liveNeighbors < 2) {
          cell.isAliveNextGen = false
          cell.lifetime = 0
        }
      } else {
        if (liveNeighbors === 3 || oldNeighbors > 0) {
          cell.isAliveNextGen = true
          cell.deadtime = 0
        } else {
          cell.deadtime++
          cell.isAliveNextGen = false
        }
      }
      nextGenerationRow.push(cell)
      cellIndex++
    })
    nextGeneration.push(nextGenerationRow)
    rowIndex++
    cellIndex = 0
  })

  cells.forEach((row) => {
    row.forEach((cell) => {
      cell.isAlive = cell.isAliveNextGen
      cell.isAliveNextGen = false
    })
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
      (cells[rowIndex + dy]?.[cellIndex + dx]?.lifetime > 20 ? 1 : 0)
    )
  }, 0)
}
