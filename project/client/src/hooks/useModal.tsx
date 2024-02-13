import { useState, useCallback } from 'react'

/**
 * Hook pour gérer l'ouverture/fermeture d'une modal
 * @param ModalContent
 * @returns
 */
const useModal = (ModalContent = () => null) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = useCallback(() => {
        setIsOpen(!isOpen)
    }, [isOpen])

    // Renvoie le composant `Modal` en plus des contrôles `isOpen` et `toggle`
    const Modal = isOpen ? (
        <div
            className={
                'fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 px-4 py-5'
            }
        >
            <div
                onFocus={() => {}}
                onBlur={() => {}}
                className="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[50px]"
            ></div>
        </div>
    ) : null

    return { Modal, isOpen, toggle }
}

export default useModal
