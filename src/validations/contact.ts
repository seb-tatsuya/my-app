import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, "名前は３文字以上で入力してください。")
    .max(20, "名前は２０文字以内で入力してください。"),
  email: z
    .string()
    .min(1, "メールアドレスは必須です。")
    .email("正しいメールアドレスを入力してください。"),
});

// バリデーションが型として使用出来いるように型の定義
export type ContactType = z.infer<typeof contactSchema>;
