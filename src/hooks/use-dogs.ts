import { useQuery } from '@tanstack/react-query';

import { getDogs } from '@/api/dogs';

// Hook propio que envuelve la consulta: cualquier pantalla que necesite los perros
// lo usa, y TanStack Query comparte el resultado entre todas (no repite el llamado).
export function useDogs() {
  return useQuery({
    queryKey: ['dogs'], // nombre con el que se guarda el resultado en la caché
    queryFn: getDogs, // función que trae los datos
  });
}
