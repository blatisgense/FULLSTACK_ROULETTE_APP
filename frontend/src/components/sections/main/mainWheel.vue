<script setup lang="ts">
import { useUiStore } from "@state/pinia.ts";
import Counter from "@ui/main/wheelCounter.vue";
import WheelHint from "@ui/main/wheelHint.vue";
import { spin } from "@helpers/axios/client.ts";
const uiStore = useUiStore();
</script>

<template>
	<div class="wheel">
		<div class="wheel__container">
			<Counter />

			<div class="wheel__inner" :data-spin="uiStore.spin">
				<img draggable="false" class="wheel__prize" :src="uiStore.prize_icon" alt="default_prize" />
				<img draggable="false" class="wheel__wheel" src="@media/images/wheel.webp" alt="wheel" />
			</div>

			<WheelHint />

			<img draggable="false" class="wheel__center" src="@media/images/wheel_center.webp" alt="wheel_btn" @click.stop="spin" />
			<img draggable="false" class="wheel__outer" src="@media/images/wheel_outer.webp" alt="wheel_outer" />
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";

.wheel {
	& {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	&__container {
		width: 870px;
		height: 870px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	&__inner {
		@keyframes rotating {
			from {
				rotate: 0deg;
			}
			to {
				rotate: 2520deg;
			}
		}
		width: 870px;
		height: 870px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		&[data-spin="true"] {
			animation: infinite cubic-bezier(0, 0, 0.1, 1.03) 7s rotating;
		}
	}
	&__wheel {
		width: 870px;
		height: 870px;
	}
	&__outer {
		z-index: 0;
		width: 900px;
		height: 900px;
		rotate: 43deg;
		position: absolute;
	}
	&__center {
		z-index: 10;
		transition: mixins.linear_anim(2s);
		position: absolute;
		width: 160px;
		height: 160px;
		&:hover {
			transform: rotate(114deg) scale(0.9);
		}
	}
	&__prize {
		position: absolute;
		width: 116px;
		height: 116px;
		right: 370px;
		bottom: 124px;
		rotate: 1deg;
	}
}

@import "@styles/mediaQueries/main/wheelsQueries";
</style>
