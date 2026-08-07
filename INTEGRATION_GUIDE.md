# PlansSection Component - Integration Guide

Este guia explica como integrar o componente `PlansSection` reutilizável no seu projeto `emergency-page-redesign-ae5 Copy`.

## 📋 Visão Geral

O componente `PlansSection` é um bloco completo e responsivo que exibe planos de saúde pet com:

- ✅ Toggle de período (Mensal/Anual)
- ✅ Cards de planos com preços e descrições
- ✅ Lista de benefícios/features
- ✅ Botões de contratação
- ✅ Links para tabela de cobertura
- ✅ Responsivo (mobile e desktop)
- ✅ Suporte a callbacks para analytics
- ✅ Customizável

## 📂 Arquivos Necessários

Copie os seguintes arquivos para seu projeto:

```
seu-projeto/
├── client/
│   └── components/
│       └── PlansSection.tsx          ← Copiar este arquivo
└── client/
    └── data/
        └── pageData.ts               ← Adaptado com PLANS e COVERAGE_LINKS
```

## 🔧 Passo a Passo de Integração

### 1. Copiar o Componente

Copie `client/components/PlansSection.tsx` para seu projeto.

### 2. Preparar os Dados

Você precisa de um arquivo com dados dos planos. Crie ou adapte `client/data/pageData.ts`:

```typescript
// client/data/pageData.ts
export interface Plan {
  name: string;
  priceMonthly: string;
  priceAnnual: string;
  description: string;
  note?: string;
  features: (string | { type: "structured"; title?: string; items: string[] })[];
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    name: "Rotina",
    priceMonthly: "7,45",
    priceAnnual: "149,00",
    description: "Essencial para manter a saúde do seu pet em dia.",
    note: "",
    features: [
      {
        type: "structured",
        title: "Benefícios do Plano Rotina:",
        items: [
          "Vacinas obrigatórias",
          "Consultas em horário comercial",
          "Consultas em horário de plantão",
          "Exames laboratoriais de check-up",
          "Hospitais 24h WeVets",
          "Rede Credenciada",
        ],
      },
    ],
    popular: false,
  },
  {
    name: "Conforto",
    priceMonthly: "24,95",
    priceAnnual: "499,00",
    description: "Mais exames, mais procedimentos: até 90% de economia*.",
    note: "",
    features: [
      "Exames laboratoriais",
      "Exames de imagem",
      "Hospitais 24h WeVets",
      "Rede Credenciada",
    ],
    popular: true,
  },
  // ... outros planos
];

export const COVERAGE_LINKS: { [key: string]: string } = {
  Rotina: "https://seu-link-para-tabela-rotina.pdf",
  Conforto: "https://seu-link-para-tabela-conforto.pdf",
  // ... outros links
};
```

### 3. Usar o Componente

No seu arquivo de página ou componente principal:

```typescript
// pages/Index.tsx ou similar
import { PlansSection } from "../components/PlansSection";
import { PLANS, COVERAGE_LINKS } from "../data/pageData";

export default function Index() {
  const handlePlanSelect = (planName: string, billingPeriod: "mensal" | "anual") => {
    // Rastrear evento de seleção de plano
    console.log(`Plano selecionado: ${planName} (${billingPeriod})`);
    // Você pode enviar para analytics aqui
  };

  const handleCoverageClick = (planName: string, billingPeriod: "mensal" | "anual") => {
    // Rastrear clique na tabela de cobertura
    console.log(`Tabela clicada: ${planName} (${billingPeriod})`);
  };

  return (
    <main>
      {/* Outros componentes */}
      
      <PlansSection
        plans={PLANS}
        coverageLinks={COVERAGE_LINKS}
        onPlanSelect={handlePlanSelect}
        onCoverageClick={handleCoverageClick}
        contractUrl="https://seu-url-de-contrato.com.br"
        title="Encontre o plano ideal para o seu pet"
        sectionId="planos"
      />
      
      {/* Mais componentes */}
    </main>
  );
}
```

