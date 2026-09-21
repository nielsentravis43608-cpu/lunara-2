import Link from "next/link";
import { crystals } from "../../lib/lunara";

export default function Shop() {
  return <main><header className="nav shell"><Link className="brand" href="/">LUNARA</Link><nav><Link href="/reading">Your reading</Link><Link className="nav-cta" href="/cart">Cart</Link></nav></header>
    <section className="shop-head shell"><p className="eyebrow">THE LUNARA SHOP</p><h1>Choose what supports your ritual.</h1><p>A small, intentional collection mapped to the Five Elements and the themes you want to carry forward.</p></section>
    <section className="section shell"><div className="product-grid shop-grid">{crystals.map(c=><Link className="product-card" key={c.slug} href={`/product/${c.slug}`}><div className="product-art photo-art"><img src={c.image} alt={`${c.name} crystal`} /><small>{c.element}</small></div><div className="product-meta"><div><h3>{c.name}</h3><p>{c.tagline}</p></div><strong>${c.price}</strong></div></Link>)}</div></section>
  </main>;
}