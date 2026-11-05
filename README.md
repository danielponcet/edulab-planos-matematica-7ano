# EduLab — Planos de Curso de Matemática — 7º Ano — 2026

Projeto React + TypeScript + Vite pronto para receber ajustes no Lovable.

## Funcionalidades já implementadas
- Quatro planos de curso individuais com seleção por bimestre.
- 37 habilidades da BNCC, com descrições integrais, extraídas dos DOCX previamente elaborados.
- Objetos de conhecimento, competências contextualizadas, metodologia, avaliação e referências.
- Busca por código e descrição, copiar habilidade, impressão e exportação JSON.
- Layout responsivo e sem banco de dados, login, API ou serviços pagos.

## Como executar
```bash
npm install
npm run dev
npm run build
```

## Como levar ao Lovable
O caminho mais confiável é subir estes arquivos em um repositório GitHub e usar a integração/importação disponível na sua conta Lovable. A possibilidade de importar um projeto preexistente pode variar conforme o produto e a conta. Alternativamente, crie o projeto com o prompt do arquivo PROMPT_LOVABLE.txt e copie os arquivos do repositório para o projeto.

## Fonte dos dados
`src/data/planos.json` foi extraído dos quatro arquivos Word gerados anteriormente para a EMEIF José Antônio Barros. A divisão das habilidades por bimestre é uma proposta pedagógica, não uma determinação municipal.

## Atenção
A aplicação é somente leitura para o planejamento curricular; a exportação JSON não modifica os dados de origem. Para futuras edições, altere `src/data/planos.json`. A impressão mostra o bimestre selecionado.
