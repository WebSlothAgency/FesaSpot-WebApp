import Head from 'next/head'
import Image from 'next/image'
import EventBlock from '../components/EventBlock';
import { useState } from 'react';
import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const currentDate = new Date();
// currentDate.setDate(currentDate.getDate() - 3);

const formattedDate = currentDate.toISOString();

export default function Home() {
  const [eventsCalendar, seteventsCalendar] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  //fetch events

  let { data, loading, refetch } = useQuery(gql`
  query MyQuery {
      events(
        first: 200
        orderBy: startDate_ASC
        where: {endDate_gt: "${formattedDate}"}
      ) {
        id
        title
        tags(first: 100) {
          tag
        }
        startDate
        endDate
        locationDisplayName
        banner {
          url
        }
        beschrijving {
          text
        }
        promoted
        organizer
        age
      }
    }`);

  useEffect(() => {
    if (loading) return
    groupEventsByMonth(data)
  }, [loading])

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      let newData = await refetch();
      await groupEventsByMonth(newData.data)
    } finally {
      setRefreshing(false);
    }
  };

  async function groupEventsByMonth(eventsData) {
    let evData = [...eventsData.events]
    const months = [
      'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
      'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
    ];

    const groupedEvents = evData.reduce((acc, event) => {
      const startDate = new Date(event.startDate);
      const monthIndex = startDate.getMonth();
      const month = months[monthIndex];

      const existingMonth = acc.find(obj => obj.Month === month);
      if (existingMonth) {
        existingMonth.events.push(event);
      } else {
        acc.push({ Month: month, events: [event] });
      }

      return acc;
    }, []);

    seteventsCalendar(old => groupedEvents)
  }

  function openInApp() {
    window.location.href = (getMobileOperatingSystem() == "Android" ? "https://play.google.com/store/apps/details?id=com.websloth.eventssr" : "https://apps.apple.com/app/fesaspot/id6449878405");
  }

  return (
    <div>
      <SEO />

      <main >
        <div className='fixed w-full h-14 px-4 py-2 bg-white z-50 border-b-2 border-b-gra top-0'>
          <div className='m-auto flex justify-between bg-white items-center max-w-2xl'>
            <Link href="/" className='flex gap-1 items-center'>
              <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1178_38848)">
                  <path d="M15.5008 9.984C15.3515 10.1333 15.2382 10.3133 15.1435 10.5107L15.1328 10.5L0.17818 44.188L0.192847 44.2027C-0.0844865 44.74 0.379513 45.8333 1.33018 46.7853C2.28085 47.736 3.37418 48.2 3.91151 47.9227L3.92485 47.936L37.6128 32.98L37.6022 32.968C37.7982 32.8747 37.9782 32.7613 38.1288 32.6093C40.2115 30.5267 36.8342 23.7733 30.5875 17.5253C24.3382 11.2773 17.5848 7.90133 15.5008 9.984Z" fill="#C8102E" />
                  <path d="M17.3328 16L0.55418 43.3413L0.17818 44.188L0.192847 44.2027C-0.0844866 44.74 0.379514 45.8333 1.33018 46.7853C1.63951 47.0947 1.96085 47.3293 2.27551 47.528L22.6662 22.6667L17.3328 16Z" fill="#D84258" />
                  <path d="M30.6826 17.4213C36.9092 23.6507 40.3666 30.2907 38.4012 32.2533C36.4372 34.2187 29.7972 30.7627 23.5666 24.536C17.3386 18.3067 13.8826 11.664 15.8466 9.7C17.8119 7.736 24.4519 11.192 30.6826 17.4213Z" fill="#B10020" />
                  <path d="M23.6907 18.0779C23.4 18.2568 23.0418 18.3233 22.6833 18.2366C21.5517 17.9637 20.6381 17.4395 20.044 16.7212C19.4151 15.9609 19.1781 15.0187 19.3909 14.1333C19.7641 12.579 21.5329 11.3372 24.1914 11.9771C25.2254 12.2252 25.7372 11.9486 25.7739 11.7893C25.8131 11.6317 25.484 11.1522 24.4501 10.9027C23.3185 10.6299 22.4049 10.1056 21.8095 9.3872C21.1806 8.62684 20.9422 7.68445 21.1563 6.79927C21.5322 5.24534 23.2996 4.00329 25.9553 4.64418C26.709 4.8251 27.1327 4.71995 27.3165 4.64022C27.4634 4.57454 27.5279 4.50222 27.5392 4.45662C27.5758 4.29868 27.2519 3.81981 26.2154 3.57001C25.4997 3.3967 25.0577 2.67801 25.2325 1.96118C25.4044 1.24534 26.1217 0.804428 26.84 0.978079C29.496 1.61633 30.5072 3.52595 30.1325 5.08137C29.7562 6.63795 27.9891 7.87735 25.3304 7.23876C24.5769 7.05652 24.1571 7.16351 23.972 7.24307C23.8252 7.30742 23.7592 7.3809 23.7481 7.42517C23.71 7.58426 24.0367 8.06216 25.0732 8.31195C27.7291 8.95152 28.7405 10.8598 28.3657 12.4152C27.9911 13.9693 26.2237 15.2114 23.5666 14.5703C22.813 14.3894 22.3905 14.4961 22.2055 14.5743C22.0571 14.6411 21.9939 14.7136 21.9828 14.7579C21.9449 14.9157 22.2714 15.3949 23.3066 15.6445C24.0209 15.8176 24.4642 16.5378 24.2895 17.2533C24.2056 17.6109 23.9812 17.9004 23.6907 18.0779Z" fill="#FFC121" />
                  <path d="M40.8812 30.476C43.5119 29.7333 45.3265 30.9067 45.7585 32.4467C46.1905 33.9853 45.2545 35.9333 42.6252 36.6733C41.5985 36.9613 41.2905 37.452 41.3319 37.608C41.3772 37.7653 41.8985 38.024 42.9225 37.7347C45.5519 36.9947 47.3665 38.168 47.7985 39.7067C48.2332 41.2467 47.2945 43.192 44.6639 43.9333C43.6385 44.2213 43.3292 44.7133 43.3745 44.8693C43.4185 45.0253 43.9385 45.284 44.9639 44.996C45.6705 44.7973 46.4092 45.2093 46.6079 45.9173C46.8052 46.6267 46.3932 47.3627 45.6839 47.5627C43.0559 48.3027 41.2399 47.132 40.8052 45.5907C40.3732 44.052 41.3105 42.1067 43.9425 41.3653C44.9692 41.076 45.2772 40.5867 45.2319 40.4293C45.1892 40.2733 44.6692 40.0133 43.6452 40.3013C41.0132 41.0427 39.1999 39.872 38.7665 38.3293C38.3332 36.7907 39.2705 34.8453 41.9012 34.1027C42.9252 33.816 43.2332 33.3227 43.1905 33.168C43.1452 33.0107 42.6265 32.752 41.6012 33.04C40.8919 33.24 40.1572 32.8267 39.9572 32.1187C39.7585 31.412 40.1719 30.676 40.8812 30.476Z" fill="#1E9A52" />
                  <path d="M30.6684 26.88C30.2764 26.88 29.8898 26.708 29.6258 26.38C29.1658 25.804 29.2604 24.9653 29.8338 24.5053C30.1244 24.272 37.0578 18.8267 46.8564 20.228C47.5858 20.332 48.0924 21.0067 47.9884 21.736C47.8844 22.464 47.2151 22.976 46.4791 22.8667C37.8218 21.6373 31.5631 26.5387 31.5018 26.588C31.2538 26.7853 30.9604 26.88 30.6684 26.88Z" fill="#FFC121" />
                  <path d="M7.67164 21.3333C7.54497 21.3333 7.41564 21.3147 7.28764 21.2773C6.5823 21.0653 6.1823 20.3227 6.3943 19.6173C7.90497 14.5867 9.2743 6.55866 7.59164 4.46533C7.40364 4.228 7.11964 3.99466 6.46897 4.044C5.2183 4.14 5.33697 6.77866 5.3383 6.80533C5.3943 7.54 4.8423 8.18 4.10897 8.23466C3.36364 8.28 2.7343 7.73866 2.67964 7.004C2.5423 5.16533 3.1143 1.624 6.26897 1.38533C7.67697 1.27867 8.8463 1.768 9.67164 2.79466C12.833 6.72933 9.62364 18.136 8.94897 20.384C8.77564 20.9613 8.24497 21.3333 7.67164 21.3333Z" fill="#1E9A52" />
                  <path d="M34 14.6667C35.1046 14.6667 36 13.7712 36 12.6667C36 11.5621 35.1046 10.6667 34 10.6667C32.8954 10.6667 32 11.5621 32 12.6667C32 13.7712 32.8954 14.6667 34 14.6667Z" fill="#1E9A52" />
                  <path d="M2.66667 26.6667C4.13943 26.6667 5.33333 25.4728 5.33333 24C5.33333 22.5272 4.13943 21.3333 2.66667 21.3333C1.19391 21.3333 0 22.5272 0 24C0 25.4728 1.19391 26.6667 2.66667 26.6667Z" fill="#FFC121" />
                  <path d="M43.333 28C44.4376 28 45.333 27.1046 45.333 26C45.333 24.8954 44.4376 24 43.333 24C42.2284 24 41.333 24.8954 41.333 26C41.333 27.1046 42.2284 28 43.333 28Z" fill="#1E9A52" />
                  <path d="M31.333 44C32.4376 44 33.333 43.1046 33.333 42C33.333 40.8954 32.4376 40 31.333 40C30.2284 40 29.333 40.8954 29.333 42C29.333 43.1046 30.2284 44 31.333 44Z" fill="#1E9A52" />
                  <path d="M37.3337 8C38.8064 8 40.0003 6.8061 40.0003 5.33334C40.0003 3.86058 38.8064 2.66667 37.3337 2.66667C35.8609 2.66667 34.667 3.86058 34.667 5.33334C34.667 6.8061 35.8609 8 37.3337 8Z" fill="#FFC121" />
                  <path d="M43.333 13.3333C44.4376 13.3333 45.333 12.4379 45.333 11.3333C45.333 10.2288 44.4376 9.33333 43.333 9.33333C42.2284 9.33333 41.333 10.2288 41.333 11.3333C41.333 12.4379 42.2284 13.3333 43.333 13.3333Z" fill="#1E9A52" />
                  <path d="M39.333 18.6667C40.4376 18.6667 41.333 17.7712 41.333 16.6667C41.333 15.5621 40.4376 14.6667 39.333 14.6667C38.2284 14.6667 37.333 15.5621 37.333 16.6667C37.333 17.7712 38.2284 18.6667 39.333 18.6667Z" fill="#FFC121" />
                  <path d="M10 33.3333C11.1046 33.3333 12 32.4379 12 31.3333C12 30.2288 11.1046 29.3333 10 29.3333C8.89543 29.3333 8 30.2288 8 31.3333C8 32.4379 8.89543 33.3333 10 33.3333Z" fill="#FFC121" />
                </g>
                <defs>
                  <clipPath id="clip0_1178_38848">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <p className='font-bold text-2xl'>FesaSpot</p>
            </Link>
            <Link href='/evenement-toevoegen' className='hidden~md:block hover:border-black rounded-full border-2 border-gray-300 bg-white text-black font-bold w-fit ml-0 px-3 py-1'>Evenement Toevoegen</Link>
            <button onClick={() => openInApp()} className='md:hidden rounded-full border-2 border-gray-300 bg-white text-black font-bold w-fit ml-0 px-3 py-1'>Open de app</button>
          </div>
        </div>
        <div className='m-auto p-4 sm:px-0 max-w-2xl'>
          <div className='flex gap-4 items-start mt-14 w-full'>
            <div className='w-full flex flex-col gap-4 mt-0 pb-12 h-fit'>
              {eventsCalendar.map((eventMonth, x) => {
                return (
                  <div key={`events-${eventMonth.Month}`} className="w-full flex flex-col">
                    <p className="text-2xl font-bold">{eventMonth.Month}</p>
                    {eventMonth.events.map((event, i) => {
                      return <EventBlock key={`${eventMonth}-event-${i + Math.random()}`} data={event} />
                    })}
                  </div>
                )
              })}
            </div>
          </div>
          <div className='flex flex-col items-center gap-4  pb-16'>
            <p className='font-bold text-2xl text-center'>Wil je graag je eigen evenement toevoegen? Of heb je een evenement dat je graag wilt voorstellen?</p>
            <Link href='/evenement-toevoegen' className='border-2 p-4 border-gray-300 rounded-xl font-semibold hover:border-black'>Evenement Toevoegen</Link>
          </div>
        </div>
      </main >
      <Footer />
    </div >
  )
}
