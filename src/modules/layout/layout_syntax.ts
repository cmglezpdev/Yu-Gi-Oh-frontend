import { ref } from "vue";

import { userdata} from '@/utils/user.service';

const items = ref([
  {
    label: 'Informacion del perfil',
    items: [

      {
        label: 'Decks',
        icon: 'pi pi-box',
        route: `/my-decks/${userdata.id}/general`
      },
      {
        label: 'Torneos',
        icon: 'pi pi-tag',
        route: `/my-tournaments/${userdata.id}/general`
      },
      {
        label: 'Estadisticas',
        icon: 'pi pi-chart-bar',
        route: '/my-tournaments'
      },
    ]
  },
  {
    label: 'Administracion',
    items: [

      {
        label: 'Gestionar Usuarios',
        icon: 'pi pi-user-edit',
        route: '/my-decks'
      },
      {
        label: 'Gestionar Torneos',
        icon: 'pi pi-desktop',
        route: '/my-tournaments'
      },
    ]
  },
  {
    label: 'Perfil',
    items: [
      {
        label: 'Cerrar sesion',
        icon: 'pi pi-sign-out',
        command: () => {
          alert('cerrando sesion')
        }
      }
    ]
  }
]);

export { userdata, items }
