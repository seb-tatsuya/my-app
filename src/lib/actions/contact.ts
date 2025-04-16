"use server";
import { redirect } from "next/navigation";
import { ContactSchema } from "@/validations/contact";

// Action Stateの型定義
type ActionState = {
  success: boolean;
  errors: { name?: string[]; email?: string[] };
  serverError?: string;
};

// Server Action（サーバー側で動作）
export async function submitContactForm(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get("name");
  const email = formData.get("email");

  // バリデーション
  const validationResult = ContactSchema.safeParse({ name, email }); // safeParseでバリデーションを実行
  // バリデーションエラーがある場合
  if (!validationResult.success) {
    // エラーを取得、エラーはzodの型で取得できる
    const errors = validationResult.error.flatten().fieldErrors;
    console.log("サーバー側でエラー:", errors);
    return {
      success: false,
      errors: {
        name: errors.name || [],
        email: errors.email || [],
      },
    };
  }
  // DB

  console.log("送信されたデータ:", name, email);
  redirect("/contacts/conplete");
}
