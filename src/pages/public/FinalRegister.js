/* eslint-disable react-hooks/exhaustive-deps */ 
import React, {useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import path from '../../utils/path'
import Swal from 'sweetalert2'

const FinalRegister = () => {
    const {status} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(status === 'failed') Swal.fire("Thất bại", "Đăng ký không thành công. Trở lại trang đăng nhập", "error" ).then(() => {
            navigate(`/${path.LOGIN}`)
        })
        if(status === 'success') Swal.fire("Thành công", "Đăng ký thành công. Vui lòng đăng nhập", "success" ).then(() => {
            navigate(`/${path.LOGIN}`)
        })
    }, [])
  return (
    <div className='h-screen w-screen bg-gray-300'></div>
  )
}

export default FinalRegister