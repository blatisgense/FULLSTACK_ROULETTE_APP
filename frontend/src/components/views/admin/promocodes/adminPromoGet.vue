<script setup lang="ts">
import { ref } from "vue";
import { Promocodes } from "@types";
import { promocodes_get } from "@axios/admin/promocodes.ts";
import CButton from "@global/cButton.vue";

const promocodes = ref<Promocodes>([]);
const show = ref<boolean>(false);

async function get_promocodes() {
	await promocodes_get().then((res: Promocodes) => {
		promocodes.value = res;
		show.value = true;
	});
}
</script>

<template>
	<div>
		<span class="content__title">Get All Promocodes</span>
		<CButton class="content__form_btn" :fn="get_promocodes" :style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 25%, #fbac60 74%)` }"> Get Promocodes </CButton>
		<table v-show="show" class="content__table content__table-promo">
			<thead>
				<tr>
					<td>Promo</td>
					<td>Type</td>
					<td>Value</td>
				</tr>
			</thead>
			<tr v-for="promo in promocodes" @click="($event.target as HTMLDivElement).closest('tr')?.classList.toggle('selected')">
				<td>{{ promo.promo }}</td>
				<td>{{ promo.promo_type }}</td>
				<td>{{ promo.promo_value }}</td>
			</tr>
		</table>
	</div>
</template>
