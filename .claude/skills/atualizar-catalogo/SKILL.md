---
name: atualizar-catalogo
description: Atualiza o catálogo local com os anúncios do site marcosperesimoveis.com.br (via API, sem navegador) e resume o que mudou. Use quando o usuário pedir para "atualizar", "ver os anúncios do site" ou como primeiro passo da republicação.
---

# Atualizar catálogo

1. Rode `node scripts/coleta.mjs` (na raiz do projeto).
2. Leia `catalogo/mudancas-ultima-coleta.json` e resuma para o usuário em linguagem simples:
   - total de anúncios ativos no site;
   - novos (título e preço), removidos, preços alterados;
   - anúncios sem nenhuma foto (avisar que não dá para publicar sem foto).
3. Se algum anúncio foi **removido do site** e consta como `ativo` em `estado/publicados.json`, rode `node scripts/estado.mjs removido-site <id>` (nunca edite o arquivo à mão) e avise que ele deve sair do Marketplace na próxima republicação (a remoção em si só acontece com confirmação do usuário).
4. Não use o navegador nesta skill. Se o script falhar (site fora do ar, sem internet), explique em uma frase e sugira tentar mais tarde.
