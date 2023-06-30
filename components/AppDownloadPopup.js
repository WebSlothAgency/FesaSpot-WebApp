import React, { useState } from 'react'

const AppDownloadPopup = () => {

    const [popup, setPopup] = useState(true)

    function getMobileOperatingSystem() {

        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
    }

    return (
        <>
            {popup && <div className='z-50 fixed bottom-0 p-2 w-full md:hidden'>
                <div className='bg-white border-black border-2 rounded-lg'>
                    <div className='p-2 flex flex-col gap-2 relative'>
                        <p className='font-semibold text-lg text'>Download de FesaSpot app!</p>
                        <p>Beleef Suriname op zijn best! Blijf up-to-date met de nieuwste evenementen!</p>
                        <div>
                            <a href={getMobileOperatingSystem() == "Android" ? "https://play.google.com/store/apps/details?id=com.websloth.eventssr" : "https://apps.apple.com/app/fesaspot/id6449878405"}><img className='h-10' src={getMobileOperatingSystem() == "Android" ? '/android.png' : '/ios.png'} /></a>
                        </div>
                        <div className='absolute top-2 right-2'>
                            <svg onClick={() => setPopup(false)} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.2915 1.29166L11.7082 11.7083M1.2915 11.7083L11.7082 1.29166" stroke="black" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default AppDownloadPopup