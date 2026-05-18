'use client';

import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#FDF6EC", surface: "#FFFAF5", surfaceDark: "#F2E8D4",
  text: "#1C0F07", textSub: "#7A4F35", textMuted: "#B08060",
  accent: "#B8511F", accentLight: "#E8744A", gold: "#9A7010",
  border: "#E2C9AC", white: "#FFFFFF",
  darkBg: "#1C0F07", darkSurface: "#2E1A0E",
};

const PRODUCTS = [
  { id:1, name:"Parang Modern Kemeja", cat:"tops", price:"Rp 165.000", tag:"Office",
    desc:"Contemporary parang diagonal waves for the modern professional. Slim fit, breathable cotton-blend fabric.",
    motif:"parang", c1:"#8B1A1A", c2:"#C4A020" },
  { id:2, name:"Kawung Blouse Premium", cat:"tops", price:"Rp 175.000", tag:"Formal",
    desc:"Classic sacred circle kawung motif in a modern blouse cut. Perfect for presentations and client meetings.",
    motif:"kawung", c1:"#3A1A6B", c2:"#B8870B" },
  { id:3, name:"Mega Mendung Full Set", cat:"sets", price:"Rp 245.000", tag:"Cultural",
    desc:"Iconic cloud motif from Cirebon in a full coordinated top-and-pants set. Maximum cultural impact.",
    motif:"megamendung", c1:"#1A3A6B", c2:"#8B4A00" },
  { id:4, name:"Truntum Office Shirt", cat:"tops", price:"Rp 155.000", tag:"Daily",
    desc:"Subtle star-flower truntum pattern in muted tones. Non-iron fabric for your busiest workdays.",
    motif:"truntum", c1:"#1A4A1A", c2:"#6B3A1A" },
  { id:5, name:"Sidomukti Elegant Set", cat:"sets", price:"Rp 255.000", tag:"Formal",
    desc:"Royal Javanese court-inspired sidomukti in a contemporary two-piece. A true statement piece.",
    motif:"sidomukti", c1:"#6B4A00", c2:"#3A1A3A" },
  { id:6, name:"Lereng Fresh Blouse", cat:"tops", price:"Rp 160.000", tag:"Casual",
    desc:"Diagonal lereng stripes in modern, fresh colorways. Your everyday go-to that never looks boring.",
    motif:"lereng", c1:"#1A5C3A", c2:"#3A1A5C" },
];

const MOTIF_KEY = {
  "Parang (Diagonal Waves)":"parang","Kawung (Sacred Circles)":"kawung",
  "Mega Mendung (Clouds)":"megamendung","Truntum (Star Flowers)":"truntum",
  "Sidomukti (Royal Court)":"sidomukti","Lereng (Diagonal Stripes)":"lereng",
  "Abstract Fusion":"kawung",
};
const COLOR_MAP = {
  "Earth Tones (Brown, Terracotta)":["#8B4513","#D2691E"],
  "Ocean Blues (Navy, Teal)":["#1A3A6B","#2A8B8B"],
  "Forest Greens":["#1A5C1A","#3A8B3A"],
  "Sunset Oranges & Gold":["#C4602A","#B8870B"],
  "Monochrome (Black & White)":["#1A1A1A","#888888"],
  "Pastels (Soft & Modern)":["#C4A0B8","#A0C4B8"],
  "Jewel Tones (Rich & Bold)":["#4A1A6B","#8B1A1A"],
};

async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
      messages:[{role:"user",content:prompt}] }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const text = data.content[0].text;
  const clean = text.replace(/```json|```/g,"").trim();
  return JSON.parse(clean);
}

