# 🎯 Discord Chat Exporter Extension

Extensión de Chrome para exportar **TODOS los mensajes completos** de un canal de Discord con un solo clic. Descarga históricos completos sin límites de API.

## ✨ Características

✅ **Exporta todos los mensajes** de cualquier canal (sin límites API)  
✅ **Descarga archivos adjuntos** (imágenes, videos, documentos)  
✅ **Formatos múltiples**: JSON, CSV, HTML, XLSX  
✅ **Interfaz web** para visualizar y descargar  
✅ **Sin dependencia de servidores** - Todo local  
✅ **Soporte para historiales enormes** (10k+ mensajes)  

## 🚀 Instalación

### Como extensión local

1. Clona este repositorio:
```bash
git clone https://github.com/tu-usuario/discord-chat-exporter-extension.git
cd discord-chat-exporter-extension
```

2. Abre Chrome y ve a `chrome://extensions/`
3. Activa **Modo de desarrollador** (esquina superior derecha)
4. Haz clic en **Cargar extensión sin empaquetar**
5. Selecciona la carpeta del proyecto

## 📖 Cómo usar

1. **Abre Discord** en Chrome y navega al canal que quieres exportar
2. **Haz clic en el icono de la extensión** en la barra de herramientas
3. **Selecciona el rango de fechas** (opcional) o exporta TODO
4. **Elige el formato** de exportación (JSON, CSV, HTML, XLSX)
5. **Haz clic en Exportar**
6. Se abrirá una pestaña con tu descarga lista

## 📁 Estructura del proyecto

```
.
├── manifest.json          # Configuración de la extensión
├── popup/
│   ├── popup.html        # Interfaz principal
│   ├── popup.js          # Lógica del popup
│   └── popup.css         # Estilos
├── content/
│   └── content.js        # Script de contenido (inyectado en Discord)
├── background/
│   └── background.js     # Service worker
├── viewer/
│   ├── index.html        # Página de visualización de datos
│   ├── viewer.js         # Lógica de visualización
│   └── styles.css        # Estilos
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # Este archivo
```

## 🛠️ Tecnologías

- **Chrome Extension API** - Manipulación de pestañas y almacenamiento
- **JavaScript ES6+** - Lógica principal
- **HTML/CSS** - Interfaz de usuario
- **ExcelJS** - Exportación a XLSX
- **JSZip** - Descarga de archivos comprimidos

## 🔒 Privacidad

✅ **Sin servidores** - Todo se procesa localmente en tu computadora  
✅ **Sin tracking** - No recolectamos datos  
✅ **Abierto** - Código fuente disponible para auditar

## ⚙️ Configuración avanzada

### Variables de entorno (.env)

```env
MAX_MESSAGES_PER_REQUEST=100
DELAY_BETWEEN_REQUESTS=500
RETRY_ATTEMPTS=3
```

## 🐛 Solución de problemas

### La extensión no aparece
- Asegúrate de habilitar el **Modo de desarrollador** en `chrome://extensions/`
- Recarga la extensión (botón 🔄 en la tarjeta de la extensión)

### Exportación lenta
- Esto es normal para canales con +5000 mensajes
- Discord limita las solicitudes internamente
- Paciencia es la clave 😄

### Archivos adjuntos no se descargan
- Verifica que tengas acceso al canal
- Algunos archivos pueden estar expirados (enlaces vencidos)

## 📝 Roadmap

- [ ] Interfaz mejorada con progress bar
- [ ] Exportación a PDF
- [ ] Buscar/filtrar antes de exportar
- [ ] Soporte para servidores privados
- [ ] Sincronización automática

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - mira `LICENSE` para más detalles

## ⚠️ Disclaimer

Esta herramienta es **independiente** y **no está afiliada** con Discord Inc. Úsala responsablemente y respeta los términos de servicio de Discord.

## 💬 Soporte

¿Tienes preguntas? Abre un issue en GitHub o contactame:
- Discord: [Tu usuario]
- Email: [Tu email]
- Twitter: [@tu_handle]

---

⭐ Si te ayuda, ¡dale una estrella al repo!
