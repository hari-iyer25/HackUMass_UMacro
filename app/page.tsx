/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import { Oval } from "react-loader-spinner";

export default function Home() {
    const router = useRouter()
    const camera: any = useRef(null);
    const [loading, setLoading] = useState(false);

    const capture = async () => {
        setLoading(true)
        if (camera.current) {
            const imageSrc = camera.current.takePhoto();
            try {
                const response = await fetch('https://umacrobackend.fly.dev/process', {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        "apiKey": "UMacroHACKUMass",
                        "image": imageSrc
                    }),
                });
                const data = await response.json();
                console.log('Uploaded successfully:', data);
                router.push("/results?id="+data.id)
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }
        // setLoading(false)
    };

    if (loading) {
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
                    <p className="ml-4 text-white">We{`'`}ll take a few seconds to process the image...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center px-8 items-center">
            <img src="/logo.jpeg" className="w-32 h-auto mx-auto"></img>
            <div className="-mt-4 max-w-[380px] mx-auto w-full">
                <div className="shadow-2xl rounded-2xl overflow-hidden">
                    <Camera ref={camera} facingMode="environment" aspectRatio={9 / 16} errorMessages={{}} />
                </div>
            </div>
            <button
                type="button"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-red shadow-sm mt-4 w-40"
                onClick={capture}
            >
                take picture
            </button>
        </div>
    );
}
