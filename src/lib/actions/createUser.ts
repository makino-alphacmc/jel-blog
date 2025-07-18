"use server";
import { registerSchema } from "@/validations/user";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

// ActionStateの型定義
type ActionState = { success: boolean; errors: Record<string, string[]> };

// バリデーションエラー処理
function handleValidationError(error: any): ActionState {
	const { fieldErrors, formErrors } = error.flatten();
	// zodの仕様でパスワード一致確認のエラーは formErrorsで渡ってくる
	// formErrorsがある場合は、confirmPasswordフィールドにエラーを追加
	if (formErrors.length > 0) {
		return {
			success: false,
			errors: { ...fieldErrors, confirmPassword: formErrors },
		};
	}
	return { success: false, errors: fieldErrors };
}

// カスタムエラー処理
function handleError(customErrors: Record<string, string[]>): ActionState {
	return { success: false, errors: customErrors };
}

export async function createUser(
	prevState: ActionState,
	formData: FormData
): Promise<ActionState> {
	const rawFormData = Object.fromEntries(
		// 4つの値を取得
		["name", "email", "password", "confirmPassword"].map((field) => [
			field,
			formData.get(field) as string,
		])
	) as Record<string, string>;

	// バリデーション
	const validationResult = registerSchema.safeParse(rawFormData);
	if (!validationResult.success) {
		return handleValidationError(validationResult.error);
	}
	// メールアドレスが既に登録されているか確認
	const existingUser = await prisma.user.findUnique({
		where: { email: rawFormData.email },
	});

	if (existingUser) {
		return handleError({
			email: ["このメールアドレスはすでに登録されています"],
		});
	}
	// パスワードのハッシュ化
	const hashedPassword = await bcryptjs.hash(rawFormData.password, 12);

	// ユーザー登録
	await prisma.user.create({
		data: {
			name: rawFormData.name,
			email: rawFormData.email,
			password: hashedPassword,
		},
	});

	// リダイレクトまたは成功メッセージの返却
	await signIn("credentials", {
		...Object.fromEntries(formData),
		redirect: false, // 自動リダイレクトを無効化
	});
	redirect("/dashboard");
}
