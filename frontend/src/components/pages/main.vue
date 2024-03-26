<script setup lang="ts">
import mainFooter from "@/components/sections/main/mainFooter.vue";
import mainNav from "@/components/sections/main/mainNav.vue";
import MainContent from "@/components/sections/main/mainContent.vue";
import { useUiStore } from "@state/pinia.ts";
import MainCabinet from "@/components/sections/main/mainCabinet.vue";
import MainWheel from "@/components/sections/main/mainWheel.vue";
import { onMounted } from "vue";
import { get_data } from "@/helpers/axios/client.ts";
import MainFeedback from "@/components/sections/main/mainFeedback.vue";

const uiStore = useUiStore();

onMounted(async () => await get_data(true));
</script>

<template>
	<div class="page page-main" :data-modal="uiStore.modal_bg">
		<div class="container">
			<mainNav />
			<main class="main">
				<MainWheel />
				<MainContent />
			</main>
			<mainFooter />
		</div>
	</div>
	<MainCabinet />
	<MainFeedback />
</template>

<style lang="scss" scoped>
@use "@styles/config/mixins";
.page-main > .container {
	background-image: url("@media/background/Background.webp");
	background-size: cover;
	background-position: left top;
	background-repeat: no-repeat;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	min-width: 100%;
	min-height: 100vh;
}

.main {
	margin: auto 0;
	padding: 120px 0;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	width: mixins.$container_UHD;
	height: fit-content;
	align-items: center;
	column-gap: 35px;
}

@import "@styles/mediaQueries/main/mainQueries";
</style>
