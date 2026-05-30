import { useState } from "react";

// ─── Design System ───────────────────────────────────────────────────
// bg:       #FFFFFF
// surface:  #F7F7F8   (card bg)
// border:   #EBEBEC   (hairline)
// text:     #111111
// muted:    #6B6B6B
// faint:    #ADADAD
// shadow:   0 2px 12px rgba(0,0,0,0.07)
// shadow-lg:0 8px 32px rgba(0,0,0,0.10)
// radius:   12px cards, 8px small, 999px pills
// font:     -apple-system, system-ui (SF Pro feel)

// ─── Dados ──────────────────────────────────────────────────────────
const SEASONS = [
  {
    id:1, title:"A Corte de Espinhos e Rosas", author:"Sarah J. Maas",
    genre:"romantasy", tropes:["enemies-to-lovers","slow burn"], status:"ativa",
    startDate:"2 jun", endDate:"25 ago", totalChapters:10,
    readers:1243, comments:4802, progress:40,
    description:"Uma caçadora humana entra no mundo dos fae e descobre que os limites entre amor e ódio são mais tênues do que imagina.",
    accent:"#C0392B", accentBg:"#FEF2F2",
    coverA:"#7B1A10", coverB:"#C0392B",
    chapters:[
      {id:1,title:"Capítulo 1",subtitle:"A caçada",read:true},
      {id:2,title:"Capítulo 2",subtitle:"O cervo branco",read:true},
      {id:3,title:"Capítulo 3",subtitle:"A fera",read:true},
      {id:4,title:"Capítulo 4",subtitle:"Prythian",read:true},
      {id:5,title:"Capítulo 5",subtitle:"A mansão de Tamlin",read:false},
      {id:6,title:"Capítulo 6",subtitle:"Segredos do Spring Court",read:false},
      {id:7,title:"Capítulo 7",subtitle:"A máscara de ouro",read:false},
      {id:8,title:"Capítulo 8",subtitle:"O jardim proibido",read:false},
      {id:9,title:"Capítulo 9",subtitle:"Lucien",read:false},
      {id:10,title:"Capítulo 10",subtitle:"A festa de Calanmai",read:false},
    ],
  },
  {
    id:2, title:"O Nome do Vento", author:"Patrick Rothfuss",
    genre:"fantasia", tropes:["slow burn","chosen one"], status:"ativa",
    startDate:"12 mai", endDate:"10 ago", totalChapters:8,
    readers:876, comments:3190, progress:78,
    description:"A história de Kvothe, o lendário mago, contada por ele mesmo — três dias, três livros, uma vida extraordinária.",
    accent:"#1D6FA4", accentBg:"#EFF6FF",
    coverA:"#0D3A5C", coverB:"#1D6FA4",
    chapters:[
      {id:1,title:"Capítulo 1",subtitle:"Um silêncio de três partes",read:true},
      {id:2,title:"Capítulo 2",subtitle:"Uma pedra bonita",read:true},
      {id:3,title:"Capítulo 3",subtitle:"O nascimento da lenda",read:false},
      {id:4,title:"Capítulo 4",subtitle:"A Universidade",read:false},
      {id:5,title:"Capítulo 5",subtitle:"Arco e corda",read:false},
      {id:6,title:"Capítulo 6",subtitle:"Encanamentos",read:false},
      {id:7,title:"Capítulo 7",subtitle:"O nome do vento",read:false},
      {id:8,title:"Capítulo 8",subtitle:"A música de Kvothe",read:false},
    ],
  },
  {
    id:3, title:"Filha da Lua Vermelha", author:"Xiran Jay Zhao",
    genre:"romantasy", tropes:["enemies-to-lovers","second chance"], status:"futura",
    startDate:"1 jul", endDate:"20 set", totalChapters:8,
    readers:589, comments:0, progress:0,
    description:"Uma pilota de robô gigante descobre que seu copiloto secreto é o fantasma do imperador que ela deveria odiar.",
    accent:"#9B1D6A", accentBg:"#FDF2F8",
    coverA:"#4A0D32", coverB:"#9B1D6A",
    chapters:Array.from({length:8},(_,i)=>({id:i+1,title:`Capítulo ${i+1}`,subtitle:"Em breve",read:false})),
  },
  {
    id:4, title:"As Brumas de Avalon", author:"Marion Zimmer Bradley",
    genre:"fantasia", tropes:["slow burn"], status:"encerrada",
    startDate:"10 fev", endDate:"10 mai", totalChapters:8,
    readers:2107, comments:8930, progress:100,
    description:"A lenda arturiana recontada pelos olhos das mulheres — Morgaine, Guinevere e as sacerdotisas de Avalon.",
    accent:"#2D7A3E", accentBg:"#F0FDF4",
    coverA:"#163D1F", coverB:"#2D7A3E",
    chapters:Array.from({length:8},(_,i)=>({id:i+1,title:`Capítulo ${i+1}`,subtitle:"Avalon",read:true})),
  },
  {
    id:5, title:"Kingdom of the Wicked", author:"Kerri Maniscalco",
    genre:"romance", tropes:["enemies-to-lovers","forbidden love"], status:"ativa",
    startDate:"3 jun", endDate:"15 ago", totalChapters:8,
    readers:713, comments:2150, progress:45,
    description:"Uma cozinheira siciliana invoca um príncipe do inferno para vingar a morte da irmã.",
    accent:"#7C3AED", accentBg:"#F5F3FF",
    coverA:"#3B1880", coverB:"#7C3AED",
    chapters:Array.from({length:8},(_,i)=>({id:i+1,title:`Capítulo ${i+1}`,subtitle:"Sicília",read:i<4})),
  },
  {
    id:6, title:"Nona das Sombras", author:"Tamsyn Muir",
    genre:"fantasia", tropes:["chosen one","slow burn"], status:"futura",
    startDate:"15 jul", endDate:"1 out", totalChapters:8,
    readers:401, comments:0, progress:0,
    description:"Em conventos de necromancers no espaço, Gideon Nav pega uma espada e espera que alguém a note.",
    accent:"#374151", accentBg:"#F9FAFB",
    coverA:"#111827", coverB:"#374151",
    chapters:Array.from({length:8},(_,i)=>({id:i+1,title:`Capítulo ${i+1}`,subtitle:"Em breve",read:false})),
  },
];

const COMMENTS_DB = {
  "1-3":[
    {id:1,user:"Beatriz S.",avatar:"BS",avatarBg:"#C0392B",time:"há 2 dias",
     text:"A cena em que Feyre vê a fera pela primeira vez é CINEMATOGRÁFICA. Cada detalhe é tão vívido, dá pra sentir o frio e o medo.",
     reactions:{"❤️":24,"😱":8,"😢":3,"🤔":1},
     replies:[
       {id:11,user:"Ana Lima",avatar:"AL",avatarBg:"#2D7A3E",time:"há 1 dia",
        text:"Concordo demais! Li essa cena três vezes seguidas. A descrição do olhar dele é perfeita.",
        reactions:{"❤️":12,"😱":2,"😢":0,"🤔":0},replies:[]},
       {id:12,user:"Carol M.",avatar:"CM",avatarBg:"#1D6FA4",time:"há 18h",
        text:"A tradução BR ficou muito boa nessa parte. 'Fera' com maiúscula — como um título. Detalhe lindo.",
        reactions:{"❤️":7,"😱":0,"😢":0,"🤔":3},replies:[]},
     ]},
    {id:2,user:"Dani Rocha",avatar:"DR",avatarBg:"#9B1D6A",time:"há 3 dias",
     text:"Trecho sublinhado 👇 — essa frase me convenceu que ia amar o livro.",
     highlight:"Havia algo de errado com aquele olhar — era inteligente demais, humano demais para pertencer a uma fera.",
     reactions:{"❤️":41,"😱":5,"😢":11,"🤔":2},replies:[]},
    {id:3,user:"Ele Faria",avatar:"EF",avatarBg:"#7C3AED",time:"há 4 dias",
     text:"Alguém mais ficou com raiva da Feyre nessa cena? Ela tinha a oportunidade de fugir e ficou parada olhando kkkk",
     reactions:{"❤️":18,"😱":1,"😢":0,"🤔":9},replies:[]},
  ],
  "1-4":[
    {id:4,user:"Natalia D.",avatar:"NP",avatarBg:"#C0392B",time:"há 1 dia",
     text:"Prythian me deixou sem palavras. A forma como a autora constrói o worldbuilding sem info-dump é um estudo de como fazer fantasia direito.",
     reactions:{"❤️":33,"😱":4,"😢":2,"🤔":5},replies:[]},
  ],
  "2-1":[
    {id:5,user:"Bia Santos",avatar:"BS",avatarBg:"#1D6FA4",time:"há 5 dias",
     text:"'Um silêncio de três partes' é uma das aberturas mais bonitas da literatura fantástica. Rothfuss é absurdo.",
     reactions:{"❤️":55,"😱":3,"😢":7,"🤔":2},replies:[]},
  ],
};

const GENRE_LABELS = {romantasy:"Romantasy",fantasia:"Fantasia",romance:"Romance"};
const TROPE_LABELS = {
  "enemies-to-lovers":"Enemies to Lovers","slow burn":"Slow Burn",
  "second chance":"Second Chance","chosen one":"Chosen One","forbidden love":"Forbidden Love",
};
const STATUS_LABELS = {ativa:"Ativas",futura:"Em breve",encerrada:"Encerradas"};

const USER_PROFILE = {
  name:"Natalia Dias", username:"@nataliadias",
  bio:"Leitora de romantasy e fantasia. Viciada em enemies-to-lovers e slow burn.",
  joinedDate:"março 2025",
  favoriteGenres:["romantasy","fantasia"],
  favoritetropes:["enemies-to-lovers","slow burn"],
  stats:{temporadasConcluidas:3,temporadasAtivas:2,capitulosLidos:47,comentariosPostados:89,reacoesRecebidas:312},
  badges:[
    {id:"estreante",icon:"⭐",label:"Estreante",desc:"Concluiu a primeira temporada",earned:true,date:"abr 2025"},
    {id:"fiel",icon:"📚",label:"Leitor Fiel",desc:"Concluiu 5 temporadas",earned:false,date:null},
    {id:"comentarista",icon:"💬",label:"Comentarista",desc:"Postou 50 comentários",earned:true,date:"mai 2025"},
    {id:"voz",icon:"✨",label:"Voz da Comunidade",desc:"Recebeu 100 reações",earned:true,date:"mai 2025"},
    {id:"curador",icon:"🏆",label:"Curador",desc:"Teve livro proposto vencer a votação",earned:false,date:null},
    {id:"destaque",icon:"🌟",label:"Destaque do Mês",desc:"Comentário mais curtido do mês",earned:false,date:null},
  ],
  history:[
    {seasonId:4,title:"As Brumas de Avalon",author:"Marion Zimmer Bradley",status:"concluida",progress:100,accent:"#2D7A3E",accentBg:"#F0FDF4",coverA:"#163D1F",coverB:"#2D7A3E",genre:"fantasia"},
    {seasonId:2,title:"O Nome do Vento",author:"Patrick Rothfuss",status:"ativa",progress:25,accent:"#1D6FA4",accentBg:"#EFF6FF",coverA:"#0D3A5C",coverB:"#1D6FA4",genre:"fantasia"},
    {seasonId:1,title:"A Corte de Espinhos e Rosas",author:"Sarah J. Maas",status:"ativa",progress:40,accent:"#C0392B",accentBg:"#FEF2F2",coverA:"#7B1A10",coverB:"#C0392B",genre:"romantasy"},
    {seasonId:99,title:"A Filha das Trevas",author:"V.E. Schwab",status:"abandonada",progress:30,accent:"#374151",accentBg:"#F9FAFB",coverA:"#111827",coverB:"#374151",genre:"fantasia"},
  ],
  recentComments:[
    {text:"A cena em que Feyre vê a fera pela primeira vez é CINEMATOGRÁFICA...",chapter:"Cap. 3",book:"A Corte de Espinhos e Rosas",reactions:24,time:"há 2 dias"},
    {text:"Prythian me deixou sem palavras. A forma como a autora constrói o worldbuilding...",chapter:"Cap. 4",book:"A Corte de Espinhos e Rosas",reactions:33,time:"há 1 dia"},
    {text:"'Um silêncio de três partes' é uma das aberturas mais bonitas da literatura fantástica...",chapter:"Cap. 1",book:"O Nome do Vento",reactions:12,time:"há 5 dias"},
  ],
};

const FLAGGED_COMMENTS = [
  {id:1,user:"user_anon92",text:"Eu sabia desde o início que [SPOILER DO FINAL] ia acontecer, li no livro 3...",chapter:"Cap. 5",book:"A Corte de Espinhos e Rosas",reason:"spoiler",time:"há 12min",reports:3},
  {id:2,user:"leitor_xx",text:"Esse livro é péssimo, quem gosta disso não tem gosto.",chapter:"Cap. 2",book:"O Nome do Vento",reason:"abuso",time:"há 1h",reports:5},
  {id:3,user:"bot_spam01",text:"Clique aqui para ganhar livros grátis!! linkspam.co/oferta",chapter:"Cap. 1",book:"As Brumas de Avalon",reason:"spam",time:"há 2h",reports:7},
];

