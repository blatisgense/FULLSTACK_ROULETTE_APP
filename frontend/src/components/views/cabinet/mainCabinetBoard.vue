<script setup lang="ts">
import { useUiStore } from "@state/pinia.ts";
import CabinetButton from "@ui/main/cabinet/cabinetButton.vue";
import backIcon from "@media/svg/back.svg";
import closeIcon from "@media/svg/close.svg";
import { logout } from "@axios/auth.ts";

const uiStore = useUiStore();

const closeCabinet = () => uiStore.toggle_modal_cabinet(false);
</script>

<template>
	<div class="cabinet__inner cabinet-dashboard">
		<div class="cabinet__btns return">
			<CabinetButton class="return" :fn="logout" :text="'Logout'" :icon="backIcon" :is-close="false" />
			<CabinetButton :fn="closeCabinet" :text="'Close'" :icon="closeIcon" :is-close="true" />
		</div>
		<div class="header">
			<img src="@media/svg/avatar.svg" alt="avatar" class="avatar" />
			<span class="name">{{ uiStore.user.user_name }} - {{ uiStore.user.user_role }}</span>
		</div>
		<div class="dashboard">
			<div class="amounts">
				<div class="card">
					<span class="amounts__up">You've got:</span>
					<span class="amounts__down"
						><span class="amounts__digit">{{ uiStore.user.user_wheels || "0" }}</span
						>wheels</span
					>
				</div>
				<div class="card">
					<span class="amounts__up">Amount of empties:</span>
					<span class="amounts__down"
						><span class="amounts__digit small">{{ uiStore.user.user_money || "0" }}</span
						>money</span
					>
				</div>
			</div>
			<ul class="products card">
				<li v-if="uiStore.user.user_movies?.length == 0 && uiStore.user.user_books?.length == 0" class="products__empty">There nothing to show, win your products first.</li>
				<li v-for="movie in uiStore.user.user_movies" class="products__li">
					<img src="@media/images/movies.webp" alt="movies icon" />
					<span>{{ movie }}</span>
				</li>
				<li v-for="book in uiStore.user.user_books" class="products__li">
					<img src="@media/images/books.webp" alt="books icon" />
					<span>{{ book }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";
.cabinet__inner.cabinet-dashboard {
	//header
	& .header {
		column-gap: 20px;
		padding: 50px 0;
		display: flex;
		width: 100%;
		align-items: center;
		& img {
			width: 60px;
			height: 60px;
			border-radius: 100%;
		}
		& .name {
			@include mixins.font;
			font-weight: 500;
			color: mixins.$text_dark;
			text-transform: capitalize;
			font-size: 32px;
			line-height: 115%;
		}
	}
	//dashboard
	& .dashboard {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 16px;
		height: fit-content;
		position: relative;
		width: 100%;
		//products
		& .card {
			display: flex;
			row-gap: 16px;
			background-color: mixins.$bg_pink;
			border-radius: 20px;
			flex-direction: column;
			padding: 22px;
		}
		//cards
		& .amounts {
			display: flex;
			flex-direction: column;
			row-gap: 16px;
			height: fit-content;
			position: sticky;
			top: -54px;
			& .card {
				height: 260px;
				justify-content: space-between;
			}
			&__digit {
				@include mixins.font;
				font-weight: 600;
				color: mixins.$text_dark;
				font-size: 95px;
				margin-right: 10px;
				line-height: 105%;
				&.small {
					font-size: 55px;
				}
			}
			&__up {
				@include mixins.font;
				font-weight: 500;
				color: mixins.$text_dark;
				font-size: 22px;
				line-height: 115%;
			}
			&__down {
				@include mixins.font;
				font-weight: 500;
				color: mixins.$text_dark;
				font-size: 22px;
				line-height: 105%;
			}
		}
		& .products {
			row-gap: 16px;
			height: fit-content;
			min-height: 100%;
			&__empty {
				@include mixins.font;
				font-size: 22px;
				font-weight: 500;
				color: mixins.$text_dark;
				line-height: 120%;
				text-align: center;
				margin: auto;
			}
			&__li {
				display: flex;
				column-gap: 10px;
				align-items: center;
				& img {
					width: 50px;
					height: 50px;
				}
				& span {
					@include mixins.font;
					font-weight: 500;
					color: mixins.$text_dark;
					font-size: 22px;
					line-height: 120%;
				}
			}
		}
	}
}

@media (width < mixins.$breakpoint_FHD) {
	.cabinet__inner.cabinet-dashboard {
		//header
		& .header {
			column-gap: 15px;
			padding: 30px 0;
			& img {
				width: 40px;
				height: 40px;
			}
			& .name {
				font-size: 24px;
			}
		}
		//dashboard
		& .dashboard {
			grid-template-columns: 1fr 1fr;
			column-gap: 12px;
			//products
			& .card {
				row-gap: 12px;
				padding: 16px;
			}
			//cards
			& .amounts {
				row-gap: 12px;
				top: -38px;
				& .card {
					height: 190px;
				}
				&__digit {
					font-size: 70px;
					margin-right: 10px;
					&.small {
						font-size: 40px;
					}
				}
				&__up {
					font-size: 16px;
				}
				&__down {
					font-size: 16px;
				}
			}
			& .products {
				row-gap: 12px;
				&__empty {
					font-size: 18px;
				}
				&__li {
					column-gap: 10px;
					& img {
						width: 35px;
						height: 35px;
					}
					& span {
						font-size: 16px;
					}
				}
			}
		}
	}
}

@media (width < mixins.$breakpoint_smartphone) {
	.cabinet__inner.cabinet-dashboard {
		//header
		& .header {
			column-gap: 10px;
			padding: 20px 0;
			& img {
				width: 30px;
				height: 30px;
			}
			& .name {
				font-size: 18px;
			}
		}
		//dashboard
		& .dashboard {
			grid-template-columns: 1fr;
			row-gap: 12px;
			//products
			& .card {
				row-gap: 12px;
				padding: 12px;
			}
			//cards
			& .amounts {
				row-gap: 12px;
				position: static;
				& .card {
					height: 160px;
				}
				&__digit {
					font-size: 70px;
					margin-right: 10px;
					&.small {
						font-size: 40px;
					}
				}
				&__up {
					font-size: 14px;
				}
				&__down {
					font-size: 14px;
				}
			}
			& .products {
				row-gap: 12px;
				min-height: 160px;
				&__li {
					column-gap: 10px;
					& img {
						width: 35px;
						height: 35px;
					}
					& span {
						font-size: 14px;
					}
				}
			}
		}
	}
}
</style>
