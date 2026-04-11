export default function ResponsiveDesign() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      <div className="bg-pink-300 p-6 rounded-xl">Mobile</div>

      <div className="bg-blue-300 p-6 rounded-xl">Tablet</div>

      <div className="bg-green-300 p-6 rounded-xl">Laptop</div>

      <div className="bg-yellow-300 p-6 rounded-xl">Desktop</div>
    </div>
  );
}
