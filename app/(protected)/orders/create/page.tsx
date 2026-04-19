"use client"
import Link from "next/link";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

// 🔹 Types
type Item = {
    garment: string;
    quantity: number;
    price: number;
};

type FormState = {
    customerName: string;
    phone: string;
    estimatedDelivery?: string;
};

export default function CreateOrderPage() {
    const [form, setForm] = useState<FormState>({
        customerName: "",
        phone: "",
        estimatedDelivery: "",
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
        setSaving(true)
        setErrors({})

        const payload = {
            customerName: form.customerName,
            phone: form.phone,
            estimatedDelivery: form.estimatedDelivery,
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
            setForm({ customerName: "", phone: "", estimatedDelivery: "" });
            setItems([{ garment: "", quantity: 1, price: 0 }]);
            toast.success(`${data.orderNumber} is Created.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false)
        }
    };

    return (
        <div className="flex-1  bg-gray-100 mt-24 md:mt-0">
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            <header className="bg-black/10 border-b border-black/20 px-6 py-4 flex justify-between">
                <div>
                    <p className=" text-gray-800 ">
                        Order
                    </p>

                    <p className=" text-gray-500 text-xs">Create your order here</p>
                </div>
                <Link href="/orders"><button className=" bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg px-3 ">
                    View Orders
                </button></Link>
            </header>

            {/* MAIN CONTENT */}
            <div className="flex-1 p-6 grid md:grid-cols-3 gap-6">
                

                {/* LEFT: FORM */}
                <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm space-y-6">
                    <div className="flex justify-between items-center">

                        <h2 className="text-lg font-semibold">Create Order</h2>
                        <Link href="/orders">
                            <h2 className="text-blue-500 hover:underline text-sm ">View all Orders</h2>
                        </Link>
                    </div>

                    {/* CUSTOMER INFO */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm">Customer Name</label>
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
                        <div className="flex flex-col gap-1">
                            <label className="text-sm">Contact Number</label>
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
                        <div className="flex flex-col gap-1">
                            <label className="text-sm">Estimated Delivery</label>

                            <input
                                name="estimatedDelivery"
                                type="date"
                                value={form.estimatedDelivery}
                                onChange={(e) =>
                                    setForm({ ...form, estimatedDelivery: e.target.value })
                                }
                                className="border p-2 rounded-lg"
                            />
                            {errors.estimatedDelivery && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.estimatedDelivery}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ITEMS */}
                    <div className="flex items-center flex-col">
                        <h3 className="font-medium my-3 mt-5 self-start">Garments</h3>

                        <div className=" md:grid hidden  grid-cols-3  gap-2  mb-2 px-1 w-full">
                            {["Description", "Qty", "Unit Price", ""].map((h, i) => (
                                <span key={i} className="text-[9px] font-bold uppercase tracking-widest text-stone-400 text-center">{h}</span>
                            ))}
                        </div>
                        <div className="space-y-3 mt-5 md:mt-0">
                            {items.map((item, i) => (
                                <div key={i} className="grid md:grid-cols-3 items-center md:gap-5 gap-2">
                                    <div className="-ml-10 md:hidden">{i + 1}.</div>
                                    <div>
                                        <h2 className="text-gray-500 mb-1 md:hidden">Description :</h2>

                                        <div className="">
                                            <input
                                                value={item.garment}
                                                onChange={(e) =>
                                                    handleItemChange(i, "garment", e.target.value)
                                                }
                                                placeholder="Garment"
                                                className={`border p-2 rounded-lg ${errors[`items[${i}].garment`] ? "border-red-500" : ""
                                                    }`}

                                            />

                                            {errors[`items[${i}].garment`] && (
                                                <p className="text-red-500 text-xs">
                                                    {errors[`items[${i}].garment`]}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-gray-500 mb-1 md:hidden">Quantity :</h2>


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
                                    </div>


                                    <div>
                                        <h2 className="text-gray-500 mb-1 md:hidden">Unit Price :</h2>
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
                                    </div>
                                    <div className="w-full flex items-center gap-10 ml-10">
                                        <span key={i} className="text-[9px] font-bold uppercase tracking-widest text-stone-400 text-center">Amount :</span>
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
                            className="py-2 px-4 mt-5 text-sm text-blue-600 border border-blue-600/50 rounded-lg hover:bg-blue-50 transition"
                        >
                            + Add Item
                        </button>
                    </div>

                    {/* SUBMIT */}
                    <button onClick={() => { handleSubmit() }} disabled={saving} className="bg-black  text-white mt-5 px-6 py-3 rounded-xl">
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