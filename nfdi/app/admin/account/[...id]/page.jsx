"use client"
import { useParams, useRouter } from "next/navigation"
import {useEffect, useState } from "react"
const CreateUpdateaccount = () => {
    const [account, setaccount] = useState({
        id: 0,
        email: '',
        password: '',
        name: '',
        academicTitle: 'no',
        gender: 'Nam',
        organization: '',
        department: '',
        type: 'congdong',
        role: 'user'
    })
    const route = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false)
    useEffect( () => {
        const getAccount = async () => {
            setLoading(true)
            const response = await fetch('/api/auth/manage/' + params.id[1])
            if (response.ok) {
                const existaccount = await response.json();
                setaccount(existaccount)
                setLoading(false)
            }
            else {
                route.push('/admin/account/create')
            }
        }

        if (params.id[1]) {
            getAccount()
        }
    }, [params.id[1]])
    
    const [errorAlert, setErrorAlert] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        const formData = new FormData();
        formData.append('id', account.id)
        formData.append('email', account.email)
        formData.append('password', account.password)
        formData.append('name', account.name)
        formData.append('academicTitle', account.academicTitle)
        formData.append('gender', account.gender)
        formData.append('organization', account.organization)
        formData.append('department', account.department)
        formData.append('type', account.type)
        formData.append('role', account.role)
        if (params.id[0] == 'create') {
            const response = await fetch('/api/auth/signup', {
                method: "POST",
                body: formData
            })
            if (response.ok) {
                setErrorAlert(null)
                route.push("/admin/account")
            }
            else {
                response.text().then(text => {
                    setErrorAlert(text)
                })
            }
        }
        else {
            const response = await fetch('/api/auth/manage/update', {
                method: "PATCH",
                body: formData
            })
            if (response.ok) {
                setErrorAlert(null)
                route.push("/admin/account")
            }
            else {
                response.text().then(text => {
                    setErrorAlert(text)
                })
            }
        }
        
        setSubmitting(false)
    }
    
    return (
        <section class="py-1">
            <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                    <div class="rounded-t dark:bg-bodydark bg-white dark:text-black mb-0 px-6 py-3">
                        <div class="text-center flex justify-between">
                            <h6 class="text-xl font-bold">
                            {params.id[0] == 'create' ? 'Thêm' : 'Cập nhật'} tài khoản
                            </h6>
                        </div>
                    </div>
                    {!loading ? (
                        <div class="px-4 lg:px-10 py-10 w-full ">
                        <form onSubmit={handleSubmit}>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Email
                                </label>
                                <input value={account.email} type="email" placeholder="Nhập email" onChange={(e) => setaccount({...account, email: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                                </div>
                            </div>
                            {
                                (params.id[0] == 'create' || account.role == "admin") && (
                                    <div class="w-full lg:w-6/12 px-4 mx-auto">
                                        <div class="relative w-full mb-3">
                                        <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                            Mật khẩu
                                        </label>
                                        <input value={account.password} type="text" onChange={(e) => setaccount({...account, password: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required/>
                                        </div>
                                    </div>
                                )
                            }
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Học vị
                                </label>
                                <select defaultValue={account.academicTitle} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear" onChange={(e) => setaccount({...account, academicTitle: e.target.value})}>
                                    <option value={"no"}>Không</option>
                                    <option value={"ThS"}>Thạc sĩ</option>
                                    <option value={"TS"}>Tiến sĩ</option>
                                    <option value={"PGS"}>Phó giáo sư</option>
                                    <option value={"GS"}>Giáo sư</option>
                                </select>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Họ tên
                                </label>
                                <input value={account.name} type="text" onChange={(e) => setaccount({...account, name: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required/>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Giới tính
                                </label>
                                <select defaultValue={account.gender} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear" onChange={(e) => setaccount({...account, gender: e.target.value})}>
                                    <option value={"Nam"}>Nam</option>
                                    <option value={"Nữ"}>Nữ</option>
                                    <option value={"Khác"}>Khác</option>
                                </select>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Tổ chức
                                </label>
                                <input value={account.organization} type="text" onChange={(e) => setaccount({...account, organization: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required/>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Phòng ban
                                </label>
                                <input value={account.department} type="text" onChange={(e) => setaccount({...account, department: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required/>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Loại
                                </label>
                                <select defaultValue={account.type} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear" onChange={(e) => setaccount({...account, type: e.target.value})}>
                                    <option value={"congdong"}>Tổ chức cộng đồng</option>
                                    <option value={"congty"}>Công ty</option>
                                    <option value={"hocvien"}>Học viện</option>
                                    <option value={"daihoc"}>Trường đại học</option>
                                </select>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Quyền
                                </label>
                                <select defaultValue={account.role} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear" onChange={(e) => setaccount({...account, role: e.target.value})}>
                                    <option value={"user"}>Người dùng</option>
                                    <option value={"admin"}>Quản trị</option>
                                </select>
                                </div>
                            </div>
                            {!submitting ? (
                                <div className="text-center">
                                    <input type="submit" role="button" className="mt-10 cursor-pointer bg-black text-white dark:bg-whiten dark:text-black px-3 py-2 rounded-xl" value={params.id[0] == 'create' ? 'Thêm' : 'Cập nhật'}/>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <button className="mt-10 cursor-pointer bg-black text-white px-7 py-2 rounded-xl">
                                        <div role="status">
                                            <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                            
                        </form>
                        {errorAlert ? (
                            <div className="text-white mt-3 bg-red rounded-lg px-3 py-2">
                                {errorAlert}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    ) : (
                        <div className="flex-center mt-2 mx-auto" role="status">
                            <svg aria-hidden="true" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CreateUpdateaccount