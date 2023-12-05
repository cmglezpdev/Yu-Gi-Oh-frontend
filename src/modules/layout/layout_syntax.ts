import { ref, toRefs } from "vue";
import { getUserData } from '@/utils/user.service';
import { logout } from '@/utils/auth.service';

const userdata = ref(getUserData())
const isAdmin = ref(true)

export const reload = () => {
  userdata.value = getUserData();
  items.value[1].visible=userdata.value.roles.some(el=>el=='Admin');
}

let redirect: any;

export const setRedirection = (newRedirection: any) => {
  redirect = newRedirection;
}

const quitSession = () => {
  logout();
  redirect();
}
const items = ref([
  {
    label: 'Informacion del perfil',
    visible: true,
    items: [

      {
        label: 'Decks',
        visible: true,
        icon: 'pi pi-box',
        route: `/my-decks/${userdata.value.id}/general`
      },
      {
        label: 'Torneos',
        visible: true,
        icon: 'pi pi-tag',
        route: `/my-tournaments/${userdata.value.id}/aprobed`
      },
      {
        label: 'Informacion del usuario',
        icon: 'pi pi-chart-bar',
        visible: true,
        route: `/my-stadistics/${userdata.value.id}`
      },
    ]
  },
  {
    label: 'Administracion',
    visible: isAdmin,
    items: [

      {
        label: 'Gestionar Usuarios',
        visible: true,
        icon: 'pi pi-user-edit',
        route: '/admin/users'
      },
      {
        label: 'Gestionar Torneos',
        visible: true,
        icon: 'pi pi-desktop',
        route: '/admin/tournaments'
      },
      {
        label: 'Estadisticas generales',
        visible: false,
        icon: 'pi pi-chart-bar',
        route: '/admin/stadistics'
      },
    ]
  },
  {
    label: 'Perfil',
    visible: true,
    items: [
      {
        label: 'Cerrar sesion',
        visible: true,
        icon: 'pi pi-sign-out',
        command: () => {
          quitSession();
        }
      }
    ]
  }
]);

export { userdata, items }
