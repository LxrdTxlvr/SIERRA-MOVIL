-- ===================================================================
-- SIERRA TRANSPORTE - ESQUEMA DE BASE DE DATOS SUPABASE
-- Sistema de Movilidad Integral para la Sierra Gorda de Querétaro
-- ===================================================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLA DE PERFILES DE USUARIOS CON ACCESO (ADMIN / CONDUCTOR)
-- NOTA IMPORTANTE: Los pasajeros NO requieren cuenta ni perfil.
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('ADMIN', 'DRIVER')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. TABLA DE PERFILES E INDEXACIÓN DE TRANSPORTISTAS (TAXIS, AUTOBUSES, QRORIDE, QROVAN)
CREATE TABLE IF NOT EXISTS public.transport_profiles (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  driver_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  transport_type TEXT NOT NULL CHECK (transport_type IN ('TAXI', 'BUS', 'QRORIDE', 'QROVAN')),
  unit_number TEXT NOT NULL,
  plates TEXT,
  base_site TEXT,
  vehicle_model TEXT,
  status TEXT NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'OCCUPIED', 'IN_TRANSIT')),
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  heading DOUBLE PRECISION DEFAULT 0,
  rating NUMERIC(3, 2) DEFAULT 4.90,
  total_trips INTEGER DEFAULT 0,
  iqt_verified BOOLEAN DEFAULT TRUE,
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. TABLA DE BASES O SITIOS DE TAXIS
CREATE TABLE IF NOT EXISTS public.taxi_stands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location_name TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  capacity INTEGER DEFAULT 6,
  active_taxis_count INTEGER DEFAULT 0,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. TABLA DE RUTAS DE TRANSPORTE
CREATE TABLE IF NOT EXISTS public.routes (
  id TEXT PRIMARY KEY,
  route_code TEXT NOT NULL,
  name TEXT NOT NULL,
  operator TEXT NOT NULL,
  transport_type TEXT NOT NULL CHECK (transport_type IN ('BUS', 'QRORIDE', 'QROVAN')),
  route_color TEXT NOT NULL,
  polyline JSONB NOT NULL,
  base_fare_mxn NUMERIC(6, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. TABLA DE PUNTOS DE PARADA EN RUTA
CREATE TABLE IF NOT EXISTS public.route_stops (
  id TEXT PRIMARY KEY,
  route_id TEXT NOT NULL REFERENCES public.routes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  stop_order INTEGER NOT NULL,
  is_terminal BOOLEAN DEFAULT FALSE,
  operator TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. TABLA DE HORARIOS E ITINERARIOS DE AUTOBUSES
CREATE TABLE IF NOT EXISTS public.route_itineraries (
  id TEXT PRIMARY KEY,
  route_id TEXT NOT NULL REFERENCES public.routes(id) ON DELETE CASCADE,
  departure_time TEXT NOT NULL, -- Formato "HH:mm" (24h)
  estimated_duration_minutes INTEGER DEFAULT 180,
  bus_number TEXT,
  driver_name TEXT,
  available_seats INTEGER DEFAULT 30,
  fare_mxn NUMERIC(6, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. TABLA DE VIAJES COMPARTIDOS QRORIDE
CREATE TABLE IF NOT EXISTS public.qroride_trips (
  id TEXT PRIMARY KEY,
  driver_name TEXT NOT NULL,
  driver_phone TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  departure_date TEXT NOT NULL,
  departure_time TEXT NOT NULL,
  available_seats INTEGER NOT NULL DEFAULT 4,
  fare_per_seat_mxn NUMERIC(6, 2) NOT NULL DEFAULT 150,
  car_model TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED', 'FULL', 'COMPLETED')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===================================================================
-- SEGURIDAD: ROW LEVEL SECURITY (RLS)
-- ===================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.taxi_stands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.route_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.route_itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qroride_trips ENABLE ROW LEVEL SECURITY;

-- REGLA CLAVE: LECTURA PÚBLICA (Pasajeros anónimos pueden ver todo sin cuenta)
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Transport Profiles" ON public.transport_profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Taxi Stands" ON public.taxi_stands FOR SELECT USING (true);
CREATE POLICY "Public Read Routes" ON public.routes FOR SELECT USING (true);
CREATE POLICY "Public Read Route Stops" ON public.route_stops FOR SELECT USING (true);
CREATE POLICY "Public Read Route Itineraries" ON public.route_itineraries FOR SELECT USING (true);
CREATE POLICY "Public Read Qroride Trips" ON public.qroride_trips FOR SELECT USING (true);

-- ESCRITURA: Solo usuarios autenticados
CREATE POLICY "Authenticated Users Modify Transport Profiles" ON public.transport_profiles
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated Users Modify Taxi Stands" ON public.taxi_stands
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated Users Modify Routes" ON public.routes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated Users Modify Route Stops" ON public.route_stops
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated Users Modify Route Itineraries" ON public.route_itineraries
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated Users Modify Qroride Trips" ON public.qroride_trips
  FOR ALL USING (auth.role() = 'authenticated');

-- ===================================================================
-- INSTRUCCIÓN PARA ASIGNAR ROL DE ADMIN A UN USUARIO CREADO EN AUTH
-- (Reemplaza con el email de tu administrador creado en Supabase Auth)
-- ===================================================================
-- INSERT INTO public.profiles (id, email, full_name, phone, role)
-- SELECT id, email, 'Administrador Sierra', '4412960000', 'ADMIN'
-- FROM auth.users WHERE email = 'admin@sierratransporte.mx'
-- ON CONFLICT (id) DO UPDATE SET role = 'ADMIN';
