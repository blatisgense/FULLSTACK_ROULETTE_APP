<script setup lang="ts">
const props = defineProps<{ path: string; text: string }>();
</script>

<template>
	<div class="link__outer">
		<router-link class="link" :to="props.path">{{ props.text }}</router-link>
	</div>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";

.link {
	@include mixins.font;
	font-size: inherit;
	font-weight: inherit;
	width: calc(100% - 6px);
	height: calc(100% - 6px);
	transition: mixins.linear_anim(0.5s);
	background: mixins.$btn_bg;
	color: mixins.$btn_dark;
	border-radius: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		background: transparent;
		color: mixins.$bg_pink;
	}
	&__outer {
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