const METRICS = {
  totalInscritos:5339, comentariosHoje:847, retencao30d:74, temporadasAtivas:3,
  engajamentoPorTemporada:[
    {title:"A Corte de Espinhos e Rosas",inscritos:1243,comentarios:4802,retencao:82,accent:"#C0392B"},
    {title:"O Nome do Vento",inscritos:876,comentarios:3190,retencao:71,accent:"#1D6FA4"},
    {title:"Kingdom of the Wicked",inscritos:713,comentarios:2150,retencao:68,accent:"#7C3AED"},
  ],
  comentariosPorDia:[312,290,445,380,520,610,847],
  diasSemana:["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],
};

// ─── Tokens de estilo reutilizáveis ─────────────────────────────────
const T = {
  bg:     "#FFFFFF",
  surf:   "#F7F7F8",
  border: "#EBEBEC",
  text:   "#111111",
  muted:  "#6B6B6B",
  faint:  "#ADADAD",
  shadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
  shadowHov:"0 2px 8px rgba(0,0,0,0.08), 0 8px 28px rgba(0,0,0,0.10)",
  radius: 14,
  radiusSm: 8,
  font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

// ─── Micro-componentes ───────────────────────────────────────────────
const Avatar = ({initials, bg, size=36}) => (
  <div style={{width:size,height:size,borderRadius:"50%",background:bg,flexShrink:0,
    display:"flex",alignItems:"center",justifyContent:"center",
    fontSize:size*0.33,fontWeight:600,color:"#fff",letterSpacing:"-0.01em"}}>
    {initials}
  </div>
);

const StatusPill = ({status}) => {
  const map = {
    ativa:    {bg:"#ECFDF5",text:"#059669",dot:"#10B981",label:"Ativa"},
    futura:   {bg:"#EFF6FF",text:"#2563EB",dot:"#3B82F6",label:"Em breve"},
    encerrada:{bg:"#F9FAFB",text:"#6B7280",dot:"#9CA3AF",label:"Encerrada"},
  };
  const s = map[status];
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:11,fontWeight:500,
      padding:"3px 10px",borderRadius:999,background:s.bg,color:s.text,whiteSpace:"nowrap"}}>
      <span style={{width:6,height:6,borderRadius:"50%",background:s.dot,flexShrink:0}}/>
      {s.label}
    </span>
  );
};

const Tag = ({label, accent, accentBg}) => (
  <span style={{fontSize:11,fontWeight:500,padding:"3px 10px",borderRadius:999,
    background:accentBg||"#F3F4F6",color:accent||"#374151",whiteSpace:"nowrap"}}>
    {label}
  </span>
);

const ProgressBar = ({value, accent}) => (
  <div style={{display:"flex",alignItems:"center",gap:10}}>
    <div style={{flex:1,height:4,background:"#F3F4F6",borderRadius:999,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${value}%`,background:accent,borderRadius:999,transition:"width 0.6s ease"}}/>
    </div>
    <span style={{fontSize:12,color:T.faint,minWidth:30,textAlign:"right"}}>{value}%</span>
  </div>
);

const Divider = () => <div style={{height:"0.5px",background:T.border}}/>;

const BookCover = ({season, w=130, h=186}) => (
  <div style={{width:w,height:h,flexShrink:0,borderRadius:10,overflow:"hidden",
    background:`linear-gradient(160deg,${season.coverA} 0%,${season.coverB} 100%)`,
    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    padding:"14px 10px",boxSizing:"border-box",position:"relative"}}>
    <div style={{position:"absolute",top:-20,right:-20,width:80,height:80,borderRadius:"50%",
      background:"rgba(255,255,255,0.07)"}}/>
    <div style={{position:"absolute",bottom:-16,left:-16,width:60,height:60,borderRadius:"50%",
      background:"rgba(255,255,255,0.05)"}}/>
    <span style={{fontSize:8,letterSpacing:"0.15em",textTransform:"uppercase",
      color:"rgba(255,255,255,0.5)",marginBottom:8,fontWeight:600}}>
      {GENRE_LABELS[season.genre]}
    </span>
    <div style={{width:24,height:1,background:"rgba(255,255,255,0.3)",marginBottom:10}}/>
    <p style={{fontSize:10,fontFamily:"Georgia,serif",color:"rgba(255,255,255,0.92)",
      textAlign:"center",lineHeight:1.5,margin:"0 0 8px"}}>
      {season.title}
    </p>
    <div style={{width:16,height:1,background:"rgba(255,255,255,0.2)",marginBottom:8}}/>
    <p style={{fontSize:8,color:"rgba(255,255,255,0.45)",fontStyle:"italic",
      textAlign:"center",margin:0,fontFamily:"Georgia,serif"}}>
      {season.author}
    </p>
  </div>
);

const NavBar = ({onGoProfile, onGoAdmin, onGoHome}) => (
  <header style={{background:T.bg,borderBottom:`1px solid ${T.border}`,
    padding:"0 32px",display:"flex",alignItems:"center",height:56,gap:32,
    position:"sticky",top:0,zIndex:50}}>
    <div onClick={onGoHome} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
      <div style={{width:28,height:28,borderRadius:8,background:"#111",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:13,fontFamily:"Georgia,serif",color:"#fff",fontWeight:400}}>C</div>
      <span style={{fontSize:15,fontWeight:600,color:T.text,letterSpacing:"-0.02em"}}>Cliffy</span>
    </div>
    <div style={{flex:1}}/>
    <button onClick={onGoAdmin} style={{background:"none",border:"none",fontSize:13,
      color:T.muted,cursor:"pointer",padding:"6px 12px",borderRadius:T.radiusSm,
      fontFamily:T.font}}>Admin</button>
    <div onClick={onGoProfile} style={{display:"flex",alignItems:"center",gap:8,
      cursor:"pointer",padding:"4px 12px 4px 6px",borderRadius:999,
      border:`1px solid ${T.border}`,background:T.bg}}>
      <Avatar initials="NP" bg="#C0392B" size={24}/>
      <span style={{fontSize:13,fontWeight:500,color:T.text}}>Natalia</span>
    </div>
  </header>
);

// ─── Reações ─────────────────────────────────────────────────────────
const ReactionBar = ({reactions}) => {
  const [local,setLocal] = useState({...reactions});
  const [voted,setVoted] = useState(null);
  const toggle = (e) => {
    setLocal(prev=>{const n={...prev};if(voted===e)n[e]--;else{if(voted)n[voted]--;n[e]++;}return n;});
    setVoted(v=>v===e?null:e);
  };
  return (
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:10}}>
      {Object.entries(local).map(([e,c])=>(
        <button key={e} onClick={()=>toggle(e)} style={{
          display:"flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:999,
          background:voted===e?"#FEF2F2":"#F7F7F8",
          border:`1px solid ${voted===e?"#FCA5A5":T.border}`,
          color:voted===e?"#B91C1C":T.muted,fontSize:12,fontWeight:500,cursor:"pointer",
          transition:"all 0.15s",
        }}><span>{e}</span><span>{c}</span></button>
      ))}
    </div>
  );
};

// ─── Comentário ──────────────────────────────────────────────────────
const Comment = ({comment, isReply=false, accent="#C0392B"}) => {
  const [showReply,setShowReply] = useState(false);
  const [txt,setTxt] = useState("");
  return (
    <div style={{display:"flex",gap:10}}>
      <Avatar initials={comment.avatar} bg={comment.avatarBg} size={isReply?28:36}/>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
          <span style={{fontSize:13,fontWeight:600,color:T.text}}>{comment.user}</span>
          <span style={{fontSize:12,color:T.faint}}>{comment.time}</span>
        </div>
        {comment.highlight&&(
          <div style={{background:"#FFFBEB",borderLeft:`3px solid #F59E0B`,borderRadius:"0 6px 6px 0",
            padding:"8px 12px",marginBottom:8,fontSize:13,color:"#92400E",
            fontFamily:"Georgia,serif",fontStyle:"italic",lineHeight:1.6}}>
            "{comment.highlight}"
          </div>
        )}
        <p style={{fontSize:13,color:"#1F2937",lineHeight:1.65,margin:0}}>{comment.text}</p>
        <ReactionBar reactions={comment.reactions}/>
        {!isReply&&(
          <div style={{display:"flex",gap:14,marginTop:8}}>
            <button onClick={()=>setShowReply(v=>!v)} style={{background:"none",border:"none",
              fontSize:12,color:T.muted,cursor:"pointer",padding:0,fontWeight:500,fontFamily:T.font}}>
              Responder</button>
            <button style={{background:"none",border:"none",fontSize:12,
              color:T.faint,cursor:"pointer",padding:0,fontFamily:T.font}}>Denunciar</button>
          </div>
        )}
        {showReply&&(
          <div style={{marginTop:12,display:"flex",gap:8}}>
            <Avatar initials="NP" bg="#C0392B" size={26}/>
            <div style={{flex:1}}>
              <textarea value={txt} onChange={e=>setTxt(e.target.value)}
                placeholder="Escreva sua resposta…"
                style={{width:"100%",boxSizing:"border-box",background:T.surf,
                  border:`1px solid ${T.border}`,borderRadius:T.radiusSm,padding:"8px 12px",
                  fontSize:13,color:T.text,resize:"none",outline:"none",
                  fontFamily:T.font,lineHeight:1.6,minHeight:64}}/>
              <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:6}}>
                <button onClick={()=>setShowReply(false)} style={{background:T.bg,
                  border:`1px solid ${T.border}`,borderRadius:T.radiusSm,padding:"6px 14px",
                  fontSize:12,color:T.muted,cursor:"pointer",fontFamily:T.font}}>Cancelar</button>
                <button style={{background:accent,border:"none",borderRadius:T.radiusSm,
                  padding:"6px 14px",fontSize:12,color:"#fff",fontWeight:600,
                  cursor:"pointer",fontFamily:T.font}}>Publicar</button>
              </div>
            </div>
          </div>
        )}
        {comment.replies?.length>0&&(
          <div style={{marginTop:16,paddingLeft:14,borderLeft:`2px solid ${T.border}`,
            display:"flex",flexDirection:"column",gap:14}}>
            {comment.replies.map(r=><Comment key={r.id} comment={r} isReply accent={accent}/>)}
          </div>
        )}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// HOME
