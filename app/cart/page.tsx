 "use client";
import Link from "next/link";
import { useEffect,useState } from "react";
import { crystals } from "../../lib/lunara";

export default function Cart(){
 const [item,setItem]=useState<typeof crystals[number]|null>(null); const [qty,setQty]=useState(1);
 useEffect(()=>{const raw=localStorage.getItem("lunara-cart"); if(raw){try{const x=JSON.parse(raw);setItem(crystals.find(c=>c.slug===x.slug)||null);setQty(x.qty||1)}catch{}}},[]);
 function sync(n:number){setQty(n);if(item)localStorage.setItem("lunara-cart",JSON.stringify({slug:item.slug,qty:n}))}
 const total=item?item.price*qty:0;
 return <main><header className="nav shell"><Link className="brand" href="/">LUNARA</Link><Link href="/shop">← Continue shopping</Link></header>
 <section className="cart shell"><p className="eyebrow">YOUR RITUAL</p><h1>Cart</h1>{!item?<div className="empty-card"><h2>Your ritual is still open.</h2><p>Choose a crystal to continue.</p><Link className="button button-dark" href="/shop">Explore the crystal edit →</Link></div>:<div className="cart-layout"><div className="cart-item"><div className="cart-art photo-art"><img src={item.image} alt={`${item.name} crystal`} /></div><div><h2>{item.name}</h2><p>{item.tagline}</p><div className="qty"><button onClick={()=>sync(Math.max(1,qty-1))}>−</button><span>{qty}</span><button onClick={()=>sync(qty+1)}>+</button></div></div><strong>${item.price*qty}</strong></div><aside className="summary"><span>SUMMARY</span><div><p>Subtotal</p><b>${total}</b></div><div><p>Shipping</p><b>Calculated at checkout</b></div><div className="summary-total"><p>Total</p><b>${total}</b></div><Link className="button button-dark full" href="/checkout">Continue to checkout →</Link></aside></div>}</section></main>;
}