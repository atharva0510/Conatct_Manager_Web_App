import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { contantServices } from '../../Services/ContactServices'
import Spinner from '../../../Spinner/Spinner'
import { click } from '@testing-library/user-event/dist/click'

const ContactList = () => {
    let {contactID}=useParams()
    let [data, setData]=useState({
      loading:false,
      contacts:[],
      errorMessage:''
    })

    useEffect(()=>{
      let prom1 = new Promise((res,rej)=>{
        setData({...data,loading:true,contacts:[]})
        let response=contantServices.getAllContacts()
        res(response)
        rej()
      })
      prom1.then((resp1)=>{
        setData({...data,loading:false,contacts:resp1.data})
        console.log(resp1.data);
      }).catch((error)=>{
        setData({...data,loading:false,errorMessage:error.Message})
        alert("Data Not Found..!!!")
      })
    },[])

    let clickDelete=(contactID)=>{
      let prom2=new Promise((res1,rej1)=>{
        let deleteResponse=contantServices.deleteContact(contactID)
        res1(deleteResponse)
        rej1()
      }) 
      prom2.then((resp2)=>{
        if (resp2) {
          let prom1 = new Promise((res,rej)=>{
            setData({...data,loading:true,contacts:[]})
            let response=contantServices.getAllContacts()
            res(response)
            rej()
          })
          prom1.then((resp1)=>{
            setData({...data,loading:false,contacts:resp1.data})
            console.log(resp1.data);
          }).catch((error)=>{
            setData({...data,loading:false,errorMessage:error.Message})
            alert("Data Not Found..!!!")
          })
        }
      })
    }

    let {loading,contacts,errorMessage}=data;

  return (
    <div>
      {/* <pre>{JSON.stringify(contacts)}</pre> */}

      {/* Section-1 */}
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            {/* Row-1 */}
            <div className="row">
              <div className="col">
                <p className='h3 d-flex'>Contact Manager <Link className='btn btn-primary ms-2' to={'/contact/add'}><i className='fa fa-plus-circle me-2' />Add</Link></p>
                <p className='fst-italic'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia voluptas quisquam provident natus neque. Asperiores corporis ducimus,
                  at modi sed ea exercitationem quibusdam dolore, dolorum accusantium provident ex velit? Placeat.</p>
              </div>
            </div>

            {/* Row-2 */}
            <div className="row mb-2">
              <div className="col-md-6">
                <form action="" className="row">
                  <div className="col-md-8 mb-2">
                    <input type="text" className='form-control' placeholder='Search Name' />
                  </div>
                  <div className="col">
                    <input type="submit" className='btn btn-outline-dark' value="Search" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section-2 */}
      {
        // Condition Operator
        loading ? <Spinner/> :
        <section className="contact-list">
          <div className="container">
            <div className="row">

              {
                // Map Method & ShortCircuit Operator
                contacts.length>0 && contacts.map((contact)=>{
                  return (
                     <React.Fragment>

                      {/* Col-1 */}
                            <div className="col-md-6 mb-3" key={contact.id}>
                            <div className="card">
                              <div className="card-body">
                                <div className="row align-items-center">
                                  <div className="col-md-4">
                                    <img src={contact.photo} alt="" className='img-size' />
                                  </div>
                                  <div className="col-md-7">
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
                                    </ul>
                                  </div>
                                  <div className="col-md-1 d-flex flex-column align-items-center">
                                    <Link to={`/contact/view/${contact.id}`} className='btn btn-warning my-1'><i className='fa fa-eye'/></Link>
                                    <Link to={`/contact/edit/${contact.id}`} className='btn btn-primary my-1'><i className='fa fa-pen'/></Link>
                                    <button className='btn btn-danger my-1' onClick={()=>{clickDelete(contact.id)}}><i className='fa fa-trash'/></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                     </React.Fragment>

                  )
                })
              }

            </div>
          </div>
        </section>

      }

    </div>
  )
}








export default ContactList
