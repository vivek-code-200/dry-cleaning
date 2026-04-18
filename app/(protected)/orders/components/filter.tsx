"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const [search, setSearch] = useState(initialSearch);

  // 🔥 DEBOUNCE LOGIC
  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.push(`/orders?${params.toString()}`);
    }, 500); // 500ms delay

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="flex gap-4 mb-6">

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search name or phone..."
        className="border p-2 rounded-lg w-64"
      />

      {/* STATUS */}
      <select
        value={status}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());

          if (e.target.value) {
            params.set("status", e.target.value);
          } else {
            params.delete("status");
          }

          router.push(`/orders?${params.toString()}`);
        }}
        className="border p-2 rounded-lg"
      >
        <option value="">All Status</option>
        <option value="PENDING">PENDING</option>
        <option value="RECEIVED">RECEIVED</option>
        <option value="PROCESSING">PROCESSING</option>
        <option value="READY">READY</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>

    </div>
  );
}