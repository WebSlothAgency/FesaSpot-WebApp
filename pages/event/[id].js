import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import EventDescriptionTag from '../../components/EventDescriptionTag';

const Event = () => {
  const [showQA, setShowQA] = useState(false)

  const router = useRouter()
  let { id } = router.query


  useEffect(() => {
    if (id) {
      refetch()
    }
  }, [id]);



  const { loading, error, data, refetch } = useQuery(gql`
    query MyQuery {
      events(where: { id: "${id}" }) {
        id
        banner {
          url
        }
        beschrijving {
          html
          text
        }
        endDate
        locatie {
          latitude
          longitude
        }
        organizer
        promoted
        sponsors
        startDate
        tickets
        website
        pricing
        title
        locationDisplayName
        artists
        qa(first: 100) {
          ... on QaComponent {
            question
            answer
          }
        }
        tags(first: 100) {
          tag
        }
      }
    }
  `);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const eventData = data.events[0];

  function replaceText(txt) {
    return txt.replace(/\\n/g, '\n');
  }

  function getHourFromDate(dateString) {
    const date = new Date(dateString);
    const hour = date.getUTCHours();
    return `${hour}h`;
  }

  function parseDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = [
      'jan',
      'feb',
      'mrt',
      'apr',
      'mei',
      'jun',
      'jul',
      'aug',
      'sep',
      'okt',
      'nov',
      'dec',
    ][monthIndex];
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${day} ${month.toLowerCase()} (${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')})`;

    return formattedDate;
  }

  console.log(eventData.locatie);

  return (
    <>
      <div className='fixed w-full h-14 px-4 py-2 bg-white border-b-2 border-b-gra top-0'>
        <div className='m-auto flex justify-between items-center max-w-2xl'>
          <p className='font-bold text-2xl'>Events.SR</p>
          <a href='https://www.google.com' target='_blank' rel='noreferrer' className='rounded-full border-2 border-gray-300 bg-white text-black font-bold w-fit ml-0 px-3 py-1'>Download de app</a>
        </div>
      </div>
      <div className='m-auto p-4 sm:px-0 max-w-2xl'>

        <div className='flex gap-4 items-start mt-14'>
          <img className='w-2/6 rounded-md border-2 border-gray-300' src={eventData.banner.url} />
          <div>
            <div className='flex gap-2'>
              <svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 21V16M3.5 6V1M1 3.5H6M1 18.5H6M12 2L10.2658 6.50886C9.98381 7.24209 9.8428 7.60871 9.62353 7.91709C9.42919 8.1904 9.1904 8.42919 8.91709 8.62353C8.60871 8.84281 8.24209 8.98381 7.50886 9.26582L3 11L7.50886 12.7342C8.24209 13.0162 8.60871 13.1572 8.91709 13.3765C9.1904 13.5708 9.42919 13.8096 9.62353 14.0829C9.84281 14.3913 9.98381 14.7579 10.2658 15.4911L12 20L13.7342 15.4911C14.0162 14.7579 14.1572 14.3913 14.3765 14.0829C14.5708 13.8096 14.8096 13.5708 15.0829 13.3765C15.3913 13.1572 15.7579 13.0162 16.4911 12.7342L21 11L16.4911 9.26582C15.7579 8.98381 15.3913 8.8428 15.0829 8.62353C14.8096 8.42919 14.5708 8.1904 14.3765 7.91709C14.1572 7.60871 14.0162 7.24209 13.7342 6.50886L12 2Z" stroke="#FF7347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-bold text-promotionColor">Promoted</p>
            </div>
            <h1 className='font-bold text-2xl'>{eventData.title}</h1>
            <p className="mt-2">26 Mei 2023 ({getHourFromDate(eventData?.startDate)}) · {eventData?.locationDisplayName}</p>
          </div>
        </div>

        <div className='bg-white border-2 border-gray-300 w-full h-fit rounded-lg mt-6 flex flex-col divide-y-2 divide-gray-300'>
          <div className="p-4">
            <p className="font-semibold">Beschrijving</p>
            <p className="mt-2">{replaceText(eventData.beschrijving.text)}</p>
            {eventData.tags.length > 0 && <div className="flex flex-row gap-2 mt-3 overflow-x-auto overflow-y-hidden">
              {eventData.tags.map((tag, i) => {
                return <EventDescriptionTag key={`tag-${i}`} index={i} text={tag.tag} />
              })}
            </div>}
          </div>

          <div className="p-4">
            <p className="font-semibold">Datum</p>
            <div>
              <p className="text-gray-700">{parseDate(eventData.startDate)} - {parseDate(eventData.endDate)}</p>
            </div>
          </div>

          {eventData.artists && <div className="p-4">
            <p className="font-semibold">Artiesten</p>
            <div>
              <p className="text-gray-700">{replaceText(eventData.artists)}</p>
            </div>
          </div>}

          {eventData.pricing && <div className="p-4">
            <p className="font-semibold">Prijs</p>
            <div>
              <p className="text-gray-700">{replaceText(eventData.pricing)}</p>
            </div>
          </div>}

          {(eventData.organizer || eventData.sponsors) && <div className="p-4">
            {eventData.organizer && <div>
              <p className="font-semibold">Organisator</p>
              <div>
                <p className="text-gray-700">{replaceText(eventData.organizer)}</p>
              </div>
            </div>}

            {eventData.sponsors && <div className={eventData.organizer ? "mt-4" : ""}>
              <p className="font-semibold">Sponsoren</p>
              <div>
                <p className="text-gray-700">{replaceText(eventData.sponsors)}</p>
              </div>
            </div>}
          </div>}

          {eventData.qa.length > 0 && <div className="px-4 pt-4 pb-2">
            <div onClick={() => setShowQA(!showQA)} className="flex flex-row items-center gap-2 cursor-pointer">
              {showQA ? <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 7L7 1L1 7" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg> : <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>}
              <p className="font-semibold">Q&A</p>
            </div>
            <div className={"mt-2 " + (showQA ? "h-fit" : "h-0 overflow-hidden")}>
              {eventData.qa.map((sub, i) => {
                return (
                  <div key={`sub-${i}`} className="mt-4">
                    <p className="italic text-gray-500">{sub.question}</p>
                    <p className="mt-1">{sub.answer}</p>
                  </div>
                )
              })}
            </div>
          </div>}
        </div>

        <div className='mt-4'>
          <p className='font-semibold'>Locatie</p>
          <div className="w-full rounded-md overflow-hidden border-2 border-gray-300 mt-2">
            <iframe className='w-full h-52'
              src={'https://maps.google.com/maps?q=' + eventData.locatie.latitude + ',' + eventData.locatie.longitude + '&t=&z=15&ie=UTF8&iwloc=&output=embed'}
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className='mt-6'>
          <p>©Events.sr, Alle rechten voorbehouden.</p>
        </div>
      </div>
    </>
  )
}

export default Event