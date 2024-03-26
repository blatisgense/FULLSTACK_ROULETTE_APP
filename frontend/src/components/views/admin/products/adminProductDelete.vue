<script setup lang="ts">
import { ref } from "vue";
import { product_delete } from "@axios/admin/products.ts";
import CInput from "@global/cInput.vue";
import CRadio from "@global/cRadio.vue";
import CButton from "@global/cButton.vue";

const name = ref<string>("");
const type = ref<"books" | "movies">("books");
const agree = ref<boolean>(false);
</script>

<template>
	<div>
		<span class="content__title">Delete Product</span>
		<form
			id="delete_product_form"
			class="content__form"
			@submit.prevent="
				product_delete({ name: name, type: type });
				($event.target as HTMLFormElement).reset();
				name = '';
			"
		>
			<div class="content__form_inner">
				<span class="content__form_description">Product name</span>
				<CInput
					class="content__form_input"
					:required="true"
					:style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #ef48e9 21%, #8ccefb 68%)` }"
					:placeholder="'Name'"
					:form="'delete_product_form'"
					:type="'text'"
					:auto="'none'"
					:value="name"
					@update:value="(val: string) => (name = val)"
				/>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description">Product's type</span>
				<div class="content__form_row">
					<CRadio class="content__form_radio" :required="true" :name="'type'" :form="'delete_product_form'" :value="'movies'" @update:value="type = 'movies'" />
					<CRadio class="content__form_radio" :required="true" :name="'type'" :form="'delete_product_form'" :value="'books'" @update:value="type = 'books'" />
				</div>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description"
					>Do you agree with deleting <br />
					Product: {{ name }},<br />
					it cannot be undone.</span
				>
				<div class="content__form_row">
					<CRadio class="content__form_radio" :required="true" :name="'field'" :form="'delete_product_form'" :value="'Yep'" @update:value="agree = true" />
				</div>
			</div>
			<CButton class="content__form_btn" :type="'submit'" :form="'delete_product_form'" :style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 25%, #fbac60 74%)` }">Change</CButton>
		</form>
	</div>
</template>