## 🎨 Props do Componente

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `plans` | `Plan[]` | ✅ Obrigatório | Array com os dados dos planos |
| `coverageLinks` | `{ [key: string]: string }` | `{}` | Mapa de links para tabelas de cobertura por plano |
| `onPlanSelect` | `(planName, billingPeriod) => void` | `undefined` | Callback quando um plano é selecionado |
| `onCoverageClick` | `(planName, billingPeriod) => void` | `undefined` | Callback quando a tabela de cobertura é clicada |
| `contractUrl` | `string` | `"https://planowevets.com.br/login"` | URL para onde o botão "Contratar" redireciona |
| `showComparisonTable` | `boolean` | `false` | Mostrar tabela de comparação (futuro) |
| `variant` | `"default" \| "minimal"` | `"default"` | Estilo do componente |
| `title` | `string` | `"Encontre o plano ideal para o seu pet"` | Título da seção |
| `sectionId` | `string` | `"planos"` | ID HTML da seção |

## 📊 Estrutura de Dados do Plan

```typescript
interface Plan {
  name: string;                          // Ex: "Rotina", "Conforto", "Super", "Ultra"
  priceMonthly: string;                  // Ex: "7,45"
  priceAnnual: string;                   // Ex: "149,00"
  description: string;                   // Descrição do plano
  note?: string;                         // Nota opcional (ex: "Mais popular")
  features: (                            // Lista de benefícios
    | string
    | {
        type: "structured";
        title?: string;
        items: string[];                 // Para features estruturadas
      }
  )[];
  popular?: boolean;                     // Marca o plano como "popular"
}
```

## 🎯 Exemplos de Uso

### Exemplo 1: Uso Básico

```tsx
<PlansSection plans={PLANS} coverageLinks={COVERAGE_LINKS} />
```

### Exemplo 2: Com Callbacks de Analytics

```tsx
const handlePlanSelect = (planName: string, period: "mensal" | "anual") => {
  // Enviar para Google Analytics
  gtag("event", "plan_selected", {
    plan_name: planName,
    billing_period: period,
  });
};

const handleCoverageClick = (planName: string, period: "mensal" | "anual") => {
  // Rastrear download da tabela
  gtag("event", "coverage_table_clicked", {
    plan_name: planName,
  });
};

<PlansSection
  plans={PLANS}
  coverageLinks={COVERAGE_LINKS}
  onPlanSelect={handlePlanSelect}
  onCoverageClick={handleCoverageClick}
/>
```

### Exemplo 3: Com A/B Testing

```tsx
// Se você quer testar diferentes configurações de planos
const plansVariantA = PLANS; // 4 planos com Rotina
const plansVariantB = PLANS.filter(p => p.name !== "Rotina"); // 3 planos

const isVariantA = experimentVariant === "variant_a";
const plansToDisplay = isVariantA ? plansVariantA : plansVariantB;

<PlansSection
  plans={plansToDisplay}
  coverageLinks={COVERAGE_LINKS}
  onPlanSelect={handlePlanSelect}
/>
```

### Exemplo 4: URL de Contrato Customizada

```tsx
<PlansSection
  plans={PLANS}
  coverageLinks={COVERAGE_LINKS}
  contractUrl="https://seu-dominio.com.br/contratar"
  onPlanSelect={(planName, period) => {
    // Você pode customizar o comportamento aqui
    // Por exemplo, abrir um modal ao invés de redirecionar
  }}
/>
```

## 🎨 Customização de Estilos

O componente usa **Tailwind CSS** e cores customizadas. Você precisa ter essas cores definidas no seu `tailwind.config.ts`:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        "wevets-blue": "#062B5B",           // Azul principal
        "wevets-cyan": "#1AA4FF",           // Cyan para CTAs
        "wevets-pink": "#FF1493",           // Rosa para destaque
        "wevets-green": "#4ADE80",          // Verde para check
        "wevets-institutional": "#4B5563",  // Cinza institucional
      },
    },
  },
};
```

Se preferir, você pode:

1. **Mudar as cores inline:**

```tsx
<PlansSection
  plans={PLANS}
  // Você pode estender o CSS para sobrescrever as cores
