import nodemailer from "nodemailer";

const smtpHost =
  process.env.NAMECHEAP_SMTP_HOST || "mail.privateemail.com";

const smtpPort = Number(
  process.env.NAMECHEAP_SMTP_PORT || 465
);

const smtpUser = process.env.NAMECHEAP_SMTP_USER;
const smtpPassword = process.env.NAMECHEAP_SMTP_PASSWORD;

if (!smtpUser || !smtpPassword) {
  console.warn(
    "Namecheap SMTP credentials are not configured. Email sending will fail until NAMECHEAP_SMTP_USER and NAMECHEAP_SMTP_PASSWORD are set."
  );
}

/**
 * Reusable pooled SMTP transporter.
 *
 * Keeping one transporter alive avoids creating a new SMTP/TLS connection
 * for every email, which makes repeated sends noticeably faster.
 */
export const vertexMailTransporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  pool: true,
  maxConnections: 3,
  maxMessages: 100,
  auth: {
    user: smtpUser || "",
    pass: smtpPassword || "",
  },
});

/**
 * Optional connection check for debugging / server startup checks.
 *
 * Do not call this before every email because that would add unnecessary
 * network work to the send path.
 */
export async function verifyVertexMailTransporter() {
  return vertexMailTransporter.verify();
}