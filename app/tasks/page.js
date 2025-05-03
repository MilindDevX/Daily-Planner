import React from 'react'
import TaskList from '../components/TaskList'

const page = () => {
  return(
    <div className='bg-black'>
      <h2 className="text-white text-center text-xl font-bold mb-4">Today's Tasks</h2>
      <TaskList />
    </div>
  )
}

export default page