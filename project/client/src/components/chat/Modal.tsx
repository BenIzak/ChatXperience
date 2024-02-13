import { useEffect, useRef } from 'react'

type modalProps = {
    showModal: boolean
    setShowModal: (value: boolean) => void
    children: React.ReactNode
    onValidate: () => void
}

export default function Modal({
    showModal,
    setShowModal,
    children,
}: modalProps) {
    const divRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setShowModal(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [setShowModal])

    const closeModal = () => {
        setShowModal(false)
    }

    if (!showModal) return null
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-wp-800 bg-opacity-50 backdrop-blur-sm backdrop-filter transition-all duration-300">
                    <div
                        className="relative w-[60vw] overflow-hidden rounded-lg bg-wp-50 shadow"
                        ref={divRef}
                    >
                        <div className="flex items-center justify-between rounded-t border-b p-4">
                            <h3 className="text-xl font-semibold text-typo-primary">
                                Create new chat
                            </h3>
                            <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center rounded-md p-2 hover:bg-wp-200"
                                data-modal-hide="authentication-modal"
                                onClick={closeModal}
                            >
                                <i className="fa-solid fa-times"></i>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="w-full p-4 md:p-5">{children}</div>
                    </div>
                </div>
            )}
        </>
    )
}
