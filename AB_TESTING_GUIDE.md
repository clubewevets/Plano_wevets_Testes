# 🧪 Guia Completo: A/B Testing com Amplitude

## 📋 Visão Geral

Este projeto implementa um sistema de A/B testing integrado com Amplitude que permite testar diferentes variantes de conteúdo (como o Hero Banner) e medir o impacto em métricas de engajamento.

### Arquitetura

```
Amplitude Experiment SDK
         ↓
    [Device ID]
         ↓
Atribui variante ao usuário
         ↓
[variant_a] ou [control]
         ↓
HeroBannerAB renderiza conteúdo
         ↓
Amplitude rastreia $exposure event
```

---

## 🔧 Arquivos Modificados/Criados

### 1. **client/hooks/useAmplitude.ts**

- ✅ Inicializa Amplitude Analytics SDK
- ✅ Inicializa Amplitude Experiment SDK
- ✅ Gerencia Device ID persistente
- ✅ Exporta `getHeroBannerVariant()` para buscar variantes
- ✅ Exporta `trackEvent()` para rastrear eventos customizados

**Funções principais:**

```typescript
// Obter variante do experimento
const variant = await getHeroBannerVariant("005-card-planoiniciante");
// Retorna: "variant_a" ou "control"

// Rastrear eventos customizados
trackEvent("button_click", {
  button_type: "cta",
  section: "hero",
});

// Definir User ID (quando usuário faz login)
setUserId("user_12345");
```

### 2. **client/components/HeroBannerAB.tsx** (NOVO)

Componente React que:

- Inicializa Amplitude
- Busca a variante atribuída ao usuário
- Renderiza diferentes banners baseado na variante
- Faz cache da variante em memória
- Com fallback gracioso para "control"

**Variantes implementadas:**

#### VARIANTE A (4 PLANOS)

- Exibe o plano Básico renomeado para "Iniciante"
- Exibe os outros 3 planos (Conforto, Super, Ultra)

#### CONTROLE (3 PLANOS)

- Exibe apenas os planos Conforto, Super e Ultra
- Oculta o plano Básico/Iniciante

### 3. **client/pages/Index.tsx**

- Substituiu as seções de hero hardcoded pelo componente `<HeroBannerAB />`
- Importação adicionada: `import { HeroBannerAB } from "../components/HeroBannerAB"`

### 4. **.env**

- Adicionada: `VITE_AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY=client-fg98r21o3X72Ikz8udikWoIaiEGV8nYx`

---

## 🚀 Como Usar

### Passo 1: Verificar a Inicialização

A inicialização acontece automaticamente quando a página carrega:

```typescript
// App.tsx
const AppContent = () => {
  useAmplitude(); // Inicializa Amplitude e Experiment
  // ... resto do componente
};
```

### Passo 2: Verificar o Device ID

Abra o Console do navegador (F12) e procure por logs como:

```
✨ Novo Device ID gerado: device_1739123456_abc123def
```

ou

```
♻️ Device ID recuperado do localStorage: device_1739123456_abc123def
✅ Experiment Client inicializado com sucesso!
```

### Passo 3: Verificar a Variante Atribuída

Na seção do Hero Banner, você verá um dos dois designs:

- **CONTROLE (3 PLANOS)**: Exibe Conforto, Super e Ultra
- **VARIANTE A (4 PLANOS)**: Exibe Iniciante + 3 planos

Verifique o console para:

```
🎯 Variante obtida para 005-card-planoiniciante: variant_a
```

ou

```
🎯 Variante obtida para 005-card-planoiniciante: control
```

### Passo 4: Configurar Experimento no Amplitude

