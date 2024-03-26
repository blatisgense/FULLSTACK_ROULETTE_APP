<script setup lang="ts">
import { adminBtnRoutes } from "@router/adminBtnRoutes.ts";
import AdminSidebarBtn from "@ui/admin/adminSidebarBtn.vue";
import { useUiStore } from "@state/pinia.ts";

const uiStore = useUiStore();
</script>

<template>
	<aside class="aside" :class="{ opened: uiStore.admin_sidebar_show }">
		<div class="aside__container">
			<div v-for="item in adminBtnRoutes" class="aside__inner">
				<span class="aside__title">{{ item.title }}</span>
				<AdminSidebarBtn
					v-for="btn in item.data"
					:key="btn.path"
					class="aside__btn"
					:path="btn.path"
					:text="btn.text"
					:style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 22%, #fbac60 78%)` }"
					@click="uiStore.admin_sidebar_show = false"
				/>
			</div>
		</div>
	</aside>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";

.aside {
	grid-area: side;
	background-color: mixins.$bg_pink;
	transition: mixins.linear_anim(0.7s);
	z-index: 7;
	&__container {
		display: flex;
		flex-direction: column;
		padding: 48px 24px;
		row-gap: 48px;
		height: fit-content;
		width: 100%;
		max-height: calc(100vh - 100px);
		overflow-y: auto;
		overscroll-behavior: none;
	}
	&__inner {
		display: flex;
		flex-direction: column;
		row-gap: 18px;
	}
	&__title {
		color: mixins.$text_dark;
		font-size: 30px;
		font-weight: 500;
		letter-spacing: 0.08rem;
		@include mixins.font;
	}
	&__btn {
		width: 100%;
		height: 2.5em;
		font-size: 24px;
	}
}

@import "@styles/mediaQueries/admin/adminSidebarQueries";
</style>
