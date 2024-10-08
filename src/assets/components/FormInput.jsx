import { motion } from "framer-motion";

export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  options,
  placeholder,
  disabled,
}) {
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const inputClassName = `
    p-2 w-full rounded-lg 
    ${
      disabled
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-white text-black"
    }
  `;

  return (
    <motion.div
      className="mb-4"
      initial="hidden"
      animate="visible"
      variants={inputVariants}
      transition={{ duration: 0.5 }}
    >
      <label className="font-bold text-lg text-amber-800">{label}</label>
      {type === "select" ? (
        <motion.select
          name={name}
          value={value}
          onChange={onChange}
          className={inputClassName}
          disabled={disabled}
          whileFocus={{ scale: 1.05 }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </motion.select>
      ) : (
        <motion.input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClassName}
          whileFocus={{ scale: 1.05 }}
        />
      )}
    </motion.div>
  );
}
