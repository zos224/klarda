"use client"
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from "react"
import 'animate.css'

const Alert = ({ alertInput }) => {
    const [alert, setAlert] = useState({})
    const [animation, setAnimation] = useState('animate__fadeInDown')
    const alertRef = useRef(null)
    const timeoutRef = useRef(null)

    useEffect(() => {
        setAlert(alertInput)
        setAnimation('animate__fadeInDown')

        if (alertInput.message) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = setTimeout(() => {
                setAnimation('animate__fadeOutUp')
            }, 3000)
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [alertInput])

    const handleEnd = () => {
        if (animation === 'animate__fadeOutUp') {
            setAlert({ status: false, message: "" })
        }
    }

    return (
        alert.message && (
            <div
                onAnimationEnd={handleEnd}
                ref={alertRef}
                className={`fixed top-20 left-1/2 flex items-center z-30 bg-white text-black rounded-md px-5 py-3 animate__animated ${animation}`}
            >
                {alert.status ? (
                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                ) : (
                    <ExclamationTriangleIcon className="w-6 h-6 text-red" />
                )}
                <span className="ml-2">{alert.message}</span>
            </div>
        )
    )
}

export default Alert;
