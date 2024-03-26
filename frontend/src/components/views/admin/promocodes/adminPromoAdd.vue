<script setup lang="ts">
import { ref } from "vue";
import { promocode_add } from "@axios/admin/promocodes.ts";
import { random_promocode } from "@helpers/random_promo.ts";
import CRadio from "@global/cRadio.vue";
import CInput from "@global/cInput.vue";
import CButton from "@global/cButton.vue";

const give = ref<"money" | "wheels" | "movies" | "books">("movies");
const value = ref<string>("");
const promo = ref<string>("");
const type = ref<"number" | "text">("text");
const change_type = (t: "number" | "text") => (type.value = t);
</script>

<template>
	<div>
		<span class="content__title">Add New Promocode</span>
		<form
			id="add_promocode_form"
			class="content__form"
			@submit.prevent="
				promocode_add({ type: give, promo: promo, value: value });
				($event.target as HTMLFormElement).reset();
			"
		>
			<div class="content__form_inner">
				<span class="content__form_description">Promocode</span>
				<CInput
					class="content__form_input"
					:required="true"
					:style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #ef48e9 21%, #8ccefb 68%)` }"
					:placeholder="'Promocode'"
					:form="'add_promocode_form'"
					:type="'text'"
					:auto="'none'"
					:value="promo"
					@update:value="(val: string) => (promo = val)"
				/>
				<img src="@media/images/random.webp" class="content__form_random" alt="random" @click="promo = random_promocode()" />
			</div>
			<div class="content__form_inner">
				<span class="content__form_description">Promocode gives:</span>
				<div class="content__form_row">
					<CRadio
						class="content__form_radio"
						:required="true"
						:name="'give'"
						:form="'add_promocode_form'"
						:value="'movies'"
						@update:value="
							give = 'movies';
							change_type('text');
						"
					/>
					<CRadio
						class="content__form_radio"
						:required="true"
						:name="'give'"
						:form="'add_promocode_form'"
						:value="'books'"
						@update:value="
							give = 'books';
							change_type('text');
						"
					/>
				</div>
				<div class="content__form_row">
					<CRadio
						class="content__form_radio"
						:required="true"
						:name="'give'"
						:form="'add_promocode_form'"
						:value="'money'"
						@update:value="
							give = 'money';
							change_type('number');
						"
					/>
					<CRadio
						class="content__form_radio"
						:required="true"
						:name="'give'"
						:form="'add_promocode_form'"
						:value="'wheels'"
						@update:value="
							give = 'wheels';
							change_type('number');
						"
					/>
				</div>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description">Prize value</span>
				<CInput
					class="content__form_input"
					:required="true"
					:style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #ef48e9 21%, #8ccefb 68%)` }"
					:placeholder="'Value'"
					:form="'add_promocode_form'"
					:type="type"
					:auto="'none'"
					:value="value"
					@update:value="(val: string) => (value = val)"
				/>
			</div>
			<CButton class="content__form_btn" :type="'submit'" :form="'add_promocode_form'" :style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 25%, #fbac60 74%)` }">
				Add Promocode
			</CButton>
		</form>
	</div>
</template>
