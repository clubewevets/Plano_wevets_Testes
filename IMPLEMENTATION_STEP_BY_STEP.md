# 🎯 Guia Passo a Passo: Implementar PlansSection

Este guia mostra exatamente o que fazer para integrar o componente `PlansSection` no seu projeto `emergency-page-redesign-ae5 Copy`.

---

## 📋 Pré-requisitos

Antes de começar, verifique se você tem:

- ✅ Acesso ao projeto `emergency-page-redesign-ae5 Copy`
- ✅ Node.js e npm/pnpm instalados
- ✅ TypeScript configurado
- ✅ Tailwind CSS no projeto

---

## 🚀 PASSO 1: Copiar o Componente

### 1.1 Localize o arquivo `PlansSection.tsx`

No projeto `Plano-20Wevets-20V1`, encontre:
```
client/components/PlansSection.tsx
```

### 1.2 Copie o conteúdo completo

Você pode:
- **Opção A:** Baixar o arquivo diretamente
- **Opção B:** Copiar o código (Ctrl+C)

### 1.3 Crie o arquivo no novo projeto

No seu projeto `emergency-page-redesign-ae5 Copy`, crie:
```
client/components/PlansSection.tsx
```

Cole o código do componente.

### ✅ Resultado esperado

```
seu-projeto/
└── client/
    └── components/
        ├── PlansSection.tsx          ← NOVO
        ├── HeroBanner.tsx
        ├── Footer.tsx
        └── ... (outros componentes)
```

---

## 🎨 PASSO 2: Preparar os Dados (PLANS)

### 2.1 Verifique se você tem um arquivo de dados

No seu projeto, procure por:
```
client/data/pageData.ts
```
ou
```
src/data/plans.ts
```

Se **NÃO existir**, você precisa criar um.

### 2.2A Se o arquivo EXISTE

Abra `client/data/pageData.ts` e **certifique-se de que tem**:

```typescript
// client/data/pageData.ts

// 1️⃣ Defina a interface (ou copie de PlansSection.tsx)
export interface Plan {
  name: string;
  priceMonthly: string;
  priceAnnual: string;
  description: string;
  note?: string;
  features: (
    | string
    | {
        type: "structured";
        title?: string;
        items: string[];
      }
  )[];
  popular?: boolean;
}

// 2️⃣ Defina os planos
export const PLANS: Plan[] = [
  {
    name: "Plano Básico",
    priceMonthly: "29,90",
    priceAnnual: "299,00",
    description: "Para quem busca proteção essencial",
    features: ["Consultas básicas", "Vacinas", "Primeiros socorros"],
    popular: false,
  },
  {
    name: "Plano Completo",
    priceMonthly: "59,90",
    priceAnnual: "599,00",
    description: "A melhor relação custo-benefício",
    features: ["Exames completos", "Especialistas", "Emergência"],
    popular: true,  // Este será marcado como "popular"
  },
  {
    name: "Plano Premium",
    priceMonthly: "99,90",
    priceAnnual: "999,00",
    description: "Cobertura máxima do mercado",
    features: ["Cirurgias", "UTI", "Fisioterapia", "Tratamentos especiais"],
    popular: false,
  },
];

// 3️⃣ Defina os links para tabelas de cobertura
export const COVERAGE_LINKS: { [key: string]: string } = {
  "Plano Básico": "https://seu-dominio.com/cobertura-basico.pdf",
  "Plano Completo": "https://seu-dominio.com/cobertura-completo.pdf",
  "Plano Premium": "https://seu-dominio.com/cobertura-premium.pdf",
};
```

### 2.2B Se o arquivo NÃO existe

Crie um novo arquivo:

