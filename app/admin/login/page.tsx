"use client";
import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm(){
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const router=useRouter();
  const search=useSearchParams();

  async function submit(e:FormEvent){
    e.preventDefault();
    setError("");
    const r=await fetch("/api/admin/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({password})
    });
    if(!r.ok){setError("Incorrect password.");return}
    router.push(search.get("next")||"/admin");
  }

  return <main className="admin-login">
    <div className="admin-login-card">
      <Link className="brand" href="/">LUNARA</Link>
      <p className="eyebrow">PRIVATE CUSTOMER CENTER</p>
      <h1>Welcome back.</h1>
      <p>Admin access only. Customer data is not available to ordinary visitors.</p>
      <form onSubmit={submit}>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Admin password" autoFocus/>
        <button className="button button-dark full">Enter customer center →</button>
        {error&&<small>{error}</small>}
      </form>
      <p className="micro">Local demo password: LUNARA-LOCAL-2026 · Change <code>LUNARA_ADMIN_PASSWORD</code> before production.</p>
    </div>
  </main>
}

export default function Login(){
  return <Suspense fallback={<main className="admin-login"><div className="admin-login-card"><p>Loading…</p></div></main>}><LoginForm/></Suspense>;
}
