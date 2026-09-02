import { useRef } from "react";
import PropTypes from "prop-types";

const MagneticButton = ({ href, children, className = "", ...props }) => {
  const ref = useRef(null);

  const handleMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.22;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    ref.current.style.setProperty("--magnetic-x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--magnetic-y", `${event.clientY - rect.top}px`);
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
    ref.current.style.setProperty("--magnetic-x", "50%");
    ref.current.style.setProperty("--magnetic-y", "50%");
  };

  const sharedProps = {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: `magnetic-button ${className}`,
    ...props,
  };

  if (href) {
    return (
      <a href={href} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" {...sharedProps}>
      {children}
    </button>
  );
};

MagneticButton.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default MagneticButton;
