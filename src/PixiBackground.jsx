import { useEffect, useRef } from 'react'
import { Application, Filter, GlProgram, Text, Container, Graphics } from 'pixi.js'

const EMOJIS = ['🥐', '🧁', '🍰', '🎂', '🍩', '🍪', '🍫', '🧇', '🥞', '☕', '🍰', '🥧']
const EMOJI_COUNT = 18

const metaballVert = `
  in vec2 aPosition;
  out vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`

const metaballFrag = `
  in vec2 vUv;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec4 uBalls[12];

  void main() {
    vec2 uv = vUv;
    uv.x *= uResolution.x / uResolution.y;

    float sum = 0.0;
    vec3 color = vec3(0.0);

    for (int i = 0; i < 12; i++) {
      vec2 ballPos = uBalls[i].xy;
      ballPos.x *= uResolution.x / uResolution.y;
      float r = uBalls[i].z;
      float brightness = uBalls[i].w;

      vec2 diff = uv - ballPos;
      float d2 = dot(diff, diff);
      float inv = r * r / max(d2, 0.0001);

      sum += inv;

      float w = inv * inv;
      vec3 c = mix(
        vec3(0.784, 0.584, 0.424),
        vec3(0.910, 0.663, 0.369),
        brightness
      );
      color += c * w;
    }

    float edge = smoothstep(0.9, 1.1, sum);
    color /= max(sum * sum, 0.0001);

    float glow = smoothstep(0.4, 0.9, sum) * 0.3;
    color += vec3(0.910, 0.663, 0.369) * glow;

    float alpha = edge * 0.55;

    gl_FragColor = vec4(color, alpha);
  }
`

function createBalls(time) {
  const balls = []
  for (let i = 0; i < 12; i++) {
    const speed = 0.15 + (i % 3) * 0.08
    const phase = i * 1.2
    const cx = 0.3 + (i % 4) * 0.15
    const cy = 0.3 + Math.floor(i / 4) * 0.2

    const x = cx + Math.sin(time * speed + phase) * 0.18
    const y = cy + Math.cos(time * speed * 0.7 + phase * 1.3) * 0.15
    const r = 0.06 + Math.sin(time * 0.3 + i) * 0.015
    const brightness = 0.4 + Math.sin(time * 0.5 + i * 0.8) * 0.3

    balls.push(x, y, r, brightness)
  }
  return balls
}

export default function PixiBackground() {
  const containerRef = useRef(null)
  const appRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    let destroyed = false

    const init = async () => {
      const app = new Application()

      try {
        await app.init({
          resizeTo: window,
          backgroundAlpha: 0,
          antialias: false,
          resolution: Math.min(window.devicePixelRatio || 1, 2),
          autoDensity: true,
        })
      } catch {
        return
      }

      if (destroyed) {
        app.destroy(true)
        return
      }

      appRef.current = app
      containerRef.current.appendChild(app.canvas)

      app.canvas.style.position = 'fixed'
      app.canvas.style.top = '0'
      app.canvas.style.left = '0'
      app.canvas.style.width = '100%'
      app.canvas.style.height = '100%'
      app.canvas.style.zIndex = '0'
      app.canvas.style.pointerEvents = 'none'

      // ─── Metaball Filter ───
      const metaballFilter = new Filter({
        glProgram: new GlProgram({
          vertex: metaballVert,
          fragment: metaballFrag,
        }),
        uniforms: {
          uResolution: [app.screen.width, app.screen.height],
          uTime: 0,
          uBalls: new Float32Array(48),
        },
      })

      const backdrop = new Container()
      backdrop.filterArea = { x: 0, y: 0, width: app.screen.width, height: app.screen.height }
      backdrop.filters = [metaballFilter]
      backdrop.eventMode = 'none'

      const bgGraphics = new Graphics()
      bgGraphics.rect(0, 0, app.screen.width, app.screen.height).fill({ color: 0x000000, alpha: 0.01 })
      backdrop.addChild(bgGraphics)
      app.stage.addChild(backdrop)

      // ─── Emoji Treats ───
      const emojiContainer = new Container()
      emojiContainer.eventMode = 'none'
      app.stage.addChild(emojiContainer)

      const emojis = []
      const w = app.screen.width
      const h = app.screen.height

      for (let i = 0; i < EMOJI_COUNT; i++) {
        const text = new Text({
          text: EMOJIS[i % EMOJIS.length],
          style: { fontSize: 28 + Math.random() * 18 },
        })
        text.anchor.set(0.5)
        text.alpha = 0.6 + Math.random() * 0.35

        const startX = Math.random() * w
        const startY = Math.random() * h

        text.x = startX
        text.y = startY
        emojiContainer.addChild(text)

        emojis.push({
          sprite: text,
          x: startX,
          y: startY,
          vx: (Math.random() - 0.5) * 1.8,
          vy: -0.5 - Math.random() * 1.5,
          rotation: (Math.random() - 0.5) * 0.03,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          wobblePhase: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.5 + Math.random() * 1.5,
          wobbleAmp: 0.3 + Math.random() * 0.8,
          baseScale: 0.7 + Math.random() * 0.6,
        })
      }

      // ─── Animation Loop ───
      let elapsed = 0

      app.ticker.add((ticker) => {
        const dt = ticker.deltaTime
        elapsed += dt * 0.016

        // Update metaballs
        const balls = createBalls(elapsed)
        metaballFilter.uniforms.uBalls = new Float32Array(balls)
        metaballFilter.uniforms.uTime = elapsed
        metaballFilter.uniforms.uResolution = [app.screen.width, app.screen.height]
        backdrop.filterArea = { x: 0, y: 0, width: app.screen.width, height: app.screen.height }

        // Update emojis
        const cw = app.screen.width
        const ch = app.screen.height

        for (const e of emojis) {
          // Wobble
          e.wobblePhase += e.wobbleSpeed * dt * 0.016
          const wobbleX = Math.sin(e.wobblePhase) * e.wobbleAmp

          // Physics
          e.vy += 0.008 * dt
          e.x += (e.vx + wobbleX) * dt
          e.y += e.vy * dt
          e.rotation += e.rotSpeed * dt

          // Bounce off edges
          if (e.y > ch + 40) {
            e.y = -40
            e.x = Math.random() * cw
            e.vy = -0.5 - Math.random() * 1.5
            e.vx = (Math.random() - 0.5) * 1.8
          }
          if (e.x < -40) e.x = cw + 40
          if (e.x > cw + 40) e.x = -40

          // Subtle scale pulse
          const scalePulse = 1 + Math.sin(elapsed * 2 + e.wobblePhase) * 0.05

          e.sprite.x = e.x
          e.sprite.y = e.y
          e.sprite.rotation = e.rotation
          e.sprite.scale.set(e.baseScale * scalePulse)
        }
      })

      // ─── Resize ───
      const onResize = () => {
        if (!app || destroyed) return
        metaballFilter.uniforms.uResolution = [app.screen.width, app.screen.height]
        backdrop.filterArea = { x: 0, y: 0, width: app.screen.width, height: app.screen.height }
        bgGraphics.clear()
        bgGraphics.rect(0, 0, app.screen.width, app.screen.height).fill({ color: 0x000000, alpha: 0.01 })
      }

      window.addEventListener('resize', onResize)
    }

    init()

    return () => {
      destroyed = true
      if (appRef.current) {
        appRef.current.destroy(true, { children: true })
        appRef.current = null
      }
    }
  }, [])

  return <div ref={containerRef} className="pixi-bg" />
}
