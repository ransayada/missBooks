export default {
    template: `
     <div class="search">
                <input v-model.lazy="listApi.input"  type="text" placeholder="Search Global...">
                <button @click="getApi">global search</button>
                <div class="global"  v-for="(item, idx) in listApi.array" :key="item.id">
                    <p>{{item.id}}</p>
                    <p>{{review.date}}</p>
                    <a class="add-btn" @click="addBook(item.id)">+</a>
                </div>
</div>
    `,
    data() {
        return {
            listApi: {
                array: [],
                input: '',
                isEmpty: true
            }
        };
    },
    methods: {
        getApi() {
            var ip = this.listApi.input;
            console.log('~ ip', ip)
            var prm = axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${ip}`)
                .then(res => {
                    var array = [];
                    console.log('~ result', res.data.items);
                    res.data.items.forEach(item => {
                        console.log('~more result', item);
                        array.push({ id: item.id, title: item.volumeInfo.title });
                        console.log({ id: item.id, title: item.volumeInfo.title });
                    })
                    this.array = array;
                    this.isEmpty = false;
                    console.log('~ array', this.array)
                })
        }

    },
}