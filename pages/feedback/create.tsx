import FeedbackNavbar from '@/components/Headers/FeedbackNavbar'
import CreateForm from '@/components/Feedback/CreateForm'
const CreateFeedback = () => {
  return (
    <>
      <main className="min-h-screen bg-gray-light py-10">
        <section className="container mx-auto flex max-w-4xl flex-col gap-5">
          <FeedbackNavbar />
          <CreateForm />
        </section>
      </main>
    </>
  )
}

export default CreateFeedback
