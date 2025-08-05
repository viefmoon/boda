-- Crear tabla de invitaciones
CREATE TABLE IF NOT EXISTS invitations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invitation_code VARCHAR(10) UNIQUE NOT NULL,
    guest_name VARCHAR(255) NOT NULL,
    max_guests INTEGER NOT NULL DEFAULT 2 CHECK (max_guests >= 1 AND max_guests <= 20),
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Crear tabla de confirmaciones (RSVPs)
CREATE TABLE IF NOT EXISTS rsvps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    attendance VARCHAR(10) NOT NULL CHECK (attendance IN ('yes', 'no')),
    guests_count INTEGER NOT NULL DEFAULT 1 CHECK (guests_count >= 0 AND guests_count <= 20),
    dietary_restrictions TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(invitation_id) -- Una confirmación por invitación
);

-- Crear índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_invitations_code ON invitations(invitation_code);
CREATE INDEX IF NOT EXISTS idx_rsvps_invitation_id ON rsvps(invitation_id);
CREATE INDEX IF NOT EXISTS idx_invitations_is_used ON invitations(is_used);

-- Función para actualizar el campo updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar updated_at
CREATE TRIGGER update_invitations_updated_at 
    BEFORE UPDATE ON invitations
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rsvps_updated_at 
    BEFORE UPDATE ON rsvps
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Configuración de RLS (Row Level Security)
-- Deshabilitado por defecto para usar con service role key
ALTER TABLE invitations DISABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps DISABLE ROW LEVEL SECURITY;

-- Si en el futuro quieres habilitar RLS, descomenta estas líneas:
-- ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
-- 
-- CREATE POLICY "Service role has full access to invitations" ON invitations
--     FOR ALL TO service_role USING (true) WITH CHECK (true);
-- 
-- CREATE POLICY "Service role has full access to rsvps" ON rsvps
--     FOR ALL TO service_role USING (true) WITH CHECK (true);
-- 
-- CREATE POLICY "Public can read invitations by code" ON invitations
--     FOR SELECT TO anon USING (true);
-- 
-- CREATE POLICY "Public can insert and read rsvps" ON rsvps
--     FOR ALL TO anon USING (true) WITH CHECK (true);