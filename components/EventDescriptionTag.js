import React from 'react'

const EventDescriptionTag = ({ text, index }) => {
    return (
        <div className={"w-fit px-2 h-8 py-0.5 rounded-full border-2 border-gray-300 " + (index == 0 ? "mr-1" : "mx-1")}>
            <p className="text-gray-500 font-medium whitespace-nowrap">{text}</p>
        </div>
    )
}

export default EventDescriptionTag