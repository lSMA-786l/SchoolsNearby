import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image') {
          formData.append('image', value[0]);
        } else {
          formData.append(key, value);
        }
      });
      formData.append("number", data.number);
      formData.append("email", data.email);
      const res = await fetch('/api/addSchool', {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      if (result.success) {
        setSuccess('School added successfully!');
        reset();
      } else {
        setError(result.message || 'Failed to add school.');
      }
    } catch (err) {
      setError('Server error.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <form
        className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg flex flex-col gap-8 border border-gray-200"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-center text-black flex-1">Add School</h2>
          <a href="/" className="ml-4 px-4 py-2 bg-black text-white rounded-full shadow hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 font-semibold">Back</a>
        </div>
        <div>
          <label className="block text-white mb-1">School Name</label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
            {...register('name', { required: true })}
            type="text"
            placeholder="Enter school name"
          />
          {errors.name && <span className="text-red-500 text-sm">School name is required.</span>}
        </div>
        <div>
          <label className="block text-white mb-1">Address</label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
            {...register('address', { required: true })}
            type="text"
            placeholder="Enter address"
          />
          {errors.address && <span className="text-red-500 text-sm">Address is required.</span>}
        </div>
        <div>
          <label className="block text-white mb-1">City</label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
            {...register('city', { required: true })}
            type="text"
            placeholder="Enter city"
          />
          {errors.city && <span className="text-red-500 text-sm">City is required.</span>}
        </div>
        <div>
          <label className="block text-white mb-1">State</label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
            {...register('state', { required: true })}
            type="text"
            placeholder="Enter state"
          />
          {errors.state && <span className="text-red-500 text-sm">State is required.</span>}
        </div>
        <div>
          <label className="block text-white mb-1">Contact</label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
            {...register('contact', { required: true, pattern: /^[0-9]+$/ })}
            type="text"
            placeholder="Enter contact number"
          />
          {errors.contact && <span className="text-red-500 text-sm">Contact must be digits only.</span>}
        </div>
        <div>
          <label className="block text-white mb-1">Email ID</label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
            {...register('email_id', { required: true, pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ })}
            type="email"
            placeholder="Enter email"
          />
          {errors.email_id && <span className="text-red-500 text-sm">Enter a valid email.</span>}
        </div>
        <div>
          <label className="block text-white mb-1">Pincode</label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
            {...register('pincode', { required: true, pattern: /^[0-9]+$/ })}
            type="text"
            placeholder="Enter pincode"
          />
          {errors.pincode && <span className="text-red-500 text-sm">Pincode must be digits only.</span>}
        </div>
        <div>
          <label className="block text-white mb-1">School Image</label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
            {...register('image', { required: true })}
            type="file"
            accept="image/*"
          />
          {errors.image && <span className="text-red-500 text-sm">School image is required.</span>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-3 rounded-full border-2 border-black bg-black text-white font-bold text-xl transition-all duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-black shadow-lg transform hover:scale-105"
        >
          {loading ? 'Submitting...' : 'Add School'}
        </button>
        {success && <div className="text-green-500 text-center mt-2">{success}</div>}
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      </form>
    </div>
  );
}