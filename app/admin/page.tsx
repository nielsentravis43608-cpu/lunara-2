"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Order={id:string;email:string;name:string;address:string;city:string;postalCode:string;country:string;slug:string;product:string;qty:number;total:number;currency:string;status:string;createdAt:string};
type Lead={id:string;email:string;whatsapp:string;name:string;dominant:string;secondary:string;readingTitle:string;recommendedCrystals:string[];source:string;utmSource:string;utmCampaign:string;testCompletedAt:string;updatedAt?:string;status:string};

export default function Admin(){
 const router=useRouter();
 const [leads,setLeads]=useState<Lead[]>([]);
 const [orders,setOrders]=useState<Order[]>([]);
 const [q,setQ]=useState("");
 const [loading,setLoading]=useState(true);
 const [lastSync,setLastSync]=useState("");
 const [error,setError]=useState("");

 const load=useCallback(async()=>{
   setLoading(true); setError("");
   try{
     // Timestamp prevents any browser/proxy from reusing an old GET response.
     const r=await fetch(`/api/leads?ts=${Date.now()}`,{cache:"no-store",headers:{"Cache-Control":"no-cache"}});
     if(!r.ok) throw new Error(`HTTP ${r.status}`);
     const payload=await r.json();
     const next=Array.isArray(payload)?payload:payload.leads;
     setLeads(Array.isArray(next)?next:[]);
     const or=await fetch(`/api/orders?ts=${Date.now()}`,{cache:"no-store"});
     if(or.ok){const op=await or.json();setOrders(Array.isArray(op.orders)?op.orders:[])}
     setLastSync(new Date().toLocaleTimeString());
   }catch(e){
     console.error(e);
     setError("Unable to load customer data. Check that the LUNARA server is running.");
   }finally{setLoading(false)}
 },[]);

 useEffect(()=>{
   load();
   const onFocus=()=>load();
   const onVisible=()=>{if(document.visibilityState==="visible") load()};
   window.addEventListener("focus",onFocus);
   document.addEventListener("visibilitychange",onVisible);
   return()=>{window.removeEventListener("focus",onFocus);document.removeEventListener("visibilitychange",onVisible)};
 },[load]);

 const filtered=useMemo(()=>leads.filter(x=>JSON.stringify(x).toLowerCase().includes(q.toLowerCase())),[leads,q]);
 return <main><header className="nav shell"><Link className="brand" href="/">LUNARA</Link><nav><Link href="/shop">Shop</Link><Link href="/reading">Reading</Link><button className="nav-logout" onClick={async()=>{await fetch("/api/admin/logout",{method:"POST"});router.push("/")}}>Exit</button></nav></header>
 <section className="admin shell"><div className="admin-head"><div><p className="eyebrow">PRIVATE CUSTOMER CENTER</p><h1>Leads & readings.</h1><p>For MVP testing only. Customer data is stored server-side in the local project store. This page is protected for admin use only.</p>{lastSync&&<p className="micro">Last synced: {lastSync}</p>}</div><button className="button button-dark" onClick={load} disabled={loading}>{loading?"Refreshing…":"Refresh"}</button></div>
 {error&&<div className="admin-error">{error}</div>}
 <div className="admin-stats"><div><b>{leads.length}</b><span>Total leads</span></div><div><b>{leads.filter(x=>x.email).length}</b><span>Email</span></div><div><b>{leads.filter(x=>x.whatsapp).length}</b><span>WhatsApp</span></div><div><b>{orders.length}</b><span>Orders</span></div></div>
 <input className="admin-search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name, email, WhatsApp, energy..."/>
 <div className="admin-table-wrap">{loading?<p>Loading…</p>:filtered.length===0?<p>No leads yet. Complete a reading and submit an email or WhatsApp number.</p>:<table><thead><tr><th>Customer</th><th>Contact</th><th>Energy</th><th>Reading</th><th>Source</th><th>Time</th><th>Status</th></tr></thead><tbody>{filtered.map(x=><tr key={x.id}><td><strong>{x.name||"Guest"}</strong><small>{x.id.slice(0,8)}</small></td><td><span>{x.email||"—"}</span><small>{x.whatsapp||"—"}</small></td><td>{x.dominant}{x.secondary?` + ${x.secondary}`:""}</td><td>{x.readingTitle}<small>{x.recommendedCrystals?.join(" · ")}</small></td><td>{x.utmSource||x.source||"direct"}</td><td>{new Date(x.testCompletedAt).toLocaleString()}</td><td><span className="status-pill">{x.status}</span></td></tr>)}</tbody></table>}</div>
 <section className="admin-orders"><div className="admin-head"><div><p className="eyebrow">ORDERS</p><h2>Recent orders.</h2></div></div><div className="admin-table-wrap">{orders.length===0?<p>No orders yet.</p>:<table><thead><tr><th>Order</th><th>Customer</th><th>Product</th><th>Total</th><th>Status</th><th>Time</th></tr></thead><tbody>{orders.map(o=><tr key={o.id}><td><strong>{o.id}</strong></td><td>{o.name}<small>{o.email}</small></td><td>{o.product}<small>Qty {o.qty}</small></td><td>${o.total.toFixed(2)}</td><td><span className="status-pill">{o.status}</span></td><td>{new Date(o.createdAt).toLocaleString()}</td></tr>)}</tbody></table>}</div></section>
 <p className="micro admin-note">Production note: replace the local store with Supabase/Postgres before public launch and set a strong LUNARA_ADMIN_PASSWORD.</p>
 </section></main>
}