/>
```

2. **Adaptar as classes Tailwind** no componente para suas cores existentes

3. **Usar CSS variables:**

```css
:root {
  --color-wevets-blue: #062B5B;
  --color-wevets-cyan: #1AA4FF;
  /* ... */
}
```

## 📱 Responsividade

O componente é totalmente responsivo:

- **Mobile** (<768px): Cards empilhados verticalmente
- **Desktop** (≥768px): Grid de 3 ou 4 colunas (depende do número de planos)

## 🔐 Segurança & Performance

- ✅ Sem dependências externas (além do React)
- ✅ Sem chamadas a APIs automáticas
- ✅ Sem rastreamento automático (você controla via callbacks)
- ✅ Otimizado para mobile-first
- ✅ CSS-in-JS eficiente com Tailwind

## 🚀 Próximos Passos

1. **Integre os dados** do seu projeto (PLANS e COVERAGE_LINKS)
2. **Customize as cores** conforme seu design system
3. **Adicione callbacks** para rastreamento (analytics, eventos, etc)
4. **Teste em dispositivos** móveis e desktop
5. **Adapte a URL de contrato** para sua plataforma

## 📞 Troubleshooting

### Cores não aparecem corretamente

**Problema:** As cores `wevets-blue`, `wevets-cyan` não estão sendo aplicadas.

**Solução:** Adicione as cores ao seu `tailwind.config.ts` conforme mostrado acima.

### Componente não responde aos cliques

**Problema:** Os botões não estão funcionando.

**Solução:** Verifique se o `contractUrl` é válido e se os callbacks estão configurados corretamente.

### Preços não aparecem

**Problema:** O campo de preço está vazio ou errado.

**Solução:** Verifique se o objeto `Plan` tem `priceMonthly` e `priceAnnual` como strings (ex: `"24,95"`).

## 📝 Notas Importantes

1. **A/B Testing**: Se você estiver usando A/B testing (como Amplitude), passe diferentes arrays de `plans` conforme a variante do usuário.

2. **Analytics**: Use os callbacks `onPlanSelect` e `onCoverageClick` para rastrear eventos. O componente não faz isso automaticamente.

3. **Dados Compartilhados**: Os dados dos planos (PLANS, COVERAGE_LINKS) devem estar em um arquivo centralizado para fácil manutenção.

4. **Customização Avançada**: Se precisar fazer alterações profundas no layout ou estilo, você pode:
   - Forkar o componente e adaptar conforme necessário
   - Estender a interface `Plan` com campos adicionais
   - Criar variantes do componente (ex: `PlansSection`, `PlansMinimal`, etc)

## 🎓 Exemplo Completo de Integração

```typescript
// pages/emergency-plans.tsx
import { useState } from "react";
import { PlansSection } from "../components/PlansSection";
import { PLANS, COVERAGE_LINKS } from "../data/pageData";

export default function EmergencyPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelect = (planName: string, billingPeriod: "mensal" | "anual") => {
    setSelectedPlan(planName);

    // Rastrear no analytics
    if (window.gtag) {
      window.gtag("event", "plan_selected", {
        plan_name: planName,
        billing_period: billingPeriod,
        page: "emergency-plans",
      });
    }

    // Redirecionar para contrato
    setTimeout(() => {
      window.open("https://seu-dominio.com/contratar?plan=" + planName);
    }, 500);
  };

  const handleCoverageClick = (planName: string) => {
    if (window.gtag) {
      window.gtag("event", "coverage_viewed", {
        plan_name: planName,
      });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-blue-100 p-8">
        <h1 className="text-4xl font-bold">Planos de Saúde Pet</h1>
        <p className="text-lg mt-2">Escolha o plano ideal para o seu pet</p>
      </header>

      <PlansSection
        plans={PLANS}
        coverageLinks={COVERAGE_LINKS}
        onPlanSelect={handlePlanSelect}
        onCoverageClick={handleCoverageClick}
        contractUrl="https://seu-dominio.com/contratar"
        title="Encontre o plano ideal para o seu pet"
      />

      {selectedPlan && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded">
          ✓ Plano {selectedPlan} selecionado!
        </div>
      )}
    </main>
  );
}
```

## 📄 Licença

Este componente é compartilhado entre os projetos WeVets. Use livremente dentro do ecossistema WeVets.

---

**Dúvidas?** Consulte o componente em `client/components/PlansSection.tsx` ou revise a interface `PlansSectionProps`.
