<script setup lang="ts">
import { useUiStore } from "@state/pinia.ts";
import { RouterView } from "vue-router";

const uiStore = useUiStore();

function outside_cabinet(target: HTMLDivElement) {
	if (target.closest("div.cabinet__container")) return;
	uiStore.toggle_modal_cabinet(false);
}
</script>

<template>
	<Transition name="cabinet" mode="out-in">
		<aside v-show="uiStore.cabinet_open" class="cabinet" @click="outside_cabinet($event.target as HTMLDivElement)">
			<div class="cabinet__container">
				<router-view v-slot="{ Component }">
					<transition name="cabinet_router" mode="out-in">
						<component :is="Component" />
					</transition>
				</router-view>
			</div>
		</aside>
	</Transition>
</template>

<style lang="scss">
@use "@styles/config/mixins";

.cabinet {
	& {
		display: flex;
		justify-content: right;
		@include mixins.inset;
	}
	&__container {
		padding: 70px;
		overscroll-behavior: none;
		width: mixins.$cabinet_UHD;
		min-height: 100%;
		overflow-y: auto;
		background-color: mixins.$cabinet_bg;
	}
	&__inner {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	&__btns {
		width: 100%;
		display: flex;
		height: fit-content;
		justify-content: space-between;
		&.right {
			justify-content: flex-end;
		}
	}
	&__title {
		@include mixins.font;
		font-weight: 700;
		color: mixins.$text_dark;
		font-size: 40px;
		line-height: 120%;
		letter-spacing: -0.01rem;
		margin-top: 20px;
	}
	&__text {
		margin-top: 15px;
		@include mixins.font;
		font-weight: 500;
		color: mixins.$text_dark;
		font-size: 28px;
		line-height: 135%;
		max-width: 410px;
	}
	&__form {
		margin-top: 35px;
		width: 100%;
		height: fit-content;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		row-gap: 16px;
		&_decor {
			position: absolute;
			z-index: 0;
			user-select: none;
		}
		&_input {
			font-size: 22px;
			width: 400px;
		}
		&_btn {
			font-size: 22px;
			width: 400px;
			letter-spacing: 2px;
		}
	}
}

.cabinet-enter-active,
.cabinet-leave-active {
	transition: transform 0.8s cubic-bezier(0, 0, 0.1, 1.03);
}

.cabinet-enter-from,
.cabinet-leave-to {
	transform: translateX(mixins.$cabinet_UHD);
}

.cabinet_router-enter-active,
.cabinet_router-leave-active {
	transition: transform 0.8s cubic-bezier(0, 0, 0.1, 1.03);
}

.cabinet_router-enter-from,
.cabinet_router-leave-to {
	transform: translateX(120%);
}

@import "@styles/mediaQueries/main/cabinetQueries";
</style>
