'use client'
import { useState, useRef } from 'react'

/* ── Color tokens ─────────────────────────────────────────────── */
const TC  = '#A0522D'
const CR  = '#FAF7F2'
const CRD = '#F0E6D6'
const BN  = '#6B3A2A'
const TX  = '#3D2B1F'
const TXL = '#8B7B70'
const BD  = '#E2CDB8'
const WH  = '#FFFFFF'

/* ── Product catalog ──────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, name: 'Celestial Shirts',
    img: '/images/YEDIJAH_1.jpg', cat: 'Shirts', price: 'Rp 250.000',
    occasions: ['Social Media Content', 'Casual Daily Wear'],
    desc: 'Bold short-sleeve batik shirts with golden jet fighter and lyre motifs on a dreamy watercolor wash. Available in pink and mint.',
  },
  {
    id: 2, name: 'Wrap Panel Tops',
    img: '/images/YEDIJAH_2.jpg', cat: 'Tops', price: 'Rp 195.000',
    occasions: ['Office / Work', 'Casual Daily Wear', 'Cultural Ceremony'],
    desc: 'Diagonal-panel wrap tops combining classic batik motifs with a contemporary, wearable silhouette.',
  },
  {
    id: 3, name: 'Batik Panel Tees',
    img: '/images/YEDIJAH_3.jpg', cat: 'T-Shirts', price: 'Rp 175.000',
    occasions: ['Casual Daily Wear', 'Social Media Content'],
    desc: 'Relaxed tees with bold diagonal batik panels — traditional motifs meets streetwear attitude.',
  },
  {
    id: 4, name: 'Celestial Jackets',
    img: '/images/YEDIJAH_4.jpg', cat: 'Outerwear', price: 'Rp 395.000',
    occasions: ['Social Media Content', 'Casual Daily Wear', 'Formal Event'],
    desc: 'Oversized zip-up jackets with the full celestial print. Statement outerwear for unforgettable moments.',
  },
  {
    id: 5, name: 'Heavenly Realm Shirts',
    img: '/images/YEDIJAH_6.jpg', cat: 'Shirts', price: 'Rp 225.000',
    occasions: ['Office / Work', 'Formal Event', 'Cultural Ceremony'],
    desc: '"Heavenly Realm" panel button-downs in sage, white, lavender and blush. Office-to-event versatility.',
  },
  {
    id: 6, name: 'Heavenly Realm Polos',
    img: '/images/YEDIJAH_7.jpg', cat: 'Polos', price: 'Rp 185.000',
    occasions: ['Office / Work', 'Casual Daily Wear'],
    desc: 'Classic polo shirts with the Heavenly Realm emblem in five refreshing pastel colorways.',
  },
  {
    id: 7, name: 'Rock of Covenant Scarf',
    img: '/images/YEDIJAH_8.jpg', cat: 'Accessories', price: 'Rp 120.000',
    occasions: ['Formal Event', 'Cultural Ceremony'],
    desc: 'Silk-feel scarf with mountain and cherry blossom motifs. A wearable declaration of faith and purpose.',
  },
  {
    id: 8, name: 'Heavenly Realm Scarf',
    img: '/images/YEDIJAH_9.jpg', cat: 'Accessories', price: 'Rp 120.000',
    occasions: ['Formal Event', 'Cultural Ceremony'],
    desc: 'Vibrant winged "Heavenly Realm" scarf with a full rainbow color story.',
  },
  {
    id: 9, name: 'Floral Crop Tops',
    img: '/images/BATIK_YEDIJAH.jpg', cat: 'Tops', price: 'Rp 165.000',
    occasions: ['Casual Daily Wear', 'Social Media Content'],
    desc: 'Puff-sleeve crop tops with lush botanical garden prints in pink, blue and black.',
  },
  {
    id: 10, name: 'On Position Tees',
    img: '/images/BATIK-YEDIJAH_1.jpg', cat: 'T-Shirts', price: 'Rp 155.000',
    occasions: ['Casual Daily Wear', 'Social Media Content'],
    desc: 'Graphic tees with bold "On Position" typography. Available in red and white.',
  },
  {
    id: 11, name: 'Blossom Blouses',
    img: '/images/BATIK-YEDIJAH_2.jpg', cat: 'Blouses', price: 'Rp 210.000',
    occasions: ['Casual Daily Wear', 'Formal Event', 'Social Media Content'],
    desc: 'Flowy V-neck blouses with cherry blossom watercolor prints and elegant flared sleeves.',
  },
  {
    id: 12, name: 'Bright & Bloom Blouses',
    img: '/images/BATIK-YEDIJAH_3.jpg', cat: 'Blouses', price: 'Rp 230.000',
    occasions: ['Formal Event', 'Cultural Ceremony', 'Casual Daily Wear'],
    desc: 'Sunflower print blouses with inspirational text panels and a batik-monogram outer layer.',
  },
  {
    id: 13, name: 'Wrap Collar Blouses',
    img: '/images/BATIK-YEDIJAH_4.jpg', cat: 'Blouses', price: 'Rp 220.000',
    occasions: ['Formal Event', 'Office / Work', 'Cultural Ceremony'],
    desc: 'Elegant peter pan collar blouses with batik inner panel accents and a signature side tie.',
  },
]

/* ── Occasion → recommended product IDs ───────────────────────── */
const OCC_MAP = {
  'Social Media Content': [4, 1, 9,  3],
  'Casual Daily Wear':    [9, 3, 11, 6],
  'Office / Work':        [5, 13, 6, 2],
  'Formal Event':         [13, 12, 7, 5],
  'Cultural Ceremony':    [2, 13, 7, 12],
}

