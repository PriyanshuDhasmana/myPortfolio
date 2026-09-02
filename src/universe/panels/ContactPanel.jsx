import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { springSoft } from "../universeNodes";

const ICONS = { GitHub: FaGithub, LinkedIn: FaLinkedin, X: FaTwitter };

export default function ContactPanel({ data }) {
  const form = useRef();
  const [submitState, setSubmitState] = useState("idle");
  const [activeTemplate, setActiveTemplate] = useState(data.commands[0]);
  const [fields, setFields] = useState({
    user_email: "",
    user_name: "",
    subject: data.commands[0].subject,
    message: data.commands[0].message,
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
    <div className="u-panel">
      <ToastContainer />
      <header className="u-panel__header">
        <h2 className="u-panel__heading">{data.heading}</h2>
        <p className="u-panel__intro">{data.intro}</p>
      </header>

      <div className="contact-layout">
        <motion.div
          className="glass-slab"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springSoft}
        >
          <div className="contact-templates">
            {data.commands.map((template) => (
              <button
                key={template.label}
                type="button"
                onClick={() => applyTemplate(template)}
                className={
                  activeTemplate.label === template.label ? "is-active" : ""
                }
              >
                {template.label}
              </button>
            ))}
          </div>

          <div className="contact-meta">
            <div>
              <Mail className="h-4 w-4" />
              <span>{data.email}</span>
            </div>
            <div>
              <MapPin className="h-4 w-4" />
              <span>{data.location}</span>
            </div>
          </div>

          <div className="contact-socials">
            {data.socials.map((item) => {
              const Icon = ICONS[item.label];
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                >
                  {Icon ? <Icon className="h-4 w-4" /> : item.label}
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.form
          ref={form}
          onSubmit={sendEmail}
          className="glass-slab contact-form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSoft, delay: 0.06 }}
        >
          <div className="contact-form__row">
            <label>
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
            <label>
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
          <label>
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              value={fields.subject}
              onChange={updateField}
              required
            />
          </label>
          <label>
            <span>Message</span>
            <textarea
              name="message"
              value={fields.message}
              onChange={updateField}
              rows={6}
              required
            />
          </label>
          <button type="submit" disabled={submitState === "sending"}>
            {submitState === "sending" && "Sending…"}
            {submitState === "sent" && (
              <>
                <CheckCircle2 className="h-4 w-4" /> Sent
              </>
            )}
            {submitState === "idle" && (
              <>
                <Send className="h-4 w-4" /> Send message
              </>
            )}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
