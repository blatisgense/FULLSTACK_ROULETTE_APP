<script setup lang="ts">
import { useUiStore } from "@state/pinia.ts";
const uiStore = useUiStore();
const disable = () => (uiStore.hint = false);
</script>

<template>
	<transition name="hint">
		<div v-if="uiStore.hint" class="wheel__hint" @click.stop="disable">
			<img class="wheel__hint_cloud" src="@media/svg/hint.svg" alt="hint cloud" />
			<img class="wheel__hint_arrow" src="@media/svg/hint_arrow.svg" alt="hint arrow" />
			<span class="wheel__hint_text">Click center to spin!</span>
		</div>
	</transition>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";

.wheel {
	&__hint {
		position: absolute;
		z-index: 12;
		top: 520px;
		height: 280px;
		display: flex;
		width: 380px;
		left: 110px;
		justify-content: center;
		align-items: center;
		&_cloud {
			width: 330px;
			height: 280px;
			top: 0;
			z-index: -1;
			left: 20px;
			position: absolute;
		}
		&_arrow {
			position: absolute;
			width: 140px;
			height: 100px;
			bottom: 90%;
			right: -30px;
			animation: linear arrow 4s infinite;
			@keyframes arrow {
				0% {
					scale: 1;
				}
				50% {
					scale: 0.8;
				}
				100% {
					scale: 1;
				}
			}
		}
		&_text {
			font-weight: 400;
			font-size: 28px;
			line-height: 110%;
			@include mixins.font;
			color: mixins.$text_dark;
		}
	}
}
.hint-enter-active,
.hint-leave-active {
	transition: all 1.1s cubic-bezier(0, 0, 0.1, 1.03);
}
.hint-enter-from,
.hint-leave-to {
	opacity: 0;
	scale: 1.1;
}

@media (width < mixins.$breakpoint_QHD) {
	.wheel {
		&__hint {
			top: 450px;
			height: 210px;
			width: 330px;
			left: 100px;
			&_cloud {
				width: 290px;
				height: 200px;
				top: 0;
				left: 20px;
			}
			&_text {
				font-size: 24px;
			}
		}
	}
}

@media (width < mixins.$breakpoint_FHD) {
	.wheel {
		&__hint {
			top: 420px;
			height: 170px;
			width: 270px;
			left: 80px;
			&_cloud {
				width: 230px;
				height: 170px;
				top: 0;
				left: 20px;
			}
			&_text {
				font-size: 20px;
			}
			&_arrow {
				width: 110px;
				height: 80px;
				bottom: 93%;
				right: -20px;
			}
		}
	}
}

@media (width < mixins.$breakpoint_HD) {
	.wheel {
		&__hint {
			top: 310px;
			height: 150px;
			width: 240px;
			left: 0;
			&_cloud {
				width: 200px;
				height: 149px;
			}
			&_text {
				font-size: 17px;
			}
			&_arrow {
				width: 70px;
				height: 75px;
				bottom: 91%;
				right: -15px;
			}
		}
	}
}
@media (width < mixins.$breakpoint_tablet) {
	.wheel {
		&__hint {
			left: 70px;
		}
	}
}
@media (width < mixins.$breakpoint_smartphone) {
	.wheel {
		&__hint {
			top: 230px;
			height: 104px;
			width: 201px;
			left: calc((100vw - 430px) / 2);
			&_cloud {
				width: 155px;
				height: 105px;
			}
			&_text {
				font-size: 14px;
			}
			&_arrow {
				width: 50px;
				height: 55px;
				right: 25px;
			}
		}
	}
}
</style>
