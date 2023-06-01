import React from 'react'

const EventDescriptionTag = ({ text, index }) => {
    let randomNum = Math.floor(Math.random() * 6)
    let bg = ["#F4F3FF", "#EFF8FF", "#FDF2FA", "#FEF6EE", "#ECFDF3", "#FEF3F2"]
    let border = ["#D9D6FE", "#B2DDFF", "#FCCEEE", "#F9DBAF", "#ABEFC6", "#FECDCA"]
    let txt = ["#5925DC", "#175CD3", "#C11574", "#B93815", "#067647", "#B42318"]

    // const styles = StyleSheet.create({
    //     container: {
    //         backgroundColor: bg[randomNum],
    //         borderColor: border[randomNum]
    //     },
    //     text: {
    //         color: txt[randomNum]
    //     },
    //     defaultContainer: {
    //         borderColor: "rgb(209, 213, 219)"
    //     }
    // });

    return (
        <div className={"w-fit px-2 py-0.5 border-2 rounded-full border-2 border-gray-300 " + (index == 0 ? "mr-1" : "mx-1")}>
            <p className="text-gray-500 font-medium">{text}</p>
        </div>
    )
}

export default EventDescriptionTag