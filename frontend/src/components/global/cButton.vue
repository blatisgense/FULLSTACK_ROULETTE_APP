<script setup lang="ts">
defineProps<{ form?: string; type?: "button" | "submit"; fn?: () => void }>();
</script>

<template>
	<div class="btn__outer">
		<button class="btn" draggable="false" :form="form" :type="type" @click.stop="fn">
			<slot name="svg" />
			<span>
				<slot name="default" />
			</span>
		</button>
	</div>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";
.btn {
	font-size: inherit;
	font-weight: inherit;
	letter-spacing: inherit;
	text-transform: uppercase;
	display: flex;
	justify-content: center;
	color: mixins.$btn_dark;
	transition: mixins.linear_anim(0.5s);
	align-items: center;
	border-radius: 42px;
	width: calc(100% - 8px);
	height: calc(100% - 8px);
	background: mixins.$btn_bg;
	column-gap: 10px;
	&:hover {
		background: transparent;
		color: mixins.$bg_pink;
	}
	&__outer {
		border-radius: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 4em;
	}
}
</style>
