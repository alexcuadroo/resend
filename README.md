# Formulario de Contacto con Resend

Un formulario de contacto simple que utiliza Vercel Functions y Resend para enviar emails.

## 🚀 Configuración Rápida

### 1. Obtener API Key de Resend
1. Ve a [Resend](https://resend.com)
2. Crea una cuenta o inicia sesión
3. Ve a API Keys y crea una nueva API key
4. Copia la API key (comienza con `re_`)

### 2. Configurar variables de entorno

#### Para desarrollo local:
1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env.local
   ```

2. Edita `.env.local` con tus valores reales:
   ```bash
   RESEND_API_KEY=tu_api_key_real_aqui
   FROM_EMAIL=Contacto <tu-email@tu-dominio.com>
   TO_EMAIL=destino@ejemplo.com
   ```

#### Para producción (Vercel):
1. Ve a tu proyecto en Vercel Dashboard
2. Ve a Settings > Environment Variables
3. Añade estas variables:
   - `RESEND_API_KEY`: Tu API key de Resend
   - `FROM_EMAIL`: Email verificado desde el cual enviar
   - `TO_EMAIL`: Email donde recibirás los mensajes

### 3. Verificar dominio (Opcional pero recomendado)
- En Resend, ve a Domains y agrega tu dominio
- Sigue las instrucciones para verificar tu dominio
- Usa un email de tu dominio verificado en `FROM_EMAIL`

## 🛠 Desarrollo Local

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Ejecutar en modo desarrollo
vercel dev
```

Abre http://localhost:3000 para ver el formulario.

## 🌐 Despliegue a Producción

```bash
# Desplegar a Vercel
vercel --prod
```

## 📁 Estructura del Proyecto

```
resend/
├── index.html              # Formulario de contacto
├── api/
│   └── send-contact.js     # Function serverless para enviar emails
├── package.json            # Configuración del proyecto
├── vercel.json            # Configuración de Vercel
└── README.md              # Este archivo
```

## ✨ Características

- ✅ Formulario HTML simple sin frameworks
- ✅ Validación del lado cliente y servidor
- ✅ Diseño responsivo y moderno
- ✅ Mensajes de éxito y error
- ✅ Loading state durante el envío
- ✅ Email con formato HTML y texto plano
- ✅ Serverless Functions de Vercel

## 🔧 Personalización

### Estilos
Edita el CSS en `index.html` para cambiar la apariencia del formulario.

### Email Template
Modifica el contenido del email en `api/send-contact.js` en la sección `emailContent`.

### Validaciones
Añade más validaciones en el lado cliente (JavaScript) y servidor (API function).

## 📝 Notas Importantes

- **API Key**: Nunca hardcodees tu API key en el frontend. Siempre úsala en el backend.
- **Dominio**: Para uso en producción, verifica tu dominio en Resend para evitar que los emails vayan a spam.
- **Rate Limiting**: Considera implementar rate limiting para evitar spam.
- **CORS**: La configuración actual permite requests desde cualquier origen.

## 🐛 Resolución de Problemas

### Error 403/401
- Verifica que tu API key de Resend sea correcta
- Asegúrate de que el email `FROM_EMAIL` esté verificado en Resend

### Emails van a spam
- Verifica tu dominio en Resend
- Usa un email de tu dominio verificado en `FROM_EMAIL`

### Error 500
- Revisa los logs en Vercel Dashboard
- Verifica que todos los campos requeridos estén presentes

## 📞 Soporte

Si tienes problemas:
1. Revisa la documentación de [Resend](https://resend.com/docs)
2. Revisa la documentación de [Vercel Functions](https://vercel.com/docs/functions)
3. Verifica los logs en Vercel Dashboard
