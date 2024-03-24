import { PluginOption, defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// Set to false to disable eruda during development
const eruda = true; // false

const erudaInjector: PluginOption = {
  name: 'erudaInjector',
  transformIndexHtml: html => {
    return {
      html,
      tags: [
        {
          tag: 'script',
          attrs: {
            src: '/node_modules/eruda/eruda'
          },
          injectTo: 'body'
        }, {
          tag: 'script',
          injectTo: 'body',
          children: 'eruda.init()'
        }
      ]
    }
  }
}

const manifest = {
  "short_name": "Shade Music",
  "name": "Shade Music Plus",
  "description": "Meet Shade Music Plus - It's a new way of Music!",
  "icons": [
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192",
      "purpose": "any maskable"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512",
      "purpose": "any maskable"
    }
  ],
  "start_url": "/",
  "display": "standalone",
  "theme_color": "white",
  "background_color": "white",
  "share_target": {
    "action": "/",
    "method": "GET",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url"
    }
  }
}

export default defineConfig(({ command }) => {
  const plugins = [
    VitePWA({
      manifest: manifest,
      disable: command !== 'build',
      includeAssets: ['*.woff2', 'ytify_thumbnail_min.webp']
    })
  ];
  if (eruda && command === 'serve') plugins.push([erudaInjector]);
  return { plugins: plugins }
});
