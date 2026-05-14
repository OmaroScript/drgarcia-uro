import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    const email = String(formData.get("email") || "");
    const subject = String(formData.get("subject") || "");
    const message = String(formData.get("message") || "");

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, message: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: ["contacto@centrourologicotijuana.com"],
      replyTo: email,
      subject: `Nueva consulta: ${subject} — ${name}`,
      html: `
        <h2>Nueva solicitud de cita — Centro Urológico Tijuana</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Motivo de consulta:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "No se pudo enviar el mensaje." },
      { status: 500 }
    );
  }
}