1. Acesse [amplitude.com](https://amplitude.com/)
2. Vá para **Experimentation** → **Create Experiment**
3. Configure:
   - **Experiment Key**: `005-card-planoiniciante`
   - **Deployment Key**: Use a mesma do `.env`
   - **Variante 1 (Control)**: `control` (50%)
   - **Variante 2 (Treatment)**: `variant_a` (50%)
   - **Traffic Allocation**: 100%

4. **Start Experiment**

---

## 📊 Métricas Rastreadas

### Evento Automático: `$exposure`

Amplitude envia automaticamente quando variante é acessada:

```json
{
  "event_type": "$exposure",
  "experiment_key": "005-card-planoiniciante",
  "variant": "variant_a" ou "control",
  "device_id": "device_1739123456_abc123def"
}
```

### Evento Customizado: `variant_assigned`

Rastreado no `getHeroBannerVariant()`:

```json
{
  "event_type": "variant_assigned",
  "experiment_key": "005-card-planoiniciante",
  "variant_assigned": "control",
  "device_id": "device_1739123456_abc123def",
  "timestamp": "2024-02-09T10:30:00Z"
}
```

### Eventos de Click (para rastrear conversão)

Adicione handlers aos botões de CTA:

```typescript
// No componente HeroBannerAB ou em qualquer lugar
button.onClick = () => {
  analyticsEvents.clickBannerContratar();
  // Redirecionar para planos ou ação desejada
};
```

---

## 🧪 Testando Localmente

### Teste Manual

1. **Abra o navegador** e acesse `http://localhost:5173`
2. **Abra o Console** (F12 → Console)
3. **Procure por logs** do Amplitude:

   ```
   🔄 Inicializando Amplitude...
   ✅ Amplitude inicializado com sucesso!
   ✅ Experiment Client inicializado com sucesso!
   🎯 Variante obtida para 005-card-planoiniciante: [VARIANTE]
   ```

4. **Verific o design**:
   - Se `control`: 3 Planos (Conforto, Super, Ultra)
   - Se `variant_a`: 4 Planos (Iniciante + 3)

### Limpar Device ID (para forçar nova variante)

No Console, execute:

```javascript
localStorage.removeItem("amp_device_id");
location.reload();
```

Isso vai gerar um novo Device ID e Amplitude atribuirá uma nova variante.

### Testar Diferentes Variantes

Se você quer testar ambas as variantes:

1. **Variante 1**: Abra em navegação normal
2. **Variante 2**: Abra em uma aba de Incógnito (novo Device ID)

Amplitude atribuirá variantes diferentes baseado em Device ID.

---

## 📈 Analisando Resultados

### No Amplitude Dashboard

1. **Vá para**: Experimentation → Seu Experimento
2. **Analise**:
   - **Exposure**: Quantos usuários viram cada variante
   - **Conversions**: Quantos clicaram no CTA
   - **Lift**: % de melhoria da treatment vs control

### Exemplo de Análise

| Métrica     | Control (50% OFF) | Treatment (100% OFF) | Lift        |
| ----------- | ----------------- | -------------------- | ----------- |
| Exposures   | 500               | 510                  | -           |
| Clicks CTA  | 75 (15%)          | 102 (20%)            | **+33%** ✅ |
| Conversions | 25 (5%)           | 38 (7.5%)            | **+50%** ✅ |

---

## 🔍 Debugging

### Logs Disponíveis

Todos os logs têm emojis para fácil identificação:

| Emoji | Significado       |
| ----- | ----------------- |
| ✅    | Sucesso           |
| ❌    | Erro              |
| 🟡    | Aviso/Processando |
| 🎯    | Variante obtida   |
| 📊    | Evento rastreado  |
| 📦    | Cache             |
| 🔵    | Função iniciada   |

### Verificar Variante Atribuída

```javascript
// No Console
const variant = await getHeroBannerVariant("005-card-planoiniciante");
console.log("Variante:", variant);
```

### Verificar Device ID

```javascript
// No Console
const deviceId = getDeviceId();
console.log("Device ID:", deviceId);
```

### Forçar Sync do Amplitude

```javascript
// No Console
amplitude.flush();
console.log("Events flushed");
```

---

## 🎛️ Personalizando Variantes

### Adicionar Nova Variante

1. **Abra `HeroBannerAB.tsx`**
2. **Adicione novo bloco `if`** após a variante treatment:

```typescript
if (variant === "treatment_especial") {
  return (
    <section>
      {/* Novo design aqui */}
    </section>
  );
}
```

3. **Configure no Amplitude** para usar `treatment_especial`

### Mudar Cores/Textos

Todas as cores e textos estão no componente. Exemplos:

```typescript
// Mudar cor do botão (Control)
backgroundColor: "#FF6BC0" → backgroundColor: "#E64EA3"

// Mudar texto do cupom
"Cupom: CUIDAR50" → "Cupom: SAVE50"

// Mudar percentual
"50% OFF" → "45% OFF"
```

---

## 🔐 Boas Práticas

### ✅ DO's

- ✅ Use `Device ID` para rastrear usuários não-autenticados
- ✅ Chame `setUserId()` quando usuário faz login para unificar eventos
- ✅ Use fallback `"control"` em caso de erro
- ✅ Aguarde `async` em `getHeroBannerVariant()` no useEffect
- ✅ Sempre enriqueça eventos com contexto (section, button_type, etc)
- ✅ Use `amplitude.flush()` antes de redirecionar para garantir envio

### ❌ DON'Ts

- ❌ Não armazene variante no localStorage (Amplitude gerencia isso)
- ❌ Não chame `getHeroBannerVariant()` múltiplas vezes desnecessariamente (use cache)
- ❌ Não force uma variante sem teste estatístico
- ❌ Não exponha API Keys em código público (use .env com VITE\_ prefix)

---

## 📚 Próximos Passos

### Para Expandir o Sistema

1. **Múltiplos Experimentos**:
   - Criar novos `getVariant()` para diferentes seções
   - Exemplo: `getBannerPromoVariant()`, `getCtaVariant()`, etc

2. **Análise Avançada**:
   - Usar Cohorts para agrupar usuários
   - Criar Funnels para análise de conversão
   - Usar Retention para medir engagement

3. **Otimização**:
   - Testar copy diferente
   - Testar cores diferentes
   - Testar CTAs diferentes
   - Testar layouts diferentes

4. **Integração Backend**:
   - Usar `amp_device_id` como parâmetro em URLs
   - Passar Device ID para sistemas de pagamento
   - Rastrear conversão end-to-end

---

## 🎓 Referências

- [Amplitude Experiment Docs](https://developers.amplitude.com/docs/experiment)
- [Amplitude JavaScript SDK](https://developers.amplitude.com/docs/javascript)
- [A/B Testing Best Practices](https://www.optimizely.com/optimization-glossary/ab-testing/)

---

## 🆘 Troubleshooting

### Problema: Variante não carrega

**Solução**: Verifique se `VITE_AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY` está no `.env`

### Problema: Sempre recebe "control"

**Solução**: Pode ser que o experimento não esteja ativo no Amplitude. Verifique status do experimento.

### Problema: Events não aparecem no Amplitude

**Solução**: Pode levar 1-5 minutos. Verifique:

1. API Key está correta
2. `amplitude.flush()` foi chamado
3. Network tab mostra requests para api.amplitude.com

### Problema: Device ID muda a cada reload

**Solução**: localStorage pode estar limpo. Verifique:

1. Se navegador permite localStorage
2. Se há policy de privacidade bloqueando
3. Teste em navegação normal (não incógnita)

---

**Versão**: 1.0  
**Data**: Fevereiro 2024  
**Autor**: Equipe Amplitude WeVets
