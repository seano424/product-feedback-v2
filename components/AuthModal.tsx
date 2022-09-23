import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { Dialog, Transition } from '@headlessui/react'
import { SparklesIcon, XIcon } from '@heroicons/react/outline'

const AuthModal = ({ show = false, onClose = () => null }) => {
  const [disabled, setDisabled] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  const signInWithGoogle = () => {
    toast.loading('Redirecting...')
    setDisabled(true)
    // Perform sign in
    signIn('google', {
      callbackUrl: window.location.href,
    })
  }

  const closeModal = () => {
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  // Reset modal
  useEffect(() => {
    if (!show) {
      // Wait for 200ms for aniamtion to finish
      setTimeout(() => {
        setDisabled(false)
        // setConfirm(false)
        setShowSignIn(false)
      }, 200)
    }
  }, [show])

  // Remove pending toasts if any
  useEffect(() => {
    toast.dismiss()
  }, [])

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-full max-w-md transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all sm:rounded-md">
              {/* Close icon */}
              <button
                onClick={closeModal}
                className="hover:bg-gray-100 absolute top-2 right-2 shrink-0 rounded-md p-1 transition focus:outline-none"
              >
                <XIcon className="h-5 w-5" />
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                  <div className="flex justify-center">
                    <Link href="/">
                      <a className="flex items-center space-x-1">
                        <SparklesIcon className="h-8 w-8 shrink-0 text-fuschia" />
                        <span className="text-xl font-semibold tracking-wide">
                          Product <span className="text-fuschia">Feedback</span>
                        </span>
                      </a>
                    </Link>
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="mt-6 text-center text-lg font-bold sm:text-2xl"
                  >
                    {showSignIn ? 'Welcome back!' : 'Create your account'}
                  </Dialog.Title>

                  {!showSignIn ? (
                    <Dialog.Description className="text-gray-500 mt-2 text-center text-base">
                      Please create an account to list your homes and bookmark
                      your favorite ones.
                    </Dialog.Description>
                  ) : null}

                  <div className="mt-10">
                    {/* Sign with Google */}
                    <button
                      disabled={disabled}
                      onClick={() => signInWithGoogle()}
                      className="disabled:hover:text-gray-500 mx-auto flex h-[46px] w-full items-center justify-center space-x-2 rounded-md border border-gray-dark p-2 text-gray-dark transition-colors hover:border-gray-light hover:bg-gray-light hover:text-gray focus:outline-none focus:ring-4 focus:ring-gray focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-light disabled:hover:bg-transparent"
                    >
                      <Image
                        src="/google.svg"
                        alt="Google"
                        width={32}
                        height={32}
                      />
                      <span>Sign {showSignIn ? 'in' : 'up'} with Google</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
export default AuthModal
