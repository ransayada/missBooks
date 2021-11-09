export default {
    template: `
        <section class="about-page app-main">
            <h3 ref="header">About us...</h3>
            <p>lorem ipsum dolor sit lorem</p>
            <button @click="callBus">Call the bus!</button>
        </section>
    `,
    methods: {
        callBus() {}
    },
    created() {
        console.log('Created');
    },
    mounted() {
        console.log('Mounted');
        console.log(this.$refs.header);
    }
};