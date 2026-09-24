import { supabase, isSupabaseConfigured } from '../utils/supabase';
import {
  LiveVehicle,
  ScheduledTransportRoute,
  TaxiStand,
  StopPoint,
  QrorideTripPosting,
  UserRole,
  UserProfile,
} from '../types/transport';
import {
  MOCK_LIVE_TAXIS,
  MOCK_TAXI_STANDS,
  generateDynamicRoutes,
  INITIAL_QRORIDE_POSTINGS,
} from '../data/mockTransportData';

/**
 * Servicio inteligente de datos para SierraTransporte.
 * Si Supabase está configurado con llaves válidas, realiza consultas y escrituras a la BD.
 * Si no está configurado o hay problemas de red, recurre fluidamente al catálogo local.
 */
class SupabaseService {
  // ==========================================
  // AUTENTICACIÓN (ADMINISTRADORES Y CONDUCTORES)
  // ==========================================

  async signInWithEmail(email: string, password: string):Promise<{ user: UserProfile | null; error: string | null }> {
    if (!isSupabaseConfigured) {
      // Simulación de login para desarrollo local si aún no se configuran llaves
      if (email.toLowerCase().includes('admin') || password === 'admin123') {
        const adminUser: UserProfile = {
          id: 'admin-local-1',
          name: 'Administrador Sierra',
          email,
          phone: '4412960000',
          role: 'ADMIN',
        };
        return { user: adminUser, error: null };
      }
      return {
        user: null,
        error: 'Credenciales inválidas. Ingresa con un correo de administrador o configura tu base de datos en Supabase.',
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        return { user: null, error: error?.message || 'Error al iniciar sesión' };
      }

      // Consultar rol en public.profiles
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      const role: UserRole = (profileData?.role as UserRole) || 'ADMIN';

      const user: UserProfile = {
        id: data.user.id,
        name: profileData?.full_name || data.user.email?.split('@')[0] || 'Administrador',
        email: data.user.email || email,
        phone: profileData?.phone || '',
        role,
      };

      return { user, error: null };
    } catch (err: any) {
      return { user: null, error: err.message || 'Error de conexión' };
    }
  }

  async signOut(): Promise<void> {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
  }

  // ==========================================
  // CONDUCTORES Y TAXIS
  // ==========================================

  async fetchDrivers(): Promise<LiveVehicle[]> {
    if (!isSupabaseConfigured) {
      return MOCK_LIVE_TAXIS;
    }

    try {
      const { data, error } = await supabase
        .from('transport_profiles')
        .select('*')
        .eq('is_active', true);

      if (error || !data || data.length === 0) {
        return MOCK_LIVE_TAXIS;
      }

      return data.map((d: any) => ({
        id: d.id,
        type: d.transport_type === 'TAXI' ? 'TAXI' : 'QRORIDE',
        driverName: d.driver_name,
        unitNumber: d.unit_number,
        plates: d.plates || '',
        baseSite: d.base_site || 'Sitio Jalpan Centro',
        phone: d.phone,
        whatsapp: d.whatsapp || d.phone,
        coordinate: {
          latitude: d.latitude || 21.2174,
          longitude: d.longitude || -99.4704,
        },
        heading: d.heading || 0,
        status: d.status || 'AVAILABLE',
        speedKmH: 0,
        lastUpdated: 'En vivo',
        vehicleModel: d.vehicle_model,
        rating: d.rating ? Number(d.rating) : 4.9,
        totalTrips: d.total_trips || 0,
        iqtVerified: d.iqt_verified ?? true,
        notes: d.notes,
      }));
    } catch {
      return MOCK_LIVE_TAXIS;
    }
  }

  async addDriver(driver: Omit<LiveVehicle, 'lastUpdated'>): Promise<boolean> {
    if (!isSupabaseConfigured) return true;

    try {
      const { error } = await supabase.from('transport_profiles').insert({
        id: driver.id,
        driver_name: driver.driverName,
        phone: driver.phone,
        whatsapp: driver.whatsapp || driver.phone,
        transport_type: driver.type,
        unit_number: driver.unitNumber,
        plates: driver.plates,
        base_site: driver.baseSite,
        vehicle_model: driver.vehicleModel,
        status: driver.status,
        latitude: driver.coordinate.latitude,
        longitude: driver.coordinate.longitude,
        heading: driver.heading,
        rating: driver.rating || 5.0,
        total_trips: driver.totalTrips || 0,
        iqt_verified: driver.iqtVerified ?? true,
        notes: driver.notes,
      });
      return !error;
    } catch {
      return false;
    }
  }

  async updateDriverStatus(id: string, status: 'AVAILABLE' | 'OCCUPIED'): Promise<boolean> {
    if (!isSupabaseConfigured) return true;

    try {
      const { error } = await supabase
        .from('transport_profiles')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      return !error;
    } catch {
      return false;
    }
  }

  // ==========================================
  // SITIOS / BASES DE TAXI (CON TRASLADO POR ADMIN)
  // ==========================================

  async fetchTaxiStands(): Promise<TaxiStand[]> {
    if (!isSupabaseConfigured) {
      return MOCK_TAXI_STANDS;
    }

    try {
      const { data, error } = await supabase.from('taxi_stands').select('*');
      if (error || !data || data.length === 0) {
        return MOCK_TAXI_STANDS;
      }

      return data.map((s: any) => ({
        id: s.id,
        name: s.name,
        locationName: s.location_name,
        coordinate: {
          latitude: s.latitude,
          longitude: s.longitude,
        },
        capacity: s.capacity,
        activeTaxisCount: s.active_taxis_count,
        phone: s.phone,
      }));
    } catch {
      return MOCK_TAXI_STANDS;
    }
  }

