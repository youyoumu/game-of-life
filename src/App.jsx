import { TextStyle } from 'pixi.js'
import { Stage, Container, Sprite, Text } from '@pixi/react'
import { useState, useEffect } from 'react'

export default function App() {
  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png'
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

  return (
    <Stage
      width={windowSize.width}
      height={windowSize.height}
      options={{ background: 0x1099bb }}
    >
      <Sprite
        image={bunnyUrl}
        x={windowSize.width / 2}
        y={windowSize.height / 2}
      />
      <Sprite
        image={bunnyUrl}
        x={windowSize.width / 3}
        y={windowSize.height / 3}
      />
      <Sprite
        image={bunnyUrl}
        x={windowSize.width / 4}
        y={windowSize.height / 4}
      />

      <Container x={windowSize.width / 4} y={windowSize.height / 4}>
        <Text
          text="Hello World"
          anchor={0.5}
          x={220}
          y={150}
          filters={[]}
          style={
            new TextStyle({
              align: 'center',
              fontSize: 50,
              letterSpacing: 20,
              dropShadow: true,
              dropShadowColor: 0xffffff,
              dropShadowDistance: 6
            })
          }
        />
      </Container>
    </Stage>
  )
}
