"use client"

import { useState } from "react"

const ModalAddBirthday = ({isOpen, onClose, id}) => {
    const [submitting, setSubmitting] = useState(false)
    const [errorAlert, setErrorAlert] = useState(null)
    const [birthday, setBirthday] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true)
    
        const response = await fetch('/api/auth/update', {
            method: "POST",
            body: JSON.stringify({
                id: id,
                birthday: birthday
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            setErrorAlert(null)
            const data = await response.json()
            onClose(data)
        }
        else {
            response.text().then(text => {
                setErrorAlert(text)
            })
        }
        setSubmitting(false)
        
    }

    return ( isOpen && (
        <div tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full">
            <div className="relative m-auto mt-20 w-full max-w-xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-md dark:bg-boxdark">
                    <button onClick={() => {onClose(null)}} type="button" className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <div class="px-4 lg:px-10 py-10 w-full ">
                            <div className="text-red">
                                Ngày sinh được sử dụng để xác nhận độ tuổi của bạn trong một số trường hợp nhất định và không thể thay đổi!
                            </div>
                            <form className="mt-4" onSubmit={handleSubmit}>
                                <div class="w-full px-4 mx-auto">
                                    <div class="relative w-full mb-3">
                                        <label className="font-medium">
                                            Ngày sinh
                                        </label>
                                        <input type="date" onChange={(e) => setBirthday(e.target.value)} className="w-full rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" />
                                    </div>
                                </div>
                                {!submitting ? (
                                <div className="text-center px-4">
                                    <input type="submit" role="button" className="w-full bg-primary-500 font-bold text-white rounded-md py-2 mt-5 hover:bg-primary-600 duration-200" value={"Xác nhận"}/>
                                </div>
                                ) : (
                                    <div className="text-center px-4">
                                        <button className="mt-5 flex justify-center rounded-md cursor-pointer w-full bg-primary-600 text-white py-2">
                                            <div role="status" className="mx-auto">
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
                                <div className="text-white mt-3 bg-red rounded-lg mx-4 py-2">
                                    {errorAlert}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        

    )
}

export default ModalAddBirthday