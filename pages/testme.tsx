import { useState, useMemo } from 'react'

export const arr = [
  {
    id: 4,
    createdAt: '2022-09-09T21:37:15.874Z',
    updatedAt: '2022-09-09T21:37:15.875Z',
    title: 'Add a dark theme option',
    description:
      'It would help people with light sensitivities and who prefer dark mode.',
    votes: 93,
    userId: 3,
    statusType: 'live',
    categoryId: 3,
    comments: [
      {
        id: 9,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.055Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 6,
        suggestionId: 4,
      },
      {
        id: 4,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.054Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 3,
        suggestionId: 4,
      },
      {
        id: 13,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.055Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 3,
        suggestionId: 4,
      },
      {
        id: 14,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.055Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 2,
        suggestionId: 4,
      },
    ],
    category: {
      id: 3,
      name: 'Bug',
      suggestionId: null,
      type: 'bug',
    },
    status: {
      type: 'live',
      name: 'Live',
    },
  },
  {
    id: 3,
    createdAt: '2022-09-09T21:37:15.874Z',
    updatedAt: '2022-09-09T21:37:15.875Z',
    title: 'Ability to follow others',
    description: 'Stay updated on comments and solutions other people post.',
    votes: 32,
    userId: 3,
    statusType: 'live',
    categoryId: 2,
    comments: [
      {
        id: 2,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.054Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 3,
        suggestionId: 3,
      },
      {
        id: 6,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.054Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 6,
        suggestionId: 3,
      },
    ],
    category: {
      id: 2,
      name: 'UI',
      suggestionId: null,
      type: 'ui',
    },
    status: {
      type: 'live',
      name: 'Live',
    },
  },
  {
    id: 2,
    createdAt: '2022-09-09T21:37:15.874Z',
    updatedAt: '2022-09-09T21:37:15.875Z',
    title: 'Add tags for solutions',
    description: 'Easier to search for solutions based on a specific stack.',
    votes: 11,
    userId: 2,
    statusType: 'planned',
    categoryId: 3,
    comments: [
      {
        id: 1,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.054Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 2,
        suggestionId: 2,
      },
      {
        id: 7,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.055Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 1,
        suggestionId: 2,
      },
      {
        id: 8,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.055Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 6,
        suggestionId: 2,
      },
      {
        id: 10,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.054Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 4,
        suggestionId: 2,
      },
      {
        id: 11,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.055Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 4,
        suggestionId: 2,
      },
    ],
    category: {
      id: 3,
      name: 'Bug',
      suggestionId: null,
      type: 'bug',
    },
    status: {
      type: 'planned',
      name: 'Planned',
    },
  },
  {
    id: 1,
    createdAt: '2022-09-09T21:37:15.874Z',
    updatedAt: '2022-09-13T17:36:13.986Z',
    title: 'Q&A within the challenge hubs',
    description: 'Challenge-specific Q&A would make for easy reference.',
    votes: 7,
    userId: 2,
    statusType: 'in-progress',
    categoryId: 2,
    comments: [
      {
        id: 3,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.054Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 5,
        suggestionId: 1,
      },
      {
        id: 12,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.055Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 5,
        suggestionId: 1,
      },
      {
        id: 5,
        createdAt: '2022-09-09T21:48:11.054Z',
        updatedAt: '2022-09-09T21:48:11.054Z',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid est porro possimus, repellendus aliquam in non nulla quas amet!',
        userId: 2,
        suggestionId: 1,
      },
    ],
    category: {
      id: 2,
      name: 'UI',
      suggestionId: null,
      type: 'ui',
    },
    status: {
      type: 'in-progress',
      name: 'In-Progress',
    },
  },
]

const testme = () => {
  const [filteredArr, setFilteredArr] = useState(arr)
  const handleSort = (type) => {
    const mostUpvotes = type === 'most-upvotes'
    const leastUpvotes = type === 'least-upvotes'
    const mostComments = type === 'most-comments'
    const leastComments = type === 'least-comments'
    mostUpvotes && setFilteredArr([...arr].sort((a, b) => b.votes - a.votes))
    leastUpvotes && setFilteredArr([...arr].sort((a, b) => a.votes - b.votes))
    mostComments &&
      setFilteredArr(
        [...arr].sort((a, b) => b.comments.length - a.comments.length)
      )
    leastComments &&
      setFilteredArr(
        [...arr].sort((a, b) => a.comments.length - b.comments.length)
      )
  }

  console.log(filteredArr)

  return (
    <div className="my-base container flex flex-col gap-4 font-bold text-fuchsia-600">
      <button onClick={() => handleSort('most-comments')}>Most Comments</button>
      <button onClick={() => handleSort('least-comments')}>
        Least Comments
      </button>
      <button onClick={() => handleSort('most-upvotes')}>Most Votes</button>
      <button onClick={() => handleSort('least-upvotes')}>Least Votes</button>
      {filteredArr.map((a) => (
        <h1 key={a.id}>
          {a.title}; votes: {a.votes}; comments: {a.comments.length}
        </h1>
      ))}
    </div>
  )
}

export default testme
