import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
        <section class="about-page app-main">
            <h3 ref="header">About us...</h3>
            <button @click="callBus">Call the bus!</button>
        </section>
    `,
    methods: {
        callBus() {
            // eventBus.$emit('puk');
            // eventBus.$emit('puk2');
        }
    },
    created() {
        console.log('Created');
    },
    mounted() {
        console.log('Mounted');
        console.log(this.$refs.header);
    }
};