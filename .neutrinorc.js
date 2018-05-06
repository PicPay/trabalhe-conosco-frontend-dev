module.exports = {
  use: [
    [
      'neutrino-preset-react',
      {
        html: {
          title: 'Teste Frontend PicPay',
          baseHref: '/',
          meta: [
            // { name: "msapplication-TileColor", content: "#ffffff"},
            // { name: "msapplication-TileImage", content: "/static/app-icons/ms-icon-144x144.png" },
            // { name: "theme-color", content: "#ffffff"}
          ],
          links: [
            'https://fonts.googleapis.com/css?family=Roboto',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            { rel: "shortcut icon", href: "/static/app-icons/favicon.ico" },
            { rel: "apple-touch-icon", sizes: "57x57", href: "/static/app-icons/apple-icon-57x57.png" },
            // { rel: "apple-touch-icon", sizes: "60x60", href: "/static/app-icons/apple-icon-60x60.png" },
            { rel: "apple-touch-icon", sizes: "72x72", href: "/static/app-icons/apple-icon-72x72.png" },
            // { rel: "apple-touch-icon", sizes: "76x76", href: "/static/app-icons/apple-icon-76x76.png" },
            { rel: "apple-touch-icon", sizes: "114x114", href: "/static/app-icons/apple-icon-114x114.png" },
            // { rel: "apple-touch-icon", sizes: "120x120", href: "/static/app-icons/apple-icon-120x120.png" },
            { rel: "apple-touch-icon", sizes: "144x144", href: "/static/app-icons/apple-icon-144x144.png" },
            // { rel: "apple-touch-icon", sizes: "152x152", href: "/static/app-icons/apple-icon-152x152.png" },
            // { rel: "apple-touch-icon", sizes: "180x180", href: "/static/app-icons/apple-icon-180x180.png" },
            // { rel: "icon", type: "image/png", sizes: "192x192" , href: "/static/app-icons/android-icon-192x192.png" },
            { rel: "icon", type: "image/png", sizes: "16x16", href: "/static/app-icons/android-icon-16x16.png" },
            { rel: "icon", type: "image/png", sizes: "36x36", href: "/static/app-icons/android-icon-36x36.png" },
            { rel: "icon", type: "image/png", sizes: "96x96", href: "/static/app-icons/android-icon-96x96.png" },
            { rel: "manifest", href: "/static/manifest.json" },
          ],
        },
        babel: {
          plugins: ["transform-regenerator"],
          presets: [
            [
              'babel-preset-env',
              {
                targets: {
                  browsers: [
                    'ie >= 10',
                    'safari > 7',
                    'last 2 Chrome versions',
                    'last 2 Firefox versions',
                    'last 4 Edge versions',
                  ],
                },
              },
            ],
          ],
        },
      },
    ]
  ],

  env: {
    NODE_ENV: {
      production: {
        use: [
          [
            'neutrino-middleware-styles-loader',
            {
              minimize: true,
              extractCSS: true,
              sourceMap: false,
              autoprefixer: ['ie > 8', 'last 4 versions'],
            },
          ],
        ],
      },
      development: {
        use: [
          [
            'neutrino-middleware-dev-server',
            {
              host: '0.0.0.0',
              public: '0.0.0.0',
            }
          ],
          [
            'neutrino-middleware-eslint',
            {
              eslint: {
                useEslintrc: false,
              },
            },
          ],
          [
            'neutrino-middleware-styles-loader',
            {
              minimize: false,
              extractCSS: false,
              sourceMap: true,
              autoprefixer: ['ie > 8', 'last 4 versions'],
            },
          ],
        ],
      },
    },
  },
};
