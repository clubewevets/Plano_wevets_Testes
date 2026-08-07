# ⚙️ Setup do Amplitude A/B Testing

## 📦 Dependências Instaladas

```json
{
  "@amplitude/analytics-browser": "^2.33.4",
  "@amplitude/experiment-js-client": "1.20.3"
}
```

## 🔐 Variáveis de Ambiente

```env
# .env
VITE_AMPLITUDE_API_KEY=01b67a6ca9bc8ab73c215801213c1342
VITE_AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY=client-fg98r21o3X72Ikz8udikWoIaiEGV8nYx
```

---

## 📁 Estrutura de Arquivos

```
client/
├── hooks/
│   └── useAmplitude.ts              # Hook principal com Experiment SDK
├── components/
│   └── HeroBannerAB.tsx             # Componente com renderização condicional
└── pages/
    └── Index.tsx                     # Integração do HeroBannerAB

AB_TESTING_GUIDE.md                   # Documentação completa
AMPLITUDE_AB_TESTING_SETUP.md         # Este arquivo
```

---

## 🎯 Implementação Realizada

### 1. **Hook: client/hooks/useAmplitude.ts**

```typescript
// Inicializar no componente
useAmplitude();

// Buscar variante do A/B test
const variant = await getHeroBannerVariant("005-card-planoiniciante");
// Retorna: "variant_a" ou "control"

// Rastrear eventos
trackEvent("button_click", {
  experiment_key: "005-card-planoiniciante",
  variant_name: variant,
});

// Definir User ID (após login)
setUserId("user_12345");
```

### 2. **Componente: client/components/HeroBannerAB.tsx**

Renderiza dois designs diferentes:

**VARIANTE A (4 PLANOS)**

- Exibe o plano Básico renomeado para "Iniciante"
- Exibe os outros 3 planos (Conforto, Super, Ultra)

**CONTROLE (3 PLANOS)**

- Exibe apenas os planos Conforto, Super e Ultra
- Oculta o plano Básico/Iniciante

### 3. **Integração: client/pages/Index.tsx**

```typescript
// Importação
import { HeroBannerAB } from "../components/HeroBannerAB";

// Uso (substituiu as seções de hero anterior)
<HeroBannerAB />
```

---

## ✅ Checklist de Verificação

### No Navegador

- [ ] Abra F12 (Console)
- [ ] Procure por "✅ Amplitude inicializado com sucesso"
- [ ] Procure por "✅ Experiment Client inicializado com sucesso"
- [ ] Procure por "🎯 Variante obtida para 005-card-planoiniciante"
- [ ] Verifique se vê um Hero Banner (rosa ou verde)

### Device ID

- [ ] No console, execute: `console.log(localStorage.getItem("amp_device_id"))`
- [ ] Deve retornar algo como: `device_1739123456_abc123def`
- [ ] Mesmo valor ao recarregar a página (persistente)

### Amplitude Dashboard

- [ ] Acesse amplitude.com
- [ ] Vá para **Experimentation**
- [ ] Crie novo experimento com chave: `005-card-planoiniciante`
- [ ] Configure 2 variantes:
  - `variant_a` (Exibe 4 planos, Básico renomeado para Iniciante)
  - `control` (Exibe 3 planos, oculta Básico)
- [ ] Inicie o experimento

---

## 🧪 Teste End-to-End

### Cenário 1: Usuário Novo

1. Abra em navegação normal (incógnita para novo Device ID)
2. Acesse a página
3. Veja qual variante aparece (rosa ou verde)
4. Recarregue a página
5. **Resultado esperado**: Mesma variante (cache em memória)

### Cenário 2: Forçar Nova Variante

1. Abra em **navegação incógnita** (novo Device ID)
2. Acesse a página
3. Veja a variante atribuída
4. Feche a aba
5. Abra em **outra aba incógnita**
6. **Resultado esperado**: Pode ser variante diferente

### Cenário 3: User ID

```javascript
// No console:
setUserId("user_12345");
// Resultado: Events agora vinculados a um User ID
```

---

## 📊 Eventos Rastreados

### Automático: `$exposure`

Enviado automaticamente quando variante é acessada:

```
event_type: $exposure
experiment_key: 005-card-planoiniciante
variant: variant_a ou control
device_id: device_...
```

### Manual: `variant_assigned`

Rastreado em `getHeroBannerVariant()`:

```
event_type: variant_assigned
experiment_key: 005-card-planoiniciante
variant_assigned: variant_a ou control
timestamp: 2024-02-09T10:30:00Z
```

### Manual: Button Clicks (exemplo)

```typescript
button.onclick = () => {
  analyticsEvents.clickBannerContratar();
  // Redirecionar
};
```

Isso envia:

```
event_type: button_click
event_label: banner_contratar
```

---

## 🚀 Próximas Ações Recomendadas

### Imediato

1. **Verificar Logs**: Abra o console e procure pelos logs de inicialização
2. **Testar Variantes**: Limpe localStorage e recarregue para testar
3. **Criar Experimento no Amplitude**: Configure o experimento na plataforma

### Curto Prazo

1. **Monitorar Exposures**: Veja quantos usuários são expostos a cada variante
2. **Rastrear Conversões**: Implemente handlers de click para medir conversão
3. **Análise Inicial**: Aguarde 100-200 exposures para ter dados significativos

### Médio Prazo

1. **Múltiplos Experimentos**: Crie outros A/B tests para diferentes seções
2. **Análise Estatística**: Use a análise do Amplitude para determinar vencedor
3. **Rollout**: Deploy da variante vencedora para 100% dos usuários

---

## 🔍 Debugging Avançado

### Verificar Experimentation Client

```javascript
// No console:
AmplitudeExperiment.Experiment.getVariant("005-card-planoiniciante");
```

### Monitorar Network

1. Abra DevTools → Network
2. Procure por requests para `api.amplitude.com`
3. Verifique se events estão sendo enviados

### Logs Customizados

Todos os logs já vêm comentados no código. Procure por:

- `console.log("✅")` - Sucesso
- `console.log("❌")` - Erro
- `console.log("🎯")` - Variante obtida
- `console.log("📊")` - Evento rastreado

---

## ⚠️ Possíveis Problemas

### Variante sempre "control"

**Causa**: Experimento não ativo no Amplitude  
**Solução**: Vá ao Amplitude e inicie o experimento

### Amplitude não envia eventos

**Causa**: Pode ser demora normal (1-5 minutos)  
**Solução**: Aguarde ou force flush:

```javascript
amplitude.flush();
```

### Device ID não persiste

**Causa**: localStorage desabilitado  
**Solução**: Verificar configurações do navegador

### Componente não renderiza

**Causa**: Estado isLoading  
**Solução**: Procure por "Carregando..." no console

---

## 📞 Suporte

Para dúvidas ou problemas:

1. **Revisar AB_TESTING_GUIDE.md**: Documentação completa
2. **Verificar logs do console**: Começar pelo debug
3. **Consultar Amplitude Docs**: https://developers.amplitude.com/docs/experiment
4. **Testar no Incognito**: Isolar variáveis de Device ID

---

**Última atualização**: Fevereiro 2024
