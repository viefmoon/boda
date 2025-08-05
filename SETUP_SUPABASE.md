# Configuración de Supabase para el Sistema de Invitaciones

## 1. Crear cuenta y proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Ve a **Settings** → **API** y guarda:
   - **Project URL** (ejemplo: `https://xyzxyz.supabase.co`)
   - **Anon/Public Key** (la clave pública)
   - **Service Role Key** (la clave de servicio - IMPORTANTE para admin)

## 2. Configurar la base de datos

1. En el dashboard de Supabase, ve a **SQL Editor**
2. Copia y pega el contenido del archivo `supabase/migrations/001_complete_setup.sql`
3. Ejecuta el script SQL (esto creará las tablas y configuraciones necesarias)

## 3. Configurar variables de entorno

1. Abre el archivo `.env.local`
2. Reemplaza los valores:
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
   ADMIN_PASSWORD=una_contraseña_segura_para_admin
   NEXT_PUBLIC_SITE_URL=https://bodasofibayo.vercel.app
   ```

## 4. Iniciar la aplicación

```bash
npm run dev
```

## 5. Acceder al panel de administración

1. Ve a `http://localhost:3000/admin/login`
2. Ingresa la contraseña que configuraste en `ADMIN_PASSWORD`

## 6. Crear invitaciones

1. En el panel de admin, ve a "Crear Invitación"
2. Ingresa:
   - **Nombre del Invitado**: Ej: "Juan y María Pérez"
   - **Máximo de Invitados**: Cantidad máxima de personas que pueden confirmar
   - **Mensaje Personalizado** (opcional): Un mensaje especial para ese invitado
3. Click en "Crear Invitación"
4. Se generará un código único y un link

## 7. Compartir invitaciones

El sistema genera links únicos como:
```
https://tu-sitio.com/?invitation=ABC123XY
```

Cada invitado recibe su link personalizado que:
- Muestra su nombre en la página
- Limita la cantidad de personas que pueden confirmar
- Solo permite una confirmación por invitación
- Muestra mensaje personalizado si lo configuraste

## 8. Ver confirmaciones

En el panel de admin puedes ver:
- Total de invitaciones enviadas
- Confirmaciones recibidas
- Número total de invitados confirmados
- Invitaciones pendientes
- Detalles de cada confirmación (nombre, asistencia, mensaje, etc.)

## Características del sistema:

✅ **Invitaciones únicas**: Cada invitado tiene un código único
✅ **Control de capacidad**: Limita el número de personas por invitación
✅ **Sin duplicados**: Cada invitación solo puede confirmarse una vez
✅ **Mensajes personalizados**: Puedes agregar un mensaje especial para cada invitado
✅ **Panel de administración**: Ve todas las confirmaciones en tiempo real
✅ **Seguro**: Solo tú puedes acceder al panel de admin con contraseña
✅ **Restricciones alimentarias**: Los invitados pueden indicar alergias o preferencias
✅ **Mensajes de felicitación**: Los invitados pueden dejar buenos deseos