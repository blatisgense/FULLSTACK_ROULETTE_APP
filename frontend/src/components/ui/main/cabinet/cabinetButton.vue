<script setup lang="ts">
const props = defineProps<{ icon: string; isClose: boolean; text: string; fn: () => void }>();
</script>

<template>
	<button class="btn" :class="{ close: props.isClose }" @click="props.fn">
		<span class="btn__icon">
			<img :src="props.icon" alt="close icon" />
		</span>
		<span class="btn__text">{{ props.text }}</span>
	</button>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";

.btn {
	display: flex;
	column-gap: 10px;
	align-items: center;
	background: none;
	&.close {
		flex-direction: row-reverse;
	}
	&__text {
		@include mixins.font;
		opacity: 0.7;
		text-transform: uppercase;
		font-size: 18px;
		line-height: 110%;
		font-weight: 600;
		letter-spacing: 2px;
		color: mixins.$text_dark;
	}
	&__icon {
		height: 28px;
		width: 28px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: mixins.$text_link 2px solid;
		border-radius: 100%;
		& img {
			width: 10px;
			height: 10px;
		}
	}
}

@media (width < mixins.$breakpoint_FHD) {
	.btn {
		column-gap: 5px;
		&__text {
			font-size: 12px;
		}
		&__icon {
			height: 22px;
			width: 22px;
			& img {
				width: 8px;
				height: 8px;
			}
		}
	}
}

@media (width < mixins.$breakpoint_smartphone) {
	.btn {
		column-gap: 5px;
		&__text {
			font-size: 10px;
		}
		&__icon {
			height: 16px;
			width: 16px;
			border: mixins.$text_link 1px solid;
			& img {
				width: 6px;
				height: 6px;
			}
		}
	}
}
</style>
