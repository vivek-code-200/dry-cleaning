"use client"
import { useState } from "react";

// 🔹 Types
type Item = {
    garment: string;
    quantity: number;
    price: number;
};

type FormState = {
    customerName: string;
    phone: string;
};

export default function CreateOrderPage() {
    const [form, setForm] = useState<FormState>({
        customerName: "",
        phone: "",
    });

    const [items, setItems] = useState<Item[]>([
        { garment: "", quantity: 1, price: 0 },
    ]);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // ✅ handle customer input
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ✅ handle item changes
    const handleItemChange = (
        index: number,
        field: keyof Item,
        value: string | number
    ) => {
        const updated = [...items];

        updated[index] = {
            ...updated[index],
            [field]:
                field === "garment" ? value : Number(value),
        };

        setItems(updated);
    };

    const addItem = () => {
        setItems([
            ...items,
            { garment: "", quantity: 1, price: 0 },
        ]);
    };

    const removeItem = (index: number) => {
        if (items.length === 1) return;

        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
    };

    const total = items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );

    // ✅ handle submit
    const handleSubmit = async (

    ) => {
        // e.preventDefault();
        setSaving(true)
        setErrors({})

        // if (!form.customerName || !form.phone) {
        //     alert("Customer details required");
        //     setSaving(false)
        //     return;
        // }

        // if (items.length === 0 || items[0].garment==="" || items[0].price===0) {
        //     alert("Add at least one item");
        //     setSaving(false)
        //     return;
        // }

        const payload = {
            customerName: form.customerName,
            phone: form.phone,
            items: items.map((item) => ({
                garment: item.garment,
                quantity: item.quantity,
                price: item.price,
            })),
        };

        try {
            const res = await fetch("/api/orders/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) {
                if (data.errors) {
                    setErrors(data.errors);
                }
                return;
            }


            console.log("Order Created:", data);

            // reset
            setForm({ customerName: "", phone: "" });
            setItems([{ garment: "", quantity: 1, price: 0 }]);
            alert(`${data.orderNumber} is Created.`)

        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false)
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">

            {/* MAIN CONTENT */}
            <div className="flex-1 p-6 grid grid-cols-3 gap-6">

                {/* LEFT: FORM */}
                <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm space-y-6">

                    <h2 className="text-lg font-semibold">Create Order</h2>

                    {/* CUSTOMER INFO */}
                    <div className="grid grid-cols-2 gap-4">
                        <div >
                            <input
                                name="customerName"
                                value={form.customerName}
                                onChange={handleChange}
                                placeholder="Customer Name"
                                className={`border p-3 rounded-lg ${errors.customerName ? "border-red-500" : ""
                                    }`}
                            />
                            {errors.customerName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.customerName}
                                </p>
                            )}
                        </div>
                        <div>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className={`border p-3 rounded-lg ${errors.phone ? "border-red-500" : ""
                                    }`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ITEMS */}
                    <div>
                        <h3 className="font-medium my-3 mt-5">Garments</h3>

                        <div className=" grid grid-cols-4  gap-2  mb-2 px-1">
                            {["Description", "Qty", "Unit Price", "Amount", ""].map((h, i) => (
                                <span key={i} className="text-[9px] font-bold uppercase tracking-widest text-stone-400 text-center">{h}</span>
                            ))}
                        </div>
                        <div className="space-y-3  grid-cols-4 w-full">
                            {items.map((item, i) => (
                                <div key={i} className="grid grid-cols-4 gap-10">
                                    <div>
                                        <input
                                            value={item.garment}
                                            onChange={(e) =>
                                                handleItemChange(i, "garment", e.target.value)
                                            }
                                            placeholder="Garment"
                                            className={`border p-2 rounded-lg mr-5 ${errors[`items[${i}].garment`] ? "border-red-500" : ""
                                                }`}
                                            required
                                        />

                                        {errors[`items[${i}].garment`] && (
                                            <p className="text-red-500 text-xs">
                                                {errors[`items[${i}].garment`]}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleItemChange(i, "quantity", Number(e.target.value))
                                            }
                                            className={`border p-2 rounded-lg ${errors[`items[${i}].quantity`] ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors[`items[${i}].quantity`] && (
                                            <p className="text-red-500 text-xs">
                                                {errors[`items[${i}].quantity`]}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) =>
                                                handleItemChange(i, "price", Number(e.target.value))
                                            }
                                            className={`border p-2 rounded-lg ${errors[`items[${i}].price`] ? "border-red-500" : ""
                                                }`}
                                            required
                                        />
                                        {errors[`items[${i}].price`] && (
                                            <p className="text-red-500 text-xs">
                                                {errors[`items[${i}].price`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-full flex items-center gap-10 ml-10">

                                        <div className="flex items-center text-sm text-gray-500">
                                            ₹{item.quantity * item.price}
                                        </div>
                                        <button
                                            onClick={() => removeItem(i)}
                                            disabled={items.length <= 1}
                                            className="w-8 h-8 rounded-lg border border-stone-200 text-stone-500 text-lg leading-none
                                            flex items-center justify-center transition-all
                                            hover:border-red-300 hover:text-red-400 hover:bg-red-50
                                            disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => addItem()}
                            className="py-4 text-sm text-blue-600"
                        >
                            + Add Item
                        </button>
                    </div>

                    {/* SUBMIT */}
                    <button onClick={() => { handleSubmit() }} disabled={saving} className="bg-black text-white mt-5 px-6 py-3 rounded-xl">
                        {saving ? <span>Creating Order ...</span> : <span>Create Order</span>}
                    </button>

                </div>

                {/* RIGHT: SUMMARY */}
                <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">

                    <h3 className="font-medium">Order Summary</h3>

                    <div className="text-sm text-gray-600 space-y-2">
                        {items.map((item, i) => (
                            <div key={i} className="flex justify-between">
                                <span>{item.garment || "Item"}</span>
                                <span>₹{item.quantity * item.price}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-3 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}