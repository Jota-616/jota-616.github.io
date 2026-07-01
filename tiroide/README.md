# 💊 Eutirox Manager — PWA

Aplicación progresiva (PWA) para seguimiento clínico de tratamiento con Eutirox en pacientes con **Tiroiditis de Hashimoto**.

Funciona **completamente offline** una vez instalada. Datos guardados en localStorage del navegador.

---

## 📁 Estructura del repositorio

```
eutirox-pwa/
├── index.html              ← App principal (todo en un archivo)
├── manifest.json           ← Configuración PWA
├── sw.js                   ← Service Worker (offline + caché)
├── icons/
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png         ← Ícono principal
│   ├── icon-384.png
│   ├── icon-512.png
│   └── icon-512-maskable.png
└── README.md
```

---

## 🚀 Despliegue en GitHub Pages

### Paso 1 — Crear repositorio

1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repo: `eutirox-manager` (o el que prefieras)
3. Visibilidad: **Public** (requerido para GitHub Pages gratuito)
4. No añadir README ni .gitignore — dejar vacío
5. Crear repositorio

### Paso 2 — Subir archivos

**Opción A — Desde la web de GitHub (sin instalar Git):**

1. En la página del repositorio vacío, haz clic en **"uploading an existing file"**
2. Arrastra toda la carpeta `eutirox-pwa/` o sube los archivos uno a uno:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - Carpeta `icons/` con todos los `.png`
3. Commit: "Initial PWA deployment"

**Opción B — Con Git en terminal:**

```bash
git clone https://github.com/TU_USUARIO/eutirox-manager.git
cp -r /ruta/a/eutirox-pwa/* eutirox-manager/
cd eutirox-manager
git add .
git commit -m "Deploy Eutirox Manager PWA"
git push origin main
```

### Paso 3 — Activar GitHub Pages

1. Ve a **Settings** del repositorio
2. Sidebar izquierdo → **Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` / `/ (root)`
5. Guardar
6. En ~2 minutos la app estará en: `https://TU_USUARIO.github.io/eutirox-manager/`

---

## 📲 Instalar como app (PWA)

### En computador (Chrome / Edge):
- Abre la URL de GitHub Pages
- Aparece ícono de instalación en la barra de direcciones (⊕ o similar)
- O usa el botón **"📲 Instalar app"** que aparece en el sidebar

### En iPhone / iPad (Safari):
1. Abre la URL en Safari
2. Toca el botón compartir (□↑)
3. Selecciona **"Añadir a pantalla de inicio"**
4. Nombre: Eutirox → Añadir

### En Android (Chrome):
- Chrome muestra automáticamente el banner de instalación
- O: menú ⋮ → **"Instalar app"** o **"Añadir a pantalla de inicio"**

---

## 💾 Portabilidad de datos

Los datos se guardan en `localStorage` del navegador. Para llevarlos entre equipos:

1. **Exportar:** En la app → `Mis Datos` → `Descargar mis datos (.json)`
2. **Importar:** En el nuevo equipo → `Mis Datos` → `Cargar archivo .json`

---

## 🔧 Actualizar la app

Cuando hay una nueva versión del código:

1. Subir los archivos actualizados al repositorio
2. **Incrementar** el número de versión en `sw.js`:
   ```js
   const CACHE_VERSION = 'eutirox-v1.3';  // ← cambiar número
   ```
3. La app detectará el cambio y mostrará un banner de actualización

---

## 🧰 Funcionalidades

| Sección | Descripción |
|---|---|
| 🏠 Dashboard | KPIs de exámenes actuales, alertas clínicas, gráficos |
| 💊 Calculadora | Interpolación lineal con validación clínica de 3 capas |
| 📈 Historial | Evolución temporal con gráficos de TSH, FT4, Anti-TPO, Vit D |
| 📁 Cargar Exámenes | Formulario manual + parser de PDF/CSV |
| 🧪 Suplementos | Guía completa con tipo, dosis, horario, combinaciones |
| 🥗 Alimentación | Protocolo anti-Hashimoto (qué eliminar / priorizar) |
| ⏰ Horarios | Timeline diario de Eutirox + suplementos |
| 🏃 Ejercicios | Rutina semanal adaptada a Hashimoto |
| 📄 PDF | Export completo del plan clínico |
| 💾 Mis Datos | Export/import JSON para portabilidad |

---

## ⚕️ Aviso médico

Esta aplicación es una **herramienta de apoyo clínico**, no un dispositivo médico certificado.

- No reemplaza la evaluación presencial del endocrinólogo
- Los ajustes de dosis de Eutirox deben ser **graduales y supervisados**
- La calculadora distingue entre resultado matemático (referencia) y recomendación clínica segura
- Nunca sugiere suspensión automática del tratamiento

---

## 🛠 Tecnologías

- **App shell:** HTML5 + CSS3 + Vanilla JS (sin framework)
- **Gráficos:** [Chart.js 4.4](https://www.chartjs.org/)
- **PDF:** [jsPDF 2.5](https://github.com/parallax/jsPDF)
- **Tipografía:** [Outfit + JetBrains Mono](https://fonts.google.com/)
- **Persistencia:** Web localStorage API
- **Offline:** Service Worker (Cache API)

---

*Desarrollado para seguimiento personalizado de Tiroiditis de Hashimoto.*