// ════════════════════════════════════════════════════════════════════
const HomeView = ({onSelectSeason, onGoProfile, onEnroll, onGoAdmin, onWrapped}) => {
  const [statusFilter,setStatusFilter] = useState("todas");
  const [genreFilter,setGenreFilter]   = useState("todos");
  const [search,setSearch]             = useState("");

  const filtered = SEASONS.filter(s=>{
    if(statusFilter!=="todas"&&s.status!==statusFilter)return false;
    if(genreFilter!=="todos"&&s.genre!==genreFilter)return false;
    if(search&&!s.title.toLowerCase().includes(search.toLowerCase())
            &&!s.author.toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  });

  const featured = filtered.find(s=>s.status==="ativa")||filtered[0];
  const rest = filtered.filter(s=>s!==featured);
  const totalReaders = SEASONS.reduce((a,s)=>a+s.readers,0);

  const Pill = ({label,active,onClick}) => (
    <button onClick={onClick} style={{padding:"6px 14px",borderRadius:999,fontSize:13,
      fontWeight:active?600:400,cursor:"pointer",border:`1px solid ${active?"#111":T.border}`,
      background:active?"#111":"transparent",color:active?"#fff":T.muted,
      transition:"all 0.15s",fontFamily:T.font,whiteSpace:"nowrap"}}>
      {label}
    </button>
  );

  const Card = ({season}) => {
    const [hov, setHov] = useState(false);

    const handleClick = () => {
      if (season.status === "futura") return;       // travado
      if (season.status === "encerrada") { onWrapped(season); return; }
      onSelectSeason(season);
    };

    return (
      <div
        onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        onClick={handleClick}
        style={{background: hov && season.status !== "futura" ? T.surf : T.bg,
          borderBottom:`1px solid ${T.border}`,
          display:"flex", gap:0,
          cursor: season.status === "futura" ? "default" : "pointer",
          transition:"background 0.15s",
          opacity: season.status === "futura" ? 0.55 : 1}}>

        {/* thumbnail */}
        <div style={{width:100, height:72, flexShrink:0, position:"relative", overflow:"hidden",
          background:`linear-gradient(160deg,${season.coverA},${season.coverB})`}}>
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",
            justifyContent:"center",padding:8}}>
            <p style={{fontSize:9,color:"rgba(255,255,255,0.85)",textAlign:"center",
              fontFamily:"Georgia,serif",lineHeight:1.4,margin:0}}>{season.title}</p>
          </div>
        </div>

        {/* conteúdo */}
        <div style={{flex:1, padding:"10px 14px", minWidth:0, display:"flex",
          flexDirection:"column", justifyContent:"center", gap:4}}>

          {/* pill série — estilo Trakt */}
          <div style={{display:"flex", alignItems:"center", gap:8}}>
            <span style={{fontSize:11, fontWeight:600, color:T.muted,
              border:`1px solid ${T.border}`, borderRadius:999,
              padding:"1px 8px", whiteSpace:"nowrap", letterSpacing:"0.01em"}}>
              {season.title.length > 22 ? season.title.slice(0,21)+"…" : season.title} &rsaquo;
            </span>
            <StatusPill status={season.status}/>
          </div>

          {/* título do episódio / info */}
          <p style={{fontSize:15, fontWeight:700, color:T.text, margin:0,
            letterSpacing:"-0.01em", lineHeight:1.25,
            whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
            {season.author}
          </p>
          <p style={{fontSize:12, color:T.muted, margin:0, lineHeight:1.4,
            display:"-webkit-box", WebkitLineClamp:1, WebkitBoxOrient:"vertical", overflow:"hidden"}}>
            {season.description}
          </p>

          {/* rodapé */}
          <div style={{display:"flex", alignItems:"center", gap:12, marginTop:2}}>
            <span style={{fontSize:11, color:T.faint}}>{season.totalChapters} capítulos</span>
            <span style={{fontSize:11, color:T.faint}}>·</span>
            <span style={{fontSize:11, color:T.faint}}>{season.comments.toLocaleString("pt-BR")} comentários</span>
            {season.status==="ativa" && (
              <>
                <span style={{fontSize:11, color:T.faint}}>·</span>
                <div style={{flex:1, display:"flex", alignItems:"center", gap:6}}>
                  <div style={{flex:1, maxWidth:60, height:3, background:"#F3F4F6", borderRadius:999, overflow:"hidden"}}>
                    <div style={{height:"100%", width:`${season.progress}%`, background:season.accent, borderRadius:999}}/>
                  </div>
                  <span style={{fontSize:11, color:T.faint}}>{season.progress}%</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ação direita */}
        <div style={{display:"flex", alignItems:"center", padding:"0 14px", flexShrink:0}}>
          {season.status==="ativa" && (
            <button onClick={e=>{e.stopPropagation();onEnroll(season);}}
              style={{width:32, height:32, borderRadius:"50%",
                background:"transparent", border:`1.5px solid ${T.border}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                cursor:"pointer", fontSize:16, color:T.faint, fontFamily:T.font}}>+</button>
          )}
          {season.status==="futura" && (
            <div style={{width:32, height:32, borderRadius:"50%",
              background:T.surf, border:`1.5px solid ${T.border}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:14}}>🔒</div>
          )}
          {season.status==="encerrada" && (
            <button onClick={e=>{e.stopPropagation();onWrapped(season);}}
              style={{fontSize:11, fontWeight:600, color:T.muted, background:"transparent",
                border:`1px solid ${T.border}`, borderRadius:999, padding:"4px 10px",
                cursor:"pointer", fontFamily:T.font, whiteSpace:"nowrap"}}>
              Wrapped →
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{minHeight:"100vh",background:"#FAFAFA",fontFamily:T.font,color:T.text}}>
      <NavBar onGoProfile={onGoProfile} onGoAdmin={onGoAdmin} onGoHome={()=>{}}/>

      {/* hero */}
      <div style={{background:T.bg,borderBottom:`1px solid ${T.border}`,
        padding:"48px 32px 40px"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <p style={{fontSize:12,fontWeight:600,letterSpacing:"0.08em",
            textTransform:"uppercase",color:T.faint,margin:"0 0 10px"}}>
            Temporadas abertas agora
          </p>
          <h1 style={{fontSize:40,fontWeight:800,color:T.text,margin:"0 0 6px",
            letterSpacing:"-0.03em",lineHeight:1.1}}>
            Leia junto.{" "}
            <span style={{color:T.faint,fontWeight:300}}>Sem spoilers.</span>
          </h1>
          <p style={{fontSize:15,color:T.muted,margin:"12px 0 28px",lineHeight:1.6}}>
            Entre numa temporada, leia no seu ritmo e comente capítulo a capítulo sem medo de spoilers.
          </p>

          {/* stats row */}
          <div style={{display:"flex",gap:32}}>
            {[
              {l:"Leitores ativos",v:totalReaders.toLocaleString("pt-BR")},
              {l:"Temporadas ativas",v:SEASONS.filter(s=>s.status==="ativa").length},
              {l:"Comentários hoje",v:"847"},
              {l:"Próxima temporada",v:"1 jul"},
            ].map((s,i)=>(
              <div key={i}>
                <p style={{fontSize:22,fontWeight:700,color:T.text,margin:0,letterSpacing:"-0.02em"}}>{s.v}</p>
                <p style={{fontSize:12,color:T.faint,margin:"2px 0 0"}}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* filters */}
      <div style={{background:T.bg,borderBottom:`1px solid ${T.border}`,
        padding:"14px 32px",display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{display:"flex",gap:6}}>
          {["todas","ativa","futura","encerrada"].map(s=>(
            <Pill key={s} label={s==="todas"?"Todas":STATUS_LABELS[s]}
              active={statusFilter===s} onClick={()=>setStatusFilter(s)}/>
          ))}
        </div>
        <div style={{width:1,height:20,background:T.border,margin:"0 8px"}}/>
        <div style={{display:"flex",gap:6}}>
          {["todos","romantasy","fantasia","romance"].map(g=>(
            <Pill key={g} label={g==="todos"?"Gênero":GENRE_LABELS[g]}
              active={genreFilter===g} onClick={()=>setGenreFilter(g)}/>
          ))}
        </div>
        <div style={{marginLeft:"auto"}}>
          <input type="text" placeholder="Buscar…" value={search}
            onChange={e=>setSearch(e.target.value)}
            style={{background:T.surf,border:`1px solid ${T.border}`,borderRadius:999,
              color:T.text,fontSize:13,padding:"7px 16px",outline:"none",
              width:180,fontFamily:T.font}}/>
        </div>
      </div>

      {/* grid */}
      <div style={{maxWidth:720, margin:"0 auto", padding:"0 0 64px"}}>
        {filtered.length===0
          ? <p style={{textAlign:"center",color:T.faint,fontSize:15,padding:"60px 0"}}>
              Nenhuma temporada encontrada.
            </p>
          : <>
              {/* seção ativas */}
              {filtered.filter(s=>s.status==="ativa").length>0&&(
                <>
                  <div style={{padding:"14px 20px 10px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <span style={{fontSize:11, fontWeight:700, letterSpacing:"0.1em",
                      textTransform:"uppercase", color:T.faint}}>Assistir a seguir</span>
                  </div>
                  {filtered.filter(s=>s.status==="ativa").map(s=><Card key={s.id} season={s}/>)}
                </>
              )}
              {/* seção em breve */}
              {filtered.filter(s=>s.status==="futura").length>0&&(
                <>
                  <div style={{padding:"20px 20px 10px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <span style={{fontSize:11, fontWeight:700, letterSpacing:"0.1em",
                      textTransform:"uppercase", color:T.faint}}>Em breve</span>
                  </div>
                  {filtered.filter(s=>s.status==="futura").map(s=><Card key={s.id} season={s}/>)}
                </>
              )}
              {/* seção encerradas */}
              {filtered.filter(s=>s.status==="encerrada").length>0&&(
                <>
                  <div style={{padding:"20px 20px 10px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <span style={{fontSize:11, fontWeight:700, letterSpacing:"0.1em",
                      textTransform:"uppercase", color:T.faint}}>Encerradas</span>
                  </div>
                  {filtered.filter(s=>s.status==="encerrada").map(s=><Card key={s.id} season={s}/>)}
                </>
              )}
            </>
        }
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// CHAPTER VIEW
// ════════════════════════════════════════════════════════════════════
const ChapterView = ({season, onBack}) => {
  const [chapters,setChapters]   = useState(season.chapters);
  const [selectedId,setSelectedId] = useState(()=>{
    // abre no último capítulo lido, ou no primeiro se nenhum lido ainda
    const read = season.chapters.filter(c=>c.read);
    return read.length > 0 ? read[read.length-1].id : season.chapters[0].id;
  });
  const [newComment,setNewComment] = useState("");
  const [confirmUnmark,setConfirmUnmark] = useState(null);
  const [marking,setMarking]       = useState(null);

  const selected   = chapters.find(c=>c.id===selectedId);
  const isLocked   = !selected?.read;
  const baseComments = COMMENTS_DB[`${season.id}-${selectedId}`]||[];
  const [localComments, setLocalComments] = useState({});
  const comments = [...(localComments[selectedId]||[]), ...baseComments];
  const readCount  = chapters.filter(c=>c.read).length;
  const pct        = Math.round((readCount/chapters.length)*100);
  const firstUnread = chapters.find(c=>!c.read);

  const submitComment = () => {
    if (newComment.length < 20) return;
    const novo = {
      id: Date.now(),
      user: "Natalia D.", avatar: "NP", avatarBg: "#C0392B",
      time: "agora",
      text: newComment,
      reactions: {"❤️":0,"😱":0,"😢":0,"🤔":0},
      replies: [],
    };
    setLocalComments(prev => ({
      ...prev,
      [selectedId]: [novo, ...(prev[selectedId]||[])],
    }));
    setNewComment("");
  };

  const markRead = (id)=>{
    setMarking(id);
    setTimeout(()=>{
      setChapters(prev=>prev.map(c=>c.id===id?{...c,read:true}:c));
      setSelectedId(id);setMarking(null);
    },500);
  };

  return (
    <div style={{minHeight:"100vh",background:T.bg,fontFamily:T.font,color:T.text,
      display:"flex",flexDirection:"column"}}>

      {/* topbar */}
      <header style={{background:T.bg,borderBottom:`1px solid ${T.border}`,
        padding:"0 24px",display:"flex",alignItems:"center",gap:16,height:56,flexShrink:0}}>
        <button onClick={onBack} style={{background:"none",border:`1px solid ${T.border}`,
          borderRadius:T.radiusSm,padding:"5px 12px",fontSize:13,color:T.muted,
          cursor:"pointer",fontFamily:T.font}}>← Voltar</button>
        <div style={{flex:1,minWidth:0}}>
          <p style={{margin:0,fontSize:11,fontWeight:600,color:season.accent,
            letterSpacing:"0.06em",textTransform:"uppercase"}}>{season.title}</p>
          <p style={{margin:0,fontSize:13,fontWeight:600,color:T.text}}>
            {selected?.title}
            {selected?.subtitle&&<span style={{color:T.muted,fontWeight:400}}> — {selected.subtitle}</span>}
          </p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <ProgressBar value={pct} accent={season.accent}/>
          <span style={{fontSize:12,color:T.faint,whiteSpace:"nowrap",minWidth:42}}>{pct}% lido</span>
        </div>
        <Avatar initials="NP" bg="#C0392B" size={28}/>
      </header>

      <div style={{display:"flex",flex:1,overflow:"hidden",height:"calc(100vh - 56px)"}}>

        {/* sidebar */}
        <aside style={{width:220,flexShrink:0,background:"#FAFAFA",
          borderRight:`1px solid ${T.border}`,overflowY:"auto",padding:"16px 0"}}>
          <p style={{fontSize:11,fontWeight:600,color:T.faint,letterSpacing:"0.08em",
            textTransform:"uppercase",margin:"0 0 8px",padding:"0 16px"}}>Capítulos</p>
          {chapters.map(ch=>{
            const isSel = ch.id===selectedId;
            const canClick = ch.read||ch.id===firstUnread?.id;
            return (
              <div key={ch.id} onClick={()=>canClick&&setSelectedId(ch.id)}
                style={{padding:"9px 16px",cursor:canClick?"pointer":"default",
                  background:isSel?T.bg:"transparent",
                  borderRight:isSel?`2px solid ${season.accent}`:"2px solid transparent",
                  display:"flex",alignItems:"center",gap:10,opacity:canClick?1:0.35}}>
                <div style={{width:18,height:18,borderRadius:"50%",flexShrink:0,
                  background:marking===ch.id?"#F59E0B":ch.read?season.accent:"#E5E7EB",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:9,fontWeight:700,color:"#fff",transition:"background 0.3s"}}>
                  {marking===ch.id?"·":ch.read?"✓":!canClick?"🔒":""}
                </div>
                <div style={{minWidth:0}}>
                  <p style={{margin:0,fontSize:12,fontWeight:isSel?600:400,
                    color:isSel?T.text:T.muted,
                    whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{ch.title}</p>
                  <p style={{margin:0,fontSize:11,color:T.faint,
                    whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{ch.subtitle}</p>
                </div>
              </div>
            );
          })}
        </aside>

        {/* main */}
        <main style={{flex:1,overflowY:"auto",background:T.bg}}>
          {isLocked ? (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",
              justifyContent:"center",padding:64,textAlign:"center",minHeight:400}}>
              <div style={{width:72,height:72,borderRadius:"50%",
                background:season.accentBg,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:30,marginBottom:20}}>🛡️</div>
              <h2 style={{fontSize:20,fontWeight:700,color:T.text,margin:"0 0 8px",
                letterSpacing:"-0.02em"}}>Spoiler Shield ativo</h2>
              <p style={{fontSize:14,color:T.muted,lineHeight:1.7,margin:"0 0 6px",maxWidth:360}}>
                Os comentários de <strong style={{color:T.text}}>{selected?.title}</strong> estão protegidos.
              </p>
              {firstUnread&&firstUnread.id!==selected?.id&&(
                <p style={{fontSize:13,color:"#EF4444",marginBottom:8}}>
                  Marque os capítulos anteriores primeiro.
                </p>
              )}
              <button onClick={()=>markRead(selectedId)} disabled={!!marking}
                style={{background:season.accent,border:"none",color:"#fff",fontSize:14,
                  fontWeight:600,padding:"12px 28px",borderRadius:T.radiusSm,cursor:"pointer",
                  opacity:marking?0.6:1,marginTop:16,fontFamily:T.font}}>
                {marking===selectedId?"Marcando…":"Marcar como lido e ver comentários"}
              </button>
              <p style={{fontSize:12,color:T.faint,marginTop:14,lineHeight:1.6}}>
                Você pode desmarcar depois, mas seus comentários permanecerão visíveis.
              </p>
            </div>
          ) : (
            <div>
              {/* ── hero escuro estilo Trakt ── */}
              <div style={{position:"relative", background:`linear-gradient(160deg,${season.coverA},${season.coverB})`,
                minHeight:180, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"20px 24px"}}>
                {/* overlay escuro no rodapé */}
                <div style={{position:"absolute",inset:0,
                  background:"linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)"}}/>
                <div style={{position:"relative"}}>
                  <p style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.6)",
                    letterSpacing:"0.1em",textTransform:"uppercase",margin:"0 0 4px"}}>
                    {season.title}
                  </p>
                  <h1 style={{fontSize:22,fontWeight:800,color:"#fff",margin:0,
                    letterSpacing:"-0.02em",lineHeight:1.15}}>{selected?.title}</h1>
                  <p style={{fontSize:14,color:"rgba(255,255,255,0.7)",margin:"4px 0 0"}}>
                    {selected?.subtitle}
                  </p>
                </div>
                {/* botão compartilhar canto superior direito */}
                <button onClick={()=>setConfirmUnmark(selectedId)}
                  style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,0.15)",
                    border:"1px solid rgba(255,255,255,0.25)",borderRadius:999,
                    padding:"5px 12px",fontSize:11,fontWeight:600,color:"#fff",
                    cursor:"pointer",fontFamily:T.font,backdropFilter:"blur(4px)"}}>
                  ✓ Lido
                </button>
              </div>

              {/* ── linha de meta ── */}
              <div style={{padding:"14px 20px",borderBottom:`1px solid ${T.border}`,
                display:"flex",alignItems:"center",gap:20}}>
                <div style={{display:"flex",alignItems:"center",gap:6,color:T.muted,fontSize:13}}>
                  <span>📅</span>
                  <span>Encerra {season.endDate}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6,color:T.muted,fontSize:13}}>
                  <span>👁</span>
                  <span>{readCount} de {chapters.length} capítulos lidos</span>
                </div>
                <div style={{marginLeft:"auto"}}>
                  <button onClick={()=>setConfirmUnmark(selectedId)}
                    style={{width:32,height:32,borderRadius:"50%",
                      background:T.surf,border:`1.5px solid ${T.border}`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      cursor:"pointer",fontSize:14,color:"#10B981",fontFamily:T.font}}>✓</button>
                </div>
              </div>

              {confirmUnmark&&(
                <div style={{margin:"12px 20px",background:"#FFFBEB",
                  border:"1px solid #FDE68A",borderRadius:T.radiusSm,padding:"14px 16px"}}>
                  <p style={{fontSize:13,color:"#92400E",margin:"0 0 10px",lineHeight:1.6}}>
                    Deseja desmarcar este capítulo? Seus comentários continuarão visíveis.
                  </p>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>{
                      setChapters(prev=>prev.map(c=>c.id===confirmUnmark?{...c,read:false}:c));
                      setConfirmUnmark(null);
                    }} style={{background:"#B45309",border:"none",color:"#fff",
                      fontSize:12,fontWeight:600,padding:"6px 14px",borderRadius:T.radiusSm,
                      cursor:"pointer",fontFamily:T.font}}>Sim, desmarcar</button>
                    <button onClick={()=>setConfirmUnmark(null)}
                      style={{background:"none",border:`1px solid ${T.border}`,color:T.muted,
                        fontSize:12,padding:"6px 12px",borderRadius:T.radiusSm,
                        cursor:"pointer",fontFamily:T.font}}>Cancelar</button>
                  </div>
                </div>
              )}

              {/* ── avaliação por estrelas ── */}
              {(()=>{
                const StarRating = () => {
                  const [hover,setHover] = useState(0);
                  const [rating,setRating] = useState(0);
                  const labels = ["","Ruim","Ok","Bom","Ótimo","Uau"];
                  return (
                    <div style={{padding:"18px 20px",borderBottom:`1px solid ${T.border}`}}>
                      <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",
                        textTransform:"uppercase",color:T.faint,margin:"0 0 14px",textAlign:"center"}}>
                        Avaliar este capítulo
                      </p>
                      <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:8}}>
                        {[1,2,3,4,5].map(n=>(
                          <button key={n}
                            onMouseEnter={()=>setHover(n)} onMouseLeave={()=>setHover(0)}
                            onClick={()=>setRating(r=>r===n?0:n)}
                            style={{background:"none",border:"none",cursor:"pointer",
                              fontSize:32,lineHeight:1,padding:4,
                              color:(hover||rating)>=n?"#F59E0B":"#D1D5DB",
                              transition:"color 0.1s, transform 0.1s",
                              transform:(hover||rating)>=n?"scale(1.15)":"scale(1)"}}>★</button>
                        ))}
                      </div>
                      <div style={{display:"flex",justifyContent:"center",gap:0}}>
                        {labels.slice(1).map((l,i)=>(
                          <span key={i} style={{fontSize:10,fontWeight:600,letterSpacing:"0.05em",
                            textTransform:"uppercase",color:(hover||rating)>i?"#F59E0B":T.faint,
                            width:52,textAlign:"center",transition:"color 0.1s"}}>{l}</span>
                        ))}
                      </div>
                    </div>
                  );
                };
                return <StarRating/>;
              })()}

              {/* ── como você se sentiu ── */}
              {(()=>{
                const EMOTIONS = [
                  {e:"😵",l:"Chocado"},{e:"😤",l:"Frustrado"},{e:"😢",l:"Triste"},{e:"🤔",l:"Reflexivo"},
                  {e:"🥹",l:"Comovido"},{e:"😆",l:"Entretido"},{e:"😱",l:"Assustado"},{e:"😑",l:"Entediado"},
                  {e:"🥰",l:"Compreendido"},{e:"🤩",l:"Empolgado"},{e:"😕",l:"Confuso"},{e:"😬",l:"Tenso"},
                ];
                const EmotionGrid = () => {
                  const [sel,setSel] = useState([]);
                  const toggle = (l) => setSel(prev=>prev.includes(l)?prev.filter(x=>x!==l):[...prev,l]);
                  return (
                    <div style={{padding:"18px 20px",borderBottom:`1px solid ${T.border}`}}>
                      <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",
                        textTransform:"uppercase",color:T.faint,margin:"0 0 14px",textAlign:"center"}}>
                        Como você se sentiu?
                      </p>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                        {EMOTIONS.map(({e,l})=>(
                          <button key={l} onClick={()=>toggle(l)}
                            style={{background:sel.includes(l)?"#FEF9C3":T.surf,
                              border:`1px solid ${sel.includes(l)?"#F59E0B":T.border}`,
                              borderRadius:T.radiusSm,padding:"10px 4px",cursor:"pointer",
                              display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                              transition:"all 0.15s",fontFamily:T.font}}>
                            <span style={{fontSize:24}}>{e}</span>
                            <span style={{fontSize:10,fontWeight:600,letterSpacing:"0.04em",
                              textTransform:"uppercase",color:sel.includes(l)?"#92400E":T.muted,
                              lineHeight:1.2}}>{l}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                };
                return <EmotionGrid/>;
              })()}

              {/* ── informações do capítulo ── */}
              <div style={{padding:"18px 20px",borderBottom:`1px solid ${T.border}`}}>
                <p style={{fontSize:15,fontWeight:700,color:T.text,margin:"0 0 8px",
                  letterSpacing:"-0.01em"}}>Informações do capítulo</p>
                <p style={{fontSize:13,color:T.muted,lineHeight:1.65,margin:0}}>
                  {season.description}
                </p>
                <div style={{display:"flex",gap:16,marginTop:12}}>
                  <div>
                    <p style={{fontSize:11,color:T.faint,margin:"0 0 1px",
                      textTransform:"uppercase",letterSpacing:"0.05em"}}>Leitores</p>
                    <p style={{fontSize:14,fontWeight:700,color:T.text,margin:0}}>
                      {season.readers.toLocaleString("pt-BR")}</p>
                  </div>
                  <div>
                    <p style={{fontSize:11,color:T.faint,margin:"0 0 1px",
                      textTransform:"uppercase",letterSpacing:"0.05em"}}>Período</p>
                    <p style={{fontSize:14,fontWeight:700,color:T.text,margin:0}}>
                      {season.startDate} – {season.endDate}</p>
                  </div>
                </div>
              </div>

              {/* ── comentários header + cta ── */}
              <div style={{padding:"18px 20px",borderBottom:`1px solid ${T.border}`,
                display:"flex",alignItems:"center",justifyContent:"space-between",
                cursor:"pointer"}} onClick={()=>{}}>
                <p style={{fontSize:15,fontWeight:700,color:T.text,margin:0,letterSpacing:"-0.01em"}}>
                  Comentários
                </p>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:14,fontWeight:600,color:T.muted}}>{comments.length}</span>
                  <span style={{fontSize:16,color:T.faint}}>›</span>
                </div>
              </div>

              {/* ── caixa novo comentário ── */}
              <div style={{padding:"16px 20px",borderBottom:`1px solid ${T.border}`}}>
                <div style={{display:"flex",gap:10}}>
                  <Avatar initials="NP" bg="#C0392B" size={36}/>
                  <div style={{flex:1}}>
                    <textarea value={newComment} onChange={e=>setNewComment(e.target.value)}
                      onKeyDown={e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey))submitComment();}}
                      placeholder="O que você achou deste capítulo? (mín. 20 caracteres)"
                      style={{width:"100%",boxSizing:"border-box",background:T.surf,
                        border:`1px solid ${T.border}`,borderRadius:T.radiusSm,
                        padding:"10px 14px",fontSize:13,color:T.text,resize:"none",
                        outline:"none",fontFamily:T.font,lineHeight:1.65,minHeight:72}}
                      onFocus={e=>e.target.style.borderColor=season.accent}
                      onBlur={e=>e.target.style.borderColor=T.border}/>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
                      <span style={{fontSize:12,color:newComment.length>0&&newComment.length<20?"#EF4444":T.faint}}>
                        {newComment.length}/2000{newComment.length>0&&newComment.length<20?" — mín. 20":""}
                      </span>
                      <button onClick={submitComment} disabled={newComment.length<20} style={{
                        background:newComment.length>=20?season.accent:"#E5E7EB",
                        border:"none",color:newComment.length>=20?"#fff":"#9CA3AF",
                        fontSize:13,fontWeight:700,padding:"8px 20px",borderRadius:999,
                        cursor:newComment.length>=20?"pointer":"default",fontFamily:T.font}}>
                        Publicar</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── lista comentários ── */}
              <div style={{padding:"0 0 32px"}}>
                {comments.length===0
                  ? <p style={{textAlign:"center",color:T.faint,fontSize:14,padding:"32px 0"}}>
                      Seja o primeiro a comentar neste capítulo!
                    </p>
                  : comments.map(c=>(
                    <div key={c.id} style={{padding:"16px 20px",borderBottom:`1px solid ${T.border}`}}>
                      <Comment comment={c} accent={season.accent}/>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// PERFIL
// ════════════════════════════════════════════════════════════════════
const ProfileView = ({onBack}) => {
  const [activeTab,setActiveTab] = useState("historico");
  const u = USER_PROFILE;

  const Tab = ({id,label}) => (
    <button onClick={()=>setActiveTab(id)} style={{background:"none",border:"none",
      borderBottom:activeTab===id?"2px solid #111":"2px solid transparent",
      color:activeTab===id?T.text:T.muted,fontSize:14,fontWeight:activeTab===id?600:400,
      padding:"14px 20px 12px",cursor:"pointer",fontFamily:T.font,marginBottom:-1}}>
      {label}
    </button>
  );

  return (
    <div style={{minHeight:"100vh",background:"#FAFAFA",fontFamily:T.font}}>
      <NavBar onGoProfile={()=>{}} onGoAdmin={()=>{}} onGoHome={onBack}/>

      {/* hero */}
      <div style={{background:T.bg,borderBottom:`1px solid ${T.border}`,padding:"36px 32px 0"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <div style={{display:"flex",gap:20,alignItems:"flex-start",marginBottom:24}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:"#C0392B",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:24,fontWeight:700,color:"#fff",letterSpacing:"-0.01em",flexShrink:0}}>NP</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                <h1 style={{fontSize:22,fontWeight:700,color:T.text,margin:0,letterSpacing:"-0.02em"}}>{u.name}</h1>
                <span style={{fontSize:13,color:T.faint}}>{u.username}</span>
              </div>
              <p style={{fontSize:13,color:T.muted,margin:"0 0 10px",lineHeight:1.65,maxWidth:480}}>{u.bio}</p>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                {u.favoriteGenres.map(g=><Tag key={g} label={GENRE_LABELS[g]} accent="#C0392B" accentBg="#FEF2F2"/>)}
                {u.favoritetropes.map(t=><Tag key={t} label={TROPE_LABELS[t]} accent="#374151" accentBg="#F3F4F6"/>)}
                <span style={{fontSize:12,color:T.faint}}>· desde {u.joinedDate}</span>
              </div>
            </div>
            <button style={{background:T.surf,border:`1px solid ${T.border}`,borderRadius:T.radiusSm,
              padding:"8px 18px",fontSize:13,fontWeight:500,color:T.text,cursor:"pointer",
              flexShrink:0,fontFamily:T.font}}>Editar perfil</button>
          </div>

          {/* stats */}
          <div style={{display:"flex",borderTop:`1px solid ${T.border}`}}>
            {[
              {l:"Concluídas",v:u.stats.temporadasConcluidas},
              {l:"Em andamento",v:u.stats.temporadasAtivas},
              {l:"Capítulos lidos",v:u.stats.capitulosLidos},
              {l:"Comentários",v:u.stats.comentariosPostados},
              {l:"Reações",v:u.stats.reacoesRecebidas},
            ].map((s,i)=>(
              <div key={i} style={{flex:1,padding:"16px 0",textAlign:"center",
                borderRight:i<4?`1px solid ${T.border}`:"none"}}>
                <p style={{fontSize:24,fontWeight:700,color:T.text,margin:0,letterSpacing:"-0.02em"}}>{s.v}</p>
                <p style={{fontSize:11,color:T.faint,margin:"3px 0 0",textTransform:"uppercase",letterSpacing:"0.04em"}}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* tabs */}
      <div style={{background:T.bg,borderBottom:`1px solid ${T.border}`,padding:"0 32px",maxWidth:860,margin:"0 auto",display:"flex"}}>
        <Tab id="historico" label="Histórico"/>
        <Tab id="insignias" label="Insígnias"/>
        <Tab id="comentarios" label="Comentários"/>
      </div>

      <div style={{maxWidth:860,margin:"0 auto",padding:"28px 32px 64px"}}>

        {activeTab==="historico"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {u.history.map((item,i)=>{
              const histStatusMap={ativa:{bg:"#ECFDF5",text:"#059669",label:"Em curso"},concluida:{bg:"#EFF6FF",text:"#2563EB",label:"Concluída"},abandonada:{bg:"#F9FAFB",text:"#6B7280",label:"Abandonada"}};
              const hs=histStatusMap[item.status];
              return (
                <div key={i} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:T.radius,
                  padding:"16px",display:"flex",gap:14,alignItems:"center",cursor:"pointer",
                  boxShadow:T.shadow,transition:"box-shadow 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow=T.shadowHov}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow=T.shadow}>
                  <BookCover season={item} w={44} h={62}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                      <span style={{fontSize:11,fontWeight:600,color:item.accent,
                        letterSpacing:"0.06em",textTransform:"uppercase"}}>
                        {GENRE_LABELS[item.genre]}</span>
                      <span style={{fontSize:11,fontWeight:500,padding:"2px 8px",borderRadius:999,
                        background:hs.bg,color:hs.text}}>{hs.label}</span>
                    </div>
                    <p style={{fontSize:14,fontWeight:600,color:T.text,margin:0,
                      letterSpacing:"-0.01em"}}>{item.title}</p>
                    <p style={{fontSize:12,color:T.muted,margin:"2px 0 0",fontStyle:"italic"}}>{item.author}</p>
                  </div>
                  {item.status!=="abandonada"&&(
                    <div style={{textAlign:"right",flexShrink:0,minWidth:90}}>
                      <ProgressBar value={item.progress} accent={item.accent}/>
                      <span style={{fontSize:11,color:T.faint}}>{item.progress}% lido</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab==="insignias"&&(
          <div>
            <p style={{fontSize:13,color:T.muted,marginBottom:20}}>
              {u.badges.filter(b=>b.earned).length} de {u.badges.length} insígnias conquistadas
            </p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:12,marginBottom:28}}>
              {u.badges.filter(b=>b.earned).map(badge=>(
                <div key={badge.id} style={{background:T.bg,border:`1px solid ${T.border}`,
                  borderRadius:T.radius,padding:"24px 18px",textAlign:"center",boxShadow:T.shadow}}>
                  <div style={{fontSize:34,marginBottom:10}}>{badge.icon}</div>
                  <p style={{fontSize:14,fontWeight:700,color:T.text,margin:"0 0 4px",letterSpacing:"-0.01em"}}>{badge.label}</p>
                  <p style={{fontSize:12,color:T.muted,margin:"0 0 12px",lineHeight:1.5}}>{badge.desc}</p>
                  <span style={{fontSize:11,color:T.faint,background:T.surf,
                    padding:"3px 10px",borderRadius:999,border:`1px solid ${T.border}`}}>
                    {badge.date}
                  </span>
                </div>
              ))}
            </div>
            <p style={{fontSize:13,fontWeight:600,color:T.faint,marginBottom:12,
              textTransform:"uppercase",letterSpacing:"0.05em",fontSize:11}}>Ainda não conquistadas</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:12}}>
              {u.badges.filter(b=>!b.earned).map(badge=>(
                <div key={badge.id} style={{background:T.surf,border:`1px solid ${T.border}`,
                  borderRadius:T.radius,padding:"24px 18px",textAlign:"center",opacity:0.55}}>
                  <div style={{fontSize:34,marginBottom:10,filter:"grayscale(1)"}}>{badge.icon}</div>
                  <p style={{fontSize:14,fontWeight:700,color:T.muted,margin:"0 0 4px"}}>{badge.label}</p>
                  <p style={{fontSize:12,color:T.faint,margin:0,lineHeight:1.5}}>{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==="comentarios"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {u.recentComments.map((c,i)=>(
              <div key={i} style={{background:T.bg,border:`1px solid ${T.border}`,
                borderRadius:T.radius,padding:"16px 18px",boxShadow:T.shadow}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <span style={{fontSize:12,fontWeight:600,color:"#C0392B"}}>{c.book}</span>
                  <span style={{color:T.border}}>·</span>
                  <span style={{fontSize:12,color:T.faint}}>{c.chapter}</span>
                  <span style={{marginLeft:"auto",fontSize:12,color:T.faint}}>{c.time}</span>
                </div>
                <p style={{fontSize:13,color:T.text,lineHeight:1.65,margin:"0 0 10px",
                  display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
                  {c.text}
                </p>
                <span style={{fontSize:12,color:T.faint}}>❤️ {c.reactions} reações</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// ENROLL FLOW
// ════════════════════════════════════════════════════════════════════
const EnrollFlow = ({season, onClose, onConfirm}) => {
  const [step,setStep] = useState(1);

  const Step = ({n}) => (
    <div style={{width:28,height:28,borderRadius:"50%",flexShrink:0,
      background:step>=n?season.accent:"#E5E7EB",
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:12,fontWeight:700,color:step>=n?"#fff":"#9CA3AF",
      transition:"background 0.3s"}}>
      {step>n?"✓":n}
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"rgba(0,0,0,0.5)",display:"flex",
      alignItems:"flex-start",justifyContent:"center",padding:"48px 16px",
      fontFamily:T.font}}>
      <div style={{background:T.bg,borderRadius:T.radius,width:"100%",maxWidth:500,
        overflow:"hidden",boxShadow:"0 24px 64px rgba(0,0,0,0.2)"}}>

        {/* header */}
        <div style={{padding:"18px 24px",borderBottom:`1px solid ${T.border}`,
          display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontSize:15,fontWeight:600,color:T.text}}>Inscrição em temporada</span>
          <button onClick={onClose} style={{background:"none",border:"none",
            fontSize:20,color:T.faint,cursor:"pointer",lineHeight:1}}>×</button>
        </div>

        {/* stepper */}
        {step<3&&(
          <div style={{padding:"20px 28px 4px",display:"flex",alignItems:"center",gap:8}}>
            <Step n={1}/>
            <div style={{flex:1,height:2,background:step>=2?season.accent:"#E5E7EB",transition:"background 0.3s"}}/>
            <Step n={2}/>
            <div style={{flex:1,height:2,background:step>=3?season.accent:"#E5E7EB",transition:"background 0.3s"}}/>
            <Step n={3}/>
          </div>
        )}
        {step<3&&(
          <div style={{padding:"4px 28px 0",display:"flex",justifyContent:"space-between"}}>
            {["Detalhes","Confirmar","Pronto!"].map((l,i)=>(
              <span key={i} style={{fontSize:11,color:step===i+1?T.text:T.faint,
                fontWeight:step===i+1?600:400,textTransform:"uppercase",letterSpacing:"0.04em",
                flex:1,textAlign:i===0?"left":i===2?"right":"center"}}>{l}</span>
            ))}
          </div>
        )}

        {/* passo 1 */}
        {step===1&&(
          <div style={{padding:"24px 28px 28px"}}>
            <div style={{display:"flex",gap:14,marginBottom:22}}>
              <BookCover season={season} w={68} h={96}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <Tag label={GENRE_LABELS[season.genre]} accent={season.accent} accentBg={season.accentBg}/>
                  <StatusPill status={season.status}/>
                </div>
                <h2 style={{fontSize:15,fontWeight:700,color:T.text,margin:"0 0 2px",letterSpacing:"-0.01em"}}>{season.title}</h2>
                <p style={{fontSize:12,color:T.muted,margin:0,fontStyle:"italic"}}>{season.author}</p>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
              {[
                {l:"Início",v:season.startDate},
                {l:"Encerramento",v:season.endDate},
                {l:"Capítulos",v:season.totalChapters},
                {l:"Leitores",v:season.readers.toLocaleString("pt-BR")},
              ].map(item=>(
                <div key={item.l} style={{background:T.surf,borderRadius:T.radiusSm,
                  padding:"12px 14px",border:`1px solid ${T.border}`}}>
                  <p style={{fontSize:11,color:T.faint,margin:"0 0 2px",
                    textTransform:"uppercase",letterSpacing:"0.04em"}}>{item.l}</p>
                  <p style={{fontSize:16,fontWeight:700,color:T.text,margin:0}}>{item.v}</p>
                </div>
              ))}
            </div>

            <div style={{background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:T.radiusSm,
              padding:"12px 14px",marginBottom:20,display:"flex",gap:10}}>
              <span style={{fontSize:16,flexShrink:0}}>ℹ️</span>
              <p style={{fontSize:13,color:"#92400E",margin:0,lineHeight:1.6}}>
                Você pode participar de até <strong>3 temporadas simultâneas</strong>. Atualmente está em <strong>2 de 3</strong>.
              </p>
            </div>

            <button onClick={()=>setStep(2)} style={{width:"100%",background:season.accent,
              border:"none",color:"#fff",fontSize:14,fontWeight:600,padding:"12px",
              borderRadius:T.radiusSm,cursor:"pointer",fontFamily:T.font}}>
              Quero participar →
            </button>
            <button onClick={onClose} style={{width:"100%",background:"none",border:"none",
              color:T.faint,fontSize:13,cursor:"pointer",padding:"10px",
              marginTop:4,fontFamily:T.font}}>Cancelar</button>
          </div>
        )}

        {/* passo 2 */}
        {step===2&&(
          <div style={{padding:"24px 28px 28px"}}>
            <h2 style={{fontSize:17,fontWeight:700,color:T.text,margin:"0 0 6px",letterSpacing:"-0.02em"}}>
              Confirme sua inscrição</h2>
            <p style={{fontSize:13,color:T.muted,margin:"0 0 22px",lineHeight:1.65}}>
              Você está prestes a entrar na temporada de <strong style={{color:T.text}}>{season.title}</strong>.
            </p>

            <div style={{background:T.surf,borderRadius:T.radiusSm,padding:"14px 16px",
              marginBottom:18,border:`1px solid ${T.border}`}}>
              {[
                {l:"Leitor",v:"Natalia Dias"},
                {l:"E-mail",v:"natalia@cliffy.app"},
                {l:"Período",v:`${season.startDate} – ${season.endDate}`},
                {l:"Capítulos",v:season.totalChapters},
              ].map((row,i)=>(
                <div key={row.l} style={{display:"flex",justifyContent:"space-between",
                  padding:"7px 0",borderTop:i>0?`1px solid ${T.border}`:"none"}}>
                  <span style={{fontSize:13,color:T.faint}}>{row.l}</span>
                  <span style={{fontSize:13,color:T.text,fontWeight:500}}>{row.v}</span>
                </div>
              ))}
            </div>

            <div style={{marginBottom:22}}>
              <p style={{fontSize:12,color:T.muted,margin:"0 0 8px",fontWeight:500}}>Seu ritmo estimado:</p>
              <div style={{display:"flex",gap:8}}>
                {["Casual","Regular","Intenso"].map((opt,i)=>(
                  <button key={i} style={{flex:1,padding:"9px 6px",borderRadius:T.radiusSm,cursor:"pointer",
                    fontSize:12,fontWeight:i===1?600:400,textAlign:"center",fontFamily:T.font,
                    background:i===1?season.accentBg:"transparent",
                    border:`1px solid ${i===1?season.accent:T.border}`,
                    color:i===1?season.accent:T.muted}}>{opt}</button>
                ))}
              </div>
            </div>

            <button onClick={()=>setStep(3)} style={{width:"100%",background:season.accent,
              border:"none",color:"#fff",fontSize:14,fontWeight:600,padding:"12px",
              borderRadius:T.radiusSm,cursor:"pointer",fontFamily:T.font}}>
              Confirmar inscrição</button>
            <button onClick={()=>setStep(1)} style={{width:"100%",background:"none",border:"none",
              color:T.faint,fontSize:13,cursor:"pointer",padding:"10px",marginTop:4,fontFamily:T.font}}>
              ← Voltar</button>
          </div>
        )}

        {/* passo 3 */}
        {step===3&&(
          <div style={{padding:"48px 28px 40px",textAlign:"center"}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:season.accentBg,
              border:`2px solid ${season.accent}`,display:"flex",alignItems:"center",
              justifyContent:"center",fontSize:28,margin:"0 auto 20px"}}>✓</div>
            <h2 style={{fontSize:22,fontWeight:700,color:T.text,margin:"0 0 6px",letterSpacing:"-0.02em"}}>
              Você está dentro!</h2>
            <p style={{fontSize:13,color:T.muted,margin:"0 0 4px"}}>Inscrição confirmada em</p>
            <p style={{fontSize:15,fontWeight:700,color:T.text,margin:"0 0 24px"}}>{season.title}</p>

            <div style={{background:T.surf,borderRadius:T.radiusSm,padding:"14px 16px",
              marginBottom:24,display:"flex",gap:10,alignItems:"center",
              border:`1px solid ${T.border}`,textAlign:"left"}}>
              <span style={{fontSize:18,flexShrink:0}}>📬</span>
              <p style={{fontSize:13,color:T.muted,margin:0,lineHeight:1.6}}>
                E-mail de confirmação enviado para <strong style={{color:T.text}}>natalia@cliffy.app</strong>.
              </p>
            </div>

            <div style={{textAlign:"left",marginBottom:28}}>
              <p style={{fontSize:11,fontWeight:600,color:T.faint,textTransform:"uppercase",
                letterSpacing:"0.06em",margin:"0 0 10px"}}>O que fazer agora</p>
              {["Pegue sua cópia do livro","Leia o Capítulo 1 e marque como lido",
                "Comente e interaja com outras leitores"].map((item,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"9px 0",
                  borderTop:i>0?`1px solid ${T.border}`:"none",alignItems:"flex-start"}}>
                  <div style={{width:20,height:20,borderRadius:"50%",flexShrink:0,
                    background:season.accent,display:"flex",alignItems:"center",
                    justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",marginTop:1}}>
                    {i+1}</div>
                  <span style={{fontSize:13,color:T.text,lineHeight:1.5}}>{item}</span>
                </div>
              ))}
            </div>

            <button onClick={()=>{onConfirm(season);onClose();}} style={{width:"100%",
              background:season.accent,border:"none",color:"#fff",fontSize:14,fontWeight:600,
              padding:"12px",borderRadius:T.radiusSm,cursor:"pointer",fontFamily:T.font,marginBottom:8}}>
              Ir para a temporada →</button>
            <button onClick={onClose} style={{width:"100%",background:"none",border:"none",
              color:T.faint,fontSize:13,cursor:"pointer",padding:"8px",fontFamily:T.font}}>
              Voltar ao início</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// ADMIN
// ════════════════════════════════════════════════════════════════════
const AdminView = ({onBack}) => {
  const [activeTab,setActiveTab] = useState("metricas");
  const [flagged,setFlagged]     = useState(FLAGGED_COMMENTS);
  const [editingId,setEditingId] = useState(null);
  const [toast,setToast]         = useState(null);

  const showToast = (msg, type="ok") => {
    setToast({msg,type});setTimeout(()=>setToast(null),2600);
  };
  const moderate = (id, action) => {
    setFlagged(prev=>prev.filter(c=>c.id!==id));
    const l={approve:"aprovado",remove:"removido",warn:"advertido"};
    showToast(`Comentário ${l[action]}.`, action==="remove"?"err":"ok");
  };
  const maxBar = Math.max(...METRICS.comentariosPorDia);

  const ReasonBadge = ({reason}) => {
    const m={spoiler:["#FFFBEB","#92400E","Spoiler"],abuso:["#FEF2F2","#B91C1C","Abuso"],spam:["#F5F3FF","#6D28D9","Spam"]};
    const [bg,text,label]=m[reason]||["#F3F4F6","#374151","Outro"];
    return <span style={{fontSize:11,padding:"2px 8px",borderRadius:999,background:bg,color:text,fontWeight:600}}>{label}</span>;
  };

  const Tab = ({id,label,badge}) => (
    <button onClick={()=>setActiveTab(id)} style={{background:"none",border:"none",
      borderBottom:activeTab===id?"2px solid #111":"2px solid transparent",
      color:activeTab===id?T.text:T.muted,fontSize:14,fontWeight:activeTab===id?600:400,
      padding:"14px 20px 12px",cursor:"pointer",fontFamily:T.font,marginBottom:-1,
      display:"flex",alignItems:"center",gap:6}}>
      {label}
      {badge&&<span style={{background:"#EF4444",color:"#fff",fontSize:10,fontWeight:700,
        padding:"1px 6px",borderRadius:999}}>{badge}</span>}
    </button>
  );

  return (
    <div style={{minHeight:"100vh",background:"#FAFAFA",fontFamily:T.font}}>
      {toast&&(
        <div style={{position:"fixed",top:20,right:20,zIndex:999,
          background:toast.type==="err"?"#EF4444":"#10B981",color:"#fff",
          fontSize:13,fontWeight:600,padding:"10px 18px",borderRadius:10,
          boxShadow:"0 4px 20px rgba(0,0,0,0.15)"}}>
          {toast.msg}
        </div>
      )}

      {/* admin navbar */}
      <header style={{background:"#111",padding:"0 28px",display:"flex",alignItems:"center",
        height:52,gap:20}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:26,height:26,borderRadius:6,background:"#fff",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:12,fontFamily:"Georgia,serif",color:"#111",fontWeight:700}}>C</div>
          <span style={{fontSize:14,fontWeight:600,color:"#fff",letterSpacing:"-0.01em"}}>Cliffy</span>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.4)",letterSpacing:"0.08em",
            textTransform:"uppercase"}}>Admin</span>
        </div>
        <div style={{flex:1}}/>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.1)",
          border:"1px solid rgba(255,255,255,0.15)",borderRadius:T.radiusSm,
          padding:"5px 14px",fontSize:12,color:"rgba(255,255,255,0.7)",cursor:"pointer",
          fontFamily:T.font}}>← Ver plataforma</button>
        <Avatar initials="NP" bg="#C0392B" size={28}/>
      </header>

      {/* tabs */}
      <div style={{background:T.bg,borderBottom:`1px solid ${T.border}`,padding:"0 28px",display:"flex"}}>
        <Tab id="metricas" label="Métricas"/>
        <Tab id="temporadas" label="Temporadas"/>
        <Tab id="moderacao" label="Moderação" badge={flagged.length||null}/>
      </div>

      <div style={{padding:"28px",maxWidth:1000,margin:"0 auto"}}>

        {/* MÉTRICAS */}
        {activeTab==="metricas"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
              {[
                {l:"Total de inscritos",v:METRICS.totalInscritos.toLocaleString("pt-BR"),sub:"+128 esta semana"},
                {l:"Comentários hoje",v:METRICS.comentariosHoje,sub:"+18% vs ontem"},
                {l:"Retenção 30 dias",v:`${METRICS.retencao30d}%`,sub:"meta: 70%"},
                {l:"Temporadas ativas",v:METRICS.temporadasAtivas,sub:"1 encerrando em breve"},
              ].map((s,i)=>(
                <div key={i} style={{background:T.bg,border:`1px solid ${T.border}`,
                  borderRadius:T.radius,padding:"18px 20px",boxShadow:T.shadow}}>
                  <p style={{fontSize:11,color:T.faint,margin:"0 0 8px",textTransform:"uppercase",
                    letterSpacing:"0.05em",fontWeight:600}}>{s.l}</p>
                  <p style={{fontSize:28,fontWeight:700,color:T.text,margin:"0 0 4px",
                    letterSpacing:"-0.02em"}}>{s.v}</p>
                  <p style={{fontSize:12,color:T.muted,margin:0}}>{s.sub}</p>
                </div>
              ))}
            </div>

            {/* gráfico de barras */}
            <div style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:T.radius,
              padding:"22px 24px",marginBottom:16,boxShadow:T.shadow}}>
              <p style={{fontSize:13,fontWeight:600,color:T.text,margin:"0 0 20px",letterSpacing:"-0.01em"}}>
                Comentários por dia</p>
              <div style={{display:"flex",alignItems:"flex-end",gap:10,height:120}}>
                {METRICS.comentariosPorDia.map((v,i)=>(
                  <div key={i} style={{flex:1,display:"flex",flexDirection:"column",
                    alignItems:"center",gap:6,height:"100%"}}>
                    <span style={{fontSize:11,fontWeight:600,color:i===6?"#111":T.faint}}>{v}</span>
                    <div style={{width:"100%",flex:1,display:"flex",alignItems:"flex-end"}}>
                      <div style={{width:"100%",height:`${(v/maxBar)*100}%`,borderRadius:"6px 6px 0 0",
                        background:i===6?"#111":"#E5E7EB",minHeight:4,transition:"height 0.4s"}}/>
                    </div>
                    <span style={{fontSize:11,color:T.faint}}>{METRICS.diasSemana[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* tabela */}
            <div style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:T.radius,
              overflow:"hidden",boxShadow:T.shadow}}>
              <div style={{padding:"16px 20px",borderBottom:`1px solid ${T.border}`}}>
                <p style={{fontSize:13,fontWeight:600,color:T.text,margin:0}}>Engajamento por temporada</p>
              </div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead>
                  <tr style={{background:"#FAFAFA"}}>
                    {["Temporada","Inscritos","Comentários","Retenção"].map(h=>(
                      <th key={h} style={{padding:"10px 20px",textAlign:"left",fontSize:11,
                        color:T.faint,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",
                        borderBottom:`1px solid ${T.border}`}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {METRICS.engajamentoPorTemporada.map((row,i)=>(
                    <tr key={i} style={{borderBottom:`1px solid ${T.border}`}}>
                      <td style={{padding:"13px 20px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div style={{width:8,height:8,borderRadius:"50%",background:row.accent,flexShrink:0}}/>
                          <span style={{fontWeight:500,color:T.text}}>{row.title}</span>
                        </div>
                      </td>
                      <td style={{padding:"13px 20px",color:T.text,fontWeight:500}}>{row.inscritos.toLocaleString("pt-BR")}</td>
                      <td style={{padding:"13px 20px",color:T.text,fontWeight:500}}>{row.comentarios.toLocaleString("pt-BR")}</td>
                      <td style={{padding:"13px 20px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <div style={{width:70,height:4,background:"#F3F4F6",borderRadius:999,overflow:"hidden"}}>
                            <div style={{height:"100%",width:`${row.retencao}%`,background:row.accent,borderRadius:999}}/>
                          </div>
                          <span style={{fontSize:12,color:T.muted,fontWeight:500}}>{row.retencao}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TEMPORADAS */}
        {activeTab==="temporadas"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <p style={{fontSize:13,color:T.muted,margin:0}}>{SEASONS.length} temporadas cadastradas</p>
              <button style={{background:"#111",border:"none",color:"#fff",fontSize:13,fontWeight:600,
                padding:"8px 18px",borderRadius:T.radiusSm,cursor:"pointer",fontFamily:T.font}}>
                + Nova temporada</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {SEASONS.map(s=>(
                <div key={s.id}>
                  <div style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:T.radius,
                    padding:"14px 18px",display:"flex",alignItems:"center",gap:14,
                    boxShadow:T.shadow}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:s.accent,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{fontSize:14,fontWeight:600,color:T.text,margin:0,
                        whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",
                        letterSpacing:"-0.01em"}}>{s.title}</p>
                      <p style={{fontSize:12,color:T.faint,margin:"2px 0 0"}}>
                        {s.author} · {s.startDate}–{s.endDate} · {s.readers.toLocaleString("pt-BR")} inscritos
                      </p>
                    </div>
                    <StatusPill status={s.status}/>
                    <div style={{display:"flex",gap:8,flexShrink:0}}>
                      <button onClick={()=>setEditingId(editingId===s.id?null:s.id)}
                        style={{background:T.surf,border:`1px solid ${T.border}`,borderRadius:T.radiusSm,
                          padding:"5px 14px",fontSize:12,fontWeight:500,color:T.text,cursor:"pointer",fontFamily:T.font}}>
                        {editingId===s.id?"Fechar":"Editar"}</button>
                      <button style={{background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:T.radiusSm,
                        padding:"5px 14px",fontSize:12,fontWeight:500,color:"#B91C1C",cursor:"pointer",fontFamily:T.font}}>
                        Excluir</button>
                    </div>
                  </div>
                  {editingId===s.id&&(
                    <div style={{background:"#FAFAFA",border:`1px solid ${T.border}`,
                      borderTop:"none",borderRadius:`0 0 ${T.radius}px ${T.radius}px`,padding:"18px"}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                        {[{l:"Título",v:s.title},{l:"Autor/a",v:s.author},
                          {l:"Início",v:s.startDate},{l:"Encerramento",v:s.endDate}].map(f=>(
                          <div key={f.l}>
                            <p style={{fontSize:11,color:T.faint,margin:"0 0 4px",
                              textTransform:"uppercase",letterSpacing:"0.04em",fontWeight:600}}>{f.l}</p>
                            <input defaultValue={f.v} style={{width:"100%",boxSizing:"border-box",
                              background:T.bg,border:`1px solid ${T.border}`,borderRadius:T.radiusSm,
                              padding:"8px 10px",fontSize:13,color:T.text,outline:"none",fontFamily:T.font}}/>
                          </div>
                        ))}
                      </div>
                      <div style={{display:"flex",gap:8}}>
                        <button onClick={()=>{setEditingId(null);showToast("Alterações salvas.");}}
                          style={{background:"#111",border:"none",color:"#fff",fontSize:13,fontWeight:600,
                            padding:"8px 18px",borderRadius:T.radiusSm,cursor:"pointer",fontFamily:T.font}}>
                          Salvar</button>
                        <button onClick={()=>setEditingId(null)} style={{background:"none",
                          border:`1px solid ${T.border}`,color:T.muted,fontSize:13,
                          padding:"8px 14px",borderRadius:T.radiusSm,cursor:"pointer",fontFamily:T.font}}>
                          Cancelar</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODERAÇÃO */}
        {activeTab==="moderacao"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <p style={{fontSize:13,color:T.muted,margin:0}}>
                {flagged.length} comentário{flagged.length!==1?"s":""} aguardando revisão
              </p>
            </div>
            {flagged.length===0?(
              <div style={{textAlign:"center",padding:"80px 0"}}>
                <div style={{fontSize:40,marginBottom:12}}>✓</div>
                <p style={{fontSize:16,fontWeight:600,color:T.text,margin:"0 0 4px"}}>Tudo limpo!</p>
                <p style={{fontSize:13,color:T.muted,margin:0}}>Nenhum comentário pendente de revisão.</p>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {flagged.map(c=>(
                  <div key={c.id} style={{background:T.bg,border:`1px solid ${T.border}`,
                    borderRadius:T.radius,padding:"18px 20px",boxShadow:T.shadow}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                      <Avatar initials={c.user.slice(0,2).toUpperCase()} bg="#6B7280" size={30}/>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <span style={{fontSize:13,fontWeight:600,color:T.text}}>{c.user}</span>
                          <ReasonBadge reason={c.reason}/>
                          <span style={{fontSize:12,color:T.faint}}>{c.reports} denúncias</span>
                          <span style={{marginLeft:"auto",fontSize:12,color:T.faint}}>{c.time}</span>
                        </div>
                        <span style={{fontSize:12,color:T.faint}}>{c.book} · {c.chapter}</span>
                      </div>
                    </div>
                    <p style={{fontSize:13,color:T.text,lineHeight:1.6,margin:"0 0 14px",
                      background:T.surf,borderRadius:T.radiusSm,padding:"10px 14px",
                      border:`1px solid ${T.border}`}}>
                      "{c.text}"
                    </p>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <button onClick={()=>moderate(c.id,"approve")}
                        style={{background:"#ECFDF5",border:"1px solid #6EE7B7",color:"#065F46",
                          fontSize:13,fontWeight:600,padding:"7px 16px",borderRadius:T.radiusSm,
                          cursor:"pointer",fontFamily:T.font}}>✓ Aprovar</button>
                      <button onClick={()=>moderate(c.id,"remove")}
                        style={{background:"#FEF2F2",border:"1px solid #FECACA",color:"#B91C1C",
                          fontSize:13,fontWeight:600,padding:"7px 16px",borderRadius:T.radiusSm,
                          cursor:"pointer",fontFamily:T.font}}>Remover</button>
                      <button onClick={()=>moderate(c.id,"warn")}
                        style={{background:"none",border:`1px solid ${T.border}`,color:T.muted,
                          fontSize:13,padding:"7px 14px",borderRadius:T.radiusSm,
                          cursor:"pointer",fontFamily:T.font}}>Advertir</button>
                      <span style={{marginLeft:"auto",fontSize:11,color:T.faint}}>
                        {new Date().toLocaleDateString("pt-BR")} · admin
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// LANDING PAGE
// ════════════════════════════════════════════════════════════════════
const LandingView = ({ onEnter, onLogin, onGoSeason }) => {
  const P = { font: T.font };

  const HowCard = ({ n, title, desc }) => (
    <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 24 }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.surf,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 16 }}>{n}</div>
      <p style={{ fontSize: 14, fontWeight: 600, color: T.text, margin: "0 0 6px", letterSpacing: "-0.01em" }}>{title}</p>
      <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65, margin: 0 }}>{desc}</p>
    </div>
  );

  const SeasonPreview = ({ season }) => (
    <div onClick={() => onGoSeason(season)}
      style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: T.radius,
        overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.2s",  }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = T.shadowHov}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
      <div style={{ height: 100, background: `linear-gradient(160deg,${season.coverA},${season.coverB})`,
        display: "flex", alignItems: "flex-end", padding: "12px 14px" }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
          color: "#fff", background: "rgba(0,0,0,0.3)", padding: "3px 8px", borderRadius: 999 }}>
          {GENRE_LABELS[season.genre]}
        </span>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: T.text, margin: "0 0 2px", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
          {season.title}
        </p>
        <p style={{ fontSize: 11, color: T.faint, margin: "0 0 10px", fontStyle: "italic" }}>{season.author}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <StatusPill status={season.status} />
          <span style={{ fontSize: 11, color: T.faint }}>{season.readers.toLocaleString("pt-BR")} leitores</span>
        </div>
      </div>
    </div>
  );

  const Quote = ({ text, name, meta, bg }) => (
    <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 20 }}>
      <p style={{ fontSize: 13, color: T.text, lineHeight: 1.7, margin: "0 0 16px",
        fontFamily: "Georgia, serif", fontStyle: "italic" }}>"{text}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: bg, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 600, color: "#fff" }}>{name.split(" ").map(n => n[0]).join("")}</div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: T.text, margin: 0 }}>{name}</p>
          <p style={{ fontSize: 11, color: T.faint, margin: 0 }}>{meta}</p>
        </div>
      </div>
    </div>
  );

  const activeSeason = SEASONS.filter(s => s.status === "ativa");

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: P.font, color: T.text }}>

      {/* ── Nav ── */}
      <header style={{ background: T.bg, borderBottom: `1px solid ${T.border}`,
        padding: "0 40px", display: "flex", alignItems: "center", height: 56, gap: 24,
        position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "#111",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontFamily: "Georgia,serif", color: "#fff" }}>C</div>
          <span style={{ fontSize: 16, fontWeight: 600, color: T.text, letterSpacing: "-0.02em" }}>Cliffy</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {["Como funciona", "Temporadas", "Insígnias"].map(l => (
            <button key={l} style={{ background: "none", border: "none", fontSize: 13,
              color: T.muted, padding: "6px 12px", borderRadius: T.radiusSm, cursor: "pointer",
              fontFamily: P.font }}>{l}</button>
          ))}
          <button onClick={onLogin} style={{ background: "none", border: `1px solid ${T.border}`, fontSize: 13,
            fontWeight: 500, color: T.text, padding: "7px 18px", borderRadius: T.radiusSm,
            cursor: "pointer", fontFamily: P.font, marginLeft: 8 }}>Entrar</button>
          <button onClick={onEnter} style={{ background: "#111", border: "none", fontSize: 13,
            fontWeight: 600, color: "#fff", padding: "7px 18px", borderRadius: T.radiusSm,
            cursor: "pointer", fontFamily: P.font }}>Começar grátis</button>
        </div>
      </header>

      {/* ── Hero ── */}
      <div style={{ background: T.bg, borderBottom: `1px solid ${T.border}`,
        padding: "80px 40px 72px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12,
          fontWeight: 500, color: T.muted, background: T.surf, border: `1px solid ${T.border}`,
          padding: "4px 14px", borderRadius: 999, marginBottom: 28 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
          3 temporadas abertas agora
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 700, color: T.text, letterSpacing: "-0.04em",
          lineHeight: 1.05, margin: "0 0 18px", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          Leia junto.<br />
          <span style={{ color: T.faint, fontWeight: 300 }}>Sem spoilers.</span>
        </h1>
        <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.7, maxWidth: 460,
          margin: "0 auto 36px" }}>
          Entre numa temporada de leitura coletiva, leia no seu ritmo e comente capítulo a capítulo — sem medo de estragar a história pra ninguém.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 44 }}>
          <button onClick={onEnter} style={{ background: "#111", border: "none", color: "#fff",
            fontSize: 15, fontWeight: 600, padding: "12px 28px", borderRadius: T.radiusSm,
            cursor: "pointer", fontFamily: P.font }}>Escolher uma temporada</button>
          <button style={{ background: "none", border: `1px solid ${T.border}`, color: T.text,
            fontSize: 15, fontWeight: 500, padding: "12px 24px", borderRadius: T.radiusSm,
            cursor: "pointer", fontFamily: P.font }}>Ver como funciona</button>
        </div>
        {/* avatares */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ display: "flex" }}>
            {[["NP","#C0392B"],["AL","#2D7A3E"],["BS","#1D6FA4"],["CM","#9B1D6A"],["DR","#7C3AED"]].map(([i,c],idx) => (
              <div key={idx} style={{ width: 28, height: 28, borderRadius: "50%", background: c,
                border: `2px solid ${T.bg}`, marginLeft: idx === 0 ? 0 : -8,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 600, color: "#fff" }}>{i}</div>
            ))}
          </div>
          <span style={{ fontSize: 13, color: T.faint }}>+5.300 leitores ativos</span>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ background: T.bg, borderBottom: `1px solid ${T.border}`,
        display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {[
          { l: "Leitores ativos",      v: "5.339" },
          { l: "Temporadas abertas",   v: "3"     },
          { l: "Comentários hoje",     v: "847"   },
          { l: "Próxima temporada",    v: "1 jul" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "24px 40px",
            borderRight: i < 3 ? `1px solid ${T.border}` : "none" }}>
            <p style={{ fontSize: 30, fontWeight: 700, color: T.text, margin: "0 0 4px",
              letterSpacing: "-0.03em" }}>{s.v}</p>
            <p style={{ fontSize: 12, color: T.faint, margin: 0 }}>{s.l}</p>
          </div>
        ))}
      </div>

      {/* ── Como funciona ── */}
      <div style={{ background: T.surf, borderBottom: `1px solid ${T.border}`, padding: "60px 40px" }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
          color: T.faint, margin: "0 0 10px" }}>Como funciona</p>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: T.text, letterSpacing: "-0.03em",
          margin: "0 0 8px", lineHeight: 1.15 }}>
          Simples como um clube do livro.
        </h2>
        <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.7, maxWidth: 440, margin: "0 0 36px" }}>
          Sem reuniões agendadas, sem pressão. Leia quando puder e entre na conversa no seu ritmo.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          <HowCard n="1" title="Escolha uma temporada" desc="Selecione um livro em leitura coletiva e se inscreva. Gratuito, sem cartão de crédito." />
          <HowCard n="2" title="Leia e marque como lido" desc="Termine um capítulo e marque como lido para desbloquear os comentários daquela parte." />
          <HowCard n="3" title="Comente sem medo" desc="Interaja com outras leitores que já chegaram até onde você chegou — sem spoilers." />
        </div>
      </div>

      {/* ── Temporadas em aberto ── */}
      <div style={{ padding: "60px 40px", background: T.bg, borderBottom: `1px solid ${T.border}` }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
          color: T.faint, margin: "0 0 10px" }}>Temporadas</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: T.text, letterSpacing: "-0.03em", lineHeight: 1.15, margin: 0 }}>
            O que estamos lendo <span style={{ color: T.faint, fontWeight: 300 }}>agora</span>
          </h2>
          <button onClick={onEnter} style={{ background: "none", border: `1px solid ${T.border}`,
            color: T.muted, fontSize: 13, fontWeight: 500, padding: "8px 18px",
            borderRadius: T.radiusSm, cursor: "pointer", fontFamily: P.font, flexShrink: 0 }}>
            Ver todas →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {SEASONS.slice(0, 3).map(s => <SeasonPreview key={s.id} season={s} />)}
        </div>
      </div>

      {/* ── Spoiler Shield ── */}
      <div style={{ background: T.surf, borderBottom: `1px solid ${T.border}`,
        padding: "60px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
            color: T.faint, margin: "0 0 10px" }}>Spoiler Shield</p>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: T.text, letterSpacing: "-0.03em",
            lineHeight: 1.15, margin: "0 0 16px" }}>
            Leia no seu ritmo.<br />
            <span style={{ color: T.faint, fontWeight: 300 }}>Os comentários esperam.</span>
          </h2>
          <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.75, margin: "0 0 24px" }}>
            Nossa tecnologia garante que você só veja comentários de capítulos que já leu. Nada de surpresas estragadas — mesmo que você demore semanas a mais que todo mundo.
          </p>
          <button onClick={onEnter} style={{ background: "#111", border: "none", color: "#fff",
            fontSize: 13, fontWeight: 600, padding: "10px 22px", borderRadius: T.radiusSm,
            cursor: "pointer", fontFamily: P.font }}>Experimentar grátis</button>
        </div>
        {/* demo visual */}
        <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}`,
            display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C0392B" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>A Corte de Espinhos e Rosas</span>
          </div>
          {[
            { label: "Capítulo 3 — A fera", sub: "47 comentários · lido", read: true },
            { label: "Capítulo 4 — Prythian", sub: "31 comentários · lido", read: true },
            { label: "Capítulo 5 — A mansão de Tamlin", sub: "Protegido pelo Spoiler Shield", read: false },
          ].map((ch, i) => (
            <div key={i} style={{ padding: "10px 16px", borderBottom: `1px solid ${T.border}`,
              display: "flex", alignItems: "center", gap: 10, opacity: ch.read ? 1 : 0.45 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                background: ch.read ? "#10B981" : T.surf, border: `1px solid ${ch.read ? "#10B981" : T.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, color: "#fff", fontWeight: 700 }}>
                {ch.read ? "✓" : "🔒"}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: T.text }}>{ch.label}</p>
                <p style={{ margin: 0, fontSize: 11, color: T.faint }}>{ch.sub}</p>
              </div>
            </div>
          ))}
          <div style={{ padding: "24px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🛡️</div>
            <p style={{ fontSize: 13, fontWeight: 600, color: T.text, margin: "0 0 4px" }}>Spoiler Shield ativo</p>
            <p style={{ fontSize: 12, color: T.muted, margin: "0 0 14px", lineHeight: 1.5 }}>
              Marque o capítulo 5 como lido para ver os comentários.
            </p>
            <button style={{ background: "#C0392B", border: "none", color: "#fff",
              fontSize: 12, fontWeight: 600, padding: "8px 20px", borderRadius: T.radiusSm,
              cursor: "pointer", fontFamily: P.font }}>Marcar como lido</button>
          </div>
        </div>
      </div>

      {/* ── Insígnias ── */}
      <div style={{ padding: "60px 40px", background: T.bg, borderBottom: `1px solid ${T.border}` }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
          color: T.faint, margin: "0 0 10px" }}>Insígnias</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: T.text, letterSpacing: "-0.03em", lineHeight: 1.15, margin: 0 }}>
            Quanto mais você lê,{" "}
            <span style={{ color: T.faint, fontWeight: 300 }}>mais você ganha.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {[
            { icon: "⭐", label: "Estreante",          desc: "Concluiu a primeira temporada", locked: false },
            { icon: "💬", label: "Comentarista",       desc: "Postou 50 comentários",         locked: false },
            { icon: "✨", label: "Voz da Comunidade",  desc: "Recebeu 100 reações",           locked: false },
            { icon: "📚", label: "Leitor Fiel",        desc: "Concluiu 5 temporadas",         locked: true  },
            { icon: "🏆", label: "Curador",            desc: "Teve livro proposto vencer",    locked: true  },
            { icon: "🌟", label: "Destaque do Mês",    desc: "Comentário mais curtido",       locked: true  },
          ].map((b, i) => (
            <div key={i} style={{ background: b.locked ? T.surf : T.bg,
              border: `1px solid ${T.border}`, borderRadius: T.radius,
              padding: "20px", textAlign: "center", opacity: b.locked ? 0.5 : 1 }}>
              <div style={{ fontSize: 30, marginBottom: 10, filter: b.locked ? "grayscale(1)" : "none" }}>{b.icon}</div>
              <p style={{ fontSize: 13, fontWeight: 600, color: T.text, margin: "0 0 4px", letterSpacing: "-0.01em" }}>{b.label}</p>
              <p style={{ fontSize: 12, color: T.muted, margin: 0, lineHeight: 1.5 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Depoimentos ── */}
      <div style={{ background: T.surf, borderBottom: `1px solid ${T.border}`, padding: "60px 40px" }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
          color: T.faint, margin: "0 0 10px" }}>Comunidade</p>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: T.text, letterSpacing: "-0.03em",
          margin: "0 0 32px", lineHeight: 1.15 }}>O que as leitores estão dizendo</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          <Quote text="Finalmente consigo participar de uma leitura coletiva sem me preocupar com spoilers. Leio no meu ritmo e entro na discussão quando termino cada parte."
            name="Beatriz Souza" meta="3 temporadas concluídas" bg="#C0392B" />
          <Quote text="Os comentários do capítulo 3 do ACOTAR me fizeram rir e chorar ao mesmo tempo. Essa comunidade é demais."
            name="Ana Lima" meta="Voz da Comunidade" bg="#2D7A3E" />
          <Quote text="Indiquei para cinco amigas. A gente conseguiu ler o mesmo livro, cada uma no seu ritmo, e ainda trocar impressões sem estragar nada."
            name="Carol Martins" meta="Estreante · 1ª temporada" bg="#7C3AED" />
        </div>
      </div>

      {/* ── CTA final ── */}
      <div style={{ background: T.bg, padding: "88px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: 40, fontWeight: 700, color: T.text, letterSpacing: "-0.03em",
          margin: "0 0 12px", lineHeight: 1.1 }}>Pronto pra começar?</h2>
        <p style={{ fontSize: 15, color: T.muted, margin: "0 0 32px", lineHeight: 1.7 }}>
          Gratuito. Sem cartão de crédito. Entre numa temporada em menos de 2 minutos.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <button onClick={onEnter} style={{ background: "#111", border: "none", color: "#fff",
            fontSize: 15, fontWeight: 600, padding: "13px 32px", borderRadius: T.radiusSm,
            cursor: "pointer", fontFamily: P.font }}>Escolher uma temporada</button>
          <button style={{ background: "none", border: `1px solid ${T.border}`, color: T.text,
            fontSize: 15, fontWeight: 500, padding: "13px 24px", borderRadius: T.radiusSm,
            cursor: "pointer", fontFamily: P.font }}>Ver como funciona</button>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ padding: "24px 40px", borderTop: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "#111",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontFamily: "Georgia,serif", color: "#fff" }}>C</div>
          <span style={{ fontSize: 13, color: T.muted }}>Cliffy — Leitura social assíncrona, sem spoilers.</span>
        </div>
        <span style={{ fontSize: 12, color: T.faint }}>MVP · pt-BR · v1.0</span>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// LOGIN / CADASTRO
// ════════════════════════════════════════════════════════════════════
const LoginView = ({ onLogin, onBack }) => {
  const [tab, setTab]           = useState("login");   // "login" | "register"
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const FAKE_EMAIL = "natalia@cliffy.app";
  const FAKE_PASS  = "cliffy123";

  const handleSubmit = () => {
    if (!email || !password || (tab === "register" && !name)) {
      setError("Preencha todos os campos.");
      return;
    }
    if (tab === "login" && (email !== FAKE_EMAIL || password !== FAKE_PASS)) {
      setError("E-mail ou senha incorretos. Use as credenciais de demonstração abaixo.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 900);
  };

  const fillDemo = () => { setEmail(FAKE_EMAIL); setPassword(FAKE_PASS); setError(""); };

  const Field = ({ label, type, value, onChange, placeholder, action }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{label}</label>
        {action}
      </div>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ width: "100%", boxSizing: "border-box", background: T.surf,
            border: `1px solid ${T.border}`, borderRadius: T.radiusSm,
            padding: "10px 14px", fontSize: 13, color: T.text,
            outline: "none", fontFamily: T.font }}
          onFocus={e => e.target.style.borderColor = "#111"}
          onBlur={e => e.target.style.borderColor = T.border}
        />
        {label === "Senha" && (
          <button onClick={() => setShowPass(v => !v)}
            style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer",
              fontSize: 12, color: T.faint, fontFamily: T.font, padding: 0 }}>
            {showPass ? "ocultar" : "mostrar"}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: T.font,
      display: "flex", flexDirection: "column" }}>

      {/* nav mínimo */}
      <header style={{ background: T.bg, borderBottom: `1px solid ${T.border}`,
        padding: "0 40px", display: "flex", alignItems: "center", height: 56 }}>
        <div onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "#111",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontFamily: "Georgia,serif", color: "#fff" }}>C</div>
          <span style={{ fontSize: 16, fontWeight: 600, color: T.text, letterSpacing: "-0.02em" }}>Cliffy</span>
        </div>
      </header>

      {/* conteúdo principal em dois painéis */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "calc(100vh - 56px)" }}>

        {/* painel esquerdo — visual */}
        <div style={{ background: "#111", padding: "48px 52px", display: "flex",
          flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
          {/* círculos decorativos */}
          <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300,
            borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)" }}/>
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200,
            borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }}/>
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240,
            borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }}/>

          <div style={{ position: "relative" }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>
              Cliffy · Leitura Social
            </p>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em",
              lineHeight: 1.1, margin: "0 0 16px" }}>
              Leia junto.<br />
              <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>Sem spoilers.</span>
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0, maxWidth: 320 }}>
              Entre numa temporada de leitura coletiva e comente capítulo a capítulo — sem medo de estragar a história pra ninguém.
            </p>
          </div>

          {/* preview de stats */}
          <div style={{ position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
              {[
                { l: "Leitores ativos", v: "5.339" },
                { l: "Temporadas abertas", v: "3" },
                { l: "Comentários hoje", v: "847" },
                { l: "Próxima temporada", v: "1 jul" },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: T.radiusSm, padding: "14px 16px" }}>
                  <p style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 2px",
                    letterSpacing: "-0.02em" }}>{s.v}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", margin: 0 }}>{s.l}</p>
                </div>
              ))}
            </div>

            {/* depoimento */}
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: T.radiusSm, padding: "18px 20px" }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7,
                margin: "0 0 14px", fontFamily: "Georgia,serif", fontStyle: "italic" }}>
                "Finalmente consigo participar de uma leitura coletiva sem me preocupar com spoilers."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#C0392B",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 600, color: "#fff", flexShrink: 0 }}>BS</div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: "#fff", margin: 0 }}>Beatriz Souza</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", margin: 0 }}>3 temporadas concluídas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* painel direito — form */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
          padding: "48px 52px", background: T.bg }}>
          <div style={{ width: "100%", maxWidth: 380 }}>

            {/* tabs login / cadastro */}
            <div style={{ display: "flex", background: T.surf, borderRadius: T.radiusSm,
              padding: 4, marginBottom: 32, border: `1px solid ${T.border}` }}>
              {["login", "register"].map(t => (
                <button key={t} onClick={() => { setTab(t); setError(""); }}
                  style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: "none", cursor: "pointer",
                    fontSize: 13, fontWeight: 500, fontFamily: T.font, transition: "all 0.15s",
                    background: tab === t ? T.bg : "transparent",
                    color: tab === t ? T.text : T.faint,
                    boxShadow: tab === t ? `0 1px 4px rgba(0,0,0,0.08)` : "none" }}>
                  {t === "login" ? "Entrar" : "Criar conta"}
                </button>
              ))}
            </div>

            {tab === "login" ? (
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: T.text, margin: "0 0 6px",
                  letterSpacing: "-0.02em" }}>Bem-vindo de volta</h1>
                <p style={{ fontSize: 14, color: T.muted, margin: "0 0 28px" }}>
                  Entre na sua conta para continuar lendo.
                </p>
              </div>
            ) : (
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: T.text, margin: "0 0 6px",
                  letterSpacing: "-0.02em" }}>Criar sua conta</h1>
                <p style={{ fontSize: 14, color: T.muted, margin: "0 0 28px" }}>
                  Gratuito. Sem cartão. Pronto em 2 minutos.
                </p>
              </div>
            )}

            {/* OAuth */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {[
                { label: "Continuar com Google", icon: "G" },
                { label: "Continuar com Apple",  icon: "" },
              ].map(btn => (
                <button key={btn.label} style={{ width: "100%", background: T.bg,
                  border: `1px solid ${T.border}`, borderRadius: T.radiusSm,
                  padding: "10px 0", fontSize: 13, fontWeight: 500, color: T.text,
                  cursor: "pointer", fontFamily: T.font, display: "flex",
                  alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{btn.icon}</span>
                  {btn.label}
                </button>
              ))}
            </div>

            {/* divisor */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: "0.5px", background: T.border }}/>
              <span style={{ fontSize: 12, color: T.faint }}>ou com e-mail</span>
              <div style={{ flex: 1, height: "0.5px", background: T.border }}/>
            </div>

            {/* campos */}
            {tab === "register" && (
              <Field label="Nome completo" type="text" value={name}
                onChange={setName} placeholder="Seu nome"/>
            )}
            <Field label="E-mail" type="email" value={email}
              onChange={setEmail} placeholder="voce@email.com"/>
            <Field label="Senha" type={showPass ? "text" : "password"} value={password}
              onChange={setPassword} placeholder="Mínimo 8 caracteres"
              action={tab === "login"
                ? <button style={{ background: "none", border: "none", fontSize: 12,
                    color: "#C0392B", cursor: "pointer", fontFamily: T.font, padding: 0,
                    fontWeight: 500 }}>Esqueci a senha</button>
                : null}
            />

            {tab === "register" && (
              <p style={{ fontSize: 12, color: T.faint, lineHeight: 1.6, margin: "0 0 14px" }}>
                Ao criar sua conta você concorda com os{" "}
                <span style={{ color: T.text, fontWeight: 500, cursor: "pointer" }}>Termos de Uso</span>{" "}
                e a{" "}
                <span style={{ color: T.text, fontWeight: 500, cursor: "pointer" }}>Política de Privacidade</span>.
              </p>
            )}

            {/* credenciais de demo — só aparece na aba login */}
            {tab === "login" && (
              <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A",
                borderRadius: T.radiusSm, padding: "12px 14px", marginBottom: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#92400E", margin: "0 0 6px",
                  textTransform: "uppercase", letterSpacing: "0.05em" }}>Conta de demonstração</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 12, color: "#78350F", margin: "0 0 2px" }}>
                      <strong>E-mail:</strong> natalia@cliffy.app
                    </p>
                    <p style={{ fontSize: 12, color: "#78350F", margin: 0 }}>
                      <strong>Senha:</strong> cliffy123
                    </p>
                  </div>
                  <button onClick={fillDemo} style={{ background: "#F59E0B", border: "none",
                    color: "#fff", fontSize: 12, fontWeight: 600, padding: "6px 12px",
                    borderRadius: 6, cursor: "pointer", fontFamily: T.font, flexShrink: 0 }}>
                    Preencher
                  </button>
                </div>
              </div>
            )}

            {/* erro */}
            {error && (
              <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: T.radiusSm,
                padding: "10px 14px", marginBottom: 14 }}>
                <p style={{ fontSize: 13, color: "#B91C1C", margin: 0 }}>{error}</p>
              </div>
            )}

            {/* botão principal */}
            <button onClick={handleSubmit} disabled={loading}
              style={{ width: "100%", background: loading ? "#555" : "#111", border: "none",
                color: "#fff", fontSize: 14, fontWeight: 600, padding: "12px",
                borderRadius: T.radiusSm, cursor: loading ? "default" : "pointer",
                fontFamily: T.font, transition: "background 0.2s", marginBottom: 16 }}>
              {loading ? "Entrando…" : tab === "login" ? "Entrar" : "Criar conta"}
            </button>

            <p style={{ fontSize: 13, color: T.faint, textAlign: "center", margin: 0 }}>
              {tab === "login" ? "Não tem conta? " : "Já tem conta? "}
              <span onClick={() => { setTab(tab === "login" ? "register" : "login"); setError(""); }}
                style={{ color: T.text, fontWeight: 600, cursor: "pointer" }}>
                {tab === "login" ? "Criar grátis" : "Entrar"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// WRAPPED VIEW — retrospectiva de temporada encerrada
// ════════════════════════════════════════════════════════════════════
const WrappedView = ({ season, onBack }) => {
  const totalRead    = season.chapters.length;
  const totalComments= season.comments;
  const topTropes    = season.tropes;

  const Stat = ({ emoji, value, label }) => (
    <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: T.radius,
      padding: "24px 20px", textAlign: "center" }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{emoji}</div>
      <p style={{ fontSize: 32, fontWeight: 800, color: T.text, margin: "0 0 4px",
        letterSpacing: "-0.03em" }}>{value}</p>
      <p style={{ fontSize: 12, color: T.faint, margin: 0, textTransform: "uppercase",
        letterSpacing: "0.06em", fontWeight: 600 }}>{label}</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: T.font, color: T.text }}>

      {/* topbar */}
      <header style={{ background: T.bg, borderBottom: `1px solid ${T.border}`,
        padding: "0 24px", display: "flex", alignItems: "center", height: 56 }}>
        <button onClick={onBack} style={{ background: "none", border: `1px solid ${T.border}`,
          borderRadius: T.radiusSm, padding: "5px 12px", fontSize: 13, color: T.muted,
          cursor: "pointer", fontFamily: T.font }}>← Voltar</button>
      </header>

      {/* hero */}
      <div style={{ background: `linear-gradient(160deg,${season.coverA},${season.coverB})`,
        padding: "56px 32px 48px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.55))" }}/>
        <div style={{ position: "relative" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 12px" }}>
            Temporada encerrada
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: "0 0 6px",
            letterSpacing: "-0.02em", lineHeight: 1.1 }}>{season.title}</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: "0 0 4px",
            fontStyle: "italic" }}>{season.author}</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0 }}>
            {season.startDate} – {season.endDate}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 24px 64px" }}>

        {/* stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>
          <Stat emoji="📖" value={totalRead} label="Capítulos"/>
          <Stat emoji="💬" value={totalComments.toLocaleString("pt-BR")} label="Comentários"/>
          <Stat emoji="👥" value={season.readers.toLocaleString("pt-BR")} label="Leitores"/>
        </div>

        {/* tropes */}
        <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: T.radius,
          padding: "20px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", color: T.faint, margin: "0 0 12px" }}>Tropes da temporada</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {topTropes.map(t => (
              <span key={t} style={{ fontSize: 13, fontWeight: 600, padding: "6px 14px",
                borderRadius: 999, background: season.accentBg, color: season.accent }}>
                {TROPE_LABELS[t]}
              </span>
            ))}
          </div>
        </div>

        {/* comentário destaque */}
        <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: T.radius,
          padding: "20px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", color: T.faint, margin: "0 0 14px" }}>
            Comentário mais curtido
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <Avatar initials="DR" bg="#9B1D6A" size={36}/>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Dani Rocha</span>
                <span style={{ fontSize: 11, color: T.faint }}>❤️ 41 reações</span>
              </div>
              <div style={{ background: "#FFFBEB", borderLeft: "3px solid #F59E0B",
                borderRadius: "0 6px 6px 0", padding: "8px 12px",
                fontSize: 13, color: "#92400E", fontFamily: "Georgia,serif",
                fontStyle: "italic", lineHeight: 1.6 }}>
                "Havia algo de errado com aquele olhar — era inteligente demais, humano demais para pertencer a uma fera."
              </div>
            </div>
          </div>
        </div>

        {/* sua participação */}
        <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: T.radius,
          padding: "20px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", color: T.faint, margin: "0 0 14px" }}>
            Sua participação
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "Capítulos lidos", value: totalRead, pct: 100 },
              { label: "Comentários postados", value: 4, pct: null },
            ].map((item, i) => (
              <div key={i} style={{ background: T.surf, borderRadius: T.radiusSm,
                padding: "14px", border: `1px solid ${T.border}` }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 2px",
                  letterSpacing: "-0.02em" }}>{item.value}</p>
                <p style={{ fontSize: 11, color: T.faint, margin: "0 0 8px",
                  textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</p>
                {item.pct !== null && (
                  <div style={{ height: 3, background: "#F3F4F6", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${item.pct}%`,
                      background: season.accent, borderRadius: 999 }}/>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// ROOT
// ════════════════════════════════════════════════════════════════════
export default function CliftyApp() {
  const [view,setView]       = useState("landing");
  const [season,setSeason]   = useState(null);
  const [enrollSeason,setEnrollSeason] = useState(null);

  const goToSeason    = (s) => { setSeason(s); setView("chapter"); };
  const goHome        = ()  => { setView("home"); setSeason(null); };
  const goToLanding   = ()  => setView("landing");
  const goToLogin     = ()  => setView("login");
  const goToProfile   = ()  => setView("profile");
  const goToEnroll    = (s) => { setEnrollSeason(s); setView("enroll"); };
  const closeEnroll   = ()  => { setView("home"); setEnrollSeason(null); };
  const confirmEnroll = (s) => { setSeason(s); setView("chapter"); };
  const goToAdmin     = ()  => setView("admin");
  const goToWrapped   = (s) => { setSeason(s); setView("wrapped"); };

  if (view==="chapter" && season)       return <ChapterView season={season} onBack={goHome}/>;
  if (view==="profile")                 return <ProfileView onBack={goHome}/>;
  if (view==="enroll" && enrollSeason)  return <EnrollFlow season={enrollSeason} onClose={closeEnroll} onConfirm={confirmEnroll}/>;
  if (view==="admin")                   return <AdminView onBack={goHome}/>;
  if (view==="login")                   return <LoginView onLogin={goHome} onBack={goToLanding}/>;
  if (view==="wrapped" && season)       return <WrappedView season={season} onBack={goHome}/>;
  if (view==="home")                    return <HomeView onSelectSeason={goToSeason} onGoProfile={goToProfile} onEnroll={goToEnroll} onGoAdmin={goToAdmin} onWrapped={goToWrapped}/>;
  return <LandingView onEnter={goHome} onLogin={goToLogin} onGoSeason={goToSeason}/>;
}
