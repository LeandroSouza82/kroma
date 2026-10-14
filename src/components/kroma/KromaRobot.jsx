import { useId } from "react";

// Articulated vector artwork: each animated part keeps its own pivot.
export default function KromaRobot() {
  const id = useId().replace(/:/g, "");
  return <svg className="kroma-robot" viewBox="0 0 180 210" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-shell`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset=".5" stopColor="#e9f3ff"/><stop offset="1" stopColor="#91add3"/></linearGradient>
      <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#68c9ff"/><stop offset=".5" stopColor="#2563eb"/><stop offset="1" stopColor="#153c96"/></linearGradient>
      <radialGradient id={`${id}-face`}><stop stopColor="#163f67"/><stop offset="1" stopColor="#071528"/></radialGradient>
    </defs>
    <ellipse cx="90" cy="198" rx="43" ry="7" fill="#071528" opacity=".2"/>
    <g className="kroma-body">
      <g className="kroma-feet" fill={`url(#${id}-blue)`}><rect x="58" y="166" width="24" height="24" rx="9"/><rect x="98" y="166" width="24" height="24" rx="9"/><path d="M51 181q0-7 13-7h15q8 0 8 11v5H51zM94 185q0-11 8-11h15q13 0 13 7v9H94z" fill={`url(#${id}-shell)`}/></g>
      <rect x="56" y="111" width="69" height="65" rx="27" fill={`url(#${id}-shell)`} stroke="#7191ba" strokeWidth="1.5"/>
      <path d="M72 125q18-9 36 0v29q-18 12-36 0z" fill={`url(#${id}-blue)`}/><path d="M84 134v16m0-8 10-8m-10 8 11 9" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="90" cy="163" r="3" fill="#68e6c2"/>
      <g className="kroma-arm-left" fill={`url(#${id}-shell)`} stroke="#7191ba"><rect x="35" y="117" width="20" height="43" rx="10" transform="rotate(12 45 120)"/><circle cx="39" cy="160" r="11"/></g>
      <g className="kroma-arm-right" fill={`url(#${id}-shell)`} stroke="#7191ba"><rect x="126" y="117" width="20" height="43" rx="10" transform="rotate(-12 136 120)"/><circle cx="142" cy="160" r="11"/></g>
      <g className="kroma-head">
        <path d="M90 31V17" stroke="#91add3" strokeWidth="5" strokeLinecap="round"/><circle cx="90" cy="14" r="7" fill={`url(#${id}-blue)`}/>
        <rect x="30" y="58" width="15" height="31" rx="7" fill={`url(#${id}-blue)`}/><rect x="135" y="58" width="15" height="31" rx="7" fill={`url(#${id}-blue)`}/>
        <rect x="39" y="31" width="102" height="82" rx="32" fill={`url(#${id}-shell)`} stroke="#8ea9ce" strokeWidth="1.5"/>
        <rect x="49" y="44" width="82" height="55" rx="22" fill={`url(#${id}-face)`}/>
        <path d="M58 50q30-8 58 0" stroke="#fff" strokeOpacity=".15" strokeWidth="3" fill="none"/>
        <g className="kroma-eyes" fill="#80e5ff"><rect x="64" y="60" width="12" height="19" rx="6"/><rect x="104" y="60" width="12" height="19" rx="6"/></g>
        <path d="M82 85q8 8 16 0" stroke="#80e5ff" strokeWidth="3" strokeLinecap="round" fill="none"/>
      </g>
    </g>
  </svg>;
}