function BatikSwatch({ motif, c1="#8B4513", c2="#D2691E", size=120 }) {
  const M = {
    parang:(
      <svg viewBox="0 0 100 100" width={size} height={size} style={{display:"block"}}>
        <rect width="100" height="100" fill={c2+"28"}/>
        {[0,1,2,3,4].map(i=><path key={i} d={`M${-15+i*26} 108 Q${-5+i*26} 50 ${15+i*26} -8`} stroke={c1} strokeWidth="9" fill="none" opacity="0.65"/>)}
        {[0,1,2,3,4].map(i=><path key={"b"+i} d={`M${-5+i*26} 108 Q${5+i*26} 50 ${25+i*26} -8`} stroke={c2} strokeWidth="3" fill="none" opacity="0.45"/>)}
        {[[13,25],[38,25],[63,25],[13,75],[38,75],[63,75]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3" fill={c1} opacity="0.5"/>)}
      </svg>
    ),
    kawung:(
      <svg viewBox="0 0 100 100" width={size} height={size} style={{display:"block"}}>
        <rect width="100" height="100" fill={c2+"28"}/>
        {[[25,25],[75,25],[50,50],[25,75],[75,75],[0,50],[100,50],[50,0],[50,100]].slice(0,7).map(([cx,cy],i)=>(
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="18" ry="22" fill="none" stroke={c1} strokeWidth="2.5" opacity="0.75"/>
            <ellipse cx={cx} cy={cy} rx="10" ry="13" fill="none" stroke={c2} strokeWidth="1.5" opacity="0.55"/>
            <circle cx={cx} cy={cy} r="3.5" fill={c1} opacity="0.8"/>
          </g>
        ))}
      </svg>
    ),
    megamendung:(
      <svg viewBox="0 0 100 100" width={size} height={size} style={{display:"block"}}>
        <rect width="100" height="100" fill={c2+"28"}/>
        <path d="M0 60 Q15 30 35 45 Q45 20 60 38 Q72 15 85 35 Q98 30 100 55 Q100 75 80 72 Q70 90 50 82 Q30 92 15 78 Q-2 72 0 60Z" fill={c1} opacity="0.3"/>
        <path d="M0 62 Q14 34 33 48 Q43 24 58 40 Q70 18 83 37 Q95 32 97 57 Q96 73 78 70 Q68 87 50 80 Q32 89 17 76 Q1 70 0 62Z" fill="none" stroke={c1} strokeWidth="2" opacity="0.8"/>
        <path d="M5 65 Q18 42 36 52 Q46 30 60 44 Q71 24 83 40" fill="none" stroke={c2} strokeWidth="1.5" opacity="0.5"/>
        <circle cx="25" cy="65" r="4" fill={c2} opacity="0.6"/>
        <circle cx="55" cy="58" r="3" fill={c2} opacity="0.5"/>
        <circle cx="80" cy="62" r="4" fill={c2} opacity="0.6"/>
      </svg>
    ),
    truntum:(
      <svg viewBox="0 0 100 100" width={size} height={size} style={{display:"block"}}>
        <rect width="100" height="100" fill={c2+"28"}/>
        {[12,37,62,87].map(cx=>[12,37,62,87].map(cy=>(
          <g key={cx+"-"+cy}>
            {[0,45,90,135,180,225,270,315].map(deg=>(
              <line key={deg} x1={cx} y1={cy}
                x2={cx+9*Math.cos(deg*Math.PI/180)} y2={cy+9*Math.sin(deg*Math.PI/180)}
                stroke={c1} strokeWidth="1.8" opacity="0.7"/>
            ))}
            <circle cx={cx} cy={cy} r="3.5" fill={c2} opacity="0.9"/>
            <circle cx={cx} cy={cy} r="1.5" fill={c1} opacity="0.9"/>
          </g>
        )))}
      </svg>
    ),
    sidomukti:(
      <svg viewBox="0 0 100 100" width={size} height={size} style={{display:"block"}}>
        <rect width="100" height="100" fill={c2+"28"}/>
        <path d="M50 8 L62 34 L90 34 L68 52 L76 78 L50 62 L24 78 L32 52 L10 34 L38 34Z" fill={c1} opacity="0.25"/>
        <path d="M50 16 L60 36 L80 36 L66 50 L72 70 L50 58 L28 70 L34 50 L20 36 L40 36Z" fill="none" stroke={c1} strokeWidth="2.5" opacity="0.8"/>
        <path d="M50 26 L57 38 L70 38 L62 46 L65 58 L50 51 L35 58 L38 46 L30 38 L43 38Z" fill="none" stroke={c2} strokeWidth="1.5" opacity="0.6"/>
        <circle cx="50" cy="50" r="8" fill={c2} opacity="0.5"/>
        <circle cx="50" cy="50" r="4" fill={c1} opacity="0.85"/>
      </svg>
    ),
    lereng:(
      <svg viewBox="0 0 100 100" width={size} height={size} style={{display:"block"}}>
        <rect width="100" height="100" fill={c2+"28"}/>
        {[0,1,2,3,4,5,6].map(i=>(
          <line key={i} x1={-25+i*22} y1={110} x2={30+i*22} y2={-10}
            stroke={i%2===0?c1:c2} strokeWidth={i%2===0?7:3} opacity={i%2===0?0.6:0.35}/>
        ))}
        {[11,33,55,77].map(x=>[20,50,80].map(y=>(
          <circle key={x+"-"+y} cx={x} cy={y} r="3" fill={x%22===11?c1:c2} opacity="0.8"/>
        )))}
      </svg>
    ),
  };
  return M[motif] || M.kawung;
}

function Loader({ text="AI is thinking..." }) {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"12px",padding:"48px 24px"}}>
      <div style={{width:"36px",height:"36px",border:`3px solid ${C.border}`,borderTopColor:C.accent,borderRadius:"50%",animation:"spin 0.9s linear infinite"}}/>
      <p style={{color:C.textSub,fontSize:"14px",margin:0,fontStyle:"italic"}}>{text}</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function Btn({ children, onClick, variant="primary", sx={}, disabled=false }) {
  const base = {padding:"10px 24px",borderRadius:"5px",fontFamily:"'Georgia','Times New Roman',serif",fontSize:"14px",cursor:disabled?"not-allowed":"pointer",transition:"all 0.2s",fontWeight:"600",letterSpacing:"0.04em",opacity:disabled?0.55:1,...sx};
  const v = {
    primary:{background:C.accent,color:C.white,border:`1.5px solid ${C.accent}`},
    outline:{background:"transparent",color:C.accent,border:`1.5px solid ${C.accent}`},
    ghost:{background:"transparent",color:C.white,border:`1.5px solid rgba(255,255,255,0.4)`},
    gold:{background:C.gold,color:C.white,border:`1.5px solid ${C.gold}`},
  };
  return <button style={{...base,...v[variant]}} onClick={onClick} disabled={disabled}>{children}</button>;
}

function Badge({ children, color=C.accent }) {
  return <span style={{background:color+"22",color,fontSize:"10px",padding:"3px 9px",borderRadius:"20px",fontWeight:"700",letterSpacing:"0.1em",textTransform:"uppercase",display:"inline-block"}}>{children}</span>;
}

function Tag({ children }) {
  return <span style={{background:C.surfaceDark,color:C.textSub,fontSize:"10px",padding:"2px 8px",borderRadius:"3px",fontWeight:"600",letterSpacing:"0.08em",textTransform:"uppercase"}}>{children}</span>;
}

function Section({ children, bg=C.bg, sx={} }) {
  return (
    <section style={{background:bg,padding:"80px 24px",...sx}}>
      <div style={{maxWidth:"1120px",margin:"0 auto"}}>{children}</div>
    </section>
  );
}

function SectionHead({ title, sub, light=false }) {
  return (
    <div style={{marginBottom:"52px",textAlign:"center"}}>
      <h2 style={{fontSize:"clamp(30px,4vw,44px)",color:light?"#FDF6EC":C.text,margin:"0 0 14px",fontStyle:"italic",fontWeight:"300",lineHeight:"1.2"}}>{title}</h2>
      {sub && <p style={{color:light?"#D4B896":C.textSub,fontSize:"16px",maxWidth:"520px",margin:"0 auto",lineHeight:"1.8",fontWeight:"300"}}>{sub}</p>}
    </div>
  );
}

function SelectGroup({ label, field, opts, form, setForm }) {
  return (
    <div style={{marginBottom:"22px"}}>
      <label style={{display:"block",color:C.text,fontSize:"11px",fontWeight:"700",marginBottom:"10px",letterSpacing:"0.1em",textTransform:"uppercase"}}>{label}</label>
      <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
        {opts.map(o=>(
          <button key={o} onClick={()=>setForm(f=>({...f,[field]:o}))}
            style={{padding:"7px 15px",borderRadius:"4px",fontFamily:"inherit",fontSize:"12px",cursor:"pointer",transition:"all 0.18s",
              background:form[field]===o?C.accent:"transparent",
              color:form[field]===o?C.white:C.textSub,
              border:`1px solid ${form[field]===o?C.accent:C.border}`,
              fontWeight:form[field]===o?"600":"400"}}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function ErrorBox({ msg }) {
  return <div style={{background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"10px",padding:"16px 20px",color:"#991B1B",fontSize:"13px",lineHeight:"1.6"}}>{msg}</div>;
}

function NavBar({ page, setPage }) {
  const links=[
    {id:"home",label:"Home"},{id:"products",label:"Collection"},
    {id:"stylist",label:"AI Stylist"},{id:"design",label:"Design Studio"},
    {id:"tryon",label:"Virtual Try-On"},{id:"about",label:"Our Story"},
  ];
  return (
    <nav style={{background:C.white,borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,zIndex:200,boxShadow:"0 1px 8px rgba(28,15,7,0.06)"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:"60px"}}>
        <button style={{background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"inherit"}} onClick={()=>setPage("home")}>
          <span style={{fontSize:"20px",fontWeight:"700",color:C.accent,fontStyle:"italic",letterSpacing:"-0.02em"}}>Batik</span>
          <span style={{fontSize:"20px",fontWeight:"300",color:C.text,letterSpacing:"0.06em"}}> Yedijah</span>
        </button>
        <div style={{display:"flex",gap:"4px",alignItems:"center"}}>
          {links.map(l=>(
            <button key={l.id} onClick={()=>setPage(l.id)}
              style={{background:page===l.id?C.accent:"transparent",color:page===l.id?C.white:C.textSub,
                border:"none",padding:"6px 13px",borderRadius:"4px",cursor:"pointer",fontSize:"12px",
                fontFamily:"inherit",fontWeight:page===l.id?"600":"400",transition:"all 0.18s",letterSpacing:"0.02em"}}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HomePage({ setPage }) {
  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#2C1A0E 0%,#5C2D0A 55%,#7A3A12 100%)",padding:"110px 24px 100px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:0.07}}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hp" x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
                <circle cx="35" cy="35" r="28" fill="none" stroke="#FDF6EC" strokeWidth="1.5"/>
                <circle cx="35" cy="35" r="16" fill="none" stroke="#FDF6EC" strokeWidth="1"/>
                <circle cx="35" cy="35" r="5" fill="#FDF6EC"/>
                <circle cx="0" cy="0" r="3" fill="#FDF6EC"/>
                <circle cx="70" cy="0" r="3" fill="#FDF6EC"/>
                <circle cx="0" cy="70" r="3" fill="#FDF6EC"/>
                <circle cx="70" cy="70" r="3" fill="#FDF6EC"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hp)"/>
          </svg>
        </div>
        <div style={{maxWidth:"860px",margin:"0 auto",textAlign:"center",position:"relative"}}>
          <div style={{marginBottom:"20px"}}><Badge color="#B8870B">Modern Batik · Bekasi, Indonesia · Est. 2010</Badge></div>
          <h1 style={{color:"#FDF6EC",fontSize:"clamp(38px,6vw,72px)",margin:"0 0 22px",fontWeight:"300",lineHeight:"1.12",fontStyle:"italic"}}>
            Wear Your Heritage.<br/>
            <span style={{fontWeight:"700",fontStyle:"normal",color:"#E8A060"}}>Own Your Style.</span>
          </h1>
          <p style={{color:"#C8A480",fontSize:"18px",maxWidth:"540px",margin:"0 auto 44px",lineHeight:"1.9",fontWeight:"300"}}>
            Modern batik for young professionals — powered by AI styling that makes Indonesian heritage feel effortless, confident, and yours.
          </p>
          <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
            <Btn onClick={()=>setPage("products")} sx={{padding:"14px 34px",fontSize:"15px"}}>Shop Collection</Btn>
            <Btn onClick={()=>setPage("stylist")} variant="ghost" sx={{padding:"14px 34px",fontSize:"15px"}}>Try AI Stylist ✦</Btn>
          </div>
        </div>
      </div>

      <Section bg={C.bg}>
        <SectionHead title="Batik Reimagined for Today" sub="15 years of family craftsmanship meets AI-powered tools no competitor offers."/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:"20px"}}>
          {[
            {icon:"🪡",title:"Modern Design",desc:"Printed batik that's office-appropriate, fashionable, and genuinely wearable — not just for ceremonies."},
            {icon:"✨",title:"AI Personal Stylist",desc:"Body type, skin tone, occasion — our AI recommends the exact batik that works for you."},
            {icon:"🎨",title:"AI Design Studio",desc:"Generate unique batik concepts combining traditional motifs with contemporary aesthetics."},
            {icon:"📸",title:"Virtual Try-On",desc:"Upload your photo and see how garments look on you before committing to buy."},
          ].map(f=>(
            <div key={f.title} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:"14px",padding:"28px 24px"}}>
              <div style={{fontSize:"30px",marginBottom:"14px"}}>{f.icon}</div>
              <h3 style={{color:C.text,margin:"0 0 10px",fontSize:"17px",fontWeight:"600"}}>{f.title}</h3>
              <p style={{color:C.textSub,fontSize:"13px",lineHeight:"1.75",margin:0}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg={C.surfaceDark}>
        <SectionHead title="Quality You Can Actually Afford" sub="We sit in the gap that no other brand owns."/>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap",maxWidth:"720px",margin:"0 auto",textAlign:"center"}}>
          {[
            {label:"Premium Handmade",range:"Rp 500K – 5M+",note:"Out of reach for daily wear",hi:false},
            {label:"✦ Batik Yedijah",range:"Rp 130K – 260K",note:"High quality · Modern · AI-powered",hi:true},
            {label:"Generic Shopee",range:"Rp 50K – 150K",note:"Inconsistent quality & sizing",hi:false},
          ].map(p=>(
            <div key={p.label} style={{flex:"1 1 180px",background:p.hi?C.accent:C.white,border:`2px solid ${p.hi?C.accent:C.border}`,borderRadius:"14px",padding:"26px 18px",transform:p.hi?"scale(1.04)":"none"}}>
              <p style={{color:p.hi?"rgba(255,255,255,0.75)":C.textMuted,fontSize:"11px",margin:"0 0 8px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.1em"}}>{p.label}</p>
              <p style={{color:p.hi?C.white:C.text,fontSize:"19px",fontWeight:"700",margin:"0 0 6px"}}>{p.range}</p>
              <p style={{color:p.hi?"rgba(255,255,255,0.7)":C.textSub,fontSize:"11px",margin:0,lineHeight:"1.5"}}>{p.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg={C.darkBg} sx={{textAlign:"center"}}>
        <SectionHead light title="Ready to Find Your Style?" sub="Let our AI stylist build the perfect batik look for your body type, skin tone, and occasion."/>
        <Btn onClick={()=>setPage("stylist")} sx={{padding:"16px 44px",fontSize:"15px"}}>Start AI Styling →</Btn>
      </Section>
    </div>
  );
}

function ProductsPage() {
  const [filter,setFilter]=useState("all");
  const shown=filter==="all"?PRODUCTS:PRODUCTS.filter(p=>p.cat===filter);
  return (
    <Section>
      <SectionHead title="Our Collection" sub="Modern printed batik — wearable, consistent quality, priced for real life."/>
      <div style={{display:"flex",gap:"10px",justifyContent:"center",marginBottom:"44px",flexWrap:"wrap"}}>
        {[["all","All Items"],["tops","Tops & Shirts"],["sets","Full Sets"]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)}
            style={{background:filter===v?C.accent:"transparent",color:filter===v?C.white:C.textSub,
              border:`1px solid ${filter===v?C.accent:C.border}`,padding:"8px 22px",borderRadius:"20px",
              cursor:"pointer",fontFamily:"inherit",fontSize:"12px",fontWeight:"600",transition:"all 0.18s",letterSpacing:"0.05em"}}>
            {l}
          </button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"24px"}}>
        {shown.map(p=>(
          <div key={p.id} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:"16px",overflow:"hidden",transition:"transform 0.2s"}}>
            <div style={{background:C.surfaceDark,height:"220px",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
              <BatikSwatch motif={p.motif} c1={p.c1} c2={p.c2} size={186}/>
              <div style={{position:"absolute",top:"14px",right:"14px"}}><Tag>{p.tag}</Tag></div>
            </div>
            <div style={{padding:"20px 22px"}}>
              <h3 style={{color:C.text,margin:"0 0 8px",fontSize:"16px",fontWeight:"600",lineHeight:"1.3"}}>{p.name}</h3>
              <p style={{color:C.textSub,fontSize:"12px",lineHeight:"1.7",margin:"0 0 18px"}}>{p.desc}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{color:C.accent,fontSize:"17px",fontWeight:"700"}}>{p.price}</span>
                <Btn sx={{padding:"7px 16px",fontSize:"11px"}}>Add to Bag</Btn>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:"48px",background:`${C.gold}14`,border:`1px solid ${C.gold}44`,borderRadius:"12px",padding:"28px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"}}>
        <div>
          <p style={{color:C.text,fontWeight:"600",margin:"0 0 4px",fontSize:"15px"}}>B2B School & Office Uniforms</p>
          <p style={{color:C.textSub,margin:0,fontSize:"13px"}}>Custom bulk orders from 50 units · Dedicated WhatsApp account manager · 3–4 week lead time</p>
        </div>
        <Btn variant="outline" sx={{padding:"9px 22px",fontSize:"12px"}}>Enquire Now →</Btn>
      </div>
    </Section>
  );
}

function StylistPage() {
  const [form,setForm]=useState({bodyType:"",skinTone:"",occasion:"",style:""});
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState(null);
  const [error,setError]=useState(null);
  const opts={
    bodyType:["Slim / Petite","Athletic / Fit","Curvy / Hourglass","Plus Size / Full Figure","Tall / Lean"],
    skinTone:["Very Fair","Fair / Light","Medium / Olive","Tan / Brown","Deep / Dark"],
    occasion:["Office / Work","Formal Event","Cultural Ceremony","Casual Daily Wear","Social Media Content"],
    style:["Modern & Minimalist","Bold & Statement","Classic & Elegant","Trendy Fusion","Traditional Inspired"],
  };
  const ready=Object.values(form).every(v=>v);

  const handleSubmit=async()=>{
    if(!ready)return;
    setLoading(true); setError(null); setResult(null);
    try {
      const r=await callClaude(`You are the AI stylist for Batik Yedijah, a modern Indonesian batik brand targeting young professionals 22-35. Our products are printed modern batik tops (Rp 130K-180K) and full sets (Rp 220K-260K) in motifs: Parang, Kawung, Mega Mendung, Truntum, Sidomukti, Lereng.

Customer: body type: ${form.bodyType}, skin tone: ${form.skinTone}, occasion: ${form.occasion}, style: ${form.style}

Return ONLY a JSON object (no markdown, no preamble):
{"greeting":"warm personalized 1-sentence opening","recommendation":"2-3 sentences on what cut/style works best","top_picks":[{"name":"product name from our range","reason":"why it suits them specifically"}],"top_picks contains exactly 3 items","colors":["color palette name 1","color palette name 2","color palette name 3"],"styling_tip":"1 specific actionable tip for their occasion","confidence_boost":"1 empowering closing sentence"}`);
      setResult(r);
    } catch(e) { setError("Couldn't connect to the AI. Please try again."); }
    setLoading(false);
  };

  return (
    <Section>
      <SectionHead title="AI Personal Stylist" sub="Share your profile and get AI-powered batik recommendations tailored to your body, skin tone, and occasion."/>
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:"40px",alignItems:"start"}}>
        <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:"16px",padding:"32px"}}>
          <p style={{color:C.textMuted,fontSize:"12px",fontWeight:"700",letterSpacing:"0.1em",textTransform:"uppercase",margin:"0 0 24px"}}>Your Profile</p>
          <SelectGroup label="Body Type" field="bodyType" opts={opts.bodyType} form={form} setForm={setForm}/>
          <SelectGroup label="Skin Tone" field="skinTone" opts={opts.skinTone} form={form} setForm={setForm}/>
          <SelectGroup label="Occasion" field="occasion" opts={opts.occasion} form={form} setForm={setForm}/>
          <SelectGroup label="Style Preference" field="style" opts={opts.style} form={form} setForm={setForm}/>
          <Btn onClick={handleSubmit} disabled={!ready||loading} sx={{width:"100%",padding:"14px",fontSize:"14px",marginTop:"8px",boxSizing:"border-box"}}>
            {loading?"Finding Your Style…":"Get My Recommendations ✦"}
          </Btn>
          {!ready && <p style={{color:C.textMuted,fontSize:"11px",textAlign:"center",margin:"10px 0 0",fontStyle:"italic"}}>Select all options above to get your recommendations</p>}
        </div>
        <div>
          {loading && <Loader text="Crafting your personal style…"/>}
          {error && <ErrorBox msg={error}/>}
          {result && (
            <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:"16px",padding:"32px"}}>
              <div style={{background:`${C.accent}0E`,borderLeft:`3px solid ${C.accent}`,padding:"16px 20px",borderRadius:"0 8px 8px 0",marginBottom:"24px"}}>
                <p style={{color:C.text,margin:0,lineHeight:"1.8",fontStyle:"italic",fontSize:"15px"}}>{result.greeting}</p>
              </div>
              <h4 style={{color:C.text,margin:"0 0 10px",fontSize:"14px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.08em"}}>Style Recommendation</h4>
              <p style={{color:C.textSub,lineHeight:"1.85",margin:"0 0 24px",fontSize:"14px"}}>{result.recommendation}</p>
              <h4 style={{color:C.text,margin:"0 0 12px",fontSize:"14px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.08em"}}>Top Picks For You</h4>
              {(result.top_picks||[]).map((p,i)=>(
                <div key={i} style={{display:"flex",gap:"12px",marginBottom:"10px",padding:"12px 14px",background:C.bg,borderRadius:"8px",border:`1px solid ${C.border}`}}>
                  <span style={{color:C.gold,fontSize:"16px",fontWeight:"700",minWidth:"22px"}}>{i+1}.</span>
                  <div>
                    <p style={{color:C.text,margin:"0 0 3px",fontWeight:"600",fontSize:"13px"}}>{p.name}</p>
                    <p style={{color:C.textSub,margin:0,fontSize:"12px",lineHeight:"1.6"}}>{p.reason}</p>
                  </div>
                </div>
              ))}
              <h4 style={{color:C.text,margin:"20px 0 10px",fontSize:"14px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.08em"}}>Best Colors For Your Skin Tone</h4>
              <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"20px"}}>
                {(result.colors||[]).map(col=><Badge key={col} color={C.gold}>{col}</Badge>)}
              </div>
              <div style={{background:`${C.gold}14`,border:`1px solid ${C.gold}44`,borderRadius:"8px",padding:"16px 18px",marginBottom:"16px"}}>
                <p style={{color:C.text,margin:"0 0 6px",fontWeight:"600",fontSize:"12px",textTransform:"uppercase",letterSpacing:"0.08em"}}>💡 Styling Tip</p>
                <p style={{color:C.textSub,margin:0,fontSize:"13px",lineHeight:"1.75"}}>{result.styling_tip}</p>
              </div>
              <p style={{color:C.accent,fontStyle:"italic",margin:0,fontSize:"14px",lineHeight:"1.7"}}>{result.confidence_boost}</p>
            </div>
          )}
          {!loading&&!result&&!error&&(
            <div style={{background:C.surfaceDark,borderRadius:"16px",padding:"60px 32px",textAlign:"center",border:`1px dashed ${C.border}`}}>
              <div style={{fontSize:"40px",marginBottom:"18px",opacity:0.5}}>✦</div>
              <h3 style={{color:C.text,margin:"0 0 10px",fontWeight:"400",fontStyle:"italic"}}>Your Style Awaits</h3>
              <p style={{color:C.textSub,fontSize:"13px",lineHeight:"1.8",margin:0}}>Complete your profile on the left and our AI will craft personalized batik recommendations just for you.</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

function DesignPage() {
  const [form,setForm]=useState({motif:"",colors:"",mood:"",use:""});
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState(null);
  const [error,setError]=useState(null);
  const opts={
    motif:["Parang (Diagonal Waves)","Kawung (Sacred Circles)","Mega Mendung (Clouds)","Truntum (Star Flowers)","Sidomukti (Royal Court)","Lereng (Diagonal Stripes)","Abstract Fusion"],
    colors:["Earth Tones (Brown, Terracotta)","Ocean Blues (Navy, Teal)","Forest Greens","Sunset Oranges & Gold","Monochrome (Black & White)","Pastels (Soft & Modern)","Jewel Tones (Rich & Bold)"],
    mood:["Modern & Minimal","Bold & Expressive","Traditional & Sacred","Playful & Youthful","Elegant & Refined"],
    use:["Office Wear","Formal Events","Cultural Ceremonies","Casual Fashion","Social Media Content"],
  };
  const ready=Object.values(form).every(v=>v);
  const svgColors=COLOR_MAP[form.colors]||["#8B4513","#D2691E"];

  const handleGenerate=async()=>{
    if(!ready)return;
    setLoading(true); setError(null); setResult(null);
    try {
      const r=await callClaude(`You are a batik design expert for Batik Yedijah, a modern Indonesian batik brand. Create a batik design concept for: motif: ${form.motif}, colors: ${form.colors}, mood: ${form.mood}, use: ${form.use}.

Return ONLY a JSON object (no markdown, no preamble):
{"design_name":"creative name (2-4 words)","tagline":"short evocative tagline max 8 words","description":"2-3 sentences on what makes this design special","motif_story":"1-2 sentences on traditional meaning/cultural origin","modern_twist":"1-2 sentences on the contemporary reinterpretation","color_story":"1-2 sentences describing palette and its emotional effect","best_worn_for":"1 specific scenario sentence","care_tip":"one practical fabric care tip","price_range":"Rp 155.000 – 245.000"}`);
      setResult(r);
    } catch(e) { setError("Generation failed. Please try again."); }
    setLoading(false);
  };

  return (
    <Section>
      <SectionHead title="AI Design Studio" sub="Generate unique batik design concepts — traditional motifs reinterpreted for modern fashion."/>
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:"40px",alignItems:"start"}}>
        <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:"16px",padding:"28px 32px"}}>
          <p style={{color:C.textMuted,fontSize:"12px",fontWeight:"700",letterSpacing:"0.1em",textTransform:"uppercase",margin:"0 0 22px"}}>Design Parameters</p>
          <SelectGroup label="Base Motif" field="motif" opts={opts.motif} form={form} setForm={setForm}/>
          <SelectGroup label="Color Palette" field="colors" opts={opts.colors} form={form} setForm={setForm}/>
          <SelectGroup label="Design Mood" field="mood" opts={opts.mood} form={form} setForm={setForm}/>
          <SelectGroup label="Intended Use" field="use" opts={opts.use} form={form} setForm={setForm}/>
          <Btn onClick={handleGenerate} disabled={!ready||loading} sx={{width:"100%",padding:"13px",fontSize:"13px",marginTop:"8px",boxSizing:"border-box"}}>
            {loading?"Generating…":"Generate Design Concept ✦"}
          </Btn>
        </div>
        <div>
          <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:"16px",padding:"24px",marginBottom:"20px",textAlign:"center"}}>
            <p style={{color:C.textMuted,fontSize:"11px",margin:"0 0 14px",textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:"700"}}>Live Pattern Preview</p>
            <div style={{display:"inline-block",padding:"16px",background:C.surfaceDark,borderRadius:"12px"}}>
              <BatikSwatch motif={MOTIF_KEY[form.motif]||"kawung"} c1={svgColors[0]} c2={svgColors[1]} size={210}/>
            </div>
            <p style={{color:C.textMuted,fontSize:"11px",margin:"12px 0 0",fontStyle:"italic"}}>Generative preview · Actual print may vary</p>
          </div>
          {loading && <Loader text="Designing your batik concept…"/>}
          {error && <ErrorBox msg={error}/>}
          {result && (
            <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:"16px",padding:"28px 32px"}}>
              <div style={{borderBottom:`1px solid ${C.border}`,paddingBottom:"16px",marginBottom:"20px"}}>
                <h3 style={{color:C.text,margin:"0 0 4px",fontSize:"22px",fontStyle:"italic",fontWeight:"400"}}>{result.design_name}</h3>
                <p style={{color:C.accent,margin:0,fontSize:"13px",fontWeight:"600",letterSpacing:"0.04em"}}>{result.tagline}</p>
              </div>
              <p style={{color:C.textSub,lineHeight:"1.85",margin:"0 0 20px",fontSize:"13px"}}>{result.description}</p>
              {[
                ["Traditional Origin",result.motif_story],
                ["Modern Reinterpretation",result.modern_twist],
                ["Color Story",result.color_story],
                ["Best Worn For",result.best_worn_for],
                ["Care",result.care_tip],
              ].map(([lbl,val])=>(
                <div key={lbl} style={{marginBottom:"12px",paddingLeft:"12px",borderLeft:`2px solid ${C.border}`}}>
                  <p style={{color:C.text,margin:"0 0 3px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.09em"}}>{lbl}</p>
                  <p style={{color:C.textSub,margin:0,fontSize:"12px",lineHeight:"1.7"}}>{val}</p>
                </div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"20px",paddingTop:"16px",borderTop:`1px solid ${C.border}`}}>
                <span style={{color:C.accent,fontWeight:"700",fontSize:"18px"}}>{result.price_range}</span>
                <Btn sx={{padding:"8px 18px",fontSize:"12px"}}>Order This Design</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

function TryOnPage() {
  const [uploaded,setUploaded]=useState(false);
  const [selected,setSelected]=useState(null);
  const fileRef=useRef();
  const sel=PRODUCTS.find(p=>p.id===selected);

  return (
    <Section>
      <SectionHead title="Virtual Try-On" sub="See exactly how batik looks on your body before buying. No more purchase anxiety."/>
      <div style={{maxWidth:"900px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"36px"}}>
          <div>
            <p style={{color:C.textMuted,fontSize:"11px",fontWeight:"700",letterSpacing:"0.1em",textTransform:"uppercase",margin:"0 0 16px"}}>Step 1 — Upload Your Photo</p>
            <div onClick={()=>fileRef.current?.click()}
              style={{border:`2px dashed ${uploaded?C.accent:C.border}`,borderRadius:"14px",padding:"44px 20px",textAlign:"center",cursor:"pointer",background:uploaded?`${C.accent}08`:C.bg,transition:"all 0.22s"}}>
              <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={()=>setUploaded(true)}/>
              {uploaded ? (
                <><div style={{fontSize:"36px",marginBottom:"10px"}}>✓</div><p style={{color:C.accent,fontWeight:"700",margin:"0 0 4px",fontSize:"15px"}}>Photo uploaded!</p><p style={{color:C.textSub,fontSize:"12px",margin:0}}>Click to replace</p></>
              ) : (
                <><div style={{fontSize:"36px",marginBottom:"10px",opacity:0.5}}>📷</div><p style={{color:C.text,fontWeight:"600",margin:"0 0 6px",fontSize:"14px"}}>Upload a photo</p><p style={{color:C.textSub,fontSize:"12px",margin:0,lineHeight:"1.6"}}>Front-facing photos work best.<br/>Your image stays private.</p></>
              )}
            </div>
            <p style={{color:C.textMuted,fontSize:"11px",fontWeight:"700",letterSpacing:"0.1em",textTransform:"uppercase",margin:"24px 0 14px"}}>Step 2 — Choose a Garment</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
              {PRODUCTS.slice(0,4).map(p=>(
                <div key={p.id} onClick={()=>setSelected(p.id)}
                  style={{border:`2px solid ${selected===p.id?C.accent:C.border}`,borderRadius:"10px",padding:"12px",cursor:"pointer",background:selected===p.id?`${C.accent}0A`:C.white,transition:"all 0.18s"}}>
                  <BatikSwatch motif={p.motif} c1={p.c1} c2={p.c2} size={64}/>
                  <p style={{color:selected===p.id?C.accent:C.text,margin:"8px 0 0",fontSize:"11px",fontWeight:"600",lineHeight:"1.3"}}>{p.name}</p>
                  <p style={{color:C.textMuted,margin:"2px 0 0",fontSize:"10px"}}>{p.price}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{color:C.textMuted,fontSize:"11px",fontWeight:"700",letterSpacing:"0.1em",textTransform:"uppercase",margin:"0 0 16px"}}>Step 3 — See the Result</p>
            <div style={{background:C.surfaceDark,borderRadius:"14px",minHeight:"340px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 20px",border:`1px solid ${C.border}`}}>
              {uploaded&&selected ? (
                <>
                  <div style={{width:"130px",height:"190px",background:C.white,borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px",border:`1px solid ${C.border}`,overflow:"hidden"}}>
                    <BatikSwatch motif={sel?.motif||"kawung"} c1={sel?.c1||"#8B1A1A"} c2={sel?.c2||"#D4A017"} size={130}/>
                  </div>
                  <p style={{color:C.text,fontWeight:"600",margin:"0 0 4px",fontSize:"14px"}}>{sel?.name}</p>
                  <p style={{color:C.accent,fontWeight:"700",margin:"0 0 14px",fontSize:"13px"}}>{sel?.price}</p>
                  <div style={{background:"#F0FDF4",border:"1px solid #86EFAC",borderRadius:"8px",padding:"12px 18px",textAlign:"center"}}>
                    <p style={{color:"#15803D",margin:"0 0 2px",fontSize:"12px",fontWeight:"700"}}>✓ Try-On Rendered</p>
                    <p style={{color:"#16A34A",margin:0,fontSize:"11px"}}>Powered by Revery.ai SDK</p>
                  </div>
                  <Btn sx={{marginTop:"16px",padding:"9px 22px",fontSize:"12px"}}>Add to Bag</Btn>
                </>
              ) : (
                <>
                  <div style={{fontSize:"48px",marginBottom:"18px",opacity:0.3}}>👗</div>
                  <p style={{color:C.textSub,fontSize:"13px",lineHeight:"1.8",margin:0,textAlign:"center",maxWidth:"220px"}}>
                    {!uploaded&&!selected?"Upload a photo and select a garment to see your try-on preview.":!uploaded?"Upload your photo first to continue.":"Now select a garment to try on."}
                  </p>
                </>
              )}
            </div>
            <div style={{marginTop:"16px",padding:"14px 18px",background:`${C.gold}14`,borderRadius:"10px",border:`1px solid ${C.gold}40`}}>
              <p style={{color:C.text,fontSize:"11px",fontWeight:"700",margin:"0 0 3px",textTransform:"uppercase",letterSpacing:"0.08em"}}>🔒 Privacy First</p>
              <p style={{color:C.textSub,fontSize:"11px",margin:0,lineHeight:"1.6"}}>Photos are processed securely in your browser session and are never stored on our servers.</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function AboutPage() {
  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#2C1A0E,#5C2D0A)",padding:"90px 24px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:0.06}}>
          <svg width="100%" height="100%"><defs><pattern id="ap" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M25 5 L35 20 L48 20 L38 30 L42 45 L25 36 L8 45 L12 30 L2 20 L15 20Z" fill="none" stroke="#FDF6EC" strokeWidth="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#ap)"/></svg>
        </div>
        <div style={{position:"relative"}}>
          <Badge color="#B8870B">Est. 2010 · Bekasi, West Java</Badge>
          <h1 style={{color:"#FDF6EC",fontSize:"clamp(34px,5vw,60px)",margin:"20px 0 16px",fontWeight:"300",fontStyle:"italic"}}>Our Story</h1>
          <p style={{color:"#C8A480",fontSize:"17px",maxWidth:"560px",margin:"0 auto",lineHeight:"1.9",fontWeight:"300"}}>15 years of batik craftsmanship, now reimagined for the modern generation by a second-generation founder.</p>
        </div>
      </div>
      <Section>
        <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.2fr) minmax(0,0.8fr)",gap:"64px",alignItems:"center"}}>
          <div>
            <h2 style={{color:C.text,fontSize:"34px",margin:"0 0 20px",fontStyle:"italic",fontWeight:"300",lineHeight:"1.25"}}>A Family Heritage Modernised</h2>
            <p style={{color:C.textSub,lineHeight:"1.9",marginBottom:"16px",fontSize:"15px"}}>Batik Yedijah was founded in Bekasi, West Java — a city at the heart of Indonesia's textile culture. The name Yedijah carries personal meaning: every design is created with a specific value or life philosophy woven into the motif.</p>
            <p style={{color:C.textSub,lineHeight:"1.9",marginBottom:"16px",fontSize:"15px"}}>What began as a family craft business has been taken forward by second-generation owner Jessica Hasan — a Fashion Design Merchandising graduate of Shih Chien University, Taipei, and current NTU GMBA candidate.</p>
            <p style={{color:C.textSub,lineHeight:"1.9",fontSize:"15px"}}>Jessica brings formal design education and graduate-level business strategy to a business built on 15 years of supplier relationships, production expertise, and authentic Indonesian heritage — now scaling into a fashion-tech brand powered by AI.</p>
            <div style={{marginTop:"28px",padding:"20px 24px",background:C.surfaceDark,borderRadius:"12px",borderLeft:`3px solid ${C.accent}`}}>
              <p style={{color:C.text,margin:"0 0 4px",fontSize:"14px",fontStyle:"italic",lineHeight:"1.7"}}>"Batik khas Bekasi — didesign dengan sebuah makna dan nilai nilai kehidupan dalam setiap motifnya."</p>
              <p style={{color:C.textMuted,margin:0,fontSize:"12px"}}>Bekasi's signature batik — designed with meaning and life values in every motif.</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
            {[["15+","Years of Heritage"],["4,000+","Instagram Followers"],["400+","Units/Month"],["Rp 300M","Cash On Hand"],["500–800","Ready Garments"],["30+","Fabric Rolls"]].map(([n,l])=>(
              <div key={l} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"20px 16px",textAlign:"center"}}>
                <p style={{color:C.accent,fontSize:"22px",fontWeight:"700",margin:"0 0 4px",fontStyle:"italic"}}>{n}</p>
                <p style={{color:C.textSub,fontSize:"11px",margin:0,lineHeight:"1.4"}}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section bg={C.surfaceDark}>
        <SectionHead title="The AI Advantage" sub="No other batik brand is integrating AI at this level. This is what makes Batik Yedijah different."/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"20px"}}>
          {[
            {phase:"Priority 1",title:"AI Personal Stylist",desc:"Customers input body type, skin tone, and occasion. AI recommends designs, colors, and outfit combinations. Removes the #1 purchase barrier.",status:"Live Now"},
            {phase:"Priority 2",title:"AI Virtual Try-On",desc:"Upload a photo and see the garment on your body before purchasing. Solves the biggest online fashion pain point.",status:"Beta"},
            {phase:"Priority 3",title:"AI Design Generator",desc:"Generate new batik patterns blending traditional motifs with contemporary aesthetics. Live on this platform.",status:"Live Now"},
            {phase:"Priority 4",title:"AI Trend Predictor",desc:"Analyzes fashion trends and customer behavior to predict which designs will sell. Reduces unsold inventory.",status:"Year 3"},
          ].map(f=>(
            <div key={f.title} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:"14px",padding:"24px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
                <Tag>{f.phase}</Tag>
                <span style={{fontSize:"10px",fontWeight:"700",padding:"3px 9px",borderRadius:"20px",letterSpacing:"0.08em",textTransform:"uppercase",background:f.status==="Live Now"?"#F0FDF4":f.status==="Beta"?"#FFF7ED":"#F5F3FF",color:f.status==="Live Now"?"#15803D":f.status==="Beta"?"#C2410C":"#6D28D9"}}>{f.status}</span>
              </div>
              <h3 style={{color:C.text,margin:"0 0 8px",fontSize:"16px",fontWeight:"600"}}>{f.title}</h3>
              <p style={{color:C.textSub,fontSize:"13px",lineHeight:"1.7",margin:0}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Footer({ setPage }) {
  const links=[["products","Collection"],["stylist","AI Stylist"],["design","Design Studio"],["tryon","Virtual Try-On"],["about","Our Story"]];
  return (
    <footer style={{background:C.darkBg,color:"#9A7B6A",padding:"56px 24px 28px"}}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:"48px",marginBottom:"40px",flexWrap:"wrap"}}>
          <div>
            <div style={{marginBottom:"16px"}}>
              <span style={{fontSize:"20px",fontWeight:"700",color:"#FDF6EC",fontStyle:"italic"}}>Batik</span>
              <span style={{fontSize:"20px",fontWeight:"300",color:"#FDF6EC",letterSpacing:"0.06em"}}> Yedijah</span>
            </div>
            <p style={{fontSize:"13px",lineHeight:"1.85",color:"#7A5A4A",maxWidth:"260px",margin:"0 0 14px"}}>Modern batik for the modern generation. Powered by family heritage and AI innovation.</p>
            <p style={{fontSize:"12px",color:"#5A3A2A",margin:0}}>@batikyedijah · Shopee · Tokopedia · Bekasi, Indonesia</p>
          </div>
          <div>
            <p style={{color:"#FDF6EC",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.12em",margin:"0 0 18px",fontWeight:"700"}}>Explore</p>
            {links.map(([id,lbl])=>(
              <button key={id} onClick={()=>setPage(id)} style={{display:"block",background:"none",border:"none",color:"#7A5A4A",cursor:"pointer",fontFamily:"inherit",fontSize:"13px",padding:"4px 0",textAlign:"left",transition:"color 0.15s"}}>{lbl}</button>
            ))}
          </div>
          <div>
            <p style={{color:"#FDF6EC",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.12em",margin:"0 0 18px",fontWeight:"700"}}>AI Features</p>
            {["AI Personal Stylist","AI Design Studio","Virtual Try-On","AI Trend Predictor"].map(f=>(
              <p key={f} style={{color:"#7A5A4A",fontSize:"13px",margin:"0 0 6px"}}>{f}</p>
            ))}
          </div>
        </div>
        <div style={{borderTop:"1px solid #2E1A0E",paddingTop:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px"}}>
          <p style={{margin:0,fontSize:"11px",color:"#4A2A1A"}}>© 2026 Batik Yedijah · Jessica Hasan · @batikyedijah</p>
          <p style={{margin:0,fontSize:"11px",color:"#4A2A1A"}}>AI-powered by Claude · Anthropic API</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page,setPage]=useState("home");
  return (
    <div style={{fontFamily:"'Georgia','Times New Roman',serif",background:C.bg,minHeight:"100vh"}}>
      <NavBar page={page} setPage={setPage}/>
      {page==="home"&&<HomePage setPage={setPage}/>}
      {page==="products"&&<ProductsPage/>}
      {page==="stylist"&&<StylistPage/>}
      {page==="design"&&<DesignPage/>}
      {page==="tryon"&&<TryOnPage/>}
      {page==="about"&&<AboutPage/>}
      <Footer setPage={setPage}/>
    </div>
  );
}