```typescript
// client/data/pageData.ts (NOVO)

export interface Plan {
  name: string;
  priceMonthly: string;
  priceAnnual: string;
  description: string;
  note?: string;
  features: (
    | string
    | {
        type: "structured";
        title?: string;
        items: string[];
      }
  )[];
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    name: "Básico",
    priceMonthly: "29,90",
    priceAnnual: "299,00",
    description: "Proteção essencial para seu pet",
    features: ["Consultas", "Vacinas", "Emergência 24h"],
    popular: false,
  },
  {
    name: "Intermediário",
    priceMonthly: "59,90",
    priceAnnual: "599,00",
    description: "Cobertura completa e acessível",
    features: ["Exames", "Especialistas", "Internação", "Cirurgia"],
    popular: true,
  },
  {
    name: "Premium",
    priceMonthly: "99,90",
    priceAnnual: "999,00",
    description: "Máxima proteção para seu pet",
    features: ["UTI", "Fisioterapia", "Endoscopia", "Todos os tratamentos"],
    popular: false,
  },
];

export const COVERAGE_LINKS: { [key: string]: string } = {
  "Básico": "https://seu-link-pdf-basico.pdf",
  "Intermediário": "https://seu-link-pdf-intermediario.pdf",
  "Premium": "https://seu-link-pdf-premium.pdf",
};
```

### ✅ Resultado esperado

```
seu-projeto/
└── client/
    └── data/
        └── pageData.ts               ← NOVO ou ATUALIZADO
```

---

## 📄 PASSO 3: Usar o Componente na Página

### 3.1 Abra a página onde quer usar

Localize o arquivo principal da sua página. Pode ser:
- `client/pages/Index.tsx`
- `client/pages/Home.tsx`
- `src/pages/PricingPage.tsx`

### 3.2 Importe o componente e os dados

No início do arquivo (junto com outros imports):

```typescript
// client/pages/Index.tsx (ou seu arquivo de página)

import { useState } from "react";
import { PlansSection } from "../components/PlansSection";
import { PLANS, COVERAGE_LINKS } from "../data/pageData";

export default function Index() {
  // ... resto do código
}
```

### 3.3 Use o componente no JSX

Escolha onde colocar o componente. Por exemplo, após a seção hero:

```typescript
export default function Index() {
  return (
    <main>
      {/* Seção Hero ou Banner */}
      <section className="bg-blue-600 text-white p-8">
        <h1>Bem-vindo ao nosso site</h1>
      </section>

      {/* 👇 ADICIONE AQUI */}
      <PlansSection
        plans={PLANS}
        coverageLinks={COVERAGE_LINKS}
        contractUrl="https://seu-site.com/contratar"
        title="Escolha o melhor plano para seu pet"
      />

      {/* Resto do conteúdo */}
      <section className="py-12">
        {/* ... */}
      </section>
    </main>
  );
}
```

### ✅ Resultado esperado

Quando você abre a página no navegador, deve ver:
- ✅ Título: "Escolha o melhor plano para seu pet"
- ✅ Toggle Mensal/Anual
- ✅ 3 cards de planos
- ✅ Preços atualizando ao mudar período
- ✅ Botões "Contratar"

---

## 📊 PASSO 4: Adicionar Analytics (Opcional mas Recomendado)

Se você quer rastrear quando os usuários clicam nos planos:

### 4.1 Crie funções de analytics

```typescript
// client/pages/Index.tsx

import { PlansSection } from "../components/PlansSection";
import { PLANS, COVERAGE_LINKS } from "../data/pageData";

export default function Index() {
  // 👇 Adicione estas funções
  const handlePlanSelect = (planName: string, billingPeriod: "mensal" | "anual") => {
    // Log simples (remover em produção)
    console.log(`Plano selecionado: ${planName} (${billingPeriod})`);

    // Se você usa Google Analytics
    if (typeof gtag !== "undefined") {
      gtag("event", "plan_selected", {
        plan_name: planName,
        billing_period: billingPeriod,
        page: "emergency-plans",
      });
    }

    // Se você usa Amplitude
    if (window.amplitude) {
      window.amplitude.logEvent("plan_selected", {
        plan_name: planName,
        billing_period: billingPeriod,
      });
    }
  };

  const handleCoverageClick = (planName: string, billingPeriod: "mensal" | "anual") => {
    console.log(`Tabela de cobertura clicada: ${planName}`);

    if (typeof gtag !== "undefined") {
      gtag("event", "coverage_table_viewed", {
        plan_name: planName,
      });
    }
  };

  return (
    <main>
      {/* ... */}

      {/* 👇 Passe os callbacks */}
      <PlansSection
        plans={PLANS}
        coverageLinks={COVERAGE_LINKS}
        contractUrl="https://seu-site.com/contratar"
        title="Escolha o melhor plano para seu pet"
        onPlanSelect={handlePlanSelect}           {/* ← NOVO */}
        onCoverageClick={handleCoverageClick}     {/* ← NOVO */}
      />

      {/* ... */}
    </main>
  );
}
```

