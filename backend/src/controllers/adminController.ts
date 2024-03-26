import { Controller, Delete, Get, Patch, Put, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

import { APIS } from "@helpers/API";
import { Messages, Products, Promocodes, ResGeneric, User, Users } from "@types";

import { users_change_money } from "@services/admin/users/usersChangeMoney";
import { users_change_wheels } from "@services/admin/users/usersChangeWheels";
import { users_change_role } from "@services/admin/users/usersChangeRole";
import { users_change_books } from "@services/admin/users/usersChangeBooks";
import { users_change_movies } from "@services/admin/users/usersChangeMovies";
import { registration } from "@services/auth/registration";
import { users_get_all } from "@services/admin/users/usersGetAll";
import { users_get_single } from "@services/admin/users/usersGetSingle";

import { users_delete } from "@services/admin/users/usersDelete";
import { promocodes_get } from "@services/admin/promocodes/promocodesGet";
import { promocode_delete } from "@services/admin/promocodes/promocodesDelete";
import { promocode_add } from "@services/admin/promocodes/promocodesAdd";

import { feedback_get_unread } from "@services/admin/feedback/feedbackGetUnread";
import { feedback_read_all } from "@services/admin/feedback/feedbackReadAll";
import { feedback_read_one } from "@services/admin/feedback/feedbackReadSingle";

import { products_delete_movies } from "@services/admin/products/productsDeleteMovies";
import { products_add_movies } from "@services/admin/products/productsAddMovies";
import { products_delete_books } from "@services/admin/products/productsDeleteBooks";
import { products_add_books } from "@services/admin/products/productsAddBooks";
import { products_get_all } from "@services/admin/products/productsGet";

@Controller()
export class AdminController {
	/**
	 * Users
	 */
	@Patch(APIS.admin.users.change.money.apiUrl)
	async UsersChangeMoney(@Req() req: Request<{ email: string; value: number }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await users_change_money(req, res);
	}
	@Patch(APIS.admin.users.change.wheels.apiUrl)
	async UsersChangeWheels(@Req() req: Request<{ email: string; value: number }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await users_change_wheels(req, res);
	}
	@Patch(APIS.admin.users.change.role.apiUrl)
	async UsersChangeRole(@Req() req: Request<{ value: "ADMIN" | "USER"; email: string }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await users_change_role(req, res);
	}
	@Patch(APIS.admin.users.change.books.apiUrl)
	async UsersChangeBooks(@Req() req: Request<{ method: "delete" | "add"; value: string; email: string }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await users_change_books(req, res);
	}
	@Patch(APIS.admin.users.change.movies.apiUrl)
	async UsersChangeMovies(@Req() req: Request<{ email: string; value: string; method: "add" | "delete" }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await users_change_movies(req, res);
	}
	@Get(APIS.admin.users.get.all.url)
	async UsersGetAll(@Req() req: Request, @Res() res: Response<Users | { error: string }>): Promise<void> {
		await users_get_all(req, res);
	}
	@Get(APIS.admin.users.get.single.apiUrl)
	async UsersGetOne(@Req() req: Request<{ email: string }>, @Res() res: Response<User | { error: string }>): Promise<void> {
		await users_get_single(req, res);
	}
	@Put(APIS.admin.users.add.url)
	async UsersAdd(@Req() req: Request, @Res() res: Response<ResGeneric>): Promise<void> {
		await registration(req, res, true);
	}
	@Delete(APIS.admin.users.delete.apiUrl)
	async UsersDelete(@Req() req: Request<{ email: string }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await users_delete(req, res);
	}
	/**
	 * Promocodes
	 */
	@Get(APIS.admin.promocode.get.url)
	async Promocodes_get_all(@Req() req: Request, @Res() res: Response<Promocodes | { error?: string }>): Promise<void> {
		await promocodes_get(req, res);
	}
	@Delete(APIS.admin.promocode.delete.apiUrl)
	async Promocode_delete(@Req() req: Request<{ promo: string }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await promocode_delete(req, res);
	}
	@Put(APIS.admin.promocode.add.url)
	async Promocode_add(@Req() req: Request<any, any, { type: "money" | "wheels" | "movies" | "books"; promo: string; value: string }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await promocode_add(req, res);
	}
	/**
	 * Feedback
	 */
	@Get(APIS.admin.feedback.get.unread.url)
	async Feedback_get_unread(@Req() req: Request, @Res() res: Response<Messages | { error?: string }>): Promise<void> {
		await feedback_get_unread(req, res);
	}
	@Patch(APIS.admin.feedback.read.all.url)
	async Feedback_read_all(@Req() req: Request, @Res() res: Response<ResGeneric>): Promise<void> {
		await feedback_read_all(req, res);
	}
	@Patch(APIS.admin.feedback.read.single.apiUrl)
	async Feedback_read_one(@Req() req: Request<{ id: number }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await feedback_read_one(req, res);
	}
	/**
	 * Products
	 */
	@Get(APIS.admin.products.get.url)
	async Products_get_all(@Req() req: Request, @Res() res: Response<Products | { error?: string }>): Promise<void> {
		await products_get_all(req, res);
	}
	@Put(APIS.admin.products.add.books.apiUrl)
	async Products_books_add(@Req() req: Request<{ name: string }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await products_add_books(req, res);
	}
	@Delete(APIS.admin.products.delete.books.apiUrl)
	async Products_books_delete(@Req() req: Request<{ name: string }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await products_delete_books(req, res);
	}
	@Put(APIS.admin.products.add.movies.apiUrl)
	async Products_movies_add(@Req() req: Request<{ name: string }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await products_add_movies(req, res);
	}
	@Delete(APIS.admin.products.delete.movies.apiUrl)
	async Products_movies_delete(@Req() req: Request<{ name: string }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await products_delete_movies(req, res);
	}
}
