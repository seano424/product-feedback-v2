export interface UserProps {
  user: {
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
}

export interface CommentProps {
  body: string
  createdAt: string
  id: number
  suggestionId: number
  updatedAt: string
  replies?: {
    body: string
    commentId: number
    suggestionId: number
    user: {
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
    id: string
  }[]
  user: {
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
}

export interface SuggestionProps {
  suggestion?: {
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
    user: {
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
        user: {
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
        id: string
      }[]
      user: {
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
    }[]
  }
}

export interface CategoryProps {
  id: number
  name: string
  suggestionId?: number
  type: string
}

export interface StatusProps {
  type: string
  name: string
  suggestions: {
    id: number
    createdAt: string
    updatedAt: string
    title: string
    description: string
    userId: string
    categoryId: number
    statusType: string
  }[]
}
