window.addParcel = Vue.component('addParcel', {
    template: '#addParcel-template',
    // опции
    props: {
        parcels: Array,
    },
    data() {
        return {
            parcelCode: '',
            parcelID: [],
        }
    },
    methods: {
        addParcelOpen: function () {
            // console.log(this.parcelCode);
            // // this.active = false;
            // this.active = true;
        },
        addParcelClose: function () {
                fetch('https://jsonplaceholder.typicode.com/posts/')
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                        // for (var key in json) {
                        //     console.log("Ключ: " + key + " значение: " + json[key]);
                        // }
                    });




            this.$parent.parcels.push({
                id: this.parcelCode,
                status: 'to-send',
                date: new Date().getTime(),
                shipmentId: null
            });
            this.$parent.emptyParcels = this.$parent.parcels.filter(parcel => {
                return !parcel.shipmentId
            });

            this.$parent.active = false;
        }
    }
})
