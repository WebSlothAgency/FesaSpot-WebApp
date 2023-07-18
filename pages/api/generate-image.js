import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/react-hooks';
import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

const fetchFont = async (fontURL) => {
    try {
        const response = await fetch(fontURL);
        const fontArrayBuffer = await response.arrayBuffer();
        return fontArrayBuffer;
    } catch (error) {
        console.error('Error fetching font:', error);
        throw error;
    }
};



async function getData(id) {
    const url = 'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clhvznxbz10sb01tbempl16ux/master';

    const query = `
      query MyQuery {
        events(where: { id: "${id}" }) {
          id
          startDate
          banner {
            url
          }
          promoted
          age
          locationDisplayName
          title
          tags(first: 100) {
            tag
          }
        }
      }
    `;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();

    return data.data.events[0];
}

function formatDate(startDate) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(startDate);
    let formattedDate = date.toLocaleDateString('nl-NL', options);
    let splitted = formattedDate.toString().split(" ")
    splitted[1] = splitted[1].charAt(0).toUpperCase() + splitted[1].slice(1)
    return splitted.join(" ");
}

function getColors(text) {
    let randomNum = Math.floor(Math.random() * 6);
    let bg = ["#F4F3FF", "#EFF8FF", "#FDF2FA", "#FEF6EE", "#ECFDF3", "#FEF3F2"];
    let border = ["#D9D6FE", "#B2DDFF", "#FCCEEE", "#F9DBAF", "#ABEFC6", "#FECDCA"];
    let txt = ["#5925DC", "#175CD3", "#C11574", "#B93815", "#067647", "#B42318"];

    let age = text.split("+")[0];

    if (text === "PG") {
        randomNum = 4;
    } else if (age > 0 && age < 18) {
        randomNum = 1;
    } else if (age >= 18 && age < 21) {
        randomNum = 3;
    } else if (age >= 21) {
        randomNum = 5;
    }

    return {
        bg: bg[randomNum],
        border: border[randomNum],
        txt: txt[randomNum]
    }
}


export default async function GET(req, res) {
    const query = req.url
    let id;
    try {
        id = query.split("id=")[1]
    } catch { }

    const Inter500 = await fetchFont('https://fesaspot.sr/font/Inter-Medium.ttf');
    const Inter600 = await fetchFont('https://fesaspot.sr/font/Inter-SemiBold.ttf');
    const Inter700 = await fetchFont('https://fesaspot.sr/font/Inter-Bold.ttf');

    let data = await getData(id)
    let title = data.title
    let date = formatDate(data.startDate)
    let banner = data.banner.url
    let promoted = data.promoted
    let location = data.locationDisplayName

    //get the shortest tag
    data.tags.sort((a, b) => a.tag.length - b.tag.length)
    let tag = data.tags.length > 0 ? ((data.tags[0].tag).length <= 15 ? (data.tags[0].tag) : false) : false
    let ageTag = data.age

    let finalColors = tag && getColors(tag)

    return new ImageResponse(
        (
            <div style={{ width: 1080, height: 1080, padding: 48, background: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex' }}>
                <div style={{ alignSelf: 'stretch', flex: '1 1 0', paddingTop: 48, paddingBottom: 48, justifyContent: 'flex-start', alignItems: 'center', gap: 48, display: 'flex' }}>
                    {promoted && <div style={{ position: "absolute", top: "0px", left: "0px", width: 437.42, height: 48.33, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex' }}>
                        <div style={{ width: 48.33, height: 48.33, position: 'relative', display: "flex", alignItems: 'center' }}>
                            <img style={{ width: 48.33, height: 48.33, position: 'relative' }} src={"http://localhost:3000/star.png"} />
                        </div>
                        <div style={{ color: '#FF7347', fontSize: 33.83, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Promoted</div>
                    </div>}
                    <div style={{ flex: '1 1 0', height: 552, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 48, display: 'flex' }}>
                        <img style={{ width: 414, height: 552, position: 'relative', borderRadius: 16, borderLeft: '2px #E0E0E0 solid', borderTop: '2px #E0E0E0 solid', borderRight: '2px #E0E0E0 solid', borderBottom: '2px #E0E0E0 solid' }} src={banner} />
                        <div style={{ flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 48, display: 'flex' }}>

                            <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 24, display: 'flex' }}>
                                {tag != false && <div style={{ height: 75, paddingLeft: 36, paddingRight: 36, paddingTop: 4, paddingBottom: 4, background: finalColors.bg, borderRadius: 48, borderLeft: `3px ${finalColors.border} solid`, borderTop: `3px ${finalColors.border} solid`, borderRight: `3px ${finalColors.border} solid`, borderBottom: `3px ${finalColors.border} solid`, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    <div style={{ textAlign: 'center', color: finalColors.txt, fontSize: 42, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word' }}>{tag}</div>
                                </div>}
                                <div style={{ height: 75, paddingLeft: 36, paddingRight: 36, paddingTop: 4, paddingBottom: 4, background: getColors(ageTag).bg, borderRadius: 48, borderLeft: `3px ${getColors(ageTag).border} solid`, borderTop: `3px ${getColors(ageTag).border} solid`, borderRight: `3px ${getColors(ageTag).border} solid`, borderBottom: `3px ${getColors(ageTag).border} solid`, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    <div style={{ textAlign: 'center', color: getColors(ageTag).txt, fontSize: 42, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word' }}>{ageTag}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column'}}>
                                <div style={{ alignSelf: 'stretch', color: '#161722', fontSize: 64, fontFamily: 'Roboto', fontWeight: '700', wordWrap: 'break-word' }}>{title}</div>
                                <div style={{ alignSelf: 'stretch', color: '#161722', fontSize: 32, fontFamily: 'Roboto', fontWeight: '600', wordWrap: 'break-word' }}>{location}</div>
                            </div>
                            <div style={{ alignSelf: 'stretch', color: '#161722', fontSize: 42, fontFamily: 'Roboto', fontWeight: '600', wordWrap: 'break-word' }}>{date}</div>
                        </div>
                    </div>
                </div>
                <div style={{ alignSelf: 'stretch', height: 200, paddingRight: 48, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 24, display: 'flex' }}>
                    <div style={{ width: 900, color: '#8A8A8A', fontSize: 40, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word' }}>Download FesaSpot voor meer info</div>
                    <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 48, display: 'flex' }}>
                        <img style={{ width: 468, height: 120 }} src="https://fesaspot.sr/new-ios.png" />
                        <img style={{ width: 468, height: 120 }} src="https://fesaspot.sr/new-android.png" />
                    </div>
                </div>
            </div>
        ),
        {
            width: 1080,
            height: 1080,
            fonts: [
                {
                    data: Inter500,
                    name: 'Inter',
                    style: 'medium',
                    weight: 500
                },
                {
                    data: Inter600,
                    name: 'Inter',
                    style: 'semi-bold',
                    weight: 600
                },
                {
                    data: Inter700,
                    name: 'Inter',
                    style: 'bold',
                    weight: 700
                }
            ]
        },
    );
}