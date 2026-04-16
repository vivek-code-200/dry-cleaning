export default function ProductPreview() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <h2 className="text-xl font-semibold mb-8">LaundryOS</h2>

        <nav className="space-y-4 text-sm">
          <p className="text-gray-500">Dashboard</p>
          <p className="text-gray-500">Orders</p>
          <p className="text-gray-500">Customers</p>
        </nav>

        <button className="mt-10 w-full bg-black text-white py-2 rounded-lg">
          + Create Order
        </button>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="bg-white border-b px-6 py-4 flex justify-between">
          <h1 className="font-semibold">Dashboard</h1>
          <button className="text-sm border px-4 py-2 rounded-lg">
            Login
          </button>
        </header>

        {/* CONTENT */}
        <main className="p-6 space-y-6 overflow-y-auto">

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl font-semibold">120</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-xl font-semibold">₹25,000</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Processing</p>
              <p className="text-xl font-semibold">18</p>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b flex justify-between">
              <h2 className="font-medium">Recent Orders</h2>
              <input
                placeholder="Search..."
                className="border px-3 py-1 rounded-md text-sm"
              />
            </div>

            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {[
                  { id: "ORD-001", name: "Vivek", status: "RECEIVED", total: "₹200" },
                  { id: "ORD-002", name: "Amit", status: "PROCESSING", total: "₹350" },
                  { id: "ORD-003", name: "Rahul", status: "READY", total: "₹150" }
                ].map((o, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-4">{o.id}</td>
                    <td>{o.name}</td>
                    <td>
                      <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                        {o.status}
                      </span>
                    </td>
                    <td>{o.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}