document.addEventListener('DOMContentLoaded', () => {

	const app = new Vue({
		el: '#app',
		components: {
			// draggable
			StickerItem,
            ShipmentItem,
			addParcel
		},
		props: {
            item: Object,
        },
		data() {
			return {
				message: 'hello',
				editable: true,
				parcels: [
					{
						id: 1,
						status: 'pending',
						date: new Date().getTime(),
						shipmentId: 2
					},
					{
						id: 2,
						status: 'pending',
						date: new Date().getTime(),
						shipmentId: 4
					},
					{
						id: 3,
						status: 'pending',
						date: new Date().getTime(),
						shipmentId: 4
					},
					{
						id: 4,
						status: 'pending',
						date: new Date().getTime(),

						shipmentId: 2
					},
					{
						id: 5,
						status: 'pending',
						date: new Date().getTime(),
						shipmentId: 2
					},
					{
						id: 6,
						status: 'to-send',
						date: new Date().getTime(),
						shipmentId: null
					},
					{
						id: 7,
						status: 'to-send',
						date: new Date().getTime(),
						shipmentId: null
					},
					{
						id: 8,
						status: 'to-send',
						date: new Date().getTime(),
						shipmentId: null
					}
				],
				emptyParcelsList: null,
				emptyParcels: null,
				shipments: [
					{
						id: 1,
						status: 'wait'
					},
					{
						id: 2,
						status: 'to-send'
					},
					{
						id: 3,
						status: 'wait'
					},
					{
						id: 4,
						status: 'wait'
					},
					{
						id: 5,
						status: 'deliver'
					},
					{
						id: 6,
						status: 'deliver'
					},
					{
						id: 7,
						status: 'archive'
					},
					{
						id: 8,
						status: 'archive'
					}
				],
				waitingShipments: null,
				toSendShipments: null,
				active: false
			}
		},
		computed: {
			dragShipmentsOptions () {
				return  {
					animation: 100,
					group: 'shipment',
					// disabled: !this.editable,
					ghostClass: 'ghost',
					draggable:'.shipment'
				};
			},
			dragParcelsOptions () {
				return  {
					animation: 100,
					group: 'parcel',
					// disabled: !this.editable,
					ghostClass: 'ghost',
					draggable: '.card'
				};
			},
			onEnd(data) {
                console.log('data', data)
            },
			// waitingShipments: {
			// 	get() {
			// 		return this.shipments.filter(shipment => {
			// 			return shipment.status === 'wait'
			// 		})
			// 	},
			// 	set(newValue) {
			// 		// this.parcels = newValue
			// 	}
			// },
			// toSendShipments: {
			// 	get() {
			// 		return this.shipments.filter(shipment => {
			// 			return shipment.status === 'to-send'
			// 		})
			// 	},
			// 	set(newValue) {
			// 		console.log('newValue')
			// 		// this.parcels = newValue
			// 	}
			// },
			deliverShipments() {
					return this.shipments.filter(shipment => {
						return shipment.status === 'deliver'
					})
			},
			archiveShipments() {
				return this.shipments.filter(shipment => {
					return shipment.status === 'archive'
				})
			},
			// emptyParcels: {
			// 	get() {
			// 		return this.parcels.filter(parcel => {
			// 			return !parcel.shipmentId
			// 		})
			// 	},
			// 	set(newValue) {
					// console.log('parcels', this.parcels)
					// console.log('parcels 1', this.parcels.filter(parcel => {
					// 	return !parcel.shipmentId
					// }))
					// console.log('parcels 2', newValue)
					//
					// console.log('modified', this.getModifiedValue(this.emptyParcels, newValue))
					// let modified =  this.getModifiedValue(this.emptyParcels, newValue);
					//
					// newValue.length > this.emptyParcels.length ? modified.shipmentId = null :
					// modified
					// this.parcels = newValue
				// }

			// }
		},
		methods: {
			onMove ({relatedContext, draggedContext}) {
				console.log('test 1')
                console.log(draggedContext)
                draggedContext.element.shipmentId = relatedContext.component.$options.parent._props.item.id;
				// return false
				// const relatedElement = relatedContext.element;
				// const draggedElement = draggedContext.element;
				// return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
			},
			onMoveShip ({relatedContext, draggedContext}) {
                console.log('test 2')
				// return false
				// const relatedElement = relatedContext.element;
				// const draggedElement = draggedContext.element;
				// return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
			},
			getParcels(shipmentId) {

				return this.parcels.filter(parcel => {
					return parcel.shipmentId === shipmentId
				})
			},
			addParcelOpen: function() {
				this.active = true;
			}
			// getModifiedValue(arr1, arr2) {
			// 	let arrLarger = arr1.length > arr2.length ? arr1 : arr2,
			// 		arrSmaller = arr1.length < arr2.length ? arr1 : arr2;
			// 	arrSmaller.map(item => {
			// 		console.log('before', arrLarger.length)
			// 		arrLarger = arrLarger.filter(_item => {
			// 			return _item.id !== item.id
			// 		})
			// 		console.log('after', arrLarger.length)
			// 	})
			// 	return arrLarger[0];
			// }
		},
		mounted() {
			this.emptyParcels = this.parcels.filter(parcel => {
				return !parcel.shipmentId
			})

			this.waitingShipments =  this.shipments.filter(shipment => {
				return shipment.status === 'wait'
			})

			this.toSendShipments = this.shipments.filter(shipment => {
				return shipment.status === 'to-send'
			})

		}
	})



}, false)
