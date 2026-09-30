import { create } from 'zustand';

import { type Dog } from '@/components/dog-card';

// Zustand guarda el estado "del cliente": cosas que decide el usuario en la app
// (filtros, selecciones). Los datos que vienen del backend los maneja TanStack Query.

export type FiltroTamano = Dog['size'] | 'Todos';

type AdoptionState = {
  filtroTamano: FiltroTamano;
  solicitudes: string[]; // nombres de los perros que el usuario pidió adoptar
  setFiltroTamano: (filtro: FiltroTamano) => void;
  alternarSolicitud: (nombre: string) => void;
};

export const useAdoptionStore = create<AdoptionState>((set) => ({
  filtroTamano: 'Todos',
  solicitudes: [],
  setFiltroTamano: (filtro) => set({ filtroTamano: filtro }),
  // Si el perro ya estaba en la lista lo saca, si no estaba lo agrega.
  alternarSolicitud: (nombre) =>
    set((state) => ({
      solicitudes: state.solicitudes.includes(nombre)
        ? state.solicitudes.filter((n) => n !== nombre)
        : [...state.solicitudes, nombre],
    })),
}));
