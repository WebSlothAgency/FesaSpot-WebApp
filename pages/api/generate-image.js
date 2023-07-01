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


export default async function GET(request) {
    const Inter500 = await fetchFont('https://fesaspot.sr/font/Inter-Medium.ttf');
    const Inter600 = await fetchFont('https://fesaspot.sr/font/Inter-SemiBold.ttf');
    const Inter700 = await fetchFont('https://fesaspot.sr/font/Inter-Bold.ttf');


    let title = "Short Event Name"

    return new ImageResponse(
        (
            <div style={{ width: 1080, height: 1080, position: 'relative', display: 'flex' }}>
                <div style={{ width: 1080, height: 1080, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 16 }} />
                <div style={{ display: 'flex', width: 491.80, height: 97, left: 66, top: 63, position: 'absolute' }}>
                    <img style={{ width: 96, height: 96, left: 0, top: 0, position: 'absolute' }} src="https://fesaspot.sr/logo.png" />
                    <div style={{ width: 365, left: 126.80, top: 1, position: 'absolute', color: 'black', fontSize: 79.24, fontFamily: 'Inter', fontWeight: 'bolder', wordWrap: 'break-word' }}>FesaSpot</div>
                </div>
                <div style={{ left: 66, top: 223, position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 32, display: 'flex' }}>
                    <img src="https://media.graphassets.com/zWXEXp8T9m76u867EpGt" style={{ width: 432, height: 573.41, background: '#323232', borderRadius: 16, borderLeft: '2px #EAECF0 solid', borderTop: '2px #EAECF0 solid', borderRight: '2px #EAECF0 solid', borderBottom: '0.50px #EAECF0 solid' }} />
                    <div style={{ width: 488, height: 573, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 16, display: 'flex' }}>
                        <div style={{ width: 485.80, height: 35, color: 'black', fontSize: 32, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>30 September</div>
                        <div style={{ width: 485.80, height: (title.length % 16 > 0 ? 130 : 75), color: 'black', fontSize: 47.78, fontFamily: 'Inter', fontWeight: 700, wordWrap: 'break-word' }}>{title}</div>
                        <div style={{ height: 25, justifyContent: 'flex-start', alignItems: 'flex-end', gap: 15.93, display: 'flex' }}>
                            <div style={{ paddingLeft: 14.12, paddingRight: 14.12, paddingTop: 3.53, paddingBottom: 3.53, background: '#F4F3FF', borderRadius: 28.24, borderLeft: '0.88px #D9D6FE solid', borderTop: '0.88px #D9D6FE solid', borderRight: '0.88px #D9D6FE solid', borderBottom: '0.88px #D9D6FE solid', justifyContent: 'flex-start', alignItems: 'center', height: "30px", display: 'flex' }}>
                                <div style={{ textAlign: 'center', color: '#5925DC', fontSize: 21.18, fontFamily: 'Inter', fontWeight: '500', lineHeight: 31.77, wordWrap: 'break-word' }}>Festival</div>
                            </div>
                            <div style={{ paddingLeft: 14.12, paddingRight: 14.12, paddingTop: 3.53, paddingBottom: 3.53, background: '#EFF8FF', borderRadius: 28.24, borderLeft: '0.88px #B2DDFF solid', borderTop: '0.88px #B2DDFF solid', borderRight: '0.88px #B2DDFF solid', borderBottom: '0.88px #B2DDFF solid', justifyContent: 'flex-start', alignItems: 'center', height: "30px", display: 'flex' }}>
                                <div style={{ textAlign: 'center', color: '#175CD3', fontSize: 21.18, fontFamily: 'Inter', fontWeight: '500', lineHeight: 31.77, wordWrap: 'break-word' }}>Party</div>
                            </div>
                            <div style={{ paddingLeft: 13.76, paddingRight: 13.76, paddingTop: 3.44, paddingBottom: 3.44, background: '#FFFAEB', borderRadius: 27.51, borderLeft: '0.86px #FEDF89 solid', borderTop: '0.86px #FEDF89 solid', borderRight: '0.86px #FEDF89 solid', borderBottom: '0.86px #FEDF89 solid', justifyContent: 'flex-start', alignItems: 'center', height: "30px", display: 'flex' }}>
                                <div style={{ textAlign: 'center', color: 'black', fontSize: 20.63, fontFamily: 'Inter', fontWeight: '500', lineHeight: 30.95, wordWrap: 'break-word' }}>+18</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ height: 157, left: 66, top: 859.41, position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 16, display: 'flex' }}>
                    <div style={{ width: 700, height: 50, color: 'black', fontSize: 32, fontFamily: 'Inter', fontWeight: 700, wordWrap: 'break-word' }}>Download de FesaSpot app voor meer info</div>

                    <div style={{ justifyContent: 'center', alignItems: 'flex-start', gap: 16, display: 'flex' }}>
                        <img style={{ width: 281, height: 85 }} src="https://fesaspot.sr/google.png" />
                        <img style={{ width: 282, height: 85 }} src="https://fesaspot.sr/apple.png" />
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
    // return new Response(imageG);
}