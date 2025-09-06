import { useEffect, useState } from 'react';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/getSchools')
      .then(res => res.json())
      .then(data => {
        setSchools(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white text-center flex-1">All Schools</h2>
        <a href="/" className="ml-4 px-4 py-2 bg-white text-black rounded-full shadow hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105 font-semibold">Back</a>
      </div>
      {loading ? (
        <div className="text-white text-center">Loading...</div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
          {Array.isArray(schools) && schools.length > 0 ? (
            schools.map((school) => (
              <div key={school.id} className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-200">
                {school.image && (
                  <img src={`/schoolImages/${school.image}`} alt={school.name} className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-gray-300 shadow" />
                )}
                <h3 className="text-2xl font-bold mb-2 text-black text-center">{school.name}</h3>
                <p className="text-gray-700 mb-1">Address: <span className="font-medium">{school.address}</span></p>
                <p className="text-gray-700 mb-1">City: <span className="font-medium">{school.city}</span></p>
                <p className="text-gray-700 mb-1">State: <span className="font-medium">{school.state}</span></p>
                <p className="text-gray-700 mb-1">Pincode: <span className="font-medium">{school.pincode}</span></p>
                <p className="text-gray-700 mb-1">Contact: <span className="font-medium">{school.number}</span></p>
                <p className="text-gray-700 mb-1">Email: <span className="font-medium">{school.email}</span></p>
                <button className="mt-4 px-6 py-2 bg-black text-white rounded-full shadow hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 font-semibold">Details</button>
              </div>
            ))
          ) : (
            <div>No schools found or unable to fetch data.</div>
          )}
        </div>
      )}
    </div>
  );
}