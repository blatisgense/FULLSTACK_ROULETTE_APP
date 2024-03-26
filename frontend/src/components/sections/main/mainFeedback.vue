<script setup lang="ts">
import { useUiStore } from "@state/pinia.ts";
import { feedback } from "@axios/client.ts";
import { ref } from "vue";
import CInput from "@global/cInput.vue";
import CButton from "@global/cButton.vue";

const uiStore = useUiStore();
const name = ref<string>("");
const msg = ref<string>("");

function outside_feedback(target: HTMLDivElement) {
	if (target.closest("div.feedback__container")) return;
	uiStore.toggle_modal_feedback(false);
}
</script>

<template>
	<Transition name="feedback" mode="out-in">
		<section v-show="uiStore.feedback_open" class="feedback" @click="outside_feedback($event.target as HTMLDivElement)">
			<div class="feedback__container">
				<span class="feedback__title">Send your feedback</span>
				<form
					id="feedback"
					class="feedback__form"
					@submit.prevent="
						feedback({ name: name, msg: msg });
						name = '';
						msg = '';
					"
				>
					<CInput class="feedback__input" :auto="'name'" :required="true" :placeholder="'Name'" :type="'text'" :form="'feedback'" :value="name" @update:value="(val: string) => (name = val)" />
					<div class="feedback__textarea_outer">
						<textarea v-model="msg" required class="feedback__textarea" placeholder="Message" form="feedback" />
					</div>
					<CButton class="feedback__btn" :form="'feedback'" :type="'submit'">
						<template #default> Send </template>
						<template #svg>
							<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M29.4962 48.782C29.1334 48.782 28.7781 48.6459 28.4984 48.3662L24.2804 44.1482C23.7285 43.5963 23.7285 42.7119 24.2804 42.1601C24.8322 41.6083 25.7166 41.6083 26.2684 42.1601L29.4962 45.3879L32.724 42.1601C32.9886 41.8955 33.3439 41.7443 33.7218 41.7443H43.5639C44.3425 41.7443 44.9699 41.1169 44.9699 40.3383V17.8421C44.9699 17.0711 44.3425 16.4361 43.5639 16.4361H15.4436C14.6726 16.4361 14.0376 17.0711 14.0376 17.8421V40.3383C14.0376 41.1169 14.6726 41.7443 15.4436 41.7443H19.6617C20.4403 41.7443 21.0677 42.3717 21.0677 43.1503C21.0677 43.9289 20.4403 44.5564 19.6617 44.5564H15.4436C13.1154 44.5564 11.2256 42.6666 11.2256 40.3383L11.2256 17.8421C11.2256 15.5139 13.1154 13.6241 15.4436 13.6241H43.5639C45.8922 13.6241 47.782 15.5139 47.782 17.8421V40.3383C47.782 42.6666 45.8922 44.5564 43.5639 44.5564H34.2963L30.494 48.3662C30.2219 48.6383 29.8591 48.782 29.4962 48.782Z"
									fill="white"
								/>
								<path
									d="M21.7631 30.4962C20.599 30.4962 19.6541 29.5513 19.6541 28.3872C19.6541 27.2231 20.599 26.2782 21.7631 26.2782C22.9273 26.2782 23.8722 27.2231 23.8722 28.3872C23.8722 29.5513 22.9273 30.4962 21.7631 30.4962Z"
									fill="white"
								/>
								<path
									d="M30.1992 30.4962C29.0351 30.4962 28.0902 29.5513 28.0902 28.3872C28.0902 27.2231 29.0351 26.2782 30.1992 26.2782C31.3633 26.2782 32.3082 27.2231 32.3082 28.3872C32.3082 29.5513 31.3633 30.4962 30.1992 30.4962Z"
									fill="white"
								/>
								<path
									d="M38.6429 30.4962C37.4788 30.4962 36.5339 29.5513 36.5339 28.3872C36.5339 27.2231 37.4788 26.2782 38.6429 26.2782C39.807 26.2782 40.7519 27.2231 40.7519 28.3872C40.7519 29.5513 39.7994 30.4962 38.6429 30.4962Z"
									fill="white"
								/>
							</svg>
						</template>
					</CButton>
				</form>
			</div>
		</section>
	</Transition>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";

.feedback {
	& {
		display: flex;
		justify-content: center;
		align-items: center;
		@include mixins.inset;
	}
	&__container {
		padding: 40px;
		overscroll-behavior: none;
		width: mixins.$feedback_UHD;
		overflow-y: auto;
		background-color: mixins.$bg_pink;
		border-radius: 30px;
		@include mixins.shadow;
	}
	&__title {
		@include mixins.font;
		color: mixins.$text_dark;
		font-style: normal;
		font-weight: 700;
		font-size: 42px;
		line-height: 110%;
	}
	&__form {
		margin-top: 40px;
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		row-gap: 20px;
	}
	&__input {
		font-size: 28px;
		width: 100%;
		height: 90px;
		&:nth-child(1) {
			background: linear-gradient(9deg, #ef48e9 23%, #8ccefb 81%);
		}
	}
	&__btn {
		font-size: 28px;
		height: 90px;
		letter-spacing: 1.8px;
		background: linear-gradient(203deg, #e46087 27%, #fbac60 74%);
		&:hover {
			& svg path {
				fill: mixins.$bg_pink;
			}
		}
		& svg {
			width: 50px;
			height: 50px;
			transition: mixins.linear_anim(0.5s);
			& path {
				fill: mixins.$btn_dark;
				transition: mixins.linear_anim(0.5s);
			}
		}
	}
	&__textarea {
		padding: 14px;
		font-size: 28px;
		width: calc(100% - 8px);
		background-color: mixins.$input_bg;
		text-align: center;
		transition: mixins.linear_anim(0.5s);
		min-height: calc(198px - 8px);
		border-radius: 42px;
		display: block;
		resize: none;
		@include mixins.font;
		color: mixins.$btn_dark;
		&::placeholder {
			color: mixins.$btn_dark;
			font-size: inherit;
		}
		&:focus {
			outline: none;
			background-color: transparent;
			color: mixins.$bg_pink;
		}
		&_outer {
			max-height: 250px;
			height: 198px;
			border-radius: 40px;
			width: 100%;
			background: linear-gradient(299deg, #ef48e9 23%, #8ccefb 81%);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}

.feedback-enter-active,
.feedback-leave-active {
	transition: transform 0.8s cubic-bezier(0, 0, 0.1, 1.03);
}
.feedback-enter-from,
.feedback-leave-to {
	transform: translateY(100vh);
}

@import "@styles/mediaQueries/main/feedbackQueries";
</style>
