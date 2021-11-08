export default {
    props: ['book'],
    template: `
    <section class="book-preview">
        <h4>{{book.title}}</h4>
        <p><p class="bold">Author:</P> {{book.authors[0]}}</p>
        <img class="book-img" :src= 'book.thumbnail'/>
        <h4 :class="pageCountStyle">{{book.listPrice.amount}}{{currencyIcon}}</h4>
    </section>
    `,
    data() {
        return {
            symbol: this.book.listPrice.currencyCode,
            currency_symbols: {
                'USD': '$', // US Dollar
                'EUR': '€', // Euro
                'ILS': '₪' // Israeli New Sheqel
            }
        }
    },
    computed: {
        currencyIcon() {
            return this.currency_symbols[this.symbol]
        },
        pageCountStyle() {
            return { red: this.book.listPrice.amount > 150, green: this.book.listPrice.amount < 20 }
        }


    }
}