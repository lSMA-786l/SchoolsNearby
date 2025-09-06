import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center">
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Welcome to School Finder</h1>
        <p className="text-white text-lg mb-10">Find and add schools easily. Start by adding a new school or viewing all schools in our database.</p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link href="/addSchool" className="px-8 py-4 bg-white text-black rounded-lg text-xl font-semibold transition-transform transform hover:scale-105 hover:bg-gray-200">
            Add School
          </Link>
          <Link href="/showSchools" className="px-8 py-4 border-2 border-white text-white rounded-lg text-xl font-semibold bg-transparent transition-transform transform hover:scale-105 hover:bg-white hover:text-black">
            Show Schools
          </Link>
        </div>
      </section>
    </div>
  );
}