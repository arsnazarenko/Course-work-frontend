import {createWebHistory, createRouter} from 'vue-router'
import Game from "@/components/Game";
import LoginForm from "@/components/LoginForm";
import Home from "@/components/Home";
import ParticipantsTable from "@/components/ParticipantsTable";
import ParticipantForm from "@/components/ParticipantForm";
import StageForm from "@/components/StageForm";
import StageTable from "@/components/StageTable";
import UserSpace from "@/components/UserSpace";

const routes = [

    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginForm,
    },
    {
        path: '/game',
        name: 'Game',
        component: Game,

    },
    {
        path: '/user',
        name: 'UserSpace',
        component: UserSpace,
    }
]

const router = createRouter({
        history: createWebHistory(),
        routes: routes,
    }
);

router.beforeEach((to, from, next) => {
    if (to.name === 'Game') {
        if (localStorage.getItem('jwt') == null) {
            next({name: 'Login'});
        } else if (localStorage.getItem('role') === 'ROLE_USER') {
            next({name: 'UserSpace'});
        } else {
            next();
        }
    } else if (to.name === 'Login') {
        if (localStorage.getItem('jwt') === null) {
            next();
        } else if (localStorage.getItem('role') === 'ROLE_USER') {
            next({name: 'UserSpace'})
        } else if (localStorage.getItem('role') === 'ROLE_ADMIN') {
            next({name: 'Game'})
        }
    } else if (to.name === 'UserSpace') {

        if (localStorage.getItem('jwt') != null && localStorage.getItem('role') === 'ROLE_USER') {
            next();
        } else {
            next({name: 'Login'});
        }
    } else {
        next();
    }

})

export default router;