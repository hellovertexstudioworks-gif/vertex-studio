"use client";

import { useState } from "react";
import {
  CalendarCheck,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  UserRound,
  Stethoscope,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  "General Dentistry",
  "Cosmetic Dentistry",
  "Teeth Whitening",
  "Dental Implants",
  "Orthodontics",
  "Pediatric Dentistry",
  "Root Canal Care",
  "Oral Surgery & Implants",
];

const doctors = [
  {
    name: "Dr. Emily Carter",
    specialty: "General & Cosmetic Dentistry",
  },
  {
    name: "Dr. Michael Anderson",
    specialty: "Orthodontics & Restorative Dentistry",
  },
  {
    name: "Dr. Sophia Williams",
    specialty: "Pediatric & Family Dentistry",
  },
  {
    name: "Dr. Daniel Brooks",
    specialty: "Oral Surgery & Implants",
  },
  {
    name: "Dr. Olivia Bennett",
    specialty: "Endodontics & Root Canal Care",
  },
  {
    name: "Dr. James Mitchell",
    specialty: "Prosthodontics & Restorative Care",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="bg-white py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600">
            Book Your Visit
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Let&apos;s take care of
            <span className="block text-blue-600">
              your smile.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Ready to get started? Request an appointment and choose
            the service and dentist that best fit your needs.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT — Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="rounded-[36px] bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white shadow-xl sm:p-10"
          >
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                <CalendarCheck size={27} />
              </div>

              <h3 className="mt-7 text-2xl font-black">
                Your smile starts here.
              </h3>

              <p className="mt-4 text-sm leading-7 text-blue-50">
                Whether you need a routine checkup, cosmetic treatment,
                pediatric care, or restorative treatment, our team is
                here to help.
              </p>
            </div>

            {/* Contact Details */}
            <div className="mt-10 space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Visit Our Clinic
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-50">
                    123 Smile Avenue
                    <br />
                    Downtown, Your City
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Call Us
                  </p>

                  <p className="mt-1 text-sm text-blue-50">
                    (555) 123-4567
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Email Us
                  </p>

                  <p className="mt-1 text-sm text-blue-50">
                    hello@brightsmile.com
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Clock3 size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Office Hours
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-50">
                    Mon – Fri: 8:00 AM – 6:00 PM
                    <br />
                    Sat: 9:00 AM – 3:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Trust */}
            <div className="mt-10 border-t border-white/20 pt-7">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} />

                <p className="text-sm font-medium text-blue-50">
                  Trusted by 12K+ happy patients
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Appointment Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.07)] sm:p-10"
          >
            {submitted ? (
              <div className="flex min-h-[650px] flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45 }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50"
                >
                  <CheckCircle2
                    size={32}
                    className="text-green-600"
                  />
                </motion.div>

                <h3 className="mt-6 text-2xl font-black text-slate-900">
                  Appointment Request Sent
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
                  Thank you for contacting BrightSmile Dental.
                  Your appointment request has been recorded in
                  this demo workflow. Our team will review the
                  request and contact you to confirm the schedule.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <>
                {/* Form Heading */}
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600">
                    Appointment Request
                  </p>

                  <h3 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
                    Tell us how we can help.
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Choose a service, preferred dentist, date, and
                    time. This creates a realistic appointment
                    workflow for the BrightSmile demo.
                  </p>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >
                  {/* Name + Phone */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                      >
                        <UserRound size={15} />
                        Full Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="
                          mt-2
                          w-full
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50
                          px-4
                          py-3.5
                          text-sm
                          text-slate-900
                          outline-none
                          transition
                          placeholder:text-slate-400
                          focus:border-blue-500
                          focus:bg-white
                          focus:ring-4
                          focus:ring-blue-500/10
                        "
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="Your phone number"
                        className="
                          mt-2
                          w-full
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50
                          px-4
                          py-3.5
                          text-sm
                          text-slate-900
                          outline-none
                          transition
                          placeholder:text-slate-400
                          focus:border-blue-500
                          focus:bg-white
                          focus:ring-4
                          focus:ring-blue-500/10
                        "
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="
                        mt-2
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3.5
                        text-sm
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-500/10
                      "
                    />
                  </div>

                  {/* Service + Doctor */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="service"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                      >
                        <Stethoscope size={15} />
                        Service
                      </label>

                      <select
                        id="service"
                        name="service"
                        required
                        defaultValue=""
                        className="
                          mt-2
                          w-full
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50
                          px-4
                          py-3.5
                          text-sm
                          text-slate-700
                          outline-none
                          transition
                          focus:border-blue-500
                          focus:bg-white
                          focus:ring-4
                          focus:ring-blue-500/10
                        "
                      >
                        <option value="" disabled>
                          Select a service
                        </option>

                        {services.map((service) => (
                          <option
                            key={service}
                            value={service}
                          >
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="doctor"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Preferred Dentist
                      </label>

                      <select
                        id="doctor"
                        name="doctor"
                        required
                        defaultValue=""
                        className="
                          mt-2
                          w-full
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50
                          px-4
                          py-3.5
                          text-sm
                          text-slate-700
                          outline-none
                          transition
                          focus:border-blue-500
                          focus:bg-white
                          focus:ring-4
                          focus:ring-blue-500/10
                        "
                      >
                        <option value="" disabled>
                          Select a dentist
                        </option>

                        {doctors.map((doctor) => (
                          <option
                            key={doctor.name}
                            value={doctor.name}
                          >
                            {doctor.name} — {doctor.specialty}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date + Time */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="date"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Preferred Date
                      </label>

                      <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="
                          mt-2
                          w-full
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50
                          px-4
                          py-3.5
                          text-sm
                          text-slate-700
                          outline-none
                          transition
                          focus:border-blue-500
                          focus:bg-white
                          focus:ring-4
                          focus:ring-blue-500/10
                        "
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="time"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Preferred Time
                      </label>

                      <select
                        id="time"
                        name="time"
                        required
                        defaultValue=""
                        className="
                          mt-2
                          w-full
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50
                          px-4
                          py-3.5
                          text-sm
                          text-slate-700
                          outline-none
                          transition
                          focus:border-blue-500
                          focus:bg-white
                          focus:ring-4
                          focus:ring-blue-500/10
                        "
                      >
                        <option value="" disabled>
                          Select a time
                        </option>
                        <option value="8:00 AM">8:00 AM</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Appointment Type */}
                  <div>
                    <label
                      htmlFor="appointmentType"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Appointment Type
                    </label>

                    <select
                      id="appointmentType"
                      name="appointmentType"
                      required
                      defaultValue=""
                      className="
                        mt-2
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3.5
                        text-sm
                        text-slate-700
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-500/10
                      "
                    >
                      <option value="" disabled>
                        Select appointment type
                      </option>
                      <option value="New Patient">
                        New Patient
                      </option>
                      <option value="Returning Patient">
                        Returning Patient
                      </option>
                      <option value="Consultation">
                        Consultation
                      </option>
                      <option value="Follow-up">
                        Follow-up Visit
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Reason for Visit
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us anything we should know about your visit..."
                      className="
                        mt-2
                        w-full
                        resize-none
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3.5
                        text-sm
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-500/10
                      "
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="
                      group
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      bg-blue-600
                      px-7
                      py-4
                      font-bold
                      text-white
                      shadow-lg
                      shadow-blue-600/20
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-blue-700
                      hover:shadow-xl
                    "
                  >
                    Request Appointment

                    <ArrowRight
                      size={19}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-400">
                    This is a demo appointment form for the
                    BrightSmile portfolio project. Submitted
                    information is not connected to a real
                    medical or billing system.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
