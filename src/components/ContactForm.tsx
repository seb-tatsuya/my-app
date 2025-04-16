"use client";
import { submitContactForm } from "@/lib/actions/contact";
import { ContactSchema } from "@/validations/contact";
import { useActionState, useState } from "react";
import { z } from "zod";

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
    errors: {},
  });

  const [clientErrors, setClientErrors] = useState({ name: "", email: "" });

  // バリデーションエラーをクライアント側で表示するための関数
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // name属性の値を取得
    const { name, value } = e.target;

    // name属性の値によってバリデーションを実行
    try {
      if (name === "name") {
        ContactSchema.pick({ name: true }).parse({ name: value }); // zodのバリデーションを実行
      } else if (name === "email") {
        ContactSchema.pick({ email: true }).parse({ email: value }); // zodのバリデーションを実行
      }
      setClientErrors((prev) => ({ ...prev, [name]: "" })); // エラーが無ければ空にする
    } catch (error) {
      // zodのエラーをキャッチ
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || ""; // zodのエラーを取得
        setClientErrors((prev) => ({ ...prev, [name]: errorMessage })); // エラーをセット
      }
    }
  };

  return (
    <div>
      <form action={formAction}>
        <div className="py-24 text-gray-600">
          <div className="md:w-1/2 bg-white rounded-lg p-8 flex flex-col mx-auto shadow-md">
            {" "}
            <h2 className="text-lg mb-2">お問い合わせ</h2>
            <div className="mb-4">
              <label htmlFor="name" className="text-sm">
                名前
              </label>
              <input
                type="name"
                id="name"
                name="name"
                onBlur={handleBlur}
                className="w-full bg-white rounded border border-gray-300
focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8"
              />
              {state.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.name.join(",")}
                </p>
              )}
              {clientErrors.name && (
                <p className="text-red-500 text-sm mt-1">{clientErrors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-sm">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onBlur={handleBlur}
                className="w-full bg-white rounded border border-gray-300
focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8"
              />
              {state.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.email.join(",")}
                </p>
              )}
              {clientErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {clientErrors.email}
                </p>
              )}
            </div>
            <button className="text-white bg-indigo-500 py-2 px-6 hover:bg-indigo-600 rounded text-lg">
              送信
            </button>{" "}
          </div>
        </div>{" "}
      </form>
    </div>
  );
}
