<script setup lang="ts">
import { ref } from "vue";
import { promocode_delete } from "@axios/admin/promocodes.ts";
import CButton from "@global/cButton.vue";
import CRadio from "@global/cRadio.vue";
import CInput from "@global/cInput.vue";

const promo = ref<string>("");
const agree = ref<boolean>(false);
</script>

<template>
	<div>
		<span class="content__title">Delete Promocode</span>
		<form
			id="delete_promocode_form"
			class="content__form"
			@submit.prevent="
				promocode_delete(promo);
				($event.target as HTMLFormElement).reset();
				promo = '';
			"
		>
			<div class="content__form_inner">
				<span class="content__form_description">Promocode</span>
				<CInput
					class="content__form_input"
					:required="true"
					:style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #ef48e9 21%, #8ccefb 68%)` }"
					:placeholder="'Promocode'"
					:form="'delete_promocode_form'"
					:type="'text'"
					:auto="'none'"
					:value="promo"
					@update:value="(val: string) => (promo = val)"
				/>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description"
					>Do you agree with deleting <br />
					Promocode: {{ promo }},<br />
					it cannot be undone.</span
				>
				<div class="content__form_row"><CRadio class="content__form_radio" :required="true" :name="'field'" :form="'delete_promocode_form'" :value="'Yep'" @update:value="agree = true" /></div>
			</div>
			<CButton class="content__form_btn" :type="'submit'" :form="'delete_promocode_form'" :style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 25%, #fbac60 74%)` }">
				Delete Promocode
			</CButton>
		</form>
	</div>
</template>
