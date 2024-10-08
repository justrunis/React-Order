import React, { useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import { toast } from "react-toastify";
import LoadingIndicator from "./LoadingIndicator";

export default function InputForm() {
  const [formData, setFormData] = useState({
    orderId: "",
    orderLink: "",
    price: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);

  const formFields = [
    {
      label: "Order ID",
      name: "orderId",
      type: "text",
      placeholder: "Generated ID",
      disabled: true, // Disable input field for Order ID to prevent user error
    },
    {
      label: "Order Link",
      name: "orderLink",
      type: "text",
      placeholder: "Order URL",
      required: true, // Make this field required
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "0.00€",
      required: true, // Make this field required
    },
    {
      label: "Status",
      name: "status",
      type: "select",
      options: ["Pending", "Paid", "Completed"],
    },
  ];

  const extractOrderId = (link) => {
    const match = link.match(/^https:\/\/pmp\.pigugroup\.eu\/order\/(\d+)$/);
    return match ? match[1] : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === "orderLink") {
      const orderId = extractOrderId(value);
      newFormData = { ...newFormData, orderId };
      if (orderId) {
        toast.info(`Order ID extracted from link: ${orderId}`);
      }
    }
    setFormData(newFormData);
  };

  // Validation function
  const validateForm = () => {
    const errors = [];
    if (!formData.orderId) {
      errors.push("Order ID is required.");
    } else if (isNaN(formData.orderId)) {
      errors.push("Order ID must be a number.");
    }
    if (!formData.orderLink || formData.orderLink.length < 10) {
      errors.push("Order Link must be at least 10 characters long.");
    }
    if (!formData.price || formData.price <= 0) {
      errors.push("Price must be a positive number.");
    } else if (isNaN(formData.price)) {
      errors.push("Price must be a number.");
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateForm();
    if (errors.length > 0) {
      setLoading(false);
      errors.forEach((error) => toast.error(error));
      return; // Stop form submission if there are errors
    }

    // Simulating form submission
    setTimeout(() => {
      clearInputs();
      setLoading(false);
      toast.success("Form submitted successfully");
    }, 3000);
  };

  const clearInputs = () => {
    setFormData({
      orderId: "",
      orderLink: "",
      price: "",
      status: "Pending",
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-blue-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-amber-800 text-center mb-4">
        Order Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <FormInput
            key={field.name}
            label={field.label}
            name={field.name}
            value={formData[field.name]}
            placeholder={field.placeholder}
            onChange={handleChange}
            disabled={field.disabled}
            type={field.type}
            options={field.options}
          />
        ))}
        {loading && <LoadingIndicator />}
        <div className="flex justify-between">
          <Button
            className="bg-green-700 text-white p-2 rounded-lg flex-1 mr-2"
            type="submit"
            disabled={loading}
          >
            Submit
          </Button>
          <Button
            className="bg-yellow-500 text-white p-2 rounded-lg flex-1 ml-2"
            onClick={clearInputs}
            disabled={loading}
            type="button"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
