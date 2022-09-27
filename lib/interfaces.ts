export interface User {
  createdAt: string
  email: string
  emailVerified: any
  id: string
  image: string
  name: string
  password: any
  updatedAt: string
  username: string
}
export interface SuggestionProps {
  suggestion: {
    votes: {
      id?: number
      userId?: number
      user?: {
        email: string
      }
    }[]
    id: number
    title: string
    description: string
    category?: {
      name: string
      type: string
    }
    comments?: {
      body: string
      createdAt: string
      id: number
      suggestionId: number
      updatedAt: string
      replies?: {
        body: string
        commentId: number
        suggestionId: number
        user: User
        id: string
      }[]
      user: User
    }[]
  }
}
