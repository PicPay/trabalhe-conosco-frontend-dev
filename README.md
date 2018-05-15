# Sobre a implementação

A solução foi implementada usando JavaScript (ES7, transpilado com Babel), usando as libs React e Redux, junto com outras relacionadas às duas. Foi utilizado SASS para implementar o CSS.

A aplicação também é uma PWA (Progressive Web App), e é possível instalá-la no desktop ou smartphone Android que suportam Service Worker, e navegar nela offline (podendo cadastrar um cartão offline). Para instalar basta ir: no desktop em "More Tools > Add to desktop..." ou em um smartphone em "Add to Home screen", em mais opções do browser.

O service worker foi implementado com o framework Workbox.

# Testando a aplicação

Para testar a aplicação execute os comandos:
```sh
$ npm install
$ npm run build
$ npm run server
```

Fique a vontade para testar o app, online ou offline, e tentar quebrá-lo.
