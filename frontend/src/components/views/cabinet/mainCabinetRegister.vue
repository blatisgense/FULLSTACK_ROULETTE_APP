<script setup lang="ts">
import { useUiStore } from "@state/pinia.ts";
import closeIcon from "@media/svg/close.svg";
import backIcon from "@media/svg/back.svg";
import CabinetButton from "@ui/main/cabinet/cabinetButton.vue";
import { router } from "@router/router.ts";
import { register } from "@axios/auth.ts";
import { ref } from "vue";
import CButton from "@global/cButton.vue";
import CInput from "@global/cInput.vue";

const uiStore = useUiStore();
const closeCabinet = () => uiStore.toggle_modal_cabinet(false);
const backToLogin = () => router.push("/login");

const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
</script>

<template>
	<div class="cabinet__inner cabinet-register">
		<div class="cabinet__btns return">
			<CabinetButton class="return" :fn="backToLogin" :text="'Back to login'" :icon="backIcon" :is-close="false" />
			<CabinetButton :fn="closeCabinet" :text="'Close'" :icon="closeIcon" :is-close="true" />
		</div>
		<span class="cabinet__title">Register new account for free</span>
		<p class="cabinet__text">With account you can spin wheel, collect prizes and send feedback. You password will store in database securely with encryption.</p>
		<form id="cabinet_reg_form" class="cabinet__form" @submit.prevent="register({ email: email, name: name, password: password })">
			<CInput class="cabinet__form_input" :required="true" :auto="'email'" :value="email" :form="'cabinet_reg_form'" :type="'email'" :placeholder="'Email'" @update:value="(val: string) => (email = val)" />
			<CInput class="cabinet__form_input" :required="true" :auto="'name'" :value="name" :form="'cabinet_reg_form'" :type="'text'" :placeholder="'Name'" @update:value="(val: string) => (name = val)" />
			<CInput
				class="cabinet__form_input"
				:required="true"
				:auto="'new-password'"
				:value="password"
				:form="'cabinet_reg_form'"
				:type="'password'"
				:placeholder="'Password'"
				@update:value="(val: string) => (password = val)"
			/>
			<CButton class="cabinet__form_btn" :form="'cabinet_reg_form'" :type="'submit'">
				<template #default> Register </template>
				<template #svg>
					<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M14.5001 16.9166C8.44636 16.9166 3.51636 20.9766 3.51636 25.9791C3.51636 26.3175 3.78219 26.5833 4.12052 26.5833H24.8797C25.218 26.5833 25.4839 26.3175 25.4839 25.9791C25.4839 20.9766 20.5539 16.9166 14.5001 16.9166Z"
							fill="#F8F3F3"
						/>
						<path
							d="M14.4999 2.41663C13.0741 2.41663 11.7691 2.91204 10.7299 3.74579C9.34034 4.84538 8.45825 6.54913 8.45825 8.45829C8.45825 9.59413 8.77242 10.6575 9.34034 11.5637C10.3795 13.3158 12.2887 14.5 14.4999 14.5C16.0224 14.5 17.412 13.9441 18.4753 12.9895C18.9466 12.5908 19.3574 12.1075 19.6716 11.5637C20.2274 10.6575 20.5416 9.59413 20.5416 8.45829C20.5416 5.12329 17.8349 2.41663 14.4999 2.41663ZM17.6295 7.80579L14.4033 10.7783C14.1858 10.9837 13.9078 11.0804 13.6299 11.0804C13.3399 11.0804 13.0499 10.9716 12.8324 10.7541L11.3462 9.25579C10.8991 8.80871 10.8991 8.09579 11.3462 7.64871C11.7933 7.20163 12.5062 7.20163 12.9533 7.64871L13.6662 8.36163L16.0949 6.12621C16.5541 5.70329 17.267 5.72746 17.6899 6.18663C18.1128 6.65788 18.0887 7.38288 17.6295 7.80579Z"
							fill="#F8F3F3"
						/>
					</svg>
				</template>
			</CButton>
		</form>
		<img draggable="false" class="cabinet__form_decor" src="@media/images/reg_decor.webp" alt="bg_decoration" />
	</div>
</template>

<style lang="scss">
@use "@styles/config/mixins";

.cabinet__inner.cabinet-register {
	height: 100%;
	& .cabinet__text {
		max-width: 560px;
	}
	& .cabinet__form {
		&_input {
			&:nth-child(1) {
				background: linear-gradient(202deg, #ef48e9 23%, #8ccefb 71%);
			}
			&:nth-child(2) {
				background: linear-gradient(256deg, #ef48e9 4%, #8ccefb 48%);
			}
			&:nth-child(3) {
				background: linear-gradient(287deg, #ef48e9 6%, #8ccefb 98%);
			}
		}
		&_btn {
			background: linear-gradient(34deg, #e46087 22%, #fbac60 78%);
			&:hover {
				& svg path {
					fill: mixins.$bg_pink;
				}
			}
			& svg {
				width: 22px;
				height: 22px;
				transition: mixins.linear_anim(0.5s);
				& path {
					fill: mixins.$btn_dark;
					transition: mixins.linear_anim(0.5s);
				}
			}
		}
		&_decor {
			width: 380px;
			height: 410px;
			bottom: 0;
			right: 0;
		}
	}
}

@media (width < mixins.$breakpoint_HD) {
	.cabinet__inner.cabinet-register {
		& .cabinet__text {
			max-width: 440px;
		}
		& .cabinet__form {
			&_btn svg {
				width: 16px;
				height: 16px;
			}
			&_decor {
				width: 130px;
				height: 150px;
				bottom: 0;
				right: 0;
			}
		}
	}
}
</style>
