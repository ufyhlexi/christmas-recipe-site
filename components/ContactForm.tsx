"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod schema для валидации формы
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Namnet måste vara minst 2 tecken")
    .max(50, "Namnet får inte vara längre än 50 tecken"),
  email: z
    .string()
    .min(1, "E-postadress krävs")
    .email("Ogiltig e-postadress"),
  phone: z
    .string()
    .min(1, "Telefonnummer krävs")
    .regex(/^[0-9+\-\s()]+$/, "Ogiltigt telefonnummer"),
  message: z
    .string()
    .min(10, "Meddelandet måste vara minst 10 tecken")
    .max(1000, "Meddelandet får inte vara längre än 1000 tecken"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Имитация отправки формы
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Form data:", data);
    
    // Показываем сообщение об успехе
    setIsSubmitted(true);
    reset();
    
    // Скрываем сообщение через 5 секунд
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-lg font-semibold mb-2">
          ✓ Tack för ditt meddelande!
        </div>
        <p className="text-green-700">
          Vi kommer att svara så snart som möjligt.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Имя */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Namn *
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d32f2f] transition-colors ${
            errors.name
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-white"
          }`}
          placeholder="Ditt namn"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          E-postadress *
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d32f2f] transition-colors ${
            errors.email
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-white"
          }`}
          placeholder="din@epost.se"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Телефон */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Telefonnummer *
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d32f2f] transition-colors ${
            errors.phone
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-white"
          }`}
          placeholder="+46 70 123 45 67"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Сообщение */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Meddelande *
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d32f2f] transition-colors resize-none ${
            errors.message
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-white"
          }`}
          placeholder="Skriv ditt meddelande här..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Кнопка отправки */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#d32f2f] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#b71c1c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Skickar..." : "Skicka meddelande"}
      </button>
    </form>
  );
}

