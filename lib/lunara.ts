export type Goal = "Love" | "Career" | "Abundance" | "Inner peace";
export type Mood = "Restless" | "Uncertain" | "Hopeful" | "Drained" | "Open";
export type Element = "Fire" | "Water" | "Earth" | "Air" | "Wood" | "Metal";

export type Crystal = {
  slug:string; name:string; element:Element; secondaryElement?:Element; price:number;
  tagline:string; description:string; benefit:string; symbol:string; image:string;
};

const existingImages={
  carnelian:"https://cdn.shopify.com/s/files/1/0703/0849/5438/files/Lucid_Origin_exquisite_high_fashion_photography_of_a_wide_brig_0_2.jpg?v=1764000790",
  amethyst:"https://northernskycrystals.com.au/cdn/shop/files/NS_Amethyst_Cluster_207g_4.png?v=1784842038&width=1254",
  tiger:"https://images.squarespace-cdn.com/content/v1/5f44bda0af5325752c600753/1676394250910-ON01ESOMFI98YO1E12PL/tigerauge-trommelstein.jpg?format=1000w",
  clear:"https://www.hanakotherapies.com/cdn/shop/products/ClearQuartzSmall.png?v=1636680465"
};

export const crystals:Crystal[]=[
 {slug:"carnelian",name:"Carnelian",element:"Fire",secondaryElement:"Wood",price:48,tagline:"For courage, movement & creative fire.",description:"A warm, energizing stone for moments when you are ready to move from hesitation into action.",benefit:"Courage · Momentum · Creativity",symbol:"◈",image:existingImages.carnelian},
 {slug:"amethyst",name:"Amethyst",element:"Water",secondaryElement:"Metal",price:54,tagline:"For intuition, softness & inner clarity.",description:"A quiet violet companion for reflection, emotional spaciousness and a calmer inner rhythm.",benefit:"Intuition · Calm · Reflection",symbol:"☾",image:existingImages.amethyst},
 {slug:"tiger-eye",name:"Tiger's Eye",element:"Earth",secondaryElement:"Fire",price:52,tagline:"For grounded confidence & steady focus.",description:"A grounding stone for building confidence without rushing the process.",benefit:"Grounding · Focus · Confidence",symbol:"◎",image:existingImages.tiger},
 {slug:"clear-quartz",name:"Clear Quartz",element:"Metal",secondaryElement:"Air",price:44,tagline:"For clarity, intention & fresh perspective.",description:"A luminous classic for clearing mental noise and returning to a simple intention.",benefit:"Clarity · Intention · Perspective",symbol:"✦",image:existingImages.clear},
 {slug:"rose-quartz",name:"Rose Quartz",element:"Water",secondaryElement:"Wood",price:46,tagline:"For tenderness, connection & self-kindness.",description:"A soft pink stone used as a symbolic reminder of compassion, openness and meaningful connection.",benefit:"Love · Softness · Connection",symbol:"♡",image:existingImages.amethyst},
 {slug:"citrine",name:"Citrine",element:"Earth",secondaryElement:"Fire",price:58,tagline:"For abundance, confidence & forward motion.",description:"A golden companion for intentions around opportunity, confidence and building something sustainable.",benefit:"Abundance · Confidence · Action",symbol:"✧",image:existingImages.carnelian},
 {slug:"green-phantom",name:"Green Phantom Quartz",element:"Wood",secondaryElement:"Earth",price:62,tagline:"For growth, renewal & possibility.",description:"A symbolic companion for new chapters, steady growth and making space for possibility.",benefit:"Growth · Renewal · Opportunity",symbol:"❋",image:existingImages.tiger},
 {slug:"black-obsidian",name:"Black Obsidian",element:"Water",secondaryElement:"Earth",price:42,tagline:"For grounding, boundaries & quiet protection.",description:"A dark volcanic glass traditionally carried as a symbolic talisman for grounding and boundaries.",benefit:"Protection · Grounding · Boundaries",symbol:"◆",image:existingImages.clear},
 {slug:"white-agate",name:"White Agate",element:"Metal",secondaryElement:"Earth",price:45,tagline:"For composure, clarity & gentle balance.",description:"A pale stone chosen as a visual anchor for calm attention and a more ordered inner rhythm.",benefit:"Clarity · Balance · Composure",symbol:"○",image:existingImages.clear},
 {slug:"lapis-lazuli",name:"Lapis Lazuli",element:"Metal",secondaryElement:"Water",price:56,tagline:"For truth, insight & thoughtful expression.",description:"A deep blue stone with a long history of adornment, used here as a symbolic prompt for clear expression.",benefit:"Insight · Expression · Intention",symbol:"✺",image:existingImages.amethyst}
];