  async updateTaxiStandLocation(id: string, coordinate: { latitude: number; longitude: number }): Promise<boolean> {
    if (!isSupabaseConfigured) return true;

    try {
      const { error } = await supabase
        .from('taxi_stands')
        .update({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        })
        .eq('id', id);
      return !error;
    } catch {
      return false;
    }
  }

  // ==========================================
  // RUTAS, PARADAS E ITINERARIOS
  // ==========================================

  async fetchRoutes(): Promise<ScheduledTransportRoute[]> {
    if (!isSupabaseConfigured) {
      return generateDynamicRoutes();
    }

    try {
      const { data: routesData, error: routesError } = await supabase
        .from('routes')
        .select('*')
        .eq('is_active', true);

      if (routesError || !routesData || routesData.length === 0) {
        return generateDynamicRoutes();
      }

      const { data: stopsData } = await supabase.from('route_stops').select('*').order('stop_order');
      const { data: itinData } = await supabase.from('route_itineraries').select('*');

      return routesData.map((r: any) => {
        const stops: StopPoint[] = (stopsData || [])
          .filter((s: any) => s.route_id === r.id)
          .map((s: any) => ({
            id: s.id,
            name: s.name,
            coordinate: { latitude: s.latitude, longitude: s.longitude },
            order: s.stop_order,
            isTerminal: s.is_terminal,
            operator: s.operator,
            notes: s.notes,
          }));

        const itineraries = (itinData || [])
          .filter((i: any) => i.route_id === r.id)
          .map((i: any) => ({
            id: i.id,
            departureTime: i.departure_time,
            estimatedDurationMinutes: i.estimated_duration_minutes,
            busNumber: i.bus_number,
            driverName: i.driver_name,
            availableSeats: i.available_seats,
            fareMxn: Number(i.fare_mxn),
          }));

        return {
          id: r.id,
          routeCode: r.route_code,
          name: r.name,
          operator: r.operator,
          transportType: r.transport_type,
          routeColor: r.route_color,
          polyline: r.polyline || [],
          stops,
          itineraries,
          baseFareMxn: Number(r.base_fare_mxn),
        };
      });
    } catch {
      return generateDynamicRoutes();
    }
  }

  async addItinerary(routeId: string, itin: {
    departureTime: string;
    busNumber: string;
    driverName: string;
    availableSeats: number;
    fareMxn: number;
  }): Promise<boolean> {
    if (!isSupabaseConfigured) return true;

    try {
      const { error } = await supabase.from('route_itineraries').insert({
        id: `itin-${Date.now()}`,
        route_id: routeId,
        departure_time: itin.departureTime,
        bus_number: itin.busNumber,
        driver_name: itin.driverName,
        available_seats: itin.availableSeats,
        fare_mxn: itin.fareMxn,
      });
      return !error;
    } catch {
      return false;
    }
  }

  async deleteItinerary(itineraryId: string): Promise<boolean> {
    if (!isSupabaseConfigured) return true;

    try {
      const { error } = await supabase
        .from('route_itineraries')
        .delete()
        .eq('id', itineraryId);
      return !error;
    } catch {
      return false;
    }
  }

  async addRouteStop(routeId: string, stop: Omit<StopPoint, 'id'>): Promise<boolean> {
    if (!isSupabaseConfigured) return true;

    try {
      const { error } = await supabase.from('route_stops').insert({
        id: `stop-${Date.now()}`,
        route_id: routeId,
        name: stop.name,
        latitude: stop.coordinate.latitude,
        longitude: stop.coordinate.longitude,
        stop_order: stop.order,
        is_terminal: stop.isTerminal ?? false,
        notes: stop.notes,
      });
      return !error;
    } catch {
      return false;
    }
  }

  // ==========================================
  // VIAJES QRORIDE
  // ==========================================

  async fetchQrorideTrips(): Promise<QrorideTripPosting[]> {
    if (!isSupabaseConfigured) {
      return INITIAL_QRORIDE_POSTINGS;
    }

    try {
      const { data, error } = await supabase.from('qroride_trips').select('*');
      if (error || !data || data.length === 0) {
        return INITIAL_QRORIDE_POSTINGS;
      }

      return data.map((t: any) => ({
        id: t.id,
        driverName: t.driver_name,
        driverPhone: t.driver_phone,
        origin: t.origin,
        destination: t.destination,
        departureDate: t.departure_date,
        departureTime: t.departure_time,
        availableSeats: t.available_seats,
        farePerSeatMxn: Number(t.fare_per_seat_mxn),
        carModel: t.car_model || '',
        notes: t.notes,
        status: t.status,
      }));
    } catch {
      return INITIAL_QRORIDE_POSTINGS;
    }
  }

  async addQrorideTrip(trip: Omit<QrorideTripPosting, 'id' | 'status'>): Promise<boolean> {
    if (!isSupabaseConfigured) return true;

    try {
      const { error } = await supabase.from('qroride_trips').insert({
        id: `qro-${Date.now()}`,
        driver_name: trip.driverName,
        driver_phone: trip.driverPhone,
        origin: trip.origin,
        destination: trip.destination,
        departure_date: trip.departureDate,
        departure_time: trip.departureTime,
        available_seats: trip.availableSeats,
        fare_per_seat_mxn: trip.farePerSeatMxn,
        car_model: trip.carModel,
        notes: trip.notes,
        status: 'SCHEDULED',
      });
      return !error;
    } catch {
      return false;
    }
  }

  async deleteQrorideTrip(tripId: string): Promise<boolean> {
    if (!isSupabaseConfigured) return true;

    try {
      const { error } = await supabase
        .from('qroride_trips')
        .delete()
        .eq('id', tripId);
      return !error;
    } catch {
      return false;
    }
  }
}

export const supabaseService = new SupabaseService();
