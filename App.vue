<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
@import "static/common.css";
@import "uview-ui/index.scss";
.u-indicator-item-round{
	background-color: rgba($color: #ffffff, $alpha: 1)!important;
}
.u-indicator-item-round-active{
	background-color: rgba($color: #ffffff, $alpha: 1)!important;
}
.u-dropdown__content__mask{
	background: none!important;
}
page{
		background-color:#f5f5f5;
	}
</style>
