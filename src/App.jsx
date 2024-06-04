import { TextStyle } from 'pixi.js'
import { Stage, Container, Sprite, Text } from '@pixi/react'

export default function App() {
  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png'
  return (
    <Stage x={800} y={600} options={{ background: 0x1099bb }}>
      <Sprite image={bunnyUrl} x={300} y={150} />
      <Sprite image={bunnyUrl} x={500} y={150} />
      <Sprite image={bunnyUrl} x={400} y={200} />

      <Container x={200} y={200}>
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