### ✅ Resultado esperado

No console do navegador (F12 → Console):
```
Plano selecionado: Intermediário (mensal)
```

No Google Analytics / Amplitude:
```
Event: plan_selected
  - plan_name: "Intermediário"
  - billing_period: "mensal"
```

---

## 🎨 PASSO 5: Ajustar Cores (Se Necessário)

### 5.1 Verifique suas cores no Tailwind

O componente usa essas cores:
- `wevets-blue` → Azul principal
- `wevets-cyan` → Botões e destaque
- `wevets-pink` → Toggle selecionado
- `wevets-green` → Checkmarks
- `wevets-institutional` → Cinza texto

### 5.2A Se você TEM essas cores no Tailwind

Ótimo! Nenhuma alteração necessária.

Verifique em `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      "wevets-blue": "#062B5B",
      "wevets-cyan": "#1AA4FF",
      "wevets-pink": "#FF1493",
      // ...
    },
  },
}
```

### 5.2B Se você NÃO tem essas cores

Você tem 2 opções:

**Opção 1: Adicionar ao Tailwind (Recomendado)**

```typescript
// tailwind.config.ts

export default {
  theme: {
    extend: {
      colors: {
        "wevets-blue": "#062B5B",      // Azul principal
        "wevets-cyan": "#1AA4FF",      // Botões
        "wevets-pink": "#FF1493",      // Toggle
        "wevets-green": "#4ADE80",     // Check
        "wevets-institutional": "#4B5563", // Cinza
      },
    },
  },
};
```

**Opção 2: Usar suas cores existentes**

Edite `PlansSection.tsx` e troque:
- `text-wevets-blue` → `text-your-blue-500`
- `bg-wevets-cyan` → `bg-your-cyan-500`
- etc.

### ✅ Resultado esperado

As cores do componente correspondem ao seu design.

---

## 🧪 PASSO 6: Testar

### 6.1 Inicie o servidor local

```bash
npm run dev
# ou
pnpm dev
```

### 6.2 Abra o navegador

Vá para:
```
http://localhost:5173
```
(ou qualquer porta que seu dev server use)

### 6.3 Teste funcionalidades

- ✅ Veja os 3 planos renderizados?
- ✅ Clique no toggle "Anual" - os preços mudam?
- ✅ Clique em "Contratar" - abre a URL?
- ✅ Clique em "Tabela de cobertura" - abre o PDF?
- ✅ Responsivo no mobile? (Abra DevTools F12, teste em mobile)

### ✅ Tudo funcionando?

Parabéns! 🎉

---

## 🐛 PASSO 7: Troubleshooting (Se algo não funcionar)

### Problema: "Componente não encontrado"

```
Error: Cannot find module 'PlansSection'
```

**Solução:**
- Verifique se o arquivo está em `client/components/PlansSection.tsx`
- Verifique o import: `import { PlansSection } from "../components/PlansSection";`
- Caso contrário, ajuste o caminho relativo

---

### Problema: "PLANS is not defined"

```
Error: PLANS is not defined
```

**Solução:**
- Verifique se você criou `client/data/pageData.ts`
- Certifique-se de que exporta `PLANS`:
  ```typescript
  export const PLANS = [...]
  ```

---

### Problema: Cores erradas

As cores aparecem como cores padrão (cinza).

**Solução:**
1. Adicione as cores ao `tailwind.config.ts` (veja PASSO 5)
2. Reinicie o dev server: `npm run dev`
3. Limpe o cache: `rm -rf .next` ou `rm -rf dist`

---

### Problema: Botão não funciona

Clico em "Contratar" mas nada acontece.

**Solução:**
- Verifique se `contractUrl` está correto:
  ```typescript
  contractUrl="https://seu-site.com/contratar"
  ```
