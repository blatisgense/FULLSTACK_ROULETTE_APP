<script setup lang="ts">
import FooterCard from "@ui/main/footerCard.vue";
import instagram from "@media/svg/instagram.svg";
import telegram from "@media/svg/telegram.svg";
import message from "@media/svg/message.svg";
let cards = [
	{
		link: { url: "https://www.instagram.com/blatisgense/", text: "Instagram" },
		icon_path: instagram,
		text: "Contact me in direct",
	},
	{
		link: {},
		icon_path: message,
		text: "Built-in feedback sender",
	},
	{
		link: { url: "https://t.me/Blatisgense", text: "Telegram" },
		icon_path: telegram,
		text: "Message into",
	},
];
</script>

<template>
	<footer class="footer">
		<span class="footer__title">Contact administration to ask questions or receive a prize.</span>
		<div class="footer__cards">
			<FooterCard v-for="card in cards" :icon_path="card.icon_path" :link_text="card.link.text" :link_url="card.link.url" :text="card.text" />
		</div>
	</footer>
</template>

<style lang="scss" scoped>
@use "@styles/config/mixins";

.footer {
	margin-top: auto;
	@include mixins.shadow;
	width: fit-content;
	height: fit-content;
	border-radius: 30px 30px 0 0;
	background: mixins.$bg_pink;
	flex-direction: column;
	display: flex;
	padding: 46px;
	row-gap: 30px;
	&__title {
		@include mixins.font;
		color: mixins.$text_dark;
		font-style: normal;
		font-weight: 700;
		line-height: 110%;
		text-align: center;
		font-size: 36px;
	}
	&__cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		height: fit-content;
		column-gap: 12px;
		justify-items: center;
	}
}

@import "@styles/mediaQueries/main/footerQueries";
</style>
