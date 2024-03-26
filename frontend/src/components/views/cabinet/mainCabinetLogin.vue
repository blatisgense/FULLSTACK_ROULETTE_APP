<script setup lang="ts">
import CabinetButton from "@ui/main/cabinet/cabinetButton.vue";
import closeIcon from "@media/svg/close.svg";
import { useUiStore } from "@state/pinia.ts";
import { login } from "@axios/auth.ts";
import { ref } from "vue";
import CInput from "@global/cInput.vue";
import CButton from "@global/cButton.vue";

const uiStore = useUiStore();
const closeCabinet = () => uiStore.toggle_modal_cabinet(false);

const email = ref<string>("");
const password = ref<string>("");
</script>

<template>
	<div class="cabinet__inner cabinet-login">
		<div class="cabinet__btns right">
			<CabinetButton :fn="closeCabinet" :text="'Close'" :icon="closeIcon" :is-close="true" />
		</div>
		<span class="cabinet__title">Login into your account</span>
		<p class="cabinet__text">With account you can spin wheel, collect prizes and send feedback.</p>
		<form id="cabinet_login_form" class="cabinet__form" @submit.prevent="login({ email: email, password: password })">
			<CInput :auto="'email'" :required="true" class="cabinet__form_input" :form="'cabinet_login_form'" :type="'email'" :placeholder="'Email'" :value="email" @update:value="(val: string) => (email = val)" />
			<CInput
				:auto="'current-password'"
				:required="true"
				class="cabinet__form_input"
				:form="'cabinet_login_form'"
				:type="'password'"
				:placeholder="'Password'"
				:value="password"
				@update:value="(val: string) => (password = val)"
			/>
			<CButton class="cabinet__form_btn" :form="'cabinet_login_form'" :type="'submit'">
				<template #default> Login </template>
				<template #svg>
					<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M21.7 2.58333H18.3417C14.2083 2.58333 11.625 5.16667 11.625 9.3V14.5312H17.36L14.6862 11.8575C14.4925 11.6638 14.4021 11.4183 14.4021 11.1729C14.4021 10.9275 14.4925 10.6821 14.6862 10.4883C15.0608 10.1138 15.6808 10.1138 16.0554 10.4883L20.3825 14.8154C20.7571 15.19 20.7571 15.81 20.3825 16.1846L16.0554 20.5117C15.6808 20.8862 15.0608 20.8862 14.6862 20.5117C14.3117 20.1371 14.3117 19.5171 14.6862 19.1425L17.36 16.4688H11.625V21.7C11.625 25.8333 14.2083 28.4167 18.3417 28.4167H21.6871C25.8204 28.4167 28.4037 25.8333 28.4037 21.7V9.3C28.4167 5.16667 25.8333 2.58333 21.7 2.58333Z"
							fill="#F8F3F3"
						/>
						<path d="M3.552 14.5312C3.02242 14.5312 2.58325 14.9704 2.58325 15.5C2.58325 16.0296 3.02242 16.4688 3.552 16.4688H11.6249V14.5312H3.552Z" fill="#F8F3F3" />
					</svg>
				</template>
			</CButton>
			<img draggable="false" class="cabinet__form_decor" src="@media/images/compass.webp" alt="bg_decoration" />
		</form>
		<p class="cabinet__goto">
			Haven't account yet? <br />
			<RouterLink class="cabinet__goto_link return" to="/register">go to complete Sign Up</RouterLink>
		</p>
	</div>
</template>

<style lang="scss">
@use "@styles/config/mixins";

.cabinet__inner.cabinet-login {
	height: 100%;
	& .cabinet__form {
		&_input {
			&:nth-child(1) {
				background: linear-gradient(191deg, #ef48e9 23%, #8ccefb 71%);
			}
			&:nth-child(2) {
				background: linear-gradient(10deg, #ef48e9 21%, #8ccefb 68%);
			}
		}
		&_btn {
			background: linear-gradient(223deg, #e46087 22%, #fbac60 78%);
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
			width: 240px;
			height: 270px;
			bottom: 40px;
			right: 40px;
		}
	}
	& .cabinet__goto {
		padding-top: 45px;
		margin-top: auto;
		@include mixins.font;
		color: mixins.$text_dark;
		font-size: 22px;
		line-height: 125%;
		letter-spacing: 0.2rem;
		font-weight: 500;
		&_link {
			cursor: pointer;
			color: mixins.$text_link;
		}
	}
}

@media (width < mixins.$breakpoint_HD) {
	.cabinet__inner.cabinet-login {
		& .cabinet__form {
			&_btn svg {
				width: 16px;
				height: 16px;
			}
			&_decor {
				width: 180px;
				height: 220px;
				bottom: 20px;
				right: 20px;
			}
		}
		& .cabinet__goto {
			font-size: 16px;
		}
	}
}

@media (width < mixins.$breakpoint_smartphone) {
	.cabinet__inner.cabinet-login {
		& .cabinet__form {
			&_decor {
				display: none;
			}
		}
	}
}
</style>
