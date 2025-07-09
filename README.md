# Módulo de Comunidad

## Descripción
El módulo de comunidad permite a los usuarios publicar, editar y eliminar comentarios, creando un espacio de interacción y colaboración. Solo el autor de cada comentario puede editarlo o eliminarlo.

## Características Principales

### ✅ Funcionalidades Implementadas
- **Publicar comentarios**: Los usuarios pueden crear nuevos comentarios
- **Editar comentarios**: Solo el autor puede editar sus propios comentarios
- **Eliminar comentarios**: Solo el autor puede eliminar sus propios comentarios
- **Ver comentarios**: Todos los usuarios pueden ver los comentarios publicados
- **Perfil de usuario**: Cada comentario muestra el nombre y avatar del autor
- **Fechas**: Muestra cuándo fue creado y si fue editado
- **Responsive**: Diseño adaptable a dispositivos móviles

### 🎨 Características de Diseño
- **Interfaz moderna**: Diseño limpio con Tailwind CSS
- **Animaciones suaves**: Transiciones y efectos visuales
- **Estados de carga**: Indicadores de progreso y carga
- **Avatares automáticos**: Generación de avatares por defecto
- **Validación en tiempo real**: Contador de caracteres y validación

## Estructura de Archivos

### Páginas
- `pages/comunidad.js` - Página principal del módulo
- `pages/_app.js` - Wrapper con AuthProvider

### Componentes
- `components/CommentCard.jsx` - Tarjeta individual de comentario
- `components/CommentForm.jsx` - Formulario para crear/editar comentarios

### APIs
- `pages/api/comments.js` - API para listar y crear comentarios
- `pages/api/comments/[id].js` - API para editar/eliminar comentarios específicos

### Utilidades
- `hooks/useAuth.js` - Hook para manejo de autenticación
- `utils/helpers.js` - Funciones auxiliares
- `constants/index.js` - Constantes de la aplicación
- `lib/database.js` - Utilidades para base de datos
- `middleware/auth.js` - Middleware de autenticación

### Estilos
- `styles/comentario.css` - Estilos específicos del módulo

## Instalación

1. **Agregar los archivos** a tu proyecto Next.js siguiendo la estructura mostrada

2. **Instalar dependencias** (si no las tienes):
```bash
npm install next react react-dom
```

3. **Configurar Tailwind CSS** (si no está configurado):
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. **Importar estilos** en tu `globals.css`:
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import './comentario.css';
```

## Uso

### Acceso al Módulo
- Visita `/comunidad` en tu aplicación
- Los usuarios pueden ver todos los comentarios
- Solo usuarios autenticados pueden crear comentarios

### Crear Comentario
1. Haz clic en "Nuevo Comentario"
2. Escribe tu comentario (máximo 1000 caracteres)
3. Haz clic en "Publicar"

### Editar Comentario
1. Haz clic en los tres puntos en tu comentario
2. Selecciona "Editar"
3. Modifica el contenido
4. Haz clic en "Actualizar"

### Eliminar Comentario
1. Haz clic en los tres puntos en tu comentario
2. Selecciona "Eliminar"
3. Confirma la eliminación

## Configuración

### Variables de Entorno
Para implementación con base de datos real, configura:
```env
# Para PostgreSQL
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tu_base_de_datos

# Para MongoDB
MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos

# Para autenticación JWT
JWT_SECRET=tu_secret_key
```

### Personalización
Puedes personalizar:
- Colores en `constants/index.js`
- Estilos en `styles/comentario.css`
- Límites de caracteres en `constants/index.js`
- Generación de avatares en `utils/helpers.js`

## Seguridad

### Medidas Implementadas
- **Validación de entrada**: Sanitización de contenido
- **Autenticación**: Verificación de usuario en APIs
- **Autorización**: Solo el autor puede editar/eliminar
- **Prevención XSS**: Escape de HTML en comentarios
- **Límites de caracteres**: Validación de longitud

### Consideraciones
- La implementación actual usa datos en memoria
- Para producción, implementa una base de datos real
- Añade rate limiting para prevenir spam
- Implementa validación de contenido más robusta

## Extensiones Futuras

### Características Adicionales
- Sistema de likes/reacciones
- Respuestas a comentarios (threading)
- Notificaciones en tiempo real
- Moderación de contenido
- Búsqueda y filtros
- Paginación
- Reportes de usuarios
- Integración con redes sociales

### Mejoras Técnicas
- Implementar WebSocket para actualizaciones en tiempo real
- Añadir caché con Redis
- Implementar CDN para avatares
- Añadir tests unitarios y de integración
- Implementar CI/CD

## Troubleshooting

### Problemas Comunes

**Error: "useAuth must be used within an AuthProvider"**
- Asegúrate de que `_app.js` esté configurado correctamente

**Comentarios no se muestran**
- Verifica que las APIs estén funcionando
- Revisa la consola del navegador para errores

**Estilos no se aplican**
- Verifica que Tailwind CSS esté configurado
- Importa `comentario.css` en tu archivo de estilos global

**Permisos de edición/eliminación no funcionan**
- Verifica que la autenticación esté funcionando
- Revisa que los IDs de usuario coincidan

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ve el archivo `LICENSE` para más detalles.

## Contacto

Para preguntas o sugerencias sobre el módulo de comunidad, por favor abre un issue en el repositorio.