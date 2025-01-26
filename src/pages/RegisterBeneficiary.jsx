import  { useState } from "react";
import axios from "axios";

const RegisterBeneficiary = () => {
  const [formData, setFormData] = useState({
    CNIC: "",
    name: "",
    phone: "",
    address: "",
    purpose: "",
  });
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setToken(null);

    try {
      const response = await axios.post("https://hackathon-backend-wfhw.onrender.com/beneficiary", formData); 
      setToken(response.data.data.tokenId); 
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Register Beneficiary</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">CNIC:</label>
          <input
            type="text"
            name="CNIC"
            value={formData.CNIC}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Purpose:</label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="" disabled>
              Select a purpose
            </option>
            <option value="financial aid">Financial Aid</option>
            <option value="medical assistance">Medical Assistance</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>

      {token && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold text-lg">Token Generated:</h3>
          <p className="text-green-600 font-mono">{token}</p>
        </div>
      )}
    </div>
  );
};

export default RegisterBeneficiary;
