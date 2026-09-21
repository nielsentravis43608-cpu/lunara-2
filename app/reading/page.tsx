"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, scoreAnswers, EnergyKey } from "../../lib/lunara-energy";

export default function ReadingPage(){
 const router=useRouter(); const [index,setIndex]=useState(0); const [answers,setAnswers]=useState<string[]>([]); const [selected,setSelected]=useState("");
 const q=QUESTIONS[index];
 function choose(key:string){setSelected(key);}
 function next(){if(!selected)return; const nextAnswers=[...answers,selected]; if(index<QUESTIONS.length-1){setAnswers(nextAnswers);setSelected("");setIndex(index+1);return;} const result=scoreAnswers(nextAnswers); sessionStorage.setItem("lunara-energy-reading",JSON.stringify({answers:nextAnswers,...result,completedAt:new Date().toISOString()})); router.push("/reading/result");}
 return <main className="immersive-quiz"><header className="nav shell"><Link className="brand" href="/">LUNARA</Link><span className="quiz-count">{String(index+1).padStart(2,"0")} / {String(QUESTIONS.length).padStart(2,"0")}</span><Link className="back-link" href="/">Exit</Link></header><div className="quiz-stage shell"><div className="quiz-progress"><span style={{width:`${((index+1)/QUESTIONS.length)*100}%`}}/></div><div className="quiz-question"><p className="eyebrow">QUESTION {index+1}</p><h1>{q.q}</h1><p className="quiz-note">Choose the answer that feels closest. There is no right answer.</p><div className="big-choices">{q.options.map(([label,key])=><button type="button" key={key} className={selected===key?"big-choice active":"big-choice"} onClick={()=>choose(key as EnergyKey)}><span>{label}</span><i>↗</i></button>)}</div><button className="button button-dark quiz-next" disabled={!selected} onClick={next}>{index===QUESTIONS.length-1?"Reveal my full reading →":"Continue →"}</button><p className="micro">For reflection & entertainment. Your answers are processed to create your reading.</p></div><div className="quiz-symbol"><span>✦</span></div></div></main>
}
