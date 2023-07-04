import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full h-fit py-2 border-t-2 border-gray-200'>
            <div className='m-auto flex flex-col md:flex-row-reverse gap-4 py-2 h-full justify-between items-center max-w-2xl'>
                <a href='mailto:contact@fesaspot.sr' className='border-gray-200 border-2 rounded-md py-1 px-3 font-semibold hover:border-black'>contact@fesaspot.sr</a>
                <p>© FesaSpot.sr 2023, Alle Rechten Voorbehouden.</p>
            </div>
        </footer>
    )
}

export default Footer