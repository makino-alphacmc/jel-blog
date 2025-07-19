"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

// ...

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	try {
		await signIn("credentials", {
			...Object.fromEntries(formData),
			redirect: false,
		});
		// 認証成功後に手動でリダイレクト
		redirect("/dashboard");
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return "メールアドレスまたはパスワードが正しくありません";
				default:
					return "Something went wrong.";
			}
		}
		throw error;
	}
}
