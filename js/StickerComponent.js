window.StickerItem = Vue.component('StickerItem', {
	template: '#sticker-component-tpl',
	// опции
	props: {
		item: Object
	},
	data() {
		return {

		}
	},
	methods: {
		hello() {
			console.log(this.item.name)
		}
	}
})