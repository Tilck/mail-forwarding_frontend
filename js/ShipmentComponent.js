window.ShipmentItem = Vue.component('ShipmentItem', {
	template: '#shipment-component-tpl',
	// опции
	props: {
		item: Object,
		parcels: Array,
		dragOptions: Object,
	},
	data() {
		return {
			myParcels: null
		}
	},
	computed: {
		parcelsLength() {
			return this.myParcels && this.myParcels.length
		}
	},
	methods: {
		onMove ({relatedContext, draggedContext}) {
            console.log('test 3')
            console.log(draggedContext)
            console.log(relatedContext)
			if(relatedContext.component.$options.parent._props.item != undefined) {
                draggedContext.element.shipmentId = relatedContext.component.$options.parent._props.item.id;
			}
			else {
                draggedContext.element.shipmentId = null;
			}
			// return false
			// const relatedElement = relatedContext.element;
			// const draggedElement = draggedContext.element;
			// return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
		},
	},
	mounted() {
		this.myParcels = this.parcels;
	}
})

