<script setup lang="ts">
import { useUiStore } from "@state/pinia.ts";
const uiStore = useUiStore();

const close_alert = () => (uiStore.alert.show = false);
</script>

<template>
	<transition name="alert">
		<section v-show="uiStore.alert.show" class="alert" @click="close_alert">
			<img class="alert__icon" :src="uiStore.alert.icon" alt="alert icon" />
			<p class="alert__text" v-html="uiStore.alert.text"></p>
		</section>
	</transition>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";

.alert-enter-active,
.alert-leave-active {
	transition: transform 0.8s cubic-bezier(0, 0, 0.1, 1.03);
}
.alert-enter-from,
.alert-leave-to {
	transform: translateY(-500px);
}

.alert {
	z-index: 100;
	align-items: center;
	position: fixed;
	top: 0;
	left: calc((100vw - (mixins.$container_UHD - 250px)) / 2);
	@include mixins.shadow;
	width: 800px;
	height: fit-content;
	border-radius: 0 0 30px 30px;
	background: mixins.$bg_pink;
	display: flex;
	padding: 30px;
	column-gap: 20px;
	&__icon {
		width: 70px;
		height: 70px;
	}
	&__text {
		@include mixins.font;
		font-weight: 500;
		color: mixins.$text_dark;
		font-size: 26px;
		line-height: 115%;
	}
}

@media (width < mixins.$breakpoint_QHD) {
	.alert {
		left: calc((100vw - (mixins.$container_QHD - 200px)) / 2);
		width: 700px;
		padding: 26px;
		column-gap: 20px;
		&__icon {
			width: 62px;
			height: 62px;
		}
		&__text {
			font-size: 24px;
		}
	}
}

@media (width < mixins.$breakpoint_FHD) {
	.alert {
		left: calc((100vw - (mixins.$container_FHD - 160px)) / 2);
		width: 570px;
		padding: 26px;
		column-gap: 20px;
		&__icon {
			width: 55px;
			height: 55px;
		}
		&__text {
			font-size: 21px;
		}
	}
}

@media (width < mixins.$breakpoint_HD) {
	.alert {
		left: calc((100vw - (mixins.$container_HD - 130px)) / 2);
		width: 450px;
		padding: 24px;
		column-gap: 15px;
		&__icon {
			width: 45px;
			height: 45px;
		}
		&__text {
			font-size: 18px;
		}
	}
}

@media (width < mixins.$breakpoint_tablet) {
	.alert {
		left: calc((100vw - (mixins.$container_tablet - 100px)) / 2);
		width: 360px;
		padding: 18px;
		column-gap: 12px;
		&__icon {
			width: 35px;
			height: 35px;
		}
		&__text {
			font-size: 15px;
		}
	}
}

@media (width < mixins.$breakpoint_smartphone) {
	.alert {
		left: 12px;
		right: 12px;
		width: auto;
		padding: 18px;
		column-gap: 12px;
		&__icon {
			width: 35px;
			height: 35px;
		}
		&__text {
			font-size: 15px;
		}
	}
}
</style>
