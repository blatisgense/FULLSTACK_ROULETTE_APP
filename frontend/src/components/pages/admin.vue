<script setup lang="ts">
import { onMounted } from "vue";
import { useUiStore } from "@state/pinia.ts";
import { get_data } from "@axios/client.ts";
import { router } from "@router/router.ts";
import Messages from "@sections/admin/adminMessages.vue";
import AdminSidebar from "@sections/admin/adminSidebar.vue";
import AdminHeader from "@sections/admin/adminHeader.vue";
import { RouterView } from "vue-router";

const uiStore = useUiStore();

onMounted(async () => {
	await get_data(true, true).then(async () => {
		if (!uiStore.logged_in) {
			await router.push("/login");
			uiStore.set_alert("Authorize before entry admin", "error");
		}
	});
});
</script>

<template>
	<div class="page page-admin" :data-modal="uiStore.modal_bg">
		<Messages />
		<div class="container">
			<AdminHeader />
			<AdminSidebar />
			<section class="content">
				<router-view v-slot="{ Component }">
					<transition name="admin" mode="out-in">
						<component :is="Component" />
					</transition>
				</router-view>
			</section>
		</div>
	</div>
</template>

<style lang="scss">
@use "@styles/config/mixins";
.admin-enter-active,
.admin-leave-active {
	transition: opacity 0.3s linear;
}
.admin-enter-from,
.admin-leave-to {
	opacity: 0;
}

.page-admin {
	& > .container {
		display: grid;
		grid-template-columns: 500px 1fr;
		grid-template-rows: 100px 1fr;
		grid-template-areas:
			"head head"
			"side content";
		min-height: 100vh;
		min-width: 100%;
	}
	& .content {
		grid-area: content;
		background-color: mixins.$admin_bg;
		padding: 56px 48px;
		display: flex;
		flex-direction: column;
		max-width: calc(100vw - 500px);
		max-height: calc(100vh - 100px);
		overflow-y: auto;
		&:has(table) .content__form_btn {
			width: 320px;
			margin-top: 30px;
		}
		&__title {
			@include mixins.font;
			color: mixins.$text_dark;
			font-weight: 600;
			font-size: 36px;
			line-height: 120%;
		}
		&__default {
			display: flex;
			width: 100%;
			height: 100%;
			align-items: center;
			justify-content: center;
			&_span {
				@include mixins.font;
				color: mixins.$text_dark;
				font-weight: 500;
				font-size: 46px;
				line-height: 110%;
				letter-spacing: 0.04rem;
			}
		}
		&__form {
			margin-top: 48px;
			row-gap: 30px;
			display: flex;
			flex-direction: column;
			width: 100%;
			max-width: 440px;
			&_random {
				width: 60px;
				height: 60px;
				background-color: mixins.$input_bg;
				padding: 4px;
				border-radius: 8px;
				border: 1px solid #f588a9;
				position: absolute;
				bottom: 5px;
				right: -70px;
				cursor: pointer;
			}
			&_inner {
				row-gap: 8px;
				display: flex;
				flex-direction: column;
				position: relative;
			}
			&_row {
				display: flex;
				column-gap: 10px;
			}
			&_description {
				@include mixins.font;
				color: mixins.$text_dark;
				font-weight: 500;
				font-size: 26px;
				line-height: 110%;
				letter-spacing: 0.02rem;
			}
			&_input {
				width: 100%;
				font-size: 24px;
			}
			&_btn {
				width: 100%;
				font-size: 24px;
			}
			&_radio {
				font-size: 24px;
				font-weight: 400;
			}
		}
		&__table {
			display: grid;
			overflow-x: auto;
			padding: 24px;
			user-select: text;
			border-radius: 12px;
			margin-top: 60px;
			border: 2px solid mixins.$text_link;
			&-user {
				grid-template-columns:
					minmax(400px, 5fr)
					minmax(400px, 5fr)
					minmax(400px, 5fr)
					minmax(160px, 2fr)
					minmax(160px, 2fr)
					minmax(160px, 2fr);
			}
			&-products {
				grid-template-columns:
					minmax(400px, 1fr)
					minmax(400px, 1fr);
			}
			&-promo {
				grid-template-columns:
					minmax(160px, 1fr)
					minmax(160px, 1fr)
					minmax(160px, 1fr);
			}
			& tr,
			& thead,
			& tbody {
				display: contents;
				user-select: text;
			}
			& thead td {
				font-weight: 700;
				font-size: 26px;
				user-select: none;
			}
			& tr.selected {
				background-color: #feffc4bf;
			}
			& td {
				padding: 14px;
				word-break: break-all;
				border: 1px solid mixins.$text_link;
				@include mixins.font;
				font-size: 24px;
				line-height: 120%;
				font-weight: 400;
				user-select: text;
				background-color: inherit;
			}
		}
	}
}

@import "@styles/mediaQueries/admin/adminQueries";
</style>
