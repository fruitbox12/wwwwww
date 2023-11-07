import { useCallback, useEffect } from 'react'

export function useBlocker(blocker, when = true) {
    useEffect(() => {
        if (!when) return

        const handleBeforeUnload = (e) => {
            if (blocker(e)) {
                e.preventDefault()
                e.returnValue = ''
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [blocker, when])
}

export function usePrompt(message, when = true) {
    const blocker = useCallback(
        (e) => {
            if (when && window.confirm(message)) {
                return true
            }
            return false
        },
        [message]
    )

    useBlocker(blocker, when)
}
