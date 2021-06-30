# Listar países utilizando GraphQl
Teste simples utilizando o GraphQl para exibir uma lista de países com uma tela de edição dos mesmos.
O sistema está em inglês devido aos resultados do GraphQl serem em inglês, facilitando a compreenção na hora da consulta.

Uma demo publicada se encontra [Aqui](http://softplan-paises.herokuapp.com) ,porém não funciona com https apenas http devido ao CORS.

## Home
- A pesquisa utiliza o nome do país em ingles e busca o texto em qualquer lugar do nome.
- Mesmo após editar o nome do país nos detalhes, a pesquisa ainda utilizara o nome em inglês conforme o original no servidor.

## Detalhes

- Os botões de salvar e resetar alterações só são habilitados quando a tela reconhece que existe alguma diferença entre o original e o que se encontra no formulário.
- A distância entre os país aparece ao clicar no marcador no mapa.

## Publicar
As actions fazem a publicação para o heroku, deve ser adicionado uma chave e alterados o email e o nome unico da aplicação no heroku.

## Localmente
É possível rodar localmente utilizando os comandos padrões do CRA
    
    yarn
    yarn start

Ou utilizando o Dockerfile presente

## Testando
Utilizar o comando padrão para testar localmente
    
    yarn test