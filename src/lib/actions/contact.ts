"use server";
import { redirect } from "next/navigation";
import { ContactSchema } from "@/validations/contact";
import { prisma } from "@/lib/prisma";

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
  const name = formData.get("name") as string; //画面から送信されたデータ
  const email = formData.get("email") as string; //画面から送信されたデータ

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
  // DB登録
  // メールアドレスが存在しているかチェック
  const existingRecord = await prisma.contact.findUnique({
    where: { email: email },
  }); // 画面から送信されたデータを使用してチェック
  if (existingRecord) {
    return {
      success: false,
      errors: {
        email: ["このメールアドレスは既に登録されています。"],
      },
    };
  }
  // DBに名前とメールアドレスを登録
  await prisma.contact.create({
    data: {
      name,
      email,
    },
  });

  console.log("送信されたデータ:", name, email);
  redirect("/contacts/conplete");
}
