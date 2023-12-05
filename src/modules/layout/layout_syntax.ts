import { ref, toRefs } from "vue";
import { getUserData} from '@/utils/user.service';
import {logout} from '@/utils/auth.service';

const userdata=ref(getUserData())

export const reload =()=>{
   userdata.value=getUserData();
}

let redirect:any;

export const setRedirection=(newRedirection:any)=>{
     redirect= newRedirection;
}

const quitSession=()=>{
  logout();
  redirect();
}
const items = ref([
  {
    label: 'Informacion del perfil',
    items: [

      {
        label: 'Decks',
        icon: 'pi pi-box',
        route: `/my-decks/${userdata.value.id}/general`
      },
      {
        label: 'Torneos',
        icon: 'pi pi-tag',
        route: `/my-tournaments/${userdata.value.id}/aprobed`
      },
      {
        label: 'Informacion del usuario',
        icon: 'pi pi-chart-bar',
        route: `/my-stadistics/${userdata.value.id}`
      },
    ]
  },
  {
    label: 'Administracion',
    items: [

      {
        label: 'Gestionar Usuarios',
        icon: 'pi pi-user-edit',
        route: '/admin/users'
      },
      {
        label: 'Gestionar Torneos',
        icon: 'pi pi-desktop',
        route: '/admin/tournaments'
      },
      {
        label: 'Estadisticas generales',
        icon: 'pi pi-chart-bar',
        route: '/admin/stadistics'
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
          quitSession();
        }
      }
    ]
  }
]);

export { userdata, items }
