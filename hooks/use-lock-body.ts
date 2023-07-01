import * as React from 'react'

/**
 * A custom React hook that locks the body scroll by setting the overflow
 * property of the body element to 'hidden'.
 *
 * The useLockBodyScroll hook temporarily disables scrolling on the document body.
 * This can be beneficial in scenarios where you want to restrict scrolling while displaying a modal,
 * a dropdown menu, or any other component that requires the user’s focus.
 * Once the component using this hook is unmounted or no longer needed,
 * the hook returns a cleanup function that restores the original overflow style,
 * ensuring that the scroll behavior is reverted to its previous state.
 *
 * @see https://usehooks.com/useLockBodyScroll
 */
export function useLockBody() {
  // Use the `useLayoutEffect` hook to modify the DOM immediately after
  // the component has been rendered.
  React.useLayoutEffect((): (() => void) => {
    // Get the original value of the `overflow` property of the body element.
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow

    // Set the `overflow` property of the body element to 'hidden'.
    document.body.style.overflow = 'hidden'

    // Return a cleanup function that restores the original value of the
    // `overflow` property of the body element.
    return () => (document.body.style.overflow = originalStyle)
  }, [])
}