const elementCopy:Record<Element,{title:string;subtitle:string;strengths:string;block:string;balance:string;theme:string}>={
 Wood:{title:"The Growing Path",subtitle:"Your season is asking for movement with roots.",strengths:"Renewal, curiosity and the patience to build something alive.",block:"Growth can feel uncomfortable when the old shape no longer fits.",balance:"Choose one small experiment. Let progress be organic rather than perfect.",theme:"Growth · Renewal · Possibility"},
 Fire:{title:"The Spark",subtitle:"You are moving through a season of activation.",strengths:"Initiative, courage and the ability to create momentum.",block:"You may be trying to force clarity before it has had time to arrive.",balance:"Choose one small action you can complete today. Let movement create the next answer.",theme:"Passion · Confidence · Expression"},
 Earth:{title:"The Root",subtitle:"You are seeking something real, stable and lasting.",strengths:"Patience, discernment and the ability to build steadily.",block:"Security can become a reason to stay still after the season has already changed.",balance:"Protect your foundation, but leave one door open for a new possibility.",theme:"Stability · Abundance · Grounding"},
 Metal:{title:"The Clear Edge",subtitle:"Your inner world is asking for clarity and intention.",strengths:"Discernment, focus and the ability to simplify what matters.",block:"Perfect clarity can become another form of postponing a decision.",balance:"Name the essential thing. Remove one distraction and take the next clean step.",theme:"Clarity · Focus · Intention"},
 Water:{title:"The Tide",subtitle:"Your inner world is asking to be heard.",strengths:"Intuition, empathy and sensitivity to what feels aligned.",block:"You may be absorbing too much from people or situations around you.",balance:"Create a little emotional distance. What is yours to carry, and what can be returned?",theme:"Intuition · Emotion · Protection"},
 Air:{title:"The Clear Sky",subtitle:"Your mind is searching for a cleaner perspective.",strengths:"Curiosity, pattern recognition and an ability to see alternatives.",block:"Thinking may be replacing deciding.",balance:"Name the decision in one sentence. Then choose the next reversible step.",theme:"Perspective · Curiosity · Choice"}
};

export function inferElement(goal:Goal,mood:Mood,birthYear:number):Element{
 if(goal==="Love"||mood==="Open") return "Water";
 if(goal==="Career"||mood==="Restless") return "Fire";
 if(goal==="Abundance"||mood==="Drained") return "Earth";
 return ["Air","Wood","Metal","Earth"][birthYear%4] as Element;
}
export function getProfile(element:Element){return elementCopy[element];}
export function getCrystal(element:Element){return crystals.find(c=>c.element===element)||crystals[0];}
export function getCrystalImage(slug:string){return crystals.find(c=>c.slug===slug)?.image||crystals[0].image;}
export type ReadingState={name:string;birthDate:string;goal:Goal;mood:Mood;intention:string;element:Element;crystal:Crystal};
export function saveReading(data:ReadingState){if(typeof window!=="undefined")localStorage.setItem("lunara-reading",JSON.stringify(data));}
export function loadReading():ReadingState|null{if(typeof window==="undefined")return null;const raw=localStorage.getItem("lunara-reading");if(!raw)return null;try{return JSON.parse(raw) as ReadingState}catch{return null}}
