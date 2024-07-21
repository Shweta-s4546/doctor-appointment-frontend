import React, {useState,useEffect,useCallback,useContext} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../Context/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'

function Slot() {
    const context = useContext(AuthContext)
    const token = context.token
    const currentUser = context.currentUser

    const [slots,setSlots] = useState([])

    const navigate = useNavigate()

    const initData = useCallback(() => {
        const readData = async () => {
            const res = await axios.get('/api/slot/all', {
                headers: {
                    Authorization: `${token}`
                }
            })

            let filteredSlots = res.data.slots.filter(item => item.doc_id === currentUser._id)
            setSlots(filteredSlots)
        }
        readData()

    },[]) 

    useEffect(() => {
        initData()
    }, [initData])

    //delete slot
    const deleteHandler = async (id) => {
        if(window.confirm("are you sure to delete ")) {
            await axios.delete(`/api/slot/delete/${id}`,{
                headers:{
                    Authorization: `${token}`
                }
            }).then(res => {
                toast.success(res.data.msg)
                navigate(`/doctor/slots`)
                window.location.reload()
            }).catch(err => toast.error(err.response.data.msg))
        }else{
            toast.warning('delete terminated')
        }
    }
    if(slots.length === 0){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <NavLink to={`/doctor/slots/add`} className="btn btn-outline-success float-end">Add new slot</NavLink>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h3 className="display-3 text-secondary">
                            No slots lists
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
  return (
    <div className='container'>
        <div className="row">
                    <div className="col-md-12 text-center">
                        <NavLink to={`/doctor/slots/add`} className="btn btn-outline-success float-end">Add new slot</NavLink>
                    </div>
                </div>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-secondary">
                   slots lists
                </h3>
            </div>
        </div>
   
         <div className="row">
            <div className="col-md-12">
                <div className="table table-responsive">
                    <table className="table table-striped table-hover table-bordered text-center">
                    <thead>
                        <tr>
                            <td>Slot Item</td>
                            <td>Slot Status</td>
                            <td>isActive</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slots && slots.map((item,index) => {
                                return(
                                    <tr className="text-center" key={index}>
                                        <td>{item.slot_date }</td>
                                        <td>{item.slot_status ? <span className='text-success'>Available</span> : <span className='text-danger'>Booked</span> }</td>
                                        <td>
                                            {item.isActive ? <span className='text-success'>Active</span> : <span className='text-danger'>in Active</span> }
                                        </td>
                                        <td className='d-flex justify-content-evenly'>
                                            <NavLink to={`/doctor/slots/edit/${item._id}`} className="btn btn-info">
                                                <span className='bi bi-pencil'></span>
                                            </NavLink>
                                            
                                            <button className='btn btn-danger float-end' onClick={() => {deleteHandler(item._id)}}><span className="bi bi-trash"></span></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>
            </div>
        </div>


    </div>
  )
}

export default Slot
