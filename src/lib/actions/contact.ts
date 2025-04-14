"use server";
import { redirect } from "next/navigation";
import { contactSchema } from "@/validations/contact";

// Server Action（サーバー側で動作）
export async function submitContactForm(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");

  // バリデーション
  const validationResult = contactSchema.safeParse({ name, email });
  if (!validationResult.success) {
    const errors = validationResult.error.flatten();
    console.log("サーバー側でエラー:", errors);
    return {};
  }
  // DB

  console.log("送信されたデータ:", name, email);
  redirect("/contacts/conplete");
}
