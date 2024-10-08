import { motion } from "framer-motion";

export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  options,
}) {
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="mb-4"
      initial="hidden"
      animate="visible"
      variants={inputVariants}
      transition={{ duration: 0.5 }}
    >
      <label className="font-bold text-lg text-primary-content">{label}</label>
      {type === "select" ? (
        <motion.select
          name={name}
          value={value}
          onChange={onChange}
          className="p-2 w-full"
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
          className="p-2 w-full"
          whileFocus={{ scale: 1.05 }}
        />
      )}
    </motion.div>
  );
}
