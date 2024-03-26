<script setup lang="ts">
import { verify_promo } from "@axios/client.ts";
import { ref } from "vue";
import CInput from "@global/cInput.vue";
import CButton from "@global/cButton.vue";

const promo = ref<string>("");
</script>

<template>
	<div class="main__content">
		<span class="main__title">Spin Magic Wheel and win awesome prizes</span>
		<p class="main__text">You can receive more wheels, money, books and movies.</p>
		<p class="main__text">Also you can invite me for work in your company.</p>
		<p class="main__text main__text-sm">Enter promocode and get wheels for spin, or a guarantee prize.</p>
		<form
			id="promocode_form"
			class="main__form"
			@submit.prevent="
				verify_promo(promo);
				($event.target as HTMLFormElement).reset();
			"
		>
			<CInput class="main__input" :required="true" :auto="'none'" :type="'text'" :placeholder="'Enter promocode...'" :value="promo" @update:value="(val: string) => (promo = val)" />
			<CButton class="main__button" :form="'promocode_form'" :type="'submit'">
				<template #svg>
					<svg width="33" height="35" viewBox="0 0 55 60" fill="transparent" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M39.8134 15.2547C44.8024 22.3161 42.6851 32.6648 34.6936 38.3109C26.7021 43.957 16.2407 42.4952 11.2517 35.4338C6.26274 28.3724 8.38 18.0237 16.3715 12.3776C24.363 6.73151 34.8245 8.19324 39.8134 15.2547Z"
							stroke="#ac2e63"
							stroke-width="3"
						/>
						<path
							d="M33.8886 39.8036C33.4247 39.147 33.5809 38.2387 34.2375 37.7749V37.7749C34.894 37.311 35.8023 37.4672 36.2661 38.1238L49.0915 56.2769C49.5554 56.9335 49.3992 57.8417 48.7426 58.3056V58.3056C48.0861 58.7694 47.1778 58.6132 46.7139 57.9567L33.8886 39.8036Z"
							fill="#ac2e63"
						/>
					</svg>
				</template>
				<template #default>Verify</template>
			</CButton>
		</form>
	</div>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";

.main {
	&__content {
		display: flex;
		flex-direction: column;
		height: fit-content;
	}
	&__title {
		@include mixins.font;
		font-weight: 700;
		color: mixins.$text_dark;
		font-size: 52px;
		line-height: 155%;
		letter-spacing: -0.01rem;
	}
	&__text {
		@include mixins.font;
		font-weight: 400;
		color: mixins.$text_dark;
		font-size: 32px;
		line-height: 125%;
		max-width: 100%;
		&-sm {
			margin-top: 80px;
			font-size: 26px;
		}
	}
	&__form {
		display: flex;
		width: 100%;
		max-width: 100%;
		column-gap: 20px;
		margin-top: 30px;
	}

	&__input {
		background: linear-gradient(132deg, #ef48e9 9%, #8ccefb 69%);
		font-size: 25px;
		width: 480px;
	}
	&__button {
		width: 340px;
		font-size: 25px;
		font-weight: 600;
		letter-spacing: 2px;
		background: linear-gradient(223deg, #e46087 22%, #fbac60 78%);
		&:hover {
			& svg path {
				stroke: mixins.$bg_pink;
				&:last-child {
					fill: mixins.$bg_pink;
				}
			}
		}
		& svg {
			width: 25px;
			height: 25px;
			transition: mixins.linear_anim(0.5s);
			& path {
				transition: mixins.linear_anim(0.5s);
			}
		}
	}
}

@import "@styles/mediaQueries/main/contentQueries";
</style>
