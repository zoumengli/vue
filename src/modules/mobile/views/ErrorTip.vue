<template>
	<div class="msg">
		<div class="ui_mask_transparent"></div>
		<div class="ui_msg">
			<div class="ui_icon_area"><i><img :src="imgSrc"/></i></div>
			<div class="ui_text_area">
				<h2 class="ui_msg_title">{{msg}}</h2>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data:function(){
			return {
				imgSrc: 'data:image/png;base64,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',
				msg:'您访问的页面不存在'
			}
		},
		props:['msg'],
		created : function(){

		}
	}
</script>
<style>
.ui_msg {
    position: fixed;
    width: 100%;
    top: 30%;
    left: 50%;
    -moz-transform: translate(-50%,0);
    -ms-transform: translate(-50%,0);
    transform: translate(-50%,0);
    -webkit-transform: translate(-50%,0);
    text-align: center;
}
.ui_msg .ui_icon_area {
    margin-bottom: 2px;
}
.iconfont, em, i {
    font-style: normal;
}
.ui_msg .ui_icon_area img {
    width: 100px;
    height: 100px;
}
img {
    border: 0;
    vertical-align: middle;
    max-width: 100%;
}
.ui_msg .ui_text_area .ui_msg_title {
    margin-bottom: 15px;
    font-weight: 400;
    font-size: 16px;
}
</style>