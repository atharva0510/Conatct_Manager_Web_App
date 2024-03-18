import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { contantServices } from '../../Services/ContactServices'
import Spinner from '../../../Spinner/Spinner'

const ViewContact = () => {
  let {contactID}=useParams()

  let [data,setData]=useState({
    loading:false,
    contact:{},
    errorMessage:''
  })
  
  useEffect(()=>{
    let prom1=new Promise((res1,rej1)=>{
      setData({...data,loading:true,contact:{}})
      let response=contantServices.getContact(contactID);
      res1(response)
      rej1()
    })
    prom1.then((resp1)=>{
      setData({...data,loading:false,contact:resp1.data})
      console.log(resp1.data)
    }).catch((error)=>{
      setData({...data,loading:false,errorMessage:error.Message})
      alert("Data Not Found..!!")
    })
  },[contactID])

  let {loading,contact,errorMessage}=data

  return (
    <div>
      <pre>{contactID}</pre>
      
      {/* Section-1 */}
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className='h3 fw-bold text-primary'>View Contact</p>
              <p className='fst-italic'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit exercitationem similique atque culpa eveniet assumenda rem minus recusandae blanditiis, est nam modi accusantium explicabo repudiandae, autem fugit debitis corporis ab.</p>
            </div>
          </div>
        </div>
      </section>

      {
        loading ? <Spinner/> : 
        <React.Fragment>
          {
            Object.keys(contact).length>0 && 
            <>
              {/* Section-2 */}
              <section className="view-contact-data">
                <div className="container">

                  {/* Row-1 */}
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-center ">
                      <img src={contact.photo} alt="" className='img-size1' />
                    </div>
                  </div>

                  {/* Row-2 */}
                  <div className="row my-3 d-flex justify-content-center ">
                    <div className="col-md-5">
                      <ul className='list-group'>
                        <li className='list-group-item list-group-item-action'>
                          Name: <span className='fw-bold'>{contact.name}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Contact: <span className='fw-bold'>{contact.mobileNo}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Email: <span className='fw-bold'>{contact.emailId}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Title: <span className='fw-bold'>{contact.title}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Company: <span className='fw-bold'>{contact.company}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Group: <span className='fw-bold'>{contact.group}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Row-3 */}
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-center ">
                      <Link to={'/'} className='btn btn-warning'>Back</Link>
                    </div>
                  </div>

                </div>
              </section>
            </>
          }
        </React.Fragment> 
      }
      
    </div>
  )
}

export default ViewContact
