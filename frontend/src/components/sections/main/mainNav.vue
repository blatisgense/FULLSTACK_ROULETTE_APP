<script setup lang="ts">
import { useUiStore } from "@state/pinia.ts";
import CButton from "@global/cButton.vue";
const uiStore = useUiStore();

const click = () => uiStore.toggle_modal_cabinet(true);
</script>

<template>
	<nav class="nav">
		<div class="nav__data">
			<img alt="profile_icon" src="@media/svg/profile_img.svg" class="nav__icon" :data-logged="uiStore.logged_in" />
			<span v-show="uiStore.logged_in">{{ uiStore.user.user_name }}</span>
		</div>
		<CButton class="nav__btn" :fn="click">Open cabinet</CButton>
	</nav>
</template>

<style lang="scss" scoped>
@use "@styles/config/mixins";

.nav {
	width: mixins.$container_UHD;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding-top: 70px;
	column-gap: 30px;
	&__data {
		display: flex;
		height: 100%;
		align-items: center;
		column-gap: 18px;
		& img {
			width: 48px;
			height: 48px;
			display: block;
			transition: mixins.linear_anim(0.5s);
			&[data-logged="false"] {
				opacity: 0.3;
			}
		}
		& span {
			@include mixins.font;
			color: mixins.$text_dark;
			font-weight: 400;
			font-size: 25px;
			line-height: 105%;
			opacity: 0.9;
		}
	}
	&__btn {
		background: linear-gradient(43deg, #e46087 22%, #fbac60 78%);
		font-weight: 600;
		letter-spacing: 0.5px;
		font-size: 25px;
		width: 310px;
	}
}

@import "@styles/mediaQueries/main/navQueries";
</style>
