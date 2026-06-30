# Stoa Nocturna — versión para publicar (PWA)

Esta es la versión "hospedable" de Stoa: ya no usa el ícono incrustado, sino
archivos reales, y trae **service worker** para que cargue al instante y funcione
offline de verdad, guardando tu progreso para siempre.

## Archivos (súbelos todos juntos)

- `index.html` — la app completa (90 lecciones, diario, respaldo).
- `manifest.json` — nombre e íconos.
- `sw.js` — service worker (offline + carga instantánea).
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — íconos.

## Publicar en GitHub Pages (desde el iPhone)

1. Crea (o usa) tu repositorio `tuusuario.github.io`.
2. Sube estos archivos a una subcarpeta, por ejemplo `/stoa`.
3. En 1–2 minutos quedará en `https://tuusuario.github.io/stoa/`.
4. Ábrela en Safari → Compartir → **Añadir a pantalla de inicio**.

Desde ese ícono guarda solo, funciona offline y abre a pantalla completa.

## Recuperar lo que ya tenías

Si habías escrito en la versión de archivo local, esos datos NO se traspasan
solos. Pero si hiciste un respaldo: abre la app publicada → **Sello → Restaurar
respaldo** → elige tu `.json`. Y de ahora en adelante guarda sola.

## Si actualizas la app

Cambia el `index.html` y **sube la versión** en `sw.js` (`stoa-v1` → `stoa-v2`),
si no el iPhone seguirá mostrando la versión anterior en caché.
