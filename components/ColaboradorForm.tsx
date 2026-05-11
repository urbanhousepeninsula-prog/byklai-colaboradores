"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadDropzone } from "@/lib/uploadthing";

const PERFILES = [
  "Freelancer conector",
  "Diseñador visual",
  "Implementador web",
  "Automatización",
  "Copy y contenido",
] as const;

const schema = z.object({
  nombre: z.string().min(2, "Requerido"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(7, "Requerido"),
  ciudad: z.string().min(2, "Requerido"),
  perfil: z.string().min(1, "Selecciona un perfil"),
  experiencia: z.string().min(20, "Describe tu experiencia (mínimo 20 caracteres)"),
  linkPortafolio: z.string().optional(),
  comentarios: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const inputCls =
  "w-full px-3 py-[10px] border border-line rounded bg-white text-ink text-[15px] outline-none focus:border-ink transition-colors placeholder:text-ink3";
const labelCls = "block text-[13px] font-medium text-ink mb-[6px]";
const errorCls = "text-[12px] text-red-600 mt-1";

export default function ColaboradorForm() {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        ...data,
        imagen1: uploadedUrls[0] || "",
        imagen2: uploadedUrls[1] || "",
        imagen3: uploadedUrls[2] || "",
        origen: "colaboradores.byklai.com",
        timestamp: new Date().toISOString(),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al enviar");
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Hubo un error al enviar. Intenta de nuevo o escríbenos a hola@byklai.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <div className="font-mono text-2xl text-ink mb-4">✓</div>
        <h3 className="font-serif text-[28px] text-ink mb-3">Registro recibido</h3>
        <p className="text-[15px] text-ink2 leading-[1.7] max-w-[400px] mx-auto font-light">
          Revisamos tu perfil y te contactamos cuando haya un proyecto que encaje
          con tu especialidad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Nombre + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelCls}>Nombre completo *</label>
          <input {...register("nombre")} className={inputCls} placeholder="Tu nombre" />
          {errors.nombre && <p className={errorCls}>{errors.nombre.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input
            {...register("email")}
            type="email"
            className={inputCls}
            placeholder="tu@email.com"
          />
          {errors.email && <p className={errorCls}>{errors.email.message}</p>}
        </div>
      </div>

      {/* Teléfono + Ciudad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelCls}>Teléfono *</label>
          <input
            {...register("telefono")}
            className={inputCls}
            placeholder="+52 999 000 0000"
          />
          {errors.telefono && <p className={errorCls}>{errors.telefono.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Ciudad / País *</label>
          <input
            {...register("ciudad")}
            className={inputCls}
            placeholder="Mérida, México"
          />
          {errors.ciudad && <p className={errorCls}>{errors.ciudad.message}</p>}
        </div>
      </div>

      {/* Perfil */}
      <div className="mb-6">
        <label className={labelCls}>Perfil principal *</label>
        <select {...register("perfil")} className={inputCls + " cursor-pointer"}>
          <option value="">Selecciona tu perfil</option>
          {PERFILES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.perfil && <p className={errorCls}>{errors.perfil.message}</p>}
      </div>

      {/* Experiencia */}
      <div className="mb-6">
        <label className={labelCls}>Describe tu experiencia *</label>
        <textarea
          {...register("experiencia")}
          rows={4}
          className={inputCls + " resize-y"}
          placeholder="¿Qué herramientas dominas? ¿Qué tipo de proyectos has hecho? ¿Cuál es tu especialidad?"
        />
        {errors.experiencia && <p className={errorCls}>{errors.experiencia.message}</p>}
      </div>

      {/* Link portafolio */}
      <div className="mb-6">
        <label className={labelCls}>
          Link de portafolio / LinkedIn / web{" "}
          <span className="text-ink3 font-normal">(opcional)</span>
        </label>
        <input
          {...register("linkPortafolio")}
          className={inputCls}
          placeholder="https://tuportafolio.com"
        />
      </div>

      {/* Portfolio upload */}
      <div className="mb-6">
        <label className={labelCls}>
          Portafolio — hasta 3 imágenes{" "}
          <span className="text-ink3 font-normal">(opcional)</span>
        </label>
        <p className="text-[13px] text-ink3 mb-3">
          Sube capturas, mockups o ejemplos de trabajo. Máx. 4 MB por imagen.
        </p>
        <UploadDropzone
          endpoint="portfolioUploader"
          onClientUploadComplete={(res) => {
            setUploadedUrls(res.map((f) => f.url));
          }}
          onUploadError={(err) => {
            console.error("Upload error:", err);
          }}
          appearance={{
            container: {
              border: "1px dashed #e0ddd8",
              borderRadius: "4px",
              backgroundColor: "#fafaf8",
              padding: "24px",
            },
          }}
        />
        {uploadedUrls.length > 0 && (
          <p className="text-[12px] text-green-700 mt-2 font-mono">
            ✓ {uploadedUrls.length} imagen{uploadedUrls.length > 1 ? "es" : ""} subida
            {uploadedUrls.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Comentarios */}
      <div className="mb-8">
        <label className={labelCls}>
          Preguntas o comentarios{" "}
          <span className="text-ink3 font-normal">(opcional)</span>
        </label>
        <textarea
          {...register("comentarios")}
          rows={3}
          className={inputCls + " resize-y"}
          placeholder="¿Algo más que quieras agregar o preguntarnos?"
        />
      </div>

      {submitError && (
        <div className="mb-4 px-3 py-3 bg-red-50 border border-red-200 rounded text-[13px] text-red-700">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-[14px] px-6 bg-ink text-white rounded text-[15px] font-medium tracking-[0.01em] hover:bg-ink2 disabled:bg-ink3 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? "Enviando..." : "Enviar registro"}
      </button>

      <p className="text-[12px] text-ink3 mt-3 text-center">
        Revisamos cada perfil manualmente. Te contactamos si hay match.
      </p>
    </form>
  );
}
