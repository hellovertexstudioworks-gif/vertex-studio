export default function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=639676824238&text=Hello%20Vertex%20Studio,%20I%20would%20like%20to%20discuss%20a%20website%20project."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Vertex Studio on WhatsApp"
      className="
      fixed
      bottom-6
      right-6
      z-50
      flex
      h-16
      w-16
      items-center
      justify-center
      rounded-full
      bg-green-500
      text-3xl
      shadow-xl
      transition
      duration-300
      hover:scale-110
      hover:shadow-green-500/40
      "
    >
      💬
    </a>
  );
}