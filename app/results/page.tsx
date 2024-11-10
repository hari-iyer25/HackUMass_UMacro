/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PlusIcon } from '@heroicons/react/20/solid'
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import SemiCircleProgressBar from "react-progressbar-semicircle";

import PieChart from "./PieChart";

export default function Results() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://umacrobackend.fly.dev/getresult?id=' + id);  // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (!id || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen px-8">
                <div className="flex items-center justify-center mt-4">
                    <Oval
                        visible={true}
                        height="40"
                        width="40"
                        color="#FFFFFF"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center px-8 items-center">
            <h2 className="text-white font-semibold p-3 text-4xl">Plate Overview</h2>
            <dl className="mt-5 grid sm:grid-cols-4 gap-5 grid-cols-2">
                <div key={"cal"} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Total Calories</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data?.data.total_cal}</dd>
                </div>
                <div key={"protein"} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Total Protein</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data?.data.total_protein}g</dd>
                </div>
                <div key={"fat"} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Total Fat</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data?.data.total_fat}g</dd>
                </div>
                <div key={"carb"} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Total Carbs</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data?.data.total_carb}g</dd>
                </div>
            </dl>

            <ul className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl mt-4 mx-4 sm:mx-10">
                {data?.data.items.map((item) => (
                    <li
                        key={item.name}
                        className="flex flex-col sm:flex-row items-center justify-between gap-y-4 sm:gap-x-6 px-4 py-5 hover:bg-gray-50 text-center sm:text-left"
                    >
                        {/* Left section (Item name and healthfulness) */}
                        <div className="flex flex-col items-center justify-center w-full sm:w-auto">
                            <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                            <p className="mt-1 flex text-xs text-gray-500">
                                <SemiCircleProgressBar percentage={item.healthfulness ? parseFloat(item.healthfulness) : 0} showPercentValue />
                            </p>
                            <p className="text-sm text-gray-900">Healthfulness</p>
                        </div>

                        {/* Right section (Pie chart) */}
                        <div className="w-full sm:w-auto">
                            <PieChart data={[item.protein, item.fat, item.carb]} />
                        </div>
                    </li>
                ))}
            </ul>

            <a
                href='/'
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-red shadow-sm mt-4 mb-4"
            >
                <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
                Retake Photo
            </a>
        </div>
    );
}