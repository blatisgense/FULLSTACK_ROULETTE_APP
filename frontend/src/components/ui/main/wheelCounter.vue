<script setup lang="ts">
import { useUiStore } from "@state/pinia.ts";

const uiStore = useUiStore();
</script>

<template>
	<div draggable="false" class="counter">
		<span class="counter__title">wheels</span>
		<div class="counter__inner">
			<span class="counter__number" :data-active="Boolean(uiStore.counter.ten)">{{ uiStore.counter.ten }}</span>
			<span class="counter__number" :data-active="Boolean(uiStore.counter.one || uiStore.counter.ten)">{{ uiStore.counter.one }}</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";

.counter {
	background-color: mixins.$counter_bg;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	border-radius: 40px;
	z-index: 14;
	row-gap: 10px;
	top: 20px;
	left: 165px;
	padding: 30px;
	&__title {
		@include mixins.font;
		color: mixins.$counter_text;
		font-size: 45px;
	}
	&__inner {
		display: flex;
		column-gap: 5px;
		& span {
			@include mixins.font;
			font-size: 110px;
			line-height: 70%;
			color: mixins.$counter_digit;
			&[data-active="true"] {
				color: mixins.$counter_digit_active;
			}
		}
	}
}

@media (width < mixins.$breakpoint_QHD) {
	.counter {
		top: 10px;
		left: 135px;
		&__title {
			font-size: 40px;
		}
		&__inner span {
			font-size: 95px;
		}
	}
}

@media (width < mixins.$breakpoint_FHD) {
	.counter {
		left: 100px;
		&__title {
			font-size: 35px;
		}
		&__inner span {
			font-size: 85px;
		}
	}
}
@media (width < mixins.$breakpoint_HD) {
	.counter {
		row-gap: 8px;
		padding: 20px;
		left: 65px;
		&__title {
			font-size: 30px;
		}
		&__inner span {
			font-size: 70px;
		}
	}
}
@media (width < mixins.$breakpoint_tablet) {
	.counter {
		row-gap: 8px;
		padding: 16px;
		left: 135px;
		&__title {
			font-size: 25px;
		}
		&__inner span {
			font-size: 55px;
		}
	}
}
@media (width < mixins.$breakpoint_smartphone) {
	.counter {
		row-gap: 8px;
		padding: 16px;
		top: 20px;
		left: calc((100vw - 380px) / 2);
		&__title {
			font-size: 20px;
		}
		&__inner span {
			font-size: 45px;
		}
	}
}
</style>
