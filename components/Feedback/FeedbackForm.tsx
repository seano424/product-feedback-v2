import { useState, Dispatch, SetStateAction } from 'react'
import { categories } from '@/lib/data'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { createSuggestion } from '@/lib/api'
import { useRouter } from 'next/router'
import { SuggestionProps } from '@/lib/interfaces'
interface Props extends SuggestionProps {
  toggle?: Dispatch<SetStateAction<boolean>>
}

const FeedbackForm = ({ toggle, suggestion }: Props) => {
  const router = useRouter()
  const [values, setValues] = useState({
    title: suggestion ? suggestion.title : '',
    description: suggestion ? suggestion.description : '',
    category: suggestion ? suggestion.category.name : categories[0].name,
  })
  const queryClient = useQueryClient()

  const createMutation = useMutation(createSuggestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(['suggestions'])
      if (toggle) {
        queryClient.invalidateQueries(['suggestion', suggestion.id])
        return toggle((state) => !state)
      }
      router.push('/')
    },
  })

  const handleChange = (e) => {
    e.preventDefault()
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCancel = (e) => {
    e.preventDefault()
    const handleClearValues = (id) => {
      toggle && toggle((state) => !state)
      setValues({
        title: '',
        description: '',
        category: categories[0].name,
      })
      toast.dismiss(id)
    }
    toast((t) => (
      <div className="flex flex-col items-center justify-center gap-5 p-4">
        <p>You're about to undo everything 😱</p>
        <div className="flex gap-5">
          <button
            className="button bg-red px-3"
            onClick={() => handleClearValues(t.id)}
          >
            {' '}
            Continue
          </button>
          <button
            className="button bg-green-500 px-3 "
            onClick={() => toast.dismiss(t.id)}
          >
            {' '}
            Oops nevermind
          </button>
        </div>
      </div>
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      ...values,
      status: 'In-Progress',
      id: suggestion ? suggestion.id : 0,
    }
    return createMutation.mutate(body)
  }

  return (
    <>
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-xl bg-white/80 p-10 text-gray-dark shadow-xl"
      >
        <h1 className="h1 mt-4">
          {suggestion ? 'Edit' : 'Create New'} Feedback
        </h1>
        <div className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="h3">Feedback Title</h3>
              <label className="body-1">
                Add a short, descriptive headline
              </label>
            </div>
            <input
              required
              onChange={handleChange}
              value={values.title}
              className="input"
              type="text"
              name="title"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="h3">Category</h3>
              <label className="body-1">
                Choose a category for your feedback
              </label>
            </div>
            <select
              value={values.category}
              onChange={handleChange}
              className="input"
              name="category"
              id="category"
            >
              {categories.map((category) => (
                <option key={category.type} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="h3">Feedback Description</h3>
              <label className="body-1">
                Include any specific comments on what should be improved, added,
                etc.
              </label>
            </div>
            <textarea
              required
              onChange={handleChange}
              value={values.description}
              rows={8}
              placeholder=""
              className="input"
              name="description"
              id="description"
            ></textarea>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={handleCancel}
            type="button"
            className="button bg-blue-navy"
          >
            Cancel
          </button>
          <button type="submit" className="button">
            {suggestion ? 'Edit' : 'Add'} Feedback
          </button>
        </div>
      </form>
    </>
  )
}

export default FeedbackForm
