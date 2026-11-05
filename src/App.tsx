import { useMemo, useState } from 'react';
import planos from './data/planos.json';

type Plano = typeof planos[number];
const nomes = ['1º', '2º', '3º', '4º'];
const secoes = [
  { key: 'objetos', titulo: 'Objetos de conhecimento' },
  { key: 'competencias', titulo: 'Competências específicas de Matemática' },
  { key: 'metodologia', titulo: 'Metodologia e recursos' },
  { key: 'avaliacao', titulo: 'Avaliação' },
  { key: 'referencias', titulo: 'Referências' },
] as const;
function exportarJSON() {
  const blob = new Blob([JSON.stringify(planos, null, 2)], {type:'application/json;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'planos-matematica-7ano-2026.json'; a.click();
  URL.revokeObjectURL(url);
}
export default function App() {
  const [bimestre, setBimestre] = useState(1);
  const [busca, setBusca] = useState('');
  const [abertos, setAbertos] = useState<string[]>(['objetos','habilidades','competencias','metodologia','avaliacao','referencias']);
  const plano: Plano = planos.find(p => p.bimestre === bimestre)!;
  const habilidades = useMemo(() => plano.habilidades.filter(h => `${h.codigo} ${h.descricao}`.toLowerCase().includes(busca.toLowerCase().trim())), [plano,busca]);
  function alternar(s: string) {setAbertos(a => a.includes(s) ? a.filter(x=>x!==s) : [...a,s]);}
  return <div className="shell">
    <header className="hero">
      <div className="eyebrow">EDULAB • PLANEJAMENTO PEDAGÓGICO 2026</div>
      <h1>Planos de Curso <span>Matemática • 7º ano</span></h1>
      <p>EMEIF José Antônio Barros · Diamante/PB</p>
      <p className="prof">Professor: Daniel Acácio Cordeiro</p>
    </header>
    <main>
      <div className="stats">
        <div><strong>4</strong><small>planos bimestrais</small></div>
        <div><strong>37</strong><small>habilidades BNCC</small></div>
        <div><strong>202</strong><small>dias letivos municipais</small></div>
      </div>
      <nav className="tabs" aria-label="Selecionar bimestre">{planos.map(p=><button key={p.bimestre} className={bimestre===p.bimestre?'active':''} onClick={()=>{setBimestre(p.bimestre);setBusca('')}}>{nomes[p.bimestre-1]} bimestre</button>)}</nav>
      <div className="toolbar">
        <div><h2>{nomes[bimestre-1]} bimestre</h2><p>{plano.inicio} a {plano.fim}/2026 · {plano.dias} dias letivos · {plano.habilidades.length} habilidades</p></div>
        <div className="actions"><button onClick={()=>window.print()}>Imprimir / salvar PDF</button><button onClick={exportarJSON}>Exportar JSON</button></div>
      </div>
      <aside className="note"><b>Nota pedagógica:</b> a distribuição das habilidades entre os bimestres é uma proposta de organização didática, não uma determinação expressa no calendário municipal. As competências apresentadas são sínteses contextualizadas, não transcrições literais da BNCC.</aside>
      <div className="sections">
      <section className="panel">
        <button className="sectionButton" onClick={()=>alternar('habilidades')} aria-expanded={abertos.includes('habilidades')}><span>Habilidades da BNCC <em>({plano.habilidades.length})</em></span><span>{abertos.includes('habilidades')?'−':'+'}</span></button>
        {abertos.includes('habilidades')&&<div className="panelBody">
          <input aria-label="Buscar habilidade" placeholder="Pesquisar código ou palavra-chave..." value={busca} onChange={e=>setBusca(e.target.value)}/>
          <p className="result">{habilidades.length} habilidade(s) encontrada(s)</p>
          {habilidades.map(h=><article className="skill" key={h.codigo}><strong>{h.codigo}</strong><p>{h.descricao}</p><button className="copy" onClick={()=>navigator.clipboard?.writeText(`${h.codigo} – ${h.descricao}`)}>Copiar</button></article>)}
          {habilidades.length===0&&<p>Nenhuma habilidade encontrada.</p>}
        </div>}
      </section>
      {secoes.map(s=><section className="panel" key={s.key}><button className="sectionButton" onClick={()=>alternar(s.key)} aria-expanded={abertos.includes(s.key)}><span>{s.titulo}</span><span>{abertos.includes(s.key)?'−':'+'}</span></button>{abertos.includes(s.key)&&<div className="panelBody">{plano[s.key].map((t,i)=><p key={i} className="paragraph">{t}</p>)}</div>}</section>)}
      </div>
      <footer>Fonte: BNCC (2018), relação escolar de habilidades e Calendário Escolar 2026 de Diamante/PB. Conteúdo pedagógico editável em <code>src/data/planos.json</code>.</footer>
    </main>
  </div>;
}