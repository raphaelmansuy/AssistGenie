import * as React from 'react'

/**
 * A custom React hook that returns a boolean indicating whether the component
 * has been mounted or not.
 *
 * @returns A boolean indicating whether the component has been mounted or not.
 *
 * @example
 *
 * function MyComponent() {
 *   const isMounted = useMounted()
 *
 *   return (
 *     <div>
 *       {isMounted ? 'Component is mounted' : 'Component is not mounted'}
 *     </div>
 *   )
 * }
 */
export function useMounted() {
  // Use the `useState` hook to create a state variable called `mounted`
  // and a function called `setMounted` to update it.
  const [mounted, setMounted] = React.useState(false)

  // Use the `useEffect` hook to set the `mounted` state variable to `true`
  // after the component has been mounted.
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Return the `mounted` state variable.
  return mounted
}