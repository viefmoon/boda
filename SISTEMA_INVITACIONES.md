# Sistema de Invitaciones para Boda - Sofía & Oswaldo

## 🎯 Resumen del Sistema

Sistema completo de gestión de invitaciones con códigos únicos, confirmación de asistencia (RSVP) y panel administrativo.

## 🔧 Arquitectura Técnica

### Stack:
- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación Admin**: Cookie-based con contraseña
- **Hosting**: Vercel

### Estructura de archivos clave:
```
src/
├── app/
│   ├── admin/              # Panel administrativo
│   │   ├── login/          # Login admin
│   │   └── dashboard/      # Dashboard principal
│   ├── api/                # API Routes
│   │   ├── admin/          # Auth admin
│   │   ├── invitations/    # Gestión invitaciones
│   │   └── rsvp/           # Confirmaciones
│   └── no-invitation/      # Página sin invitación
├── lib/
│   ├── supabase/           # Clientes Supabase
│   ├── invitation-utils.ts # Generador de códigos
│   └── whatsapp-message.ts # Mensajes WhatsApp
├── sections/home/components/
│   ├── rsvp.tsx           # Formulario RSVP
│   └── welcome-modal.tsx  # Modal personalizado
└── middleware.ts           # Validación de rutas
```

## 📊 Base de Datos

### Tabla `invitations`:
- `id`: UUID (PK)
- `invitation_code`: VARCHAR(10) único (formato: LE7K9X42)
- `guest_name`: Nombre del invitado
- `max_guests`: Máximo de personas (1-20)
- `is_used`: Si ya confirmaron
- `created_at`, `updated_at`: Timestamps

### Tabla `rsvps`:
- `id`: UUID (PK)
- `invitation_id`: FK a invitations
- `name`: Nombre confirmado
- `attendance`: 'yes' | 'no'
- `guests_count`: Número de asistentes
- `dietary_restrictions`: Restricciones alimentarias
- `message`: Mensaje para los novios
- `created_at`, `updated_at`: Timestamps

## 🔐 Seguridad

1. **Service Role Key**: Usado en API routes para bypass de RLS
2. **Middleware**: Valida invitaciones en todas las rutas
3. **Códigos únicos**: 8 caracteres alfanuméricos basados en nombre
4. **Una confirmación por invitación**: No permite duplicados
5. **Fecha límite**: 16 de septiembre de 2025

## 💬 Integración WhatsApp

### Formato del mensaje generado:
- Saludo personalizado
- Información del evento
- Link único de confirmación
- Fecha límite
- Código de vestimenta

### Opciones de compartir:
1. Copiar mensaje completo
2. Abrir WhatsApp Web/App
3. Copiar solo el link

## 🚀 Flujo de Uso

### Para el Administrador:
1. Login en `/admin` con contraseña
2. Crear invitación con nombre y máx. invitados
3. Se genera código único (ej: LE7K9X42)
4. Copiar mensaje de WhatsApp
5. Enviar a invitados

### Para el Invitado:
1. Recibe link: `https://bodasofibayo.vercel.app/?invitation=LE7K9X42`
2. Ve modal de bienvenida personalizado
3. Formulario pre-llenado con su nombre
4. Confirma asistencia (respeta límite de invitados)
5. Puede editar/eliminar hasta fecha límite

## 📝 Configuración Necesaria

### Variables de entorno (.env.local):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=https://bodasofibayo.vercel.app
```

### Migración SQL:
Ejecutar `supabase/migrations/001_complete_setup.sql` en Supabase

## ✨ Características Destacadas

- ✅ Invitaciones con códigos únicos seguros
- ✅ Límite personalizado de invitados por invitación
- ✅ Mensajes de WhatsApp generados automáticamente
- ✅ Panel admin mobile-first con estadísticas
- ✅ Edición/eliminación de confirmaciones
- ✅ Fecha límite automática
- ✅ Sin duplicados (una confirmación por invitación)
- ✅ Validación de invitaciones por middleware
- ✅ Formularios pre-llenados
- ✅ Restricciones alimentarias opcionales

## 🎨 Diseño

- Mobile-first responsive
- Modo claro/oscuro
- Animaciones con Framer Motion
- Navegación inferior estilo app móvil
- Cards y modales elegantes
- Feedback visual en todas las acciones