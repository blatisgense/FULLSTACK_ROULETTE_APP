<script setup lang="ts">
const props = defineProps<{ matched: any }>();
</script>

<template>
	<div class="bread">
		<span v-for="obj in props.matched" class="bread__item">
			{{ obj.meta.name }}
		</span>
	</div>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";
.bread {
	display: flex;
	height: 100%;
	align-items: center;
	&__item {
		font-size: inherit;
		font-weight: inherit;
		font-style: inherit;
		@include mixins.font;
		letter-spacing: inherit;
		color: inherit;
		&:after {
			content: ">>";
			color: inherit;
			font-size: inherit;
			margin-left: 1.5em;
		}
		&:last-child:after {
			content: "";
		}
	}
}

@media (width < mixins.$breakpoint_tablet) {
	.bread__item:after {
		margin-left: 0.75em;
	}
}
</style>
