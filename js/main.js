import bookApp from "./pages/book-app.cmp.js";
import appHeader from './cmps/app-header.cmp.js';
import appFooter from './cmps/app-footer.cmp.js';
import userMessage from './cmps/user-msg.cmp.js';
import { router } from './routes.js';

const options = {
    el: '#app',
    router,
    template: `
        <section>
            <user-msg />
            <app-header />
            <router-view />
            <app-footer />
        </section>
    `,
    components: {
        bookApp,
        appHeader,
        appFooter,
        userMessage
    }
};

new Vue(options);