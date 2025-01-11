import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import './../Style/events/NextEvent.css'
const Individualevent = () => {
  const [data,setData] = useState();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { id } = useParams();
  
  const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
      };
      const fetchEvent = async (id) => {
        var response;
        try {
          try {
            response = await axios.get(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/events/${id}.json`);
            
          } catch (err) {
            console.error(`Error: ${err}`);
            
          }
          // const response = await axios.get(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}.json`);
          console.log(response.data)
          setData(response.data)
        } catch (error) {
            console.error('Error saving blog:', error);
        }
      }
  useEffect(() => {
    fetchEvent(id);
  }, [])

  return (
    <>
    {data && <div className='getInvolvedPage' id='event'>
        <h3 style={{margin:"5px auto"}}>{data.eventtitle}</h3>
        <h4>
        <a href={data.eventurl} style={{margin:"0px auto"}}>{data.eventurl}</a>
        </h4>
        <p>{data.eventdate}</p>
        <div style={{display:"flex"}}>
        <img src={data.eventimageone} className="img" alt="Description of the image"></img>
        </div>
        <br/>
        <p>{data.eventDescription}</p>
        {data.blogContent.map((item, id) => {
            if('heading' in item)
              return <h4 style={{width:"100%", margin:"20px auto"}}><b>{item.heading}</b></h4>
            else if('subheading' in item)
              return <h5 style={{width:"100%", margin:"20px auto"}}><b>{item.subheading}</b></h5>
            else if('paragraph' in item)
              return <p style={{width:"100%", margin:"20px auto"}}>{item.paragraph}</p>
            else if('image' in item)
              return <img src={item.image} className="img" alt="Description of the image"></img>
            else if('quote' in item)
              return <div style={{width:"100%", margin:"20px auto", backgroundColor:"lightblue", fontStyle:'italic', padding:"14px", borderLeft:"5px solid #065f7d"}}>"{item.quote}"</div>
            else if('note' in item)
              return <div style={{width:"100%", margin:"20px auto", fontStyle:'italic', padding:"14px", borderLeft:"5px solid #eb4438"}}>Note: {item.note}</div>
        })}
    </div>}
    </>
  )
}

export default Individualevent