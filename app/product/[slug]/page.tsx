"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { crystals } from "../../../lib/lunara";
import { useState } from "react";

export default function ProductPage() {
  const params=useParams(); const router=useRouter(); const slug=String(params.slug);
  const product=crystals.find(c=>c.slug===slug);
  const [added,setAdded]=useState(false);
  if(!product) return <main className="empty shell"><h1>Product not found.</h1><Link href="/shop">Back to shop</Link></main>;
  const productSlug = product.slug;
  function add(){localStorage.setItem("lunara-cart",JSON.stringify({slug:productSlug,qty:1}));setAdded(true);}
  return <main><header className="nav shell"><Link className="brand" href="/">LUNARA</Link><nav><Link href="/shop">Shop</Link><Link className="nav-cta" href="/cart">Cart</Link></nav></header>
    <section className="product-detail shell">
      <div className="detail-gallery">
        <div className="detail-photo"><img src={product.image} alt={`${product.name} crystal`} /><span>{product.element} · LUNARA</span></div>
        <div className="detail-thumb-row"><div className="detail-thumb active"><img src={product.image} alt=""/></div><div className={`detail-thumb element-${product.element.toLowerCase()}`}><span>{product.symbol}</span></div><div className="detail-thumb texture"><span>✦</span></div></div>
      </div>
      <div className="detail-copy"><p className="eyebrow">PERSONAL RITUAL · {product.element.toUpperCase()}</p><h1>{product.name}</h1><p className="tagline">{product.tagline}</p><div className="rating">★★★★★ <span>4.9 · LUNARA ritual collection</span></div><div className="detail-price">${product.price}</div><p>{product.description}</p><div className="benefit-chips">{product.benefit.split(" · ").map(x=><span key={x}>{x}</span>)}</div><div className="personal-note"><small>WHY THIS MAY RESONATE</small><p>Selected from the LUNARA collection as a symbolic companion for {product.element.toLowerCase()} energy — a physical reminder of the intention you chose.</p></div><button className="button button-dark full" onClick={()=>{add();router.push("/cart")}}>{added?"Added — view cart →":"Add to ritual · $"+product.price}</button><p className="micro">Free reflection guide included · Ships in 2–4 business days · Tracked delivery</p></div>
    </section>
    <section className="trust-strip"><div className="shell trust-grid"><div><b>Natural stone</b><span>Each piece is naturally unique.</span></div><div><b>Thoughtfully packed</b><span>Prepared as a quiet ritual object.</span></div><div><b>30-day returns</b><span>Simple returns on eligible items.</span></div></div></section>
    <section className="product-story shell"><div><p className="eyebrow">A LITTLE MORE</p><h2>Made to become a physical reminder.</h2></div><div><p>There is no single correct way to use a crystal. Place it beside your journal, hold it during a few slow breaths, or simply keep it somewhere you will see it when you need your intention again.</p><p className="micro">LUNARA presents crystals as symbolic wellness objects for reflection and personal ritual. We do not make medical claims.</p></div></section>
    <section className="faq shell"><p className="eyebrow">QUESTIONS</p><div className="faq-grid"><details open><summary>How will my crystal look?</summary><p>Natural stones vary in color, shape and inclusions. Your piece will have the character of a natural mineral rather than a factory-perfect object.</p></details><details><summary>When will it ship?</summary><p>Demo estimate: 2–4 business days before tracked delivery. Final shipping options should be connected to your fulfillment partner before launch.</p></details><details><summary>Can I return it?</summary><p>The prototype assumes a 30-day return policy for eligible unused items. Confirm the final policy, destinations and exclusions before launch.</p></details></div></section>
  </main>;
}
