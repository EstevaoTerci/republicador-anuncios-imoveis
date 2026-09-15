# Instalação por prompt (sem acesso remoto)

## O que o operador faz (ditar pela chamada)

1. Instalar o **Google Chrome** (se não tiver) e entrar na conta do Facebook nele.
2. Instalar o **Node.js LTS**: https://nodejs.org/pt/download (instalação padrão).
3. Instalar o **Claude Code** e entrar na assinatura. Abrir o Terminal (botão direito no menu Iniciar → "Terminal") e digitar, uma linha por vez:
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```
   Fechar o Terminal, abrir de novo e digitar `claude`. Fazer o login no navegador quando ele pedir.
4. Com o `claude` aberto no Terminal, **colar o prompt abaixo** e apertar Enter. Quando o Claude pedir permissão para rodar algo, responder "sim".

## Prompt para colar

```
Você vai instalar o "Republicador de Anúncios" nesta máquina para mim. Eu não entendo de tecnologia: fale em português simples e me peça uma coisa por vez.

1. Baixe https://github.com/EstevaoTerci/republicador-anuncios-imoveis/archive/refs/heads/main.zip e descompacte de modo que o conteúdo fique na pasta Documentos\anuncios-imoveis-ruy (o zip vem com uma pasta chamada republicador-anuncios-imoveis-main dentro; o conteúdo dela é que deve ficar em Documentos\anuncios-imoveis-ruy).
2. Entre nessa pasta, leia o arquivo INSTALACAO-CLAUDE.md e siga o roteiro dele até o final.
```

## Depois da instalação

A primeira rodada é feita pelo atalho **"Republicar Anuncios"** da área de trabalho, com o Estêvão acompanhando por tela compartilhada (escolha dos grupos, clique na sugestão de cidade, confirmação do lote). Ver `entrega/ROTEIRO-INSTALACAO.md`, passos 8 a 10.
