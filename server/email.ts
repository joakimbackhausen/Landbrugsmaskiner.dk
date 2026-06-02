import nodemailer from "nodemailer";

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  machine?: {
    id: number;
    brand?: string;
    model?: string;
    title?: string;
    price?: string;
    currency?: string;
  };
}

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || "lbb@landbrugsmaskiner.dk";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

function machineLabel(machine: NonNullable<ContactEmailData["machine"]>): string {
  return [machine.brand, machine.model || machine.title].filter(Boolean).join(" ");
}

function buildEmailContent(data: ContactEmailData) {
  const machine = data.machine;
  const subject = machine
    ? `Forespørgsel: ${machineLabel(machine)} (ID: ${machine.id})`
    : `Kontaktformular: ${data.name}`;

  const machineLines = machine
    ? [
        "",
        "Maskine:",
        machineLabel(machine) || `Annonce ${machine.id}`,
        machine.price && !isNaN(parseInt(machine.price, 10))
          ? `Pris: ${parseInt(machine.price, 10).toLocaleString("da-DK")} ${machine.currency || "DKK"}`
          : null,
        `Annonce nr.: ${machine.id}`,
      ]
    : [];

  const text = [
    `Navn: ${data.name}`,
    `E-mail: ${data.email}`,
    data.phone ? `Telefon: ${data.phone}` : null,
    ...machineLines,
    "",
    "Besked:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>${machine ? "Ny maskinforespørgsel" : "Ny besked fra landbrugsmaskiner.dk"}</h2>
    <p><strong>Navn:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
    ${data.phone ? `<p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>` : ""}
    ${
      machine
        ? `<hr>
    <p><strong>Maskine:</strong> ${escapeHtml(machineLabel(machine) || `Annonce ${machine.id}`)}</p>
    ${
      machine.price && !isNaN(parseInt(machine.price, 10))
        ? `<p><strong>Pris:</strong> ${escapeHtml(parseInt(machine.price, 10).toLocaleString("da-DK"))} ${escapeHtml(machine.currency || "DKK")}</p>`
        : ""
    }
    <p><strong>Annonce nr.:</strong> ${machine.id}</p>`
        : ""
    }
    <p><strong>Besked:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
  `.trim();

  return { subject, text, html };
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const { subject, text, html } = buildEmailContent(data);
  const transporter = createTransporter();

  if (!transporter) {
    throw new Error(
      "E-mail er ikke konfigureret. Sæt SMTP_HOST, SMTP_USER og SMTP_PASS.",
    );
  }

  await transporter.sendMail({
    from:
      process.env.SMTP_FROM ||
      `"Landbrugsmaskiner.dk" <${process.env.SMTP_USER}>`,
    to: CONTACT_TO,
    replyTo: data.email,
    subject,
    text,
    html,
  });
}
