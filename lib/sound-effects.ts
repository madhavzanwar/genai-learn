'use client'

const SOUND_MUTED_KEY = 'genai_sound_muted'

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioCtx) {
      audioCtx = new AudioCtx()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

export function isSoundMuted(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(SOUND_MUTED_KEY) === 'true'
}

export function setSoundMuted(muted: boolean) {
  if (typeof window === 'undefined') return
  localStorage.setItem(SOUND_MUTED_KEY, muted ? 'true' : 'false')
}

/** Gentle subtle click when choosing an answer option */
export function playOptionClick() {
  if (isSoundMuted()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(640, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.035)

    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.035)
  } catch {
    // Gracefully ignore audio errors
  }
}

/** Joyful, warm ascending chime when passing a quiz */
export function playSuccessChime() {
  if (isSoundMuted()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    // C5, E5, G5, C6 arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.5]
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      const startTime = ctx.currentTime + idx * 0.09
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, startTime)

      gain.gain.setValueAtTime(0.001, startTime)
      gain.gain.exponentialRampToValueAtTime(0.08, startTime + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + 0.36)
    })
  } catch {
    // Gracefully ignore audio errors
  }
}

/** Soft gentle encouraging chime on failing a quiz */
export function playFailureChime() {
  if (isSoundMuted()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const notes = [440, 370]
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      const startTime = ctx.currentTime + idx * 0.12
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, startTime)

      gain.gain.setValueAtTime(0.05, startTime)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + 0.26)
    })
  } catch {
    // Gracefully ignore audio errors
  }
}