- Certifique-se de que a URL é válida

---

### Problema: Toggle não funciona

Clico em "Anual" mas nada muda.

**Solução:**
- Este é um problema do React. Tente:
  1. Reiniciar o dev server
  2. Limpar cache do navegador (F12 → Network → Limpar)
  3. Fechar e reabrir o navegador

---

## 📱 PASSO 8: Testar Responsividade

### 8.1 Abra Developer Tools

Pressione `F12` no navegador.

### 8.2 Ative "Device Toolbar"

- Clique no ícone de celular (ou Ctrl+Shift+M)
- Escolha "iPhone 12" ou similar

### 8.3 Teste:

- ✅ Planos aparecem em coluna no mobile?
- ✅ Texto é legível?
- ✅ Botões são grandes o suficiente para tocar?
- ✅ Sem scroll horizontal?

### ✅ Se tudo está OK no mobile, pronto!

---

## ✨ PASSO 9: Customizações Avançadas (Opcional)

### 9.1 Mudar título

```typescript
<PlansSection
  plans={PLANS}
  coverageLinks={COVERAGE_LINKS}
  title="Encontre o plano perfeito para seu pet" {/* ← Mudar aqui */}
/>
```

### 9.2 Mudar URL de contrato

```typescript
<PlansSection
  plans={PLANS}
  coverageLinks={COVERAGE_LINKS}
  contractUrl="https://seu-link-de-contrato.com" {/* ← Mudar aqui */}
/>
```

### 9.3 Mudar ID da seção

Útil se você tem múltiplas seções de planos:

```typescript
<PlansSection
  plans={PLANS}
  coverageLinks={COVERAGE_LINKS}
  sectionId="planos-emergencia" {/* ← Mudar aqui */}
/>
```

Então você pode navegar com `#planos-emergencia` na URL.

### 9.4 Filtrar planos para A/B Testing

Se você quer mostrar diferentes planos para diferentes usuários:

```typescript
// Se o usuário é variant_a, mostra 4 planos. Senão, 3.
const displayPlans = isVariantA ? PLANS : PLANS.slice(0, 3);

<PlansSection
  plans={displayPlans}  {/* ← Usa planos filtrados */}
  coverageLinks={COVERAGE_LINKS}
/>
```

---

## 🎯 Resumo Final

Você completou:

1. ✅ Copiou o componente `PlansSection.tsx`
2. ✅ Criou/atualizou `client/data/pageData.ts` com seus planos
3. ✅ Importou o componente na página
4. ✅ Usou o componente no JSX
5. ✅ Adicionou analytics (opcional)
6. ✅ Ajustou as cores
7. ✅ Testou tudo
8. ✅ Testou responsividade
9. ✅ Customizou (opcional)

**Resultado:** Um bloco de planos funcional, responsivo e rastreável no seu projeto! 🚀

---

## 📞 Próximas Etapas

Se você quer:

- **Adicionar comparação entre planos** → Crie uma tabela de comparação
- **Integrar com formulário** → Adicione um modal de checkout
- **A/B Testing com Amplitude** → Configure variantes nos dados
- **SEO** → Adicione schema.org markup
- **Animações** → Use Framer Motion

**Fale comigo!** 💬

---

## 📎 Checklist de Implementação

```
☐ PASSO 1: Copiar PlansSection.tsx
☐ PASSO 2: Criar/atualizar pageData.ts
☐ PASSO 3: Importar no arquivo de página
☐ PASSO 4: Usar <PlansSection /> no JSX
☐ PASSO 5: Adicionar analytics (opcional)
☐ PASSO 6: Adicionar cores ao Tailwind (se necessário)
☐ PASSO 7: Testar no navegador
☐ PASSO 8: Testar responsividade mobile
☐ PASSO 9: Fazer customizações (se necessário)
☐ 🎉 PRONTO!
```

---

## 💡 Dica Final

Se você ficar preso em qualquer etapa:

1. Revise o arquivo `INTEGRATION_GUIDE.md` (documentação técnica)
2. Revise este arquivo (guia passo a passo)
3. Compare com o código original em `Plano-20Wevets-20V1`

**Boa sorte!** 🚀
