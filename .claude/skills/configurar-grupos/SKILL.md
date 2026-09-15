---
name: configurar-grupos
description: Mostra e altera em quais grupos do Facebook os anúncios são publicados junto com o Marketplace. Use quando o usuário pedir para "configurar grupos", "mudar os grupos", "escolher grupos" ou "parar de publicar em grupo".
---

# Configurar grupos de publicação

A escolha fica salva em `estado/grupos.json` e é aplicada automaticamente em toda publicação. Esquema:

```json
{
  "configurado": true,
  "atualizadoEm": "2026-07-01T22:00:00-03:00",
  "grupos": [{ "nome": "CLASSIFICADOS BARRA DE SÃO FRANCISCO - ES", "membros": "77,5 mil", "usar": true }]
}
```

## Fluxo

1. Leia `estado/grupos.json`.
2. **Se a lista estiver vazia** (nenhuma publicação feita ainda): explique que a lista completa de grupos vem do próprio Facebook e será apresentada para escolha na primeira publicação — não há o que configurar agora. Encerre.
3. **Se houver grupos**: mostre a lista numerada — nome, nº de membros e se está LIGADO ou desligado — e pergunte o que mudar, em linguagem simples ("quais números quer ligar ou desligar? pode dizer 'usar só o 1 e o 3' ou 'desligar todos'").
4. Aplique a resposta, grave o arquivo com `atualizadoEm` atualizado e confirme mostrando como ficou.
5. Lembre o usuário: a mudança vale a partir da **próxima** republicação; grupos novos que aparecerem no Facebook entram na lista desligados e o assistente avisa quando isso acontecer.

## Cuidados

- O Facebook limita a 20 grupos por anúncio. Se o usuário ligar muitos, aceite, mas lembre em uma frase que publicar em muitos grupos ao mesmo tempo aumenta o risco de a conta ser sinalizada — menos é mais seguro.
- Não use o navegador nesta skill; ela só edita a configuração salva.
