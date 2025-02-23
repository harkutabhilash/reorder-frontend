import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

export default function ReOrderPage() {
    const [searchType, setSearchType] = useState("order");
    const [searchValue, setSearchValue] = useState("");
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchValue) return;
        setLoading(true);
        try {
            const response = await fetch(`/api/reorder?${searchType}=${searchValue}`);
            const data = await response.json();
            setOrderDetails(data);
            setError(null);
        } catch (err) {
            setError("Order not found or verification required.");
            setOrderDetails(null);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6 gap-y-6">
            <Card className="w-full max-w-lg p-8 shadow-lg rounded-lg bg-white">
                <h2 className="text-2xl font-semibold text-center mb-6">ReOrder Your Products</h2>
                <div className="flex justify-center mb-6 space-x-4">
                    <Button onClick={() => setSearchType("order")} variant={searchType === "order" ? "default" : "outline"}>Order ID</Button>
                    <Button onClick={() => setSearchType("phone")} variant={searchType === "phone" ? "default" : "outline"}>Phone Number</Button>
                </div>
                <Input
                    type="text"
                    placeholder={searchType === "order" ? "Enter Order ID" : "Enter Phone Number"}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full p-3 border rounded-md"
                />
                <Button className="w-full mt-4" onClick={handleSearch} disabled={loading}>
                    {loading ? "Searching..." : "Find Order"}
                </Button>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </Card>

            {orderDetails && (
                <Card className="w-full max-w-lg p-8 shadow-lg rounded-lg bg-white">
                    <h2 className="text-xl font-semibold text-center mb-4">Order Details</h2>
                    <p className="text-gray-700 text-center">Order ID: {orderDetails.orderId}</p>
                    <p className="text-gray-700 text-center">Customer: {orderDetails.customerName}</p>
                    <p className="text-gray-700 text-center">Phone: {orderDetails.phone}</p>
                    <p className="text-gray-700 text-center">Address: {orderDetails.address}</p>
                    <div className="mt-4">
                        <h3 className="font-semibold text-center">Products:</h3>
                        <ul className="text-center">
                            {orderDetails.products.map((product, index) => (
                                <li key={index} className="text-gray-600">{product.name} - {product.quantity} x ₹{product.price}</li>
                            ))}
                        </ul>
                    </div>
                    <Button className="w-full mt-4">Proceed to Checkout</Button>
                </Card>
            )}
        </div>
    );
}
