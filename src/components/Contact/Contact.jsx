import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Mail, MapPin, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const form = useRef();
  const [submitState, setSubmitState] = useState("idle");

  const sendEmail = (e) => {
    e.preventDefault();
    setSubmitState("sending");

    emailjs
      .sendForm(
        "service_q83hbbh",
        "template_fpa0gby",
        form.current,
        "1v8E6jUcK4JCGtOy5"
      )
      .then(
        () => {
          setSubmitState("sent");
          form.current.reset();
          toast.success("Message sent successfully! ✅", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
          window.setTimeout(() => setSubmitState("idle"), 2200);
        },
        (error) => {
          console.error("Error sending message:", error);
          setSubmitState("idle");
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      );
  };

  const contactInfo = [
    {
      label: "Email",
      value: "priyanshudhasmana007@gmail.com",
      icon: Mail,
    },
    {
      label: "Location",
      value: "Bangalore, India",
      icon: MapPin,
    },
  ];

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden py-24 px-6 sm:px-[7vw] md:px-[7vw] lg:px-[12vw] font-sans"
    >
      <ToastContainer />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.12),transparent_35%)] opacity-90" />
      <div className="pointer-events-none absolute inset-0 hero-celestial-grid" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-12 items-start">
        <div className="lg:col-span-5 order-1 flex h-full w-full min-w-0">
          <div className="glass-panel relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 p-8 shadow-[0_30px_120px_rgba(234,179,8,0.14)] backdrop-blur-xl h-full w-full min-w-0 flex flex-col justify-between">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#ffffff10] via-transparent to-[#020408]/50" />
            <div className="relative z-10 space-y-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.36em] text-[#EAB308]/80">Let’s Connect</p>
                <h2 className="text-4xl font-bold tracking-tight text-transparent bg-gradient-to-r from-[#EAB308] via-white to-[#EAB308] bg-clip-text">
                  Send a message
                </h2>
                <p className="text-[#e5c16a]/80 leading-relaxed">
                  Have a project, collaboration, or question? Use the form to reach out and I’ll reply quickly with thoughtful next steps.
                </p>
              </div>

              <div className="grid gap-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.label}
                      className="group relative flex w-full min-w-0 flex-col items-start gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-5 text-left backdrop-blur-lg transition duration-300 hover:border-[#EAB308]/40 hover:bg-white/10"
                    >
                      <span className="flex h-11 w-11 min-w-0 items-center justify-center rounded-2xl bg-[#EAB308]/10 text-[#EAB308] shadow-[0_0_20px_rgba(234,179,8,0.12)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 w-full break-words">
                        <p className="text-xs uppercase tracking-[0.32em] text-[#e5c16a]/70">{item.label}</p>
                        <p className="mt-1 text-base font-semibold text-white break-words">{item.value}</p>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#EAB308]/80">Socials</p>
                  <div className="flex items-center gap-4">
                    {[
                      { Icon: FaGithub, href: "https://github.com" },
                      { Icon: FaLinkedin, href: "https://linkedin.com" },
                      { Icon: FaTwitter, href: "https://twitter.com" },
                    ].map((item, index) => (
                      <motion.a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-slate-950/70 text-[#EAB308] transition"
                      >
                        <item.Icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 order-2 flex h-full w-full min-w-0">
          <div className="glass-panel relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/45 p-8 shadow-[0_30px_120px_rgba(234,179,8,0.14)] backdrop-blur-xl h-full w-full min-w-0">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#ffffff10] via-transparent to-[#020408]/60" />
            <form
              ref={form}
              onSubmit={sendEmail}
              className="relative z-10 grid gap-5 min-w-0 w-full"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { name: "user_email", label: "Email", type: "email" },
                  { name: "user_name", label: "Name", type: "text" },
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder=" "
                      required
                      className="peer h-16 w-full rounded-[1.5rem] border border-white/10 bg-slate-900/50 px-5 py-4 text-white outline-none transition focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20"
                    />
                    <label className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm text-[#9ca3af] transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#9ca3af] peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#EAB308]">
                      {field.label}
                    </label>
                  </div>
                ))}
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  placeholder=" "
                  required
                  className="peer h-16 w-full rounded-[1.5rem] border border-white/10 bg-slate-900/50 px-5 py-4 text-white outline-none transition focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20"
                />
                <label className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm text-[#9ca3af] transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#9ca3af] peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#EAB308]">
                  Subject
                </label>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  placeholder=" "
                  required
                  rows={6}
                  className="peer min-h-[220px] w-full min-w-0 resize-y rounded-[1.5rem] border border-white/10 bg-slate-900/50 px-5 py-4 text-white outline-none transition focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20"
                />
                <label className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-[#9ca3af] transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#9ca3af] peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#EAB308]">
                  Message
                </label>
              </div>

              <button
                type="submit"
                className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-r from-[#FBBf24] to-[#D97706] px-6 py-4 text-base font-semibold text-slate-950 shadow-[0_18px_50px_rgba(234,179,8,0.2)] transition hover:-translate-y-0.5 button-shimmer"
              >
                <span className="relative z-10 inline-flex items-center gap-3">
                  {submitState === "sending" && <span>Sending...</span>}
                  {submitState === "sent" && (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-slate-950" />
                      Sent
                    </>
                  )}
                  {submitState === "idle" && <span>Send Message</span>}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
