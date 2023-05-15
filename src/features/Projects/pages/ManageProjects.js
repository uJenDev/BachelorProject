import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase';
import { selectUser } from '../../../slices/userSlice';
import ManageProjectCard from '../components/ManageProjectCard';
import NewProjectModal from '../views/NewProjectModal';

const ManageGroups = () => {

    const user = useSelector(selectUser)
    const [projects, setProjects] = useState(null);

    useEffect(() => {

        const getProjects = onSnapshot(
            query(
                collection(db, 'projects'),
                where('members', 'array-contains-any', [
                    {uid: user.uid, isAdmin: true, email: user.email, displayName: user.displayName}, 
                    {uid: user.uid, isAdmin: false, email: user.email, displayName: user.displayName}
                ])
            ),
            async (snapshot) => {
                const projectsWithDates = await Promise.all(
                    snapshot.docs.map(async (doc) => {
                        const projectData = doc.data();
                        const createdAt = projectData.createdAt.toDate().toLocaleString('no-NO', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        });
                        return {
                            id: doc.id,
                            ...projectData,
                            createdAt: createdAt
                        };
                    }
                ));
                setProjects(projectsWithDates)
        },
        (error) => {
            console.log(error)
        })
        return () => {
            getProjects()
        }
    }, [])

    useEffect(() => {
        console.log('projects: ', projects)
    }, [projects])

    const [open, setOpen] = useState(false);

  return (
    <>
        <div className='flex flex-col px-10 mt-5'>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-semibold'>Manage projects</h1>
                <button 
                    onClick={() => setOpen(true)}
                    className='flex flex-row items-center bg-gray-300 px-1 pr-2 rounded-lg duration-300 ease-out hover:bg-blue-500 hover:text-white hover:scale-105'
                >
                    <MdAdd />
                    <h1 className='text-md font-semibold'>Create Project</h1>
                </button>
            </div>
            <div className='grid grid-cols-5 w-full border-b-2 border-black border-opacity-60 mt-5'>
                <h1 className='font-semibold text-md'>Name</h1>
                <p>Created By</p>
                <p>Status</p>
                <p>Created At</p>
            </div>
            {projects?.map(project => (
                <ManageProjectCard
                    key={project.id}
                    project={project}
                    user={user}
                />
            ))}
        </div>
        <NewProjectModal
            open={open}
            setOpen={setOpen}
            user={user}
        />
    </>
  )
}

export default ManageGroups