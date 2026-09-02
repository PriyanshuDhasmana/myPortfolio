import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { contactCommands } from "../../constants";

const Contact = () => {
  const form = useRef();
  const [submitState, setSubmitState] = useState("idle");
  const [activeTemplate, setActiveTemplate] = useState(contactCommands[0]);
  const [fields, setFields] = useState({
    user_email: "",
    user_name: "",
    subject: contactCommands[0].subject,
    message: contactCommands[0].message,
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
  };

  const applyTemplate = (template) => {
    setActiveTemplate(template);
    setFields((current) => ({
      ...current,
      subject: template.subject,
      message: template.message,
    }));
  };

  const sendEmail = (event) => {
    event.preventDefault();
    setSubmitState("sending");

    emailjs
      .sendForm("service_q83hbbh", "template_fpa0gby", form.current, "1v8E6jUcK4JCGtOy5")
      .then(
        () => {
          setSubmitState("sent");
          setFields({
            user_email: "",
            user_name: "",
            subject: activeTemplate.subject,
            message: activeTemplate.message,
          });
          toast.success("Message sent.", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
          window.setTimeout(() => setSubmitState("idle"), 2200);
        },
        (error) => {
          console.error("Error sending message:", error);
          setSubmitState("idle");
          toast.error("Could not send. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        }
      );
  };

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24 lg:px-12">
      <ToastContainer />
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="reactive-panel border border-cyan-100/14 bg-[#07111F]/78 p-5 backdrop-blur-xl sm:p-6"
        >
          <p className="section-kicker">Contact</p>
          <h2 className="section-heading mt-4">Let&apos;s talk.</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-300">
            Open to roles, collaborations, or a thoughtful conversation about something you want to build.
          </p>

          <div className="mt-6 grid gap-2">
            {contactCommands.map((template) => (
              <button
                key={template.label}
                type="button"
                onClick={() => applyTemplate(template)}
                className={`border px-4 py-3 text-left text-sm transition ${
                  activeTemplate.label === template.label
                    ? "border-cyan-100/40 bg-cyan-100/[0.07] text-cyan-50"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-100/25"
                }`}
              >
                {template.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="border border-white/10 bg-white/[0.03] p-4">
              <Mail className="mb-2 h-5 w-5 text-cyan-100/80" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Email</p>
              <p className="mt-2 break-all text-sm font-medium text-slate-100">priyanshudhasmana007@gmail.com</p>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-4">
              <MapPin className="mb-2 h-5 w-5 text-cyan-100/80" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Location</p>
              <p className="mt-2 text-sm font-medium text-slate-100">Bangalore, India</p>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            {[
              { Icon: FaGithub, href: "https://github.com/PriyanshuDhasmana", label: "GitHub" },
              { Icon: FaLinkedin, href: "https://www.linkedin.com/in/priyanshu-dhasmana-b7a12b1b6", label: "LinkedIn" },
              { Icon: FaTwitter, href: "https://x.com/PriyanshuDhasm4", label: "X" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.04] text-cyan-100 transition hover:border-cyan-100/35"
              >
                <item.Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.06, ease: "easeOut" }}
          className="reactive-panel border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field-shell">
              <span>Name</span>
              <input
                type="text"
                name="user_name"
                value={fields.user_name}
                onChange={updateField}
                required
                autoComplete="name"
              />
            </label>
            <label className="field-shell">
              <span>Email</span>
              <input
                type="email"
                name="user_email"
                value={fields.user_email}
                onChange={updateField}
                required
                autoComplete="email"
              />
            </label>
          </div>

          <label className="field-shell mt-4">
            <span>Subject</span>
            <input type="text" name="subject" value={fields.subject} onChange={updateField} required />
          </label>

          <label className="field-shell mt-4">
            <span>Message</span>
            <textarea name="message" value={fields.message} onChange={updateField} rows={7} required />
          </label>

          <button
            type="submit"
            disabled={submitState === "sending"}
            className="mt-5 inline-flex w-full items-center justify-center gap-3 border border-cyan-100/40 bg-cyan-100 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-[#07111F] transition hover:bg-slate-50 disabled:opacity-70"
          >
            {submitState === "sending" && "Sending…"}
            {submitState === "sent" && (
              <>
                <CheckCircle2 className="h-5 w-5" />
                Sent
              </>
            )}
            {submitState === "idle" && (
              <>
                <Send className="h-5 w-5" />
                Send message
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
