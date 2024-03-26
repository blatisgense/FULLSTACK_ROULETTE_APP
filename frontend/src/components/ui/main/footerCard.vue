<script setup lang="ts">
defineProps<{ link_url?: string; link_text?: string; icon_path: string; text: string }>();
import { useUiStore } from "@state/pinia.ts";
const uiStore = useUiStore();
</script>

<template>
	<div class="card">
		<a class="card__icon" :target="link_url ? '_blank' : ''" :href="link_url">
			<img :src="icon_path" alt="Icon of type" />
		</a>
		<span class="card__text">
			{{ text }} <br />
			<a v-if="link_text" target="_blank" :href="link_url">{{ link_text }}</a>
			<a v-else @click="uiStore.toggle_modal_feedback(true)">Open form</a>
		</span>
	</div>
</template>

<style lang="scss" scoped>
@use "@styles/config/mixins";
.card {
	display: flex;
	column-gap: 18px;
	align-items: center;
	&__icon {
		display: contents;
		& img {
			width: 62px;
			height: 62px;
		}
	}
	&__text {
		@include mixins.font;
		color: mixins.$text_dark;
		font-weight: 400;
		font-size: 26px;
		line-height: 125%;
		letter-spacing: -0.01em;
		& a {
			color: mixins.$text_link;
			font-family: inherit;
			font-size: inherit;
		}
	}
}

@media (width < mixins.$breakpoint_QHD) {
	.card {
		column-gap: 14px;
		&__icon img {
			width: 50px;
			height: 50px;
		}
		&__text {
			font-size: 19px;
		}
	}
}

@media (width < mixins.$breakpoint_FHD) {
	.card {
		column-gap: 12px;
		&__icon img {
			width: 35px;
			height: 35px;
		}
		&__text {
			font-size: 16px;
		}
	}
}

@media (width < mixins.$breakpoint_HD) {
	.card {
		column-gap: 12px;
		&__icon img {
			width: 35px;
			height: 35px;
		}
		&__text {
			font-size: 16px;
		}
	}
}
</style>
