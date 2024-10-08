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
    { label: "Order ID", name: "orderId", type: "text" },
    { label: "Order Link", name: "orderLink", type: "text" },
    { label: "Price", name: "price", type: "number" },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
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
    <div className="max-w-md mx-auto p-6 bg-primary rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary-content text-center mb-4">
        Order Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <FormInput
            key={field.name}
            label={field.label}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            type={field.type}
            options={field.options}
          />
        ))}
        {loading && <LoadingIndicator />}
        <div className="flex justify-between">
          <Button
            className="bg-success text-success-content p-2 rounded-lg flex-1 mr-2"
            type="submit"
            disabled={loading}
          >
            Submit
          </Button>
          <Button
            className="bg-warning text-warning-content p-2 rounded-lg flex-1 ml-2"
            onClick={clearInputs}
            disabled={loading}
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}