/* ── Shared style helpers ─────────────────────────────────────── */
const btnSt = (primary = true) => ({
  background:    primary ? TC : 'transparent',
  color:         primary ? WH : TC,
  border:        `2px solid ${TC}`,
  borderRadius:  '6px',
  padding:       '10px 24px',
  cursor:        'pointer',
  fontFamily:    'Georgia, serif',
  fontSize:      '14px',
  fontWeight:    '600',
  letterSpacing: '0.5px',
  textDecoration:'none',
  display:       'inline-block',
})

const chipSt = (sel = false) => ({
  background:   sel ? TC : WH,
  color:        sel ? WH : TX,
  border:       `1.5px solid ${sel ? TC : BD}`,
  borderRadius: '20px',
  padding:      '7px 16px',
  cursor:       'pointer',
  fontSize:     '13px',
  fontFamily:   'Georgia, serif',
  margin:       '4px',
  display:      'inline-block',
})

const cardSt = {
  background:   WH,
  borderRadius: '12px',
  border:       `1px solid ${BD}`,
  overflow:     'hidden',
  boxShadow:    '0 2px 8px rgba(0,0,0,0.06)',
}

/* ══════════════════════════════════════════════════════════════ */
export default function BatikYedijah() {

  /* ── Navigation ───────────────────────────────────────────── */
  const [page,      setPage]      = useState('home')
  const [catFilter, setCatFilter] = useState('All')

  /* ── AI Stylist ───────────────────────────────────────────── */
  const [sBody,    setSBody]    = useState('')
  const [sSkin,    setSSkin]    = useState('')
  const [sOcc,     setSOcc]     = useState('')
  const [sStyle,   setSStyle]   = useState('')
  const [sResult,  setSResult]  = useState(null)
  const [sLoading, setSLoading] = useState(false)

  /* ── Design Studio ────────────────────────────────────────── */
  const [dMotif,   setDMotif]   = useState('')
  const [dPalette, setDPalette] = useState('')
  const [dMood,    setDMood]    = useState('')
  const [dUse,     setDUse]     = useState('')
  const [dResult,  setDResult]  = useState(null)
  const [dLoading, setDLoading] = useState(false)

  /* ── Virtual Try-On ───────────────────────────────────────── */
  const [tStep,     setTStep]     = useState(1)
  const [tProd,     setTProd]     = useState(null)
  const [tPhotoUrl, setTPhotoUrl] = useState(null)
  const [tPhotoB64, setTPhotoB64] = useState(null)
  const [tResult,   setTResult]   = useState(null)
  const [tLoading,  setTLoading]  = useState(false)
  const fileRef = useRef(null)

  /* ── Helpers ──────────────────────────────────────────────── */
  const goTo = (p) => {
    setPage(p)
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }

  // Resize uploaded image client-side before base64 encoding
  const resizeImage = (file) =>
    new Promise((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        const MAX = 800
        let w = img.width
        let h = img.height
        if (w > MAX || h > MAX) {
          if (w > h) { h = Math.round((h / w) * MAX); w = MAX }
          else       { w = Math.round((w / h) * MAX); h = MAX }
        }
        const c = document.createElement('canvas')
        c.width = w; c.height = h
        c.getContext('2d').drawImage(img, 0, 0, w, h)
        URL.revokeObjectURL(url)
        resolve(c.toDataURL('image/jpeg', 0.75).split(',')[1])
      }
      img.src = url
    })

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setTPhotoUrl(URL.createObjectURL(file))
    const b64 = await resizeImage(file)
    setTPhotoB64(b64)
  }

  const resetTryon = () => {
    setTStep(1); setTProd(null)
    setTPhotoUrl(null); setTPhotoB64(null)
    setTResult(null); setTLoading(false)
  }

  /* ── Claude API ───────────────────────────────────────────── */
  const callClaude = async (prompt, image = null) => {
    const res = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, image }),
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error)
    return data.content?.[0]?.text || ''
  }

  /* ── Stylist submit ───────────────────────────────────────── */
  const handleStylistSubmit = async () => {
    if (!sBody || !sSkin || !sOcc) return
    setSLoading(true); setSResult(null)
    const prompt = `You are the AI Personal Stylist for Batik Yedijah, a modern Indonesian batik brand in Bekasi.

Customer profile:
- Body type: ${sBody}
- Skin tone: ${sSkin}
- Occasion: ${sOcc}
- Style preference: ${sStyle || 'Open to suggestions'}

Our collection: Celestial Shirts (jet fighter & lyre print), Wrap Panel Tops, Batik Panel Tees, Celestial Jackets (oversized), Heavenly Realm Shirts, Heavenly Realm Polos, Rock of Covenant Scarf, Heavenly Realm Scarf, Floral Crop Tops, On Position Tees, Blossom Blouses (cherry blossom), Bright & Bloom Blouses (sunflower), Wrap Collar Blouses.

Return ONLY valid JSON, no preamble or markdown:
{
  "tagline": "One punchy fun personalized sentence like an Instagram caption",
  "styleRec": "2-3 sentences on silhouettes, cuts, and drapes that flatter this customer",
  "colorPalette": "Which batik colors and patterns complement their skin tone",
  "topPicks": [
    { "name": "product name from our collection", "why": "specific reason for this customer" },
    { "name": "product name from our collection", "why": "specific reason for this customer" },
    { "name": "product name from our collection", "why": "specific reason for this customer" }
  ],
  "stylingTip": "One actionable tip for wearing batik to this specific occasion"
}`
    try {
      const raw = await callClaude(prompt)
      setSResult(JSON.parse(raw.replace(/```json|```/g, '').trim()))
    } catch { setSResult({ error: true }) }
    setSLoading(false)
  }

  /* ── Design submit ────────────────────────────────────────── */
  const handleDesignSubmit = async () => {
    if (!dMotif || !dPalette) return
    setDLoading(true); setDResult(null)
    const prompt = `You are the AI Design Consultant for Batik Yedijah, a modern Indonesian batik brand.

Design brief:
- Motif theme: ${dMotif}
- Color palette: ${dPalette}
- Mood: ${dMood || 'Not specified'}
- Intended use: ${dUse || 'Not specified'}

Return ONLY valid JSON, no preamble:
{
  "name": "Poetic design name",
  "concept": "2-3 sentence concept",
  "pattern": "Detailed visual description of the batik pattern and arrangement",
  "colorStory": "How the colors interact and the effect they create",
  "symbolism": "Cultural and spiritual meaning of the motifs",
  "garment": "Best garment type to showcase this design",
  "production": "Recommended technique: cap batik, tulis, or digital print — and why"
}`
    try {
      const raw = await callClaude(prompt)
      setDResult(JSON.parse(raw.replace(/```json|```/g, '').trim()))
    } catch { setDResult({ error: true }) }
    setDLoading(false)
  }

  /* ── Try-on submit ────────────────────────────────────────── */
  const handleTryOn = async () => {
    if (!tProd) return
    setTLoading(true); setTResult(null)
    const prod = PRODUCTS.find(p => p.id === tProd)

    const prompt = tPhotoB64
      ? `You are a personal fashion stylist for Batik Yedijah, an Indonesian batik brand.
The customer uploaded their photo and wants to try on: "${prod.name}"
Description: ${prod.desc}
Category: ${prod.cat} | Price: ${prod.price}

Based on the customer's photo, give a warm personalized try-on:

FIRST IMPRESSION
A kind, specific 1-2 sentence greeting based on what you see in their photo.

HOW IT LOOKS ON YOU
How this specific piece works on their frame and coloring — 3-4 detailed, specific sentences.

STYLE IT WITH
Three specific items to pair for a complete look.

FIT NOTE
Any sizing or fit guidance relevant to their build.

THE VERDICT
An enthusiastic one-liner on why this piece is right for them.`
      : `You are a personal fashion stylist for Batik Yedijah, an Indonesian batik brand.
A customer wants to know about: "${prod.name}"
Description: ${prod.desc}
Category: ${prod.cat} | Price: ${prod.price}

WHO IT IS FOR
Which body types and style personalities this suits best — 3 sentences.

3 WAYS TO WEAR IT
Three complete outfit ideas with specific pairings.

OCCASION GUIDE
Which settings and events this piece works for.

CARE TIPS
How to look after this batik piece.

WHY WE LOVE IT
What makes this piece unique in the Batik Yedijah collection.`

    try {
      const text = await callClaude(prompt, tPhotoB64 || null)
      setTResult(text)
    } catch {
      setTResult('Something went wrong. Please try again.')
    }
    setTLoading(false)
    setTStep(3)
  }

  /* ── Computed values ──────────────────────────────────────── */
  const CATS = ['All', 'Shirts', 'Tops', 'T-Shirts', 'Outerwear', 'Polos', 'Blouses', 'Accessories']
  const filteredProds = catFilter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.cat === catFilter)
  const recProds = sOcc && OCC_MAP[sOcc]
    ? OCC_MAP[sOcc].map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean)
    : []
  const selectedProd = PRODUCTS.find(p => p.id === tProd)

  const NAV = [
    ['home', 'Home'], ['collection', 'Collection'], ['stylist', 'AI Stylist'],
    ['studio', 'Design Studio'], ['tryon', 'Virtual Try-On'], ['story', 'Our Story'],
  ]

  /* ── RENDER ───────────────────────────────────────────────── */
  return (
    <div style={{ minHeight: '100vh', background: CR, fontFamily: 'Georgia, serif', color: TX }}>

      {/* ── Navigation ──────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(250,247,242,0.97)', backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${BD}`, padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px',
      }}>
        <button onClick={() => goTo('home')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: '700', padding: 0,
        }}>
          <span style={{ color: TC }}>Batik</span>
          <span style={{ color: TX }}> Yedijah</span>
        </button>
        <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
          {NAV.map(([id, label]) => (
            <button key={id} onClick={() => goTo(id)} style={{
              background:   page === id ? TC : 'none',
              color:        page === id ? WH : TX,
              border:       'none',
              padding:      page === id ? '6px 14px' : '6px 10px',
              borderRadius: '6px',
              cursor:       'pointer',
              fontSize:     '13px',
              fontFamily:   'Georgia, serif',
              fontWeight:   page === id ? '600' : '400',
            }}>{label}</button>
          ))}
        </div>
      </nav>

      <div style={{ paddingTop: '64px' }}>

        {/* ════ HOME ════════════════════════════════════════════ */}
        {page === 'home' && (
          <div>
            {/* Hero */}
            <div style={{
              background: `linear-gradient(135deg, ${CRD} 0%, ${CR} 55%, #EEE0D2 100%)`,
              padding: '80px 32px', textAlign: 'center',
            }}>
              <p style={{ color: TC, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px' }}>
                Heritage Reimagined
              </p>
              <h1 style={{ fontSize: 'clamp(28px, 5vw, 58px)', fontWeight: '300', lineHeight: '1.2', color: BN, marginBottom: '20px' }}>
                Batik with Soul,<br />
                <span style={{ color: TC, fontStyle: 'italic' }}>Style with Purpose</span>
              </h1>
              <p style={{ fontSize: '15px', color: TXL, maxWidth: '500px', margin: '0 auto 36px', lineHeight: '1.8' }}>
                Every thread tells a story. Batik Yedijah brings Indonesia's living art form into your everyday wardrobe —
                infused with faith, crafted with love.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => goTo('collection')} style={btnSt(true)}>Explore Collection</button>
                <button onClick={() => goTo('stylist')} style={btnSt(false)}>AI Personal Stylist</button>
              </div>
            </div>

            {/* Featured pieces */}
            <div style={{ padding: '64px 32px', maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <p style={{ color: TC, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Curated Picks</p>
                <h2 style={{ fontSize: '30px', fontWeight: '300', color: BN, margin: 0 }}>Featured Pieces</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
                {[4, 1, 11, 9, 5, 13].map(id => {
                  const p = PRODUCTS.find(pr => pr.id === id)
                  if (!p) return null
                  return (
                    <div key={p.id} onClick={() => goTo('collection')} style={{ ...cardSt, cursor: 'pointer' }}>
                      <div style={{ height: '280px', overflow: 'hidden', background: CRD }}>
                        <img src={p.img} alt={p.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                          onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05)' }}
                          onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)' }}
                        />
                      </div>
                      <div style={{ padding: '16px' }}>
                        <p style={{ fontSize: '10px', color: TC, textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 4px' }}>{p.cat}</p>
                        <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 4px', color: TX }}>{p.name}</h3>
                        <p style={{ fontSize: '14px', color: TC, fontWeight: '700', margin: 0 }}>{p.price}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button onClick={() => goTo('collection')} style={btnSt(false)}>View Full Collection →</button>
              </div>
            </div>

            {/* AI features banner */}
            <div style={{ background: BN, padding: '64px 32px', textAlign: 'center' }}>
              <p style={{ color: `${CRD}70`, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Powered by AI</p>
              <h2 style={{ fontSize: '28px', fontWeight: '300', color: WH, marginBottom: '12px' }}>Your Batik Journey, Personalized</h2>
              <p style={{ color: `${WH}80`, maxWidth: '460px', margin: '0 auto 40px', lineHeight: '1.8', fontSize: '14px' }}>
                From styling recommendations to custom design concepts — our AI tools make batik fashion accessible and deeply personal.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { label: 'AI Personal Stylist', p: 'stylist', sub: 'Personalized outfit recommendations' },
                  { label: 'AI Design Studio',    p: 'studio',  sub: 'Co-create a custom batik design' },
                  { label: 'Virtual Try-On',       p: 'tryon',   sub: 'See how pieces look on you' },
                ].map(f => (
                  <div key={f.p} onClick={() => goTo(f.p)} style={{
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px', padding: '24px 28px', cursor: 'pointer', width: '210px',
                  }}
                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.16)' }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                  >
                    <p style={{ fontSize: '15px', fontWeight: '600', color: WH, margin: '0 0 8px' }}>{f.label}</p>
                    <p style={{ fontSize: '12px', color: `${WH}70`, margin: 0 }}>{f.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand values */}
            <div style={{ padding: '64px 32px', maxWidth: '960px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <p style={{ color: TC, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Our Promise</p>
                <h2 style={{ fontSize: '28px', fontWeight: '300', color: BN, margin: 0 }}>Why Batik Yedijah</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                {[
                  { t: 'Heritage Craft',     b: 'Rooted in Javanese batik traditions passed through generations of family craftsmanship.' },
                  { t: 'Modern Silhouettes', b: 'Designed for young professionals who wear culture with confidence and intention.' },
                  { t: 'Made in Indonesia',  b: 'Proudly produced in Bekasi, supporting local artisans and the textile community.' },
                  { t: 'AI-Powered Style',   b: 'Cutting-edge tools to make your batik experience uniquely personal and accessible.' },
                ].map(v => (
                  <div key={v.t} style={{ padding: '24px', background: WH, borderRadius: '12px', border: `1px solid ${BD}`, textAlign: 'center' }}>
                    <div style={{ width: '36px', height: '3px', background: TC, margin: '0 auto 16px' }} />
                    <h3 style={{ fontSize: '15px', fontWeight: '600', color: BN, marginBottom: '10px' }}>{v.t}</h3>
                    <p style={{ fontSize: '13px', color: TXL, lineHeight: '1.6', margin: 0 }}>{v.b}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: `1px solid ${BD}`, padding: '32px', textAlign: 'center', background: `${BN}0D` }}>
              <p style={{ margin: '0 0 6px' }}>
                <span style={{ color: TC, fontWeight: '700' }}>Batik</span>
                <span style={{ color: TX }}> Yedijah</span>
              </p>
              <p style={{ fontSize: '13px', color: TXL, margin: '0 0 2px' }}>Bekasi, West Java, Indonesia</p>
              <p style={{ fontSize: '12px', color: TXL, margin: 0 }}>© 2026 Batik Yedijah. All rights reserved.</p>
            </div>
          </div>
        )}

        {/* ════ COLLECTION ══════════════════════════════════════ */}
        {page === 'collection' && (
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <p style={{ color: TC, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Batik Yedijah</p>
              <h1 style={{ fontSize: '34px', fontWeight: '300', color: BN, margin: '0 0 12px' }}>Our Collection</h1>
              <p style={{ color: TXL, fontSize: '14px', maxWidth: '460px', margin: '0 auto' }}>
                Curated pieces honoring Indonesia's batik heritage while embracing modern style.
              </p>
            </div>

            {/* Category filter */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setCatFilter(c)} style={chipSt(catFilter === c)}>{c}</button>
              ))}
            </div>

            {/* Product grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
              {filteredProds.map(p => (
                <div key={p.id} style={cardSt}>
                  <div style={{ height: '300px', overflow: 'hidden', background: CRD, position: 'relative' }}>
                    <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button onClick={() => { setTProd(p.id); setTStep(1); goTo('tryon') }} style={{
                      position: 'absolute', bottom: '12px', right: '12px',
                      background: 'rgba(160,82,45,0.92)', color: WH, border: 'none',
                      borderRadius: '6px', padding: '7px 14px', cursor: 'pointer',
                      fontSize: '11px', fontFamily: 'Georgia, serif', fontWeight: '600',
                    }}>Try On</button>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ fontSize: '10px', color: TC, textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 4px' }}>{p.cat}</p>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px', color: TX }}>{p.name}</h3>
                    <p style={{ fontSize: '12px', color: TXL, lineHeight: '1.55', marginBottom: '14px' }}>{p.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: TC, fontWeight: '700', fontSize: '15px' }}>{p.price}</span>
                      <a href="https://wa.me/6287711553205" target="_blank" rel="noopener noreferrer"
                        style={{ ...btnSt(true), padding: '6px 14px', fontSize: '12px' }}>
                        Order via WA
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ AI STYLIST ══════════════════════════════════════ */}
        {page === 'stylist' && (
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ color: TC, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Powered by Claude AI</p>
              <h1 style={{ fontSize: '34px', fontWeight: '300', fontStyle: 'italic', color: BN, margin: '0 0 12px' }}>AI Personal Stylist</h1>
              <p style={{ color: TXL, fontSize: '14px', maxWidth: '480px', margin: '0 auto' }}>
                Share your profile and get AI-powered batik recommendations tailored to your body, skin tone, and occasion.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: sResult ? '1fr 1fr' : 'minmax(0, 600px)',
              justifyContent: 'center',
              gap: '32px', alignItems: 'start',
            }}>
              {/* Profile form */}
              <div style={{ ...cardSt, padding: '32px' }}>
                <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: TC, marginBottom: '24px', fontWeight: '600' }}>YOUR PROFILE</p>
                {[
                  { label: 'BODY TYPE',       val: sBody,  set: setSBody,  opts: ['Slim / Petite', 'Athletic / Fit', 'Curvy / Hourglass', 'Plus Size / Full Figure', 'Tall / Lean'] },
                  { label: 'SKIN TONE',        val: sSkin,  set: setSSkin,  opts: ['Very Fair', 'Fair / Light', 'Medium / Olive', 'Tan / Brown', 'Deep / Dark'] },
                  { label: 'OCCASION',         val: sOcc,   set: setSOcc,   opts: ['Office / Work', 'Formal Event', 'Cultural Ceremony', 'Casual Daily Wear', 'Social Media Content'] },
                  { label: 'STYLE PREFERENCE', val: sStyle, set: setSStyle, opts: ['Bold & Expressive', 'Minimalist & Clean', 'Traditional & Elegant', 'Streetwear Fusion', 'Feminine & Flowy'] },
                ].map(({ label, val, set, opts }) => (
                  <div key={label} style={{ marginBottom: '24px' }}>
                    <p style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600', color: TX, marginBottom: '10px' }}>{label}</p>
                    <div>{opts.map(o => <button key={o} onClick={() => set(o)} style={chipSt(val === o)}>{o}</button>)}</div>
                  </div>
                ))}
                <button
                  onClick={handleStylistSubmit}
                  disabled={!sBody || !sSkin || !sOcc || sLoading}
                  style={{ ...btnSt(true), width: '100%', marginTop: '8px', opacity: (!sBody || !sSkin || !sOcc) ? 0.5 : 1 }}
                >
                  {sLoading ? 'Getting Your Style...' : 'Get My Style Recommendations'}
                </button>
              </div>

              {/* Results panel */}
              {sResult && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {sResult.error ? (
                    <div style={{ ...cardSt, padding: '32px', textAlign: 'center' }}>
                      <p style={{ color: '#C00' }}>Something went wrong. Please try again.</p>
                    </div>
                  ) : (
                    <>
                      {/* Tagline */}
                      <div style={{ ...cardSt, padding: '24px', borderLeft: `4px solid ${TC}` }}>
                        <p style={{ fontStyle: 'italic', fontSize: '17px', color: BN, lineHeight: '1.6', margin: 0 }}>{sResult.tagline}</p>
                      </div>

                      {/* Style rec + color palette */}
                      {[
                        { label: 'STYLE RECOMMENDATION', val: sResult.styleRec },
                        { label: 'YOUR COLOR PALETTE',    val: sResult.colorPalette },
                      ].map(({ label, val }) => (
                        <div key={label} style={{ ...cardSt, padding: '20px' }}>
                          <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: TC, fontWeight: '600', marginBottom: '10px' }}>{label}</p>
                          <p style={{ color: TX, lineHeight: '1.7', margin: 0, fontSize: '14px' }}>{val}</p>
                        </div>
                      ))}

                      {/* Top picks with product images */}
                      <div style={{ ...cardSt, padding: '20px' }}>
                        <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: TC, fontWeight: '600', marginBottom: '14px' }}>TOP PICKS FOR YOU</p>
                        {sResult.topPicks?.map((pick, i) => {
                          const firstWord = pick.name.toLowerCase().split(' ')[0]
                          const matched = PRODUCTS.find(p => p.name.toLowerCase().includes(firstWord))
                          const disp = matched || recProds[i] || PRODUCTS[i]
                          return (
                            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '14px', padding: '12px', background: CR, borderRadius: '8px' }}>
                              {disp && (
                                <img src={disp.img} alt={disp.name}
                                  style={{ width: '68px', height: '68px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                                />
                              )}
                              <div>
                                <p style={{ fontSize: '14px', fontWeight: '600', color: BN, margin: '0 0 4px' }}>{pick.name}</p>
                                <p style={{ fontSize: '12px', color: TXL, margin: 0, lineHeight: '1.5' }}>{pick.why}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Styling tip */}
                      <div style={{ ...cardSt, padding: '20px', background: `${TC}0D` }}>
                        <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: TC, fontWeight: '600', marginBottom: '10px' }}>STYLING TIP</p>
                        <p style={{ color: TX, lineHeight: '1.7', margin: 0, fontSize: '14px' }}>{sResult.stylingTip}</p>
                      </div>

                      {/* Occasion-matched product photos */}
                      {recProds.length > 0 && (
                        <div style={{ ...cardSt, padding: '20px' }}>
                          <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: TC, fontWeight: '600', marginBottom: '14px' }}>
                            PERFECT FOR {sOcc.toUpperCase()}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                            {recProds.slice(0, 4).map(p => (
                              <div key={p.id} onClick={() => goTo('collection')} style={{ cursor: 'pointer' }}>
                                <img src={p.img} alt={p.name}
                                  style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '8px' }}
                                  onMouseOver={e => { e.currentTarget.style.opacity = '0.8' }}
                                  onMouseOut={e => { e.currentTarget.style.opacity = '1' }}
                                />
                                <p style={{ fontSize: '10px', color: TXL, textAlign: 'center', margin: '4px 0 0' }}>{p.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button onClick={() => { setTProd(null); setTStep(1); goTo('tryon') }} style={btnSt(true)}>
                        Try On My Picks →
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════ DESIGN STUDIO ═══════════════════════════════════ */}
        {page === 'studio' && (
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ color: TC, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Powered by Claude AI</p>
              <h1 style={{ fontSize: '34px', fontWeight: '300', fontStyle: 'italic', color: BN, margin: '0 0 12px' }}>AI Design Studio</h1>
              <p style={{ color: TXL, fontSize: '14px', maxWidth: '480px', margin: '0 auto' }}>
                Co-create a custom batik design concept. Describe your vision and let AI bring it to life.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: dResult ? '1fr 1fr' : 'minmax(0, 600px)',
              justifyContent: 'center',
              gap: '32px', alignItems: 'start',
            }}>
              <div style={{ ...cardSt, padding: '32px' }}>
                <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: TC, marginBottom: '24px', fontWeight: '600' }}>YOUR DESIGN BRIEF</p>
                {[
                  { label: 'MOTIF THEME',   val: dMotif,   set: setDMotif,   opts: ['Floral & Botanical', 'Birds & Nature', 'Geometric & Abstract', 'Celestial & Cosmic', 'Traditional Parang', 'Faith & Spiritual'] },
                  { label: 'COLOR PALETTE', val: dPalette, set: setDPalette, opts: ['Earthy Neutrals', 'Vibrant Jewel Tones', 'Soft Pastels', 'Monochromatic', 'Bold Contrast', 'Warm Sunset'] },
                  { label: 'MOOD',          val: dMood,    set: setDMood,    opts: ['Serene & Calming', 'Bold & Expressive', 'Mystical & Spiritual', 'Playful & Joyful', 'Elegant & Refined'] },
                  { label: 'INTENDED USE',  val: dUse,     set: setDUse,     opts: ['Everyday Wear', 'Formal Events', 'Cultural Ceremonies', 'Content Creation', 'Gift / Special Occasion'] },
                ].map(({ label, val, set, opts }) => (
                  <div key={label} style={{ marginBottom: '24px' }}>
                    <p style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600', color: TX, marginBottom: '10px' }}>{label}</p>
                    <div>{opts.map(o => <button key={o} onClick={() => set(o)} style={chipSt(val === o)}>{o}</button>)}</div>
                  </div>
                ))}
                <button
                  onClick={handleDesignSubmit}
                  disabled={!dMotif || !dPalette || dLoading}
                  style={{ ...btnSt(true), width: '100%', marginTop: '8px', opacity: (!dMotif || !dPalette) ? 0.5 : 1 }}
                >
                  {dLoading ? 'Creating Your Design...' : 'Generate Design Concept'}
                </button>
              </div>

              {dResult && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {dResult.error ? (
                    <div style={{ ...cardSt, padding: '32px', textAlign: 'center' }}>
                      <p style={{ color: '#C00' }}>Something went wrong. Please try again.</p>
                    </div>
                  ) : (
                    <>
                      <div style={{ ...cardSt, padding: '24px', borderLeft: `4px solid ${TC}` }}>
                        <p style={{ fontSize: '20px', fontWeight: '700', color: BN, margin: '0 0 8px' }}>{dResult.name}</p>
                        <p style={{ fontSize: '14px', color: TXL, lineHeight: '1.7', margin: 0 }}>{dResult.concept}</p>
                      </div>
                      {[
                        { label: 'PATTERN DESCRIPTION', val: dResult.pattern },
                        { label: 'COLOR STORY',          val: dResult.colorStory },
                        { label: 'MOTIF SYMBOLISM',      val: dResult.symbolism },
                        { label: 'RECOMMENDED GARMENT',  val: dResult.garment },
                        { label: 'PRODUCTION TECHNIQUE', val: dResult.production },
                      ].map(({ label, val }) => (
                        <div key={label} style={{ ...cardSt, padding: '20px' }}>
                          <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: TC, fontWeight: '600', marginBottom: '8px' }}>{label}</p>
                          <p style={{ color: TX, lineHeight: '1.7', margin: 0, fontSize: '14px' }}>{val}</p>
                        </div>
                      ))}
                      <button
                        onClick={() => { setDMotif(''); setDPalette(''); setDMood(''); setDUse(''); setDResult(null) }}
                        style={btnSt(false)}
                      >
                        Design Another
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════ VIRTUAL TRY-ON ══════════════════════════════════ */}
        {page === 'tryon' && (
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <p style={{ color: TC, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Powered by Claude AI Vision</p>
              <h1 style={{ fontSize: '34px', fontWeight: '300', fontStyle: 'italic', color: BN, margin: '0 0 12px' }}>Virtual Try-On</h1>
              <p style={{ color: TXL, fontSize: '14px', maxWidth: '520px', margin: '0 auto' }}>
                Select a piece, optionally upload your photo, and get a personalized AI styling consultation.
              </p>
            </div>

            {/* Step indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
              {['Select Piece', 'Your Photo', 'Results'].map((label, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: tStep >= i + 1 ? TC : BD,
                      color: tStep >= i + 1 ? WH : TXL,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: '600',
                    }}>{i + 1}</div>
                    <span style={{ fontSize: '11px', color: tStep === i + 1 ? TC : TXL, whiteSpace: 'nowrap' }}>{label}</span>
                  </div>
                  {i < 2 && (
                    <div style={{ width: '60px', height: '1px', background: BD, margin: '0 8px', marginBottom: '20px' }} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Product selection */}
            {tStep === 1 && (
              <div>
                <p style={{ textAlign: 'center', color: TXL, marginBottom: '24px', fontSize: '14px' }}>
                  Choose a Batik Yedijah piece to try on:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                  {PRODUCTS.map(p => (
                    <div key={p.id} onClick={() => setTProd(p.id)} style={{
                      ...cardSt,
                      cursor: 'pointer',
                      border: `2px solid ${tProd === p.id ? TC : BD}`,
                      transform: tProd === p.id ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 0.2s',
                    }}>
                      <div style={{ height: '190px', overflow: 'hidden' }}>
                        <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '10px', textAlign: 'center' }}>
                        <p style={{ fontSize: '12px', fontWeight: '600', color: TX, margin: '0 0 2px' }}>{p.name}</p>
                        <p style={{ fontSize: '11px', color: TC, margin: 0 }}>{p.price}</p>
                      </div>
                      {tProd === p.id && (
                        <div style={{ background: TC, color: WH, textAlign: 'center', padding: '6px', fontSize: '11px', fontWeight: '600' }}>
                          ✓ Selected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => tProd && setTStep(2)}
                    disabled={!tProd}
                    style={{ ...btnSt(true), opacity: tProd ? 1 : 0.5 }}
                  >
                    Next: Add Your Photo →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Photo upload */}
            {tStep === 2 && (
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                {selectedProd && (
                  <div style={{ ...cardSt, padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '28px' }}>
                    <img src={selectedProd.img} alt={selectedProd.name}
                      style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <div>
                      <p style={{ fontSize: '10px', color: TC, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px' }}>Selected Piece</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: BN, margin: '0 0 2px' }}>{selectedProd.name}</p>
                      <p style={{ fontSize: '13px', color: TXL, margin: 0 }}>{selectedProd.price}</p>
                    </div>
                  </div>
                )}

                <div style={{ ...cardSt, padding: '32px', textAlign: 'center' }}>
                  <div
                    style={{
                      border: `2px dashed ${BD}`, borderRadius: '12px', padding: '40px 24px',
                      marginBottom: '20px', cursor: 'pointer',
                      background: tPhotoUrl ? 'transparent' : `${CR}80`,
                    }}
                    onClick={() => fileRef.current && fileRef.current.click()}
                  >
                    {tPhotoUrl ? (
                      <div>
                        <img src={tPhotoUrl} alt="Your photo"
                          style={{ maxHeight: '280px', maxWidth: '100%', borderRadius: '8px', marginBottom: '12px' }}
                        />
                        <p style={{ color: TC, fontSize: '12px', margin: 0 }}>Click to change photo</p>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '36px', marginBottom: '12px' }}>📸</div>
                        <p style={{ fontSize: '16px', fontWeight: '600', color: BN, margin: '0 0 8px' }}>Upload Your Photo</p>
                        <p style={{ fontSize: '13px', color: TXL, margin: 0 }}>
                          Optional — for a personalized try-on based on your photo
                        </p>
                      </div>
                    )}
                  </div>

                  <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />

                  <p style={{ fontSize: '11px', color: TXL, marginBottom: '20px' }}>
                    Your photo is only sent to Claude AI for styling analysis. It is not stored anywhere.
                  </p>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button onClick={() => setTStep(1)} style={btnSt(false)}>← Back</button>
                    <button onClick={handleTryOn} disabled={tLoading} style={btnSt(true)}>
                      {tLoading ? 'Analyzing...' : tPhotoUrl ? 'Analyze My Look ✨' : 'Skip — Get Style Guide →'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {tStep === 3 && (
              <div>
                {tLoading ? (
                  <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                    <div style={{ fontSize: '36px', marginBottom: '16px' }}>✨</div>
                    <p style={{ fontSize: '18px', color: BN, marginBottom: '8px' }}>Your AI stylist is analyzing...</p>
                    <p style={{ color: TXL, fontSize: '14px' }}>This takes just a few seconds.</p>
                  </div>
                ) : (
                  <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: tPhotoUrl ? '1fr 1fr 2fr' : '1fr 3fr',
                      gap: '24px', marginBottom: '28px', alignItems: 'start',
                    }}>
                      {selectedProd && (
                        <div style={{ textAlign: 'center' }}>
                          <p style={{ fontSize: '10px', color: TC, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Selected Piece</p>
                          <img src={selectedProd.img} alt={selectedProd.name}
                            style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                          />
                          <p style={{ fontSize: '13px', fontWeight: '600', color: BN, marginTop: '8px', marginBottom: '2px' }}>{selectedProd.name}</p>
                          <p style={{ fontSize: '12px', color: TC, margin: 0 }}>{selectedProd.price}</p>
                        </div>
                      )}
                      {tPhotoUrl && (
                        <div style={{ textAlign: 'center' }}>
                          <p style={{ fontSize: '10px', color: TC, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Your Photo</p>
                          <img src={tPhotoUrl} alt="You"
                            style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', maxHeight: '360px', objectFit: 'cover' }}
                          />
                        </div>
                      )}
                      <div style={{ ...cardSt, padding: '28px' }}>
                        <p style={{ fontSize: '10px', color: TC, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600', marginBottom: '16px' }}>
                          {tPhotoUrl ? 'YOUR PERSONALIZED TRY-ON' : 'STYLE GUIDE'}
                        </p>
                        <div style={{ fontSize: '14px', color: TX, lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                          {tResult}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                      <button onClick={resetTryon} style={btnSt(false)}>Try Another Piece</button>
                      <a href="https://wa.me/6287711553205" target="_blank" rel="noopener noreferrer" style={btnSt(true)}>
                        Order via WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ════ OUR STORY ═══════════════════════════════════════ */}
        {page === 'story' && (
          <div>
            <div style={{
              background: `linear-gradient(135deg, ${BN} 0%, #7A3B1E 100%)`,
              padding: '80px 32px', textAlign: 'center', color: WH,
            }}>
              <p style={{ color: `${CRD}70`, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Our Heritage</p>
              <h1 style={{ fontSize: '34px', fontWeight: '300', margin: '0 0 16px' }}>The Story of Batik Yedijah</h1>
              <p style={{ maxWidth: '520px', margin: '0 auto', lineHeight: '1.8', color: `${WH}85`, fontSize: '14px' }}>
                A family legacy woven in batik, now reimagined for the next generation.
              </p>
            </div>

            <div style={{ maxWidth: '780px', margin: '0 auto', padding: '64px 32px' }}>
              {[
                {
                  title: 'Our Roots',
                  body: "Batik Yedijah was born from a love of Indonesian textile heritage and a family legacy in batik craft. Founded in Bekasi, West Java, the brand carries forward generations of artisanal knowledge while embracing the aesthetic sensibilities of today's young professionals.",
                },
                {
                  title: 'The Name',
                  body: "Yedijah is a name that carries meaning — rooted in faith and purpose. It reflects the brand's belief that clothing is more than fabric: it is identity, story, and declaration. Each piece carries a spiritual intentionality that sets it apart from conventional fashion.",
                },
                {
                  title: 'The Mission',
                  body: "We exist to make batik accessible without diluting its depth. Through thoughtful modern design, accessible pricing, and AI-powered tools that personalize the experience, we bring Indonesia's living art form to wardrobes across the nation.",
                },
                {
                  title: 'Innovation & Craft',
                  body: 'Batik Yedijah bridges the handmade and the digital. Our AI Personal Stylist, Design Studio, and Vision-powered Virtual Try-On represent a commitment to innovating the batik experience while honoring the tradition that makes every piece meaningful.',
                },
              ].map((s, i) => (
                <div key={i} style={{ marginBottom: '48px' }}>
                  <div style={{ width: '36px', height: '3px', background: TC, marginBottom: '16px' }} />
                  <h2 style={{ fontSize: '22px', fontWeight: '600', color: BN, marginBottom: '12px' }}>{s.title}</h2>
                  <p style={{ fontSize: '15px', color: TX, lineHeight: '1.8', margin: 0 }}>{s.body}</p>
                </div>
              ))}

              <div style={{ ...cardSt, padding: '32px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: BN, marginBottom: '16px' }}>Get in Touch</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', marginBottom: '20px' }}>
                  <p style={{ fontSize: '14px', color: TXL, margin: 0 }}>📍 Bekasi, West Java, Indonesia</p>
                  <a href="https://wa.me/6287711553205" style={{ color: TC, fontSize: '14px', textDecoration: 'none' }}>📱 +62 877-1155-3205</a>
                  <a href="https://instagram.com/batikyedijah" target="_blank" rel="noopener noreferrer" style={{ color: TC, fontSize: '14px', textDecoration: 'none' }}>📷 @batikyedijah</a>
                </div>
                <a href="https://wa.me/6287711553205" target="_blank" rel="noopener noreferrer" style={btnSt(true)}>
                  Order via WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
